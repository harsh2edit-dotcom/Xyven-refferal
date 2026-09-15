'use strict';
require('dotenv').config();
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const session = require('express-session');
const PgStore = require('connect-pg-simple')(session);
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

/* -------------------------------------------------------------------------- */
/*  CONFIG                                                                     */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 10000;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'HARSHROSY';
const IP_SECRET = process.env.IP_HASH_SECRET || 'ip-secret-change-me';
const SESSION_SECRET = process.env.SESSION_SECRET || 'session-secret-change-me';
const PUBLIC_URL = process.env.PUBLIC_URL || 'https://xyven-refferal.onrender.com';
const IS_PROD = process.env.NODE_ENV === 'production';

// Money is stored in PAISE (integers). ₹20 = 2000 paise.
const R = {
  REFERRER: 2000,
  REFERRED: 1000,
  MIN_VALID_REFS: 10,
  MIN_WITHDRAWAL: 20000,
  REQUIRED_DEPOSIT: 5000,
  MAX_IP_ACCOUNTS_24H: 3,
  MAX_DEVICE_ACCOUNTS: 2,
};

/* -------------------------------------------------------------------------- */
/*  DB                                                                         */
/* -------------------------------------------------------------------------- */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
  max: 10,
});

async function tx(fn) {
  const c = await pool.connect();
  try { await c.query('BEGIN'); const r = await fn(c); await c.query('COMMIT'); return r; }
  catch (e) { try { await c.query('ROLLBACK'); } catch (_) {} throw e; }
  finally { c.release(); }
}

/* -------------------------------------------------------------------------- */
/*  UTILS                                                                      */
/* -------------------------------------------------------------------------- */
const hashIp = (ip) => ip ? crypto.createHmac('sha256', IP_SECRET).update(String(ip)).digest('hex').slice(0, 32) : null;
const clientIp = (req) => (req.headers['x-forwarded-for']?.split(',')[0].trim()) || req.ip || 'unknown';
const hashDevice = (s) => s ? crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, 32) : null;
const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const genReferralCode = () => 'XYV' + Array.from(crypto.randomBytes(5)).map(b => ALPHA[b % 32]).join('');
const genId = (p) => `${p}-${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
const genTxn = () => 'TXN-' + Date.now().toString(36).toUpperCase() + crypto.randomBytes(3).toString('hex').toUpperCase();

const clean = (s, n = 300) => typeof s === 'string' ? s.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, n) : '';
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 160;
const validUsername = (u) => /^[a-zA-Z0-9_]{3,24}$/.test(u);
const strongPass = (p) => typeof p === 'string' && p.length >= 8 && p.length <= 72
  && /[a-z]/.test(p) && /[A-Z]/.test(p) && /[0-9]/.test(p);
const validUpi = (u) => /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test(u);

/* -------------------------------------------------------------------------- */
/*  APP                                                                        */
/* -------------------------------------------------------------------------- */
const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:', 'blob:'],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: IS_PROD ? { maxAge: 15552000, includeSubDomains: true } : false,
}));

app.use(express.json({ limit: '128kb' }));
app.use(express.urlencoded({ extended: false, limit: '128kb' }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: IS_PROD ? '1h' : 0 }));

/* ---- Sessions ---- */
const sessionStore = new PgStore({
  pool,
  tableName: 'sessions',
  createTableIfMissing: true,
});

app.use(session({
  name: 'xyven.sid',
  store: sessionStore,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: IS_PROD,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));

/* ---- CSRF token ---- */
app.use((req, res, next) => {
  if (!req.session.csrf) req.session.csrf = crypto.randomBytes(24).toString('hex');
  next();
});

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);
app.use('/api', (req, res, next) => {
  if (SAFE.has(req.method)) return next();
  const sent = req.get('x-csrf-token') || req.body?._csrf;
  if (!sent || sent !== req.session.csrf) {
    return res.status(403).json({ error: 'CSRF', message: 'Security token invalid. Reload the page.' });
  }
  next();
});

/* ---- Rate limiters ---- */
const lim = (max, ms, msg) => rateLimit({
  windowMs: ms, max, standardHeaders: true, legacyHeaders: false,
  handler: (req, res) => res.status(429).json({ error: 'RATE_LIMIT', message: msg }),
});
const signupLimiter = lim(10, 60 * 60 * 1000, 'Too many signup attempts. Try again later.');
const loginLimiter = lim(15, 15 * 60 * 1000, 'Too many login attempts. Try again in 15 minutes.');
const adminLoginLimiter = lim(8, 15 * 60 * 1000, 'Too many admin login attempts.');
const actionLimiter = lim(40, 60 * 1000, 'Too many requests. Slow down.');
const generalLimiter = lim(300, 60 * 1000, 'Too many requests.');
app.use('/api', generalLimiter);

/* ---- Auth middlewares ---- */
const requireAuth = (req, res, next) => req.session.userId
  ? next() : res.status(401).json({ error: 'AUTH', message: 'Please sign in.' });

const requireAdmin = (req, res, next) => req.session.adminId
  ? next() : res.status(401).json({ error: 'ADMIN_AUTH', message: 'Admin authentication required.' });

async function loadUser(req, res, next) {
  if (!req.session.userId) return next();
  const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [req.session.userId]);
  if (!rows[0]) return req.session.destroy(() => res.status(401).json({ error: 'AUTH' }));
  if (rows[0].status === 'suspended') return res.status(403).json({ error: 'SUSPENDED', message: 'Account suspended. Contact @xyvensupport.' });
  req.user = rows[0];
  next();
}
app.use('/api', loadUser);

/* ---- Page routing ---- */
app.get('/', (req, res) => res.redirect(req.session?.userId ? '/app' : '/login'));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/app', (req, res) => {
  if (!req.session?.userId) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

/* ========================================================================== */
/*  HELPERS                                                                    */
/* ========================================================================== */
async function notify(c, userId, title, body, type = 'info') {
  const db = c || pool;
  await db.query(
    'INSERT INTO notifications (user_id,title,body,type) VALUES ($1,$2,$3,$4)',
    [userId, title, body, type]
  );
}

async function credit(c, userId, amountPaise, type, description, meta = {}) {
  const { rows } = await c.query(
    'UPDATE users SET balance_paise = balance_paise + $2, total_earned_paise = total_earned_paise + $2 WHERE id=$1 RETURNING balance_paise',
    [userId, amountPaise]
  );
  if (!rows[0]) throw new Error('USER_NOT_FOUND');
  const txn = genTxn();
  await c.query(
    `INSERT INTO transactions (txn_id,user_id,type,direction,amount_paise,status,description,meta,balance_after_paise)
     VALUES ($1,$2,$3,'credit',$4,'completed',$5,$6,$7)`,
    [txn, userId, type, amountPaise, description, meta, rows[0].balance_paise]
  );
  return { txn, balance: Number(rows[0].balance_paise) };
}

async function debit(c, userId, amountPaise, type, description, meta = {}) {
  const { rows } = await c.query(
    'UPDATE users SET balance_paise = balance_paise - $2 WHERE id=$1 AND balance_paise >= $2 RETURNING balance_paise',
    [userId, amountPaise]
  );
  if (!rows[0]) return null;
  const txn = genTxn();
  await c.query(
    `INSERT INTO transactions (txn_id,user_id,type,direction,amount_paise,status,description,meta,balance_after_paise)
     VALUES ($1,$2,$3,'debit',$4,'pending',$5,$6,$7)`,
    [txn, userId, type, amountPaise, description, meta, rows[0].balance_paise]
  );
  return { txn, balance: Number(rows[0].balance_paise) };
}

async function refund(c, userId, amountPaise, description, meta = {}) {
  await c.query(
    'UPDATE users SET balance_paise = balance_paise + $2 WHERE id=$1', [userId, amountPaise]
  );
  const txn = genTxn();
  await c.query(
    `INSERT INTO transactions (txn_id,user_id,type,direction,amount_paise,status,description,meta)
     VALUES ($1,$2,'withdrawal','credit',$3,'completed',$4,$5)`,
    [txn, userId, amountPaise, description, meta]
  );
}

async function audit(adminUsername, action, targetType, targetId, detail = {}) {
  try {
    await pool.query(
      'INSERT INTO audit_logs (admin_username,action,target_type,target_id,detail) VALUES ($1,$2,$3,$4,$5)',
      [adminUsername, action, targetType, targetId ? String(targetId) : null, detail]
    );
  } catch (e) { console.error('[audit]', e.message); }
}

async function validRefCount(c, userId) {
  const db = c || pool;
  const { rows } = await db.query(
    "SELECT COUNT(*)::int c FROM referrals WHERE referrer_id=$1 AND status='valid'", [userId]
  );
  return rows[0].c;
}

/* ========================================================================== */
/*  AUTH ROUTES                                                                */
/* ========================================================================== */
app.post('/api/signup', signupLimiter, async (req, res) => {
  try {
    const name = clean(req.body.name, 60);
    const username = clean(req.body.username, 24);
    const email = clean(req.body.email, 160).toLowerCase();
    const password = String(req.body.password || '');
    const refCode = clean(req.body.referralCode || '', 20).toUpperCase();
    const deviceSignal = req.body.deviceSignal;

    if (!name || name.length < 2) return res.status(400).json({ error: 'VALIDATION', message: 'Enter your full name.' });
    if (!validUsername(username)) return res.status(400).json({ error: 'VALIDATION', message: 'Username must be 3-24 letters/numbers/underscore.' });
    if (!validEmail(email)) return res.status(400).json({ error: 'VALIDATION', message: 'Enter a valid email.' });
    if (!strongPass(password)) return res.status(400).json({ error: 'VALIDATION', message: 'Password needs 8+ chars with uppercase, lowercase and number.' });

    const ipHash = hashIp(clientIp(req));
    const deviceHash = hashDevice(deviceSignal);
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await tx(async (c) => {
      const dup = await c.query(
        'SELECT username, email FROM users WHERE LOWER(username)=LOWER($1) OR LOWER(email)=LOWER($2)',
        [username, email]
      );
      if (dup.rows.length) {
        const clash = dup.rows[0];
        throw Object.assign(new Error(
          clash.username.toLowerCase() === username.toLowerCase()
            ? 'Username already taken.'
            : 'Email already registered.'
        ), { status: 409 });
      }

      let referrer = null;
      if (refCode) {
        const r = await c.query('SELECT id, username FROM users WHERE referral_code=$1 AND status=$2', [refCode, 'active']);
        referrer = r.rows[0] || null;
      }

      let code, user;
      for (let i = 0; i < 6; i++) {
        code = genReferralCode();
        try {
          const ins = await c.query(
            `INSERT INTO users (name,username,email,password_hash,referral_code,referred_by,signup_ip_hash,last_ip_hash,device_hash)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$7,$8)
             RETURNING id,name,username,email,referral_code,created_at`,
            [name, username, email, passwordHash, code, referrer?.id || null, ipHash, deviceHash]
          );
          user = ins.rows[0];
          break;
        } catch (e) {
          if (e.code === '23505' && e.constraint?.includes('referral_code')) continue;
          throw e;
        }
      }
      if (!user) throw new Error('Referral code allocation failed.');

      await notify(c, user.id, 'Welcome to XYVEN Referral',
        'Your account has been created. Share your referral code to start earning.', 'account');

      // Risk assessment
      let risk = 0, reasons = [], deviceCollision = 0;
      if (ipHash) {
        const { rows } = await c.query(
          `SELECT COUNT(*)::int c FROM users WHERE signup_ip_hash=$1 AND created_at > NOW() - INTERVAL '24 hours'`,
          [ipHash]);
        if (rows[0].c >= R.MAX_IP_ACCOUNTS_24H) { risk += 30; reasons.push(`${rows[0].c} accounts from same IP (24h)`); }
      }
      if (deviceHash) {
        const { rows } = await c.query(
          `SELECT COUNT(DISTINCT user_id)::int c FROM users WHERE device_hash=$1 AND id <> $2`,
          [deviceHash, user.id]);
        deviceCollision = rows[0].c;
        if (deviceCollision > 0) { risk += 40 * deviceCollision; reasons.push(`Device linked to ${deviceCollision} existing account(s)`); }
      }

      // Referral processing
      if (referrer) {
        const blocked = deviceCollision >= R.MAX_DEVICE_ACCOUNTS;
        const refIns = await c.query(
          `INSERT INTO referrals (referrer_id,referred_id,status,reason,signup_ip_hash,device_hash)
           VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
          [referrer.id, user.id, blocked ? 'rejected' : 'valid',
           reasons.join('; ') || null, ipHash, deviceHash]
        );

        if (!blocked) {
          await c.query("UPDATE referrals SET validated_at=NOW() WHERE id=$1", [refIns.rows[0].id]);
          await credit(c, referrer.id, R.REFERRER, 'referral_reward', `Referral reward for @${username}`, { referredId: user.id });
          await credit(c, user.id, R.REFERRED, 'signup_bonus', `Signup bonus from @${referrer.username}`, { referrerId: referrer.id });
          await notify(c, referrer.id, 'Referral reward credited',
            `You earned ₹${R.REFERRER / 100} because @${username} joined with your code.`, 'reward');
          await notify(c, user.id, 'Signup bonus received',
            `₹${R.REFERRED / 100} signup bonus has been credited to your balance.`, 'reward');
          if (risk >= 50) {
            await c.query(
              'UPDATE users SET flagged=TRUE, risk_score=$2, flag_reason=$3 WHERE id=$1',
              [user.id, Math.min(risk, 100), reasons.join('; ')]);
          }
        }
      }

      return user;
    });

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ error: 'SESSION', message: 'Session error.' });
      req.session.userId = result.id;
      res.status(201).json({
        ok: true,
        user: { id: result.id, name: result.name, username: result.username, referralCode: result.referral_code },
      });
    });
  } catch (e) {
    console.error('[signup]', e.message);
    res.status(e.status || 500).json({ error: e.code || 'SERVER', message: e.status ? e.message : 'Signup failed. Try again.' });
  }
});

app.post('/api/login', loginLimiter, async (req, res) => {
  try {
    const username = clean(req.body.username, 64);
    const password = String(req.body.password || '');
    if (!username || !password) return res.status(400).json({ error: 'VALIDATION', message: 'Enter username and password.' });

    const { rows } = await pool.query(
      'SELECT * FROM users WHERE LOWER(username)=LOWER($1) OR LOWER(email)=LOWER($1)', [username]);
    const u = rows[0];
    const ok = u && await bcrypt.compare(password, u.password_hash);
    if (!ok) return res.status(401).json({ error: 'INVALID', message: 'Invalid username or password.' });
    if (u.status === 'suspended') return res.status(403).json({ error: 'SUSPENDED', message: 'Account suspended. Contact @xyvensupport.' });

    await pool.query('UPDATE users SET last_login_at=NOW(), last_ip_hash=$2 WHERE id=$1', [u.id, hashIp(clientIp(req))]);

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ error: 'SESSION' });
      req.session.userId = u.id;
      res.json({ ok: true, user: { id: u.id, username: u.username } });
    });
  } catch (e) {
    console.error('[login]', e.message);
    res.status(500).json({ error: 'SERVER', message: 'Login failed.' });
  }
});

app.post('/api/logout', (req, res) => {
  if (!req.session) return res.json({ ok: true });
  req.session.destroy(() => { res.clearCookie('xyven.sid'); res.json({ ok: true }); });
});

app.get('/api/me', requireAuth, (req, res) => {
  res.json({
    csrf: req.session.csrf,
    user: {
      id: req.user.id, name: req.user.name, username: req.user.username,
      email: req.user.email, referralCode: req.user.referral_code,
      balance: Number(req.user.balance_paise), createdAt: req.user.created_at,
    },
  });
});

app.get('/api/me/summary', requireAuth, async (req, res) => {
  const uid = req.user.id;
  const [refs, earn, wds, deps, vc] = await Promise.all([
    pool.query(`SELECT COUNT(*)::int total, COUNT(*) FILTER (WHERE status='valid')::int valid FROM referrals WHERE referrer_id=$1`, [uid]),
    pool.query(`SELECT COALESCE(SUM(amount_paise),0) s FROM transactions WHERE user_id=$1 AND direction='credit' AND status='completed' AND type IN ('referral_reward','signup_bonus','coupon_reward')`, [uid]),
    pool.query(`SELECT COALESCE(SUM(amount_paise) FILTER (WHERE status='completed'),0) done, COALESCE(SUM(amount_paise) FILTER (WHERE status IN ('pending','approved')),0) pending FROM withdrawals WHERE user_id=$1`, [uid]),
    pool.query(`SELECT COALESCE(SUM(amount_paise) FILTER (WHERE status='verified'),0) s FROM deposits WHERE user_id=$1`, [uid]),
    validRefCount(null, uid),
  ]);

  const balance = Number(req.user.balance_paise);
  const checks = {
    validReferrals: vc,
    minReferrals: R.MIN_VALID_REFS,
    hasReferrals: vc >= R.MIN_VALID_REFS,
    hasDeposit: req.user.deposit_verified,
    requiredDeposit: R.REQUIRED_DEPOSIT,
    minWithdrawal: R.MIN_WITHDRAWAL,
    hasBalance: balance >= R.MIN_WITHDRAWAL,
  };
  checks.canWithdraw = checks.hasReferrals && checks.hasDeposit && checks.hasBalance;

  res.json({
    balance,
    depositVerified: req.user.deposit_verified,
    depositTotal: Number(deps.rows[0].s),
    totalReferrals: refs.rows[0].total,
    validReferrals: refs.rows[0].valid,
    totalEarnings: Number(earn.rows[0].s),
    totalWithdrawn: Number(wds.rows[0].done),
    pendingWithdrawal: Number(wds.rows[0].pending),
    checks,
  });
});

app.get('/api/me/referrals', requireAuth, async (req, res) => {
  const uid = req.user.id;
  const [list, counts, earned] = await Promise.all([
    pool.query(`SELECT r.status, r.created_at, r.validated_at, u.username
                FROM referrals r JOIN users u ON u.id=r.referred_id
                WHERE r.referrer_id=$1 ORDER BY r.created_at DESC LIMIT 100`, [uid]),
    pool.query(`SELECT COUNT(*)::int total, COUNT(*) FILTER (WHERE status='valid')::int valid FROM referrals WHERE referrer_id=$1`, [uid]),
    pool.query(`SELECT COALESCE(SUM(amount_paise),0) s FROM transactions WHERE user_id=$1 AND type='referral_reward' AND status='completed'`, [uid]),
  ]);
  const code = req.user.referral_code;
  const base = PUBLIC_URL.replace(/\/$/, '');
  res.json({
    referralCode: code,
    referralLink: `${base}/signup?ref=${code}`,
    shareText: `Join XYVEN Referral and earn rewards by inviting genuine users.\n\nReferral Code: ${code}\n\nWebsite:\n${base}`,
    total: counts.rows[0].total,
    valid: counts.rows[0].valid,
    earnings: Number(earned.rows[0].s),
    history: list.rows,
  });
});

/* ---- Transactions ---- */
app.get('/api/me/transactions', requireAuth, async (req, res) => {
  const { rows } = await pool.query(
    `SELECT txn_id, type, direction, amount_paise, status, description, created_at
     FROM transactions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 100`, [req.user.id]);
  res.json({ transactions: rows });
});

/* ---- Notifications ---- */
app.get('/api/notifications', requireAuth, async (req, res) => {
  const [list, unread] = await Promise.all([
    pool.query(`SELECT id,title,body,type,is_read,created_at FROM notifications
                WHERE user_id=$1 ORDER BY created_at DESC LIMIT 100`, [req.user.id]),
    pool.query(`SELECT COUNT(*)::int c FROM notifications WHERE user_id=$1 AND is_read=FALSE`, [req.user.id]),
  ]);
  res.json({ unread: unread.rows[0].c, notifications: list.rows });
});

app.get('/api/notifications/unread', requireAuth, async (req, res) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int c FROM notifications WHERE user_id=$1 AND is_read=FALSE`, [req.user.id]);
  res.json({ unread: rows[0].c });
});

app.post('/api/notifications/:id/read', requireAuth, async (req, res) => {
  await pool.query('UPDATE notifications SET is_read=TRUE WHERE id=$1 AND user_id=$2',
    [Number(req.params.id), req.user.id]);
  res.json({ ok: true });
});

app.post('/api/notifications/read-all', requireAuth, async (req, res) => {
  await pool.query('UPDATE notifications SET is_read=TRUE WHERE user_id=$1 AND is_read=FALSE', [req.user.id]);
  res.json({ ok: true });
});

/* ---- Deposits ---- */
app.get('/api/deposits', requireAuth, async (req, res) => {
  const { rows } = await pool.query(
    `SELECT request_id, amount_paise, method, reference_id, status, admin_note, created_at, processed_at
     FROM deposits WHERE user_id=$1 ORDER BY created_at DESC LIMIT 50`, [req.user.id]);
  res.json({ required: R.REQUIRED_DEPOSIT, verified: req.user.deposit_verified, deposits: rows });
});

app.post('/api/deposits', requireAuth, actionLimiter, async (req, res) => {
  try {
    const amountPaise = Math.round(Number(req.body.amount) * 100);
    const referenceId = clean(req.body.referenceId, 64);
    const method = ['upi', 'bank'].includes(req.body.method) ? req.body.method : 'upi';
    const note = clean(req.body.note || '', 300);

    if (!Number.isFinite(amountPaise) || amountPaise <= 0) return res.status(400).json({ error: 'VALIDATION', message: 'Enter a valid amount.' });
    if (!referenceId || !/^[A-Za-z0-9-]{4,64}$/.test(referenceId)) return res.status(400).json({ error: 'VALIDATION', message: 'Enter a valid payment reference ID.' });

    const out = await tx(async (c) => {
      const p = await c.query(`SELECT request_id FROM deposits WHERE user_id=$1 AND status='pending' LIMIT 1`, [req.user.id]);
      if (p.rows.length) throw Object.assign(new Error('You already have a pending deposit request.'), { status: 409 });

      const rid = genId('DEP');
      const ins = await c.query(
        `INSERT INTO deposits (request_id,user_id,amount_paise,method,reference_id,note)
         VALUES ($1,$2,$3,$4,$5,$6)
         RETURNING request_id, amount_paise, method, reference_id, status, created_at`,
        [rid, req.user.id, amountPaise, method, referenceId, note]
      );
      await notify(c, req.user.id, 'Deposit submitted',
        `Your deposit request ${rid} for ₹${(amountPaise / 100).toFixed(2)} is pending verification.`, 'deposit');
      return ins.rows[0];
    });
    res.status(201).json({ ok: true, deposit: out });
  } catch (e) {
    console.error('[deposit]', e.message);
    res.status(e.status || 500).json({ error: e.code || 'SERVER', message: e.status ? e.message : 'Deposit failed.' });
  }
});

/* ---- Withdrawals ---- */
app.get('/api/withdrawals', requireAuth, async (req, res) => {
  const vc = await validRefCount(null, req.user.id);
  const [hist, pend] = await Promise.all([
    pool.query(`SELECT request_id, amount_paise, upi_id, status, admin_note, created_at, processed_at
                FROM withdrawals WHERE user_id=$1 ORDER BY created_at DESC LIMIT 100`, [req.user.id]),
    pool.query(`SELECT request_id FROM withdrawals WHERE user_id=$1 AND status IN ('pending','approved')`, [req.user.id]),
  ]);
  const balance = Number(req.user.balance_paise);
  const checks = {
    hasReferrals: vc >= R.MIN_VALID_REFS,
    validReferrals: vc,
    minReferrals: R.MIN_VALID_REFS,
    hasDeposit: req.user.deposit_verified,
    requiredDeposit: R.REQUIRED_DEPOSIT,
    minWithdrawal: R.MIN_WITHDRAWAL,
    hasBalance: balance >= R.MIN_WITHDRAWAL,
    noPending: pend.rows.length === 0,
  };
  checks.canWithdraw = checks.hasReferrals && checks.hasDeposit && checks.hasBalance && checks.noPending;
  res.json({ balance, checks, history: hist.rows });
});

app.post('/api/withdrawals', requireAuth, actionLimiter, async (req, res) => {
  try {
    const amountPaise = Math.round(Number(req.body.amount) * 100);
    const upiId = clean(req.body.upiId, 80);
    if (!Number.isFinite(amountPaise) || amountPaise < R.MIN_WITHDRAWAL) {
      return res.status(400).json({ error: 'MIN', message: `Minimum withdrawal is ₹${R.MIN_WITHDRAWAL / 100}.` });
    }
    if (!validUpi(upiId)) return res.status(400).json({ error: 'VALIDATION', message: 'Enter a valid UPI ID (example: name@bank).' });

    const result = await tx(async (c) => {
      const u = (await c.query('SELECT * FROM users WHERE id=$1 FOR UPDATE', [req.user.id])).rows[0];
      if (!u) throw Object.assign(new Error('Account not found.'), { status: 404 });
      if (u.status !== 'active') throw Object.assign(new Error('Account suspended.'), { status: 403 });
      if (!u.deposit_verified) throw Object.assign(new Error(`A verified deposit of ₹${R.REQUIRED_DEPOSIT / 100} is required.`), { status: 403, code: 'DEPOSIT_REQUIRED' });

      const vc = await validRefCount(c, u.id);
      if (vc < R.MIN_VALID_REFS) throw Object.assign(new Error(`Need at least ${R.MIN_VALID_REFS} valid referrals (you have ${vc}).`), { status: 403, code: 'REFERRALS_REQUIRED' });

      const pend = await c.query(`SELECT 1 FROM withdrawals WHERE user_id=$1 AND status IN ('pending','approved') LIMIT 1`, [u.id]);
      if (pend.rows.length) throw Object.assign(new Error('You already have a pending withdrawal request.'), { status: 409 });

      const rid = genId('WDR');
      const hold = await debit(c, u.id, amountPaise, 'withdrawal', `Withdrawal request ${rid} placed on hold`, { requestId: rid });
      if (!hold) throw Object.assign(new Error('Insufficient available balance.'), { status: 400, code: 'INSUFFICIENT' });

      const ins = await c.query(
        `INSERT INTO withdrawals (request_id,user_id,amount_paise,upi_id,status)
         VALUES ($1,$2,$3,$4,'pending') RETURNING request_id, amount_paise, upi_id, status, created_at`,
        [rid, u.id, amountPaise, upiId]
      );
      await c.query(
        `UPDATE transactions SET meta = meta || $2::jsonb WHERE txn_id=$1`,
        [hold.txn, JSON.stringify({ requestId: rid })]
      );
      await notify(c, u.id, 'Withdrawal submitted',
        `Your withdrawal request ${rid} for ₹${(amountPaise / 100).toFixed(2)} is pending review.`, 'withdrawal');
      return ins.rows[0];
    });
    res.status(201).json({ ok: true, withdrawal: result });
  } catch (e) {
    console.error('[withdrawal]', e.message);
    res.status(e.status || 500).json({ error: e.code || 'SERVER', message: e.status ? e.message : 'Withdrawal failed.' });
  }
});

/* ---- Coupons ---- */
app.post('/api/coupons/redeem', requireAuth, actionLimiter, async (req, res) => {
  const code = clean(req.body.code || '', 32).toUpperCase();
  if (!code) return res.status(400).json({ error: 'INVALID', message: 'Enter a coupon code.' });
  try {
    const out = await tx(async (c) => {
      const coupon = (await c.query('SELECT * FROM coupons WHERE code=$1 FOR UPDATE', [code])).rows[0];
      if (!coupon) throw Object.assign(new Error('Invalid coupon code.'), { status: 404 });
      if (!coupon.active) throw Object.assign(new Error('This coupon is not active.'), { status: 400 });
      if (coupon.starts_at && new Date(coupon.starts_at) > new Date()) throw Object.assign(new Error('Coupon not yet active.'), { status: 400 });
      if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) throw Object.assign(new Error('Coupon has expired.'), { status: 400 });

      if (coupon.max_uses > 0) {
        const used = (await c.query('SELECT COUNT(*)::int n FROM coupon_redemptions WHERE coupon_id=$1', [coupon.id])).rows[0].n;
        if (used >= coupon.max_uses) throw Object.assign(new Error('Coupon usage limit reached.'), { status: 400 });
      }
      const perUser = (await c.query('SELECT COUNT(*)::int n FROM coupon_redemptions WHERE coupon_id=$1 AND user_id=$2', [coupon.id, req.user.id])).rows[0].n;
      if (perUser >= coupon.per_user_limit) throw Object.assign(new Error('You already used this coupon.'), { status: 409 });

      if (coupon.min_valid_referrals > 0) {
        const vc = await validRefCount(c, req.user.id);
        if (vc < coupon.min_valid_referrals) throw Object.assign(new Error(`This coupon requires ${coupon.min_valid_referrals} valid referrals.`), { status: 403 });
      }

      await c.query('INSERT INTO coupon_redemptions (coupon_id,user_id,amount_paise) VALUES ($1,$2,$3)',
        [coupon.id, req.user.id, coupon.reward_paise]);
      const cr = await credit(c, req.user.id, coupon.reward_paise, 'coupon_reward', `Coupon reward: ${coupon.code}`, { code: coupon.code });
      await notify(c, req.user.id, 'Coupon reward credited',
        `₹${(coupon.reward_paise / 100).toFixed(2)} credited from coupon ${coupon.code}.`, 'reward');
      return { amount: coupon.reward_paise, txn: cr.txn, balance: cr.balance };
    });
    res.json({ ok: true, ...out });
  } catch (e) {
    res.status(e.status || 500).json({ error: 'COUPON', message: e.status ? e.message : 'Coupon redemption failed.' });
  }
});

/* ========================================================================== */
/*  ADMIN ROUTES                                                               */
/* ========================================================================== */
const adminStore = new PgStore({
  pool, tableName: 'admin_sessions', createTableIfMissing: true,
});

app.post('/api/admin/login', adminLoginLimiter, async (req, res) => {
  try {
    const username = clean(req.body.username, 64);
    const password = String(req.body.password || '');
    if (!username || !password) return res.status(400).json({ error: 'VALIDATION', message: 'Username and password required.' });

    const { rows } = await pool.query('SELECT * FROM admin_users WHERE LOWER(username)=LOWER($1)', [username]);
    const admin = rows[0];
    const ok = admin && await bcrypt.compare(password, admin.password_hash);
    if (!ok) {
      await audit(username, 'admin_login_failed', 'admin', username, {});
      return res.status(401).json({ error: 'INVALID', message: 'Invalid admin credentials.' });
    }
    await pool.query('UPDATE admin_users SET last_login_at=NOW() WHERE id=$1', [admin.id]);
    await audit(admin.username, 'admin_login', 'admin', admin.id, {});

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ error: 'SESSION' });
      req.session.adminId = admin.id;
      req.session.adminName = admin.username;
      req.session.cookie.maxAge = 1000 * 60 * 60 * 8;
      res.json({ ok: true, admin: { username: admin.username } });
    });
  } catch (e) {
    console.error('[admin login]', e.message);
    res.status(500).json({ error: 'SERVER', message: 'Login failed.' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  if (!req.session) return res.json({ ok: true });
  const { adminName, adminId } = req.session;
  audit(adminName, 'admin_logout', 'admin', adminId, {});
  req.session.destroy(() => { res.clearCookie('xyven.sid'); res.json({ ok: true }); });
});

app.get('/api/admin/me', (req, res) => {
  if (!req.session?.adminId) return res.json({ authenticated: false });
  res.json({ authenticated: true, csrf: req.session.csrf, admin: { username: req.session.adminName } });
});

/* Everything below requires admin */
app.use('/api/admin', requireAdmin);

app.get('/api/admin/stats', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT
      (SELECT COUNT(*)::int FROM users) AS total_users,
      (SELECT COUNT(*)::int FROM users WHERE status='active') AS active_users,
      (SELECT COUNT(*)::int FROM users WHERE status='suspended') AS suspended_users,
      (SELECT COUNT(*)::int FROM referrals) AS total_referrals,
      (SELECT COUNT(*)::int FROM referrals WHERE status='valid') AS valid_referrals,
      (SELECT COALESCE(SUM(amount_paise),0) FROM transactions WHERE type IN ('referral_reward','signup_bonus','coupon_reward') AND status='completed') AS total_rewards,
      (SELECT COUNT(*)::int FROM deposits) AS total_deposits,
      (SELECT COUNT(*)::int FROM deposits WHERE status='pending') AS pending_deposits,
      (SELECT COALESCE(SUM(amount_paise),0) FROM deposits WHERE status='verified') AS deposit_value,
      (SELECT COUNT(*)::int FROM withdrawals) AS total_withdrawals,
      (SELECT COUNT(*)::int FROM withdrawals WHERE status='pending') AS pending_withdrawals,
      (SELECT COUNT(*)::int FROM withdrawals WHERE status='completed') AS completed_withdrawals,
      (SELECT COUNT(*)::int FROM withdrawals WHERE status='rejected') AS rejected_withdrawals,
      (SELECT COALESCE(SUM(amount_paise),0) FROM withdrawals WHERE status='completed') AS withdrawn_value
  `);
  res.json(rows[0]);
});

app.get('/api/admin/users', async (req, res) => {
  const q = clean(req.query.q || '', 60);
  const params = [];
  let where = '';
  if (q) { params.push(`%${q}%`); where = `WHERE username ILIKE $1 OR email ILIKE $1 OR name ILIKE $1 OR referral_code ILIKE $1`; }
  params.push(100);
  const { rows } = await pool.query(
    `SELECT id,name,username,email,referral_code,balance_paise,total_earned_paise,total_withdrawn_paise,
            deposit_verified,status,flagged,risk_score,created_at,last_login_at
     FROM users ${where} ORDER BY created_at DESC LIMIT $${params.length}`,
    params
  );
  res.json({ users: rows });
});

app.get('/api/admin/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const u = (await pool.query('SELECT * FROM users WHERE id=$1', [id])).rows[0];
  if (!u) return res.status(404).json({ error: 'NOT_FOUND' });
  const [refs, txns, deps, wds, notifs] = await Promise.all([
    pool.query(`SELECT r.*, u.username AS referred_username FROM referrals r JOIN users u ON u.id=r.referred_id WHERE r.referrer_id=$1 ORDER BY r.created_at DESC LIMIT 50`, [id]),
    pool.query(`SELECT txn_id,type,direction,amount_paise,status,description,created_at FROM transactions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 50`, [id]),
    pool.query(`SELECT request_id,amount_paise,reference_id,status,created_at FROM deposits WHERE user_id=$1 ORDER BY created_at DESC LIMIT 30`, [id]),
    pool.query(`SELECT request_id,amount_paise,upi_id,status,created_at FROM withdrawals WHERE user_id=$1 ORDER BY created_at DESC LIMIT 30`, [id]),
    pool.query(`SELECT title,body,type,is_read,created_at FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT 30`, [id]),
  ]);
  const safe = { ...u };
  delete safe.password_hash; delete safe.signup_ip_hash; delete safe.last_ip_hash; delete safe.device_hash;
  res.json({ user: safe, referrals: refs.rows, transactions: txns.rows, deposits: deps.rows, withdrawals: wds.rows, notifications: notifs.rows });
});

app.post('/api/admin/users/:id/suspend', async (req, res) => {
  const id = Number(req.params.id);
  const reason = clean(req.body.reason || 'Policy violation', 300);
  await pool.query("UPDATE users SET status='suspended' WHERE id=$1", [id]);
  await notify(null, id, 'Account suspended', `Your account has been suspended. Reason: ${reason}. Contact @xyvensupport.`, 'security');
  await audit(req.session.adminName, 'user_suspend', 'user', id, { reason });
  res.json({ ok: true });
});

app.post('/api/admin/users/:id/unsuspend', async (req, res) => {
  const id = Number(req.params.id);
  await pool.query("UPDATE users SET status='active', flagged=FALSE, flag_reason=NULL WHERE id=$1", [id]);
  await notify(null, id, 'Account restored', 'Your account has been restored.', 'security');
  await audit(req.session.adminName, 'user_unsuspend', 'user', id, {});
  res.json({ ok: true });
});

app.get('/api/admin/withdrawals', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT w.id, w.request_id, w.amount_paise, w.upi_id, w.status, w.admin_note,
           w.created_at, w.processed_at, u.username, u.id AS user_id
    FROM withdrawals w JOIN users u ON u.id=w.user_id
    ORDER BY w.created_at DESC LIMIT 200`);
  res.json({ withdrawals: rows });
});

app.post('/api/admin/withdrawals/:rid/:action', async (req, res) => {
  const { rid, action } = req.params;
  if (!['approve', 'reject', 'complete'].includes(action)) return res.status(400).json({ error: 'BAD_ACTION' });
  const note = clean(req.body.note || '', 300);
  try {
    await tx(async (c) => {
      const w = (await c.query('SELECT * FROM withdrawals WHERE request_id=$1 FOR UPDATE', [rid])).rows[0];
      if (!w) throw Object.assign(new Error('Withdrawal not found.'), { status: 404 });
      const amt = Number(w.amount_paise);

      if (action === 'approve') {
        if (w.status !== 'pending') throw Object.assign(new Error('Only pending can be approved.'), { status: 400 });
        await c.query("UPDATE withdrawals SET status='approved', admin_note=$2, processed_at=NOW() WHERE id=$1", [w.id, note || null]);
        await notify(c, w.user_id, 'Withdrawal approved', `Your withdrawal ${rid} for ₹${(amt / 100).toFixed(2)} has been approved.`, 'withdrawal');
      } else if (action === 'complete') {
        if (!['pending', 'approved'].includes(w.status)) throw Object.assign(new Error('Already finalised.'), { status: 400 });
        await c.query("UPDATE withdrawals SET status='completed', admin_note=$2, processed_at=NOW() WHERE id=$1", [w.id, note || null]);
        await c.query('UPDATE users SET total_withdrawn_paise = total_withdrawn_paise + $2 WHERE id=$1', [w.user_id, amt]);
        await c.query(`UPDATE transactions SET status='completed' WHERE user_id=$1 AND type='withdrawal' AND direction='debit' AND status='pending' AND meta->>'requestId'=$2`, [w.user_id, rid]);
        await notify(c, w.user_id, 'Withdrawal completed', `₹${(amt / 100).toFixed(2)} sent to ${w.upi_id}. Ref: ${rid}.`, 'withdrawal');
      } else {
        if (['rejected', 'completed'].includes(w.status)) throw Object.assign(new Error('Already finalised.'), { status: 400 });
        await c.query("UPDATE withdrawals SET status='rejected', admin_note=$2, processed_at=NOW() WHERE id=$1", [w.id, note || 'Rejected by admin']);
        await refund(c, w.user_id, amt, `Refund for rejected withdrawal ${rid}`, { requestId: rid });
        await c.query(`UPDATE transactions SET status='rejected' WHERE user_id=$1 AND type='withdrawal' AND direction='debit' AND status='pending' AND meta->>'requestId'=$2`, [w.user_id, rid]);
        await notify(c, w.user_id, 'Withdrawal rejected', `Your withdrawal ${rid} was rejected.${note ? ' Reason: ' + note : ''} Amount returned to balance.`, 'withdrawal');
      }
    });
    await audit(req.session.adminName, `withdrawal_${action}`, 'withdrawal', rid, { note });
    res.json({ ok: true });
  } catch (e) {
    res.status(e.status || 500).json({ error: 'SERVER', message: e.status ? e.message : 'Action failed.' });
  }
});

app.get('/api/admin/deposits', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT d.id, d.request_id, d.amount_paise, d.method, d.reference_id, d.note, d.status,
           d.admin_note, d.created_at, d.processed_at, u.username, u.id AS user_id
    FROM deposits d JOIN users u ON u.id=d.user_id
    ORDER BY d.created_at DESC LIMIT 200`);
  res.json({ deposits: rows });
});

app.post('/api/admin/deposits/:rid/:action', async (req, res) => {
  const { rid, action } = req.params;
  if (!['verify', 'reject'].includes(action)) return res.status(400).json({ error: 'BAD_ACTION' });
  const note = clean(req.body.note || '', 300);
  try {
    await tx(async (c) => {
      const d = (await c.query('SELECT * FROM deposits WHERE request_id=$1 FOR UPDATE', [rid])).rows[0];
      if (!d) throw Object.assign(new Error('Deposit not found.'), { status: 404 });
      if (d.status !== 'pending') throw Object.assign(new Error('Already processed.'), { status: 400 });
      const amt = Number(d.amount_paise);

      if (action === 'verify') {
        await c.query("UPDATE deposits SET status='verified', admin_note=$2, processed_at=NOW() WHERE id=$1", [d.id, note || null]);
        const u = (await c.query('SELECT * FROM users WHERE id=$1 FOR UPDATE', [d.user_id])).rows[0];
        const newTotal = Number(u.deposit_total_paise) + amt;
        const verified = u.deposit_verified || newTotal >= R.REQUIRED_DEPOSIT;
        await c.query('UPDATE users SET deposit_total_paise=$2, deposit_verified=$3 WHERE id=$1',
          [d.user_id, newTotal, verified]);
        const txn = genTxn();
        await c.query(
          `INSERT INTO transactions (txn_id,user_id,type,direction,amount_paise,status,description,meta)
           VALUES ($1,$2,'deposit','credit',$3,'completed',$4,$5)`,
          [txn, d.user_id, amt, `Deposit verified (ref ${d.reference_id})`, { requestId: rid }]);
        await notify(c, d.user_id, 'Deposit verified',
          `Your deposit of ₹${(amt / 100).toFixed(2)} has been verified.${verified && !u.deposit_verified ? ' Withdrawal deposit requirement is now complete.' : ''}`, 'deposit');
      } else {
        await c.query("UPDATE deposits SET status='rejected', admin_note=$2, processed_at=NOW() WHERE id=$1", [d.id, note || 'Could not verify']);
        await notify(c, d.user_id, 'Deposit rejected',
          `Your deposit ${rid} could not be verified.${note ? ' Reason: ' + note : ''} Contact @xyvensupport.`, 'deposit');
      }
    });
    await audit(req.session.adminName, `deposit_${action}`, 'deposit', rid, { note });
    res.json({ ok: true });
  } catch (e) {
    res.status(e.status || 500).json({ error: 'SERVER', message: e.status ? e.message : 'Action failed.' });
  }
});

app.get('/api/admin/coupons', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT c.*, (SELECT COUNT(*)::int FROM coupon_redemptions r WHERE r.coupon_id=c.id) AS redemptions,
           (SELECT COALESCE(SUM(amount_paise),0) FROM coupon_redemptions r WHERE r.coupon_id=c.id) AS redeemed_value
    FROM coupons c ORDER BY c.created_at DESC`);
  res.json({ coupons: rows });
});

app.post('/api/admin/coupons', async (req, res) => {
  try {
    const code = clean(req.body.code, 32).toUpperCase();
    const rewardPaise = Math.round(Number(req.body.reward) * 100);
    const maxUses = Math.max(0, Math.floor(Number(req.body.maxUses) || 0));
    const perUserLimit = Math.max(1, Math.floor(Number(req.body.perUserLimit) || 1));
    const minValidReferrals = Math.max(0, Math.floor(Number(req.body.minValidReferrals) || 0));
    const startsAt = req.body.startsAt || null;
    const expiresAt = req.body.expiresAt || null;
    const active = req.body.active !== false;

    if (!code || !/^[A-Z0-9_-]{3,32}$/.test(code)) return res.status(400).json({ error: 'VALIDATION', message: 'Invalid coupon code.' });
    if (!Number.isFinite(rewardPaise) || rewardPaise <= 0) return res.status(400).json({ error: 'VALIDATION', message: 'Enter a valid reward amount.' });

    const ins = await pool.query(
      `INSERT INTO coupons (code,reward_paise,max_uses,per_user_limit,min_valid_referrals,starts_at,expires_at,active)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [code, rewardPaise, maxUses, perUserLimit, minValidReferrals, startsAt, expiresAt, active]
    );
    await audit(req.session.adminName, 'coupon_create', 'coupon', ins.rows[0].id, { code, reward: rewardPaise });
    res.status(201).json({ ok: true, coupon: ins.rows[0] });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'DUPLICATE', message: 'Coupon code already exists.' });
    res.status(500).json({ error: 'SERVER', message: 'Could not create coupon.' });
  }
});

app.put('/api/admin/coupons/:id', async (req, res) => {
  const id = Number(req.params.id);
  const fields = [], params = [id];
  const map = { code: 'code', reward: 'reward_paise', maxUses: 'max_uses', perUserLimit: 'per_user_limit', minValidReferrals: 'min_valid_referrals', startsAt: 'starts_at', expiresAt: 'expires_at', active: 'active' };
  for (const [k, col] of Object.entries(map)) {
    if (req.body[k] !== undefined) {
      let v = req.body[k];
      if (k === 'reward') v = Math.round(Number(v) * 100);
      if (k === 'code') v = String(v).toUpperCase();
      params.push(v);
      fields.push(`${col} = $${params.length}`);
    }
  }
  if (!fields.length) return res.status(400).json({ error: 'VALIDATION', message: 'Nothing to update.' });
  const { rows } = await pool.query(`UPDATE coupons SET ${fields.join(', ')} WHERE id=$1 RETURNING *`, params);
  if (!rows[0]) return res.status(404).json({ error: 'NOT_FOUND' });
  await audit(req.session.adminName, 'coupon_update', 'coupon', id, req.body);
  res.json({ ok: true, coupon: rows[0] });
});

app.delete('/api/admin/coupons/:id', async (req, res) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM coupons WHERE id=$1', [id]);
  await audit(req.session.adminName, 'coupon_delete', 'coupon', id, {});
  res.json({ ok: true });
});

app.post('/api/admin/notifications/broadcast', async (req, res) => {
  const title = clean(req.body.title, 120);
  const body = clean(req.body.body, 1000);
  const audience = req.body.audience === 'single' ? 'single' : 'all';
  const userId = req.body.userId ? Number(req.body.userId) : null;

  if (!title || !body) return res.status(400).json({ error: 'VALIDATION', message: 'Title and message required.' });

  let count = 0;
  if (audience === 'all') {
    const r = await pool.query(
      `INSERT INTO notifications (user_id,title,body,type)
       SELECT id,$1,$2,'announcement' FROM users WHERE status='active'`, [title, body]);
    count = r.rowCount;
  } else if (userId) {
    await notify(null, userId, title, body, 'announcement');
    count = 1;
  }
  await audit(req.session.adminName, 'notification_broadcast', 'notification', null, { audience, count, title });
  res.json({ ok: true, sent: count });
});

app.get('/api/admin/transactions', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT t.txn_id, t.type, t.direction, t.amount_paise, t.status, t.description, t.created_at, u.username
    FROM transactions t JOIN users u ON u.id=t.user_id
    ORDER BY t.created_at DESC LIMIT 300`);
  res.json({ transactions: rows });
});

app.post('/api/admin/users/:id/adjust', async (req, res) => {
  const id = Number(req.params.id);
  const amountPaise = Math.round(Number(req.body.amount) * 100);
  const reason = clean(req.body.reason || 'Manual adjustment', 300);
  if (!Number.isFinite(amountPaise) || amountPaise === 0) return res.status(400).json({ error: 'VALIDATION', message: 'Enter a non-zero amount.' });
  try {
    await tx(async (c) => {
      if (amountPaise > 0) {
        await credit(c, id, amountPaise, 'manual_adjustment', reason, { by: req.session.adminName });
        await notify(c, id, 'Balance credited', `₹${(amountPaise / 100).toFixed(2)} credited. ${reason}`, 'security');
      } else {
        const d = await debit(c, id, Math.abs(amountPaise), 'manual_adjustment', reason, { by: req.session.adminName });
        if (!d) throw Object.assign(new Error('Insufficient balance.'), { status: 400 });
        await notify(c, id, 'Balance adjusted', `₹${(Math.abs(amountPaise) / 100).toFixed(2)} deducted. ${reason}`, 'security');
      }
    });
    await audit(req.session.adminName, 'balance_adjust', 'user', id, { amountPaise, reason });
    res.json({ ok: true });
  } catch (e) {
    res.status(e.status || 500).json({ error: 'SERVER', message: e.status ? e.message : 'Adjustment failed.' });
  }
});

app.get('/api/admin/audit', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT id, admin_username, action, target_type, target_id, detail, created_at
     FROM audit_logs ORDER BY created_at DESC LIMIT 300`);
  res.json({ logs: rows });
});

/* ---- Fallback ---- */
app.use('/api', (req, res) => res.status(404).json({ error: 'NOT_FOUND' }));
app.use((err, req, res, next) => {
  console.error('[error]', err.message);
  res.status(500).json({ error: 'SERVER', message: 'Something went wrong.' });
});

/* ========================================================================== */
/*  BOOTSTRAP                                                                  */
/* ========================================================================== */
async function bootstrap() {
  const { rows } = await pool.query(
    'SELECT id FROM admin_users WHERE LOWER(username)=LOWER($1)', [ADMIN_USERNAME]);
  if (!rows.length) {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await pool.query('INSERT INTO admin_users (username,password_hash) VALUES ($1,$2)', [ADMIN_USERNAME, hash]);
    console.log(`[admin] bootstrap admin "${ADMIN_USERNAME}" created.`);
    console.warn('[admin] CHANGE ADMIN_PASSWORD IN ENVIRONMENT BEFORE PRODUCTION.');
  }
}

(async () => {
  if (!process.env.DATABASE_URL) {
    console.error('[fatal] DATABASE_URL not set.');
    process.exit(1);
  }
  try {
    await bootstrap();
  } catch (e) {
    console.error('[bootstrap]', e.message);
    process.exit(1);
  }
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`XYVEN Referral listening on 0.0.0.0:${PORT}`);
  });
})();
