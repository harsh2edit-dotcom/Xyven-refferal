'use strict';

/* ==========================================================================
   i18n — English / Hindi / Hinglish ONLY
   ========================================================================== */
const I18N = {
  en: {
    tagline: 'Earn by inviting genuine new members.',
    signIn: 'Sign In', signUp: 'Sign Up', username: 'Username or Email', password: 'Password',
    fullName: 'Full Name', email: 'Gmail / Email', refCode: 'Referral Code (optional)',
    createAccount: 'Create Account', passHint: 'Min 8 chars, with uppercase, lowercase and number.',
    noAccount: 'New here? Create an account.',
    dashboard: 'Dashboard', totalReferrals: 'Total Referrals', validReferrals: 'Valid Referrals',
    totalEarnings: 'Total Earnings', availableBalance: 'Available Balance',
    totalWithdrawn: 'Total Withdrawn', pendingWithdrawal: 'Pending Withdrawal',
    totalDeposited: 'Total Deposited', minReferrals: 'Minimum Referrals',
    minWithdrawal: 'Minimum Withdrawal', requiredDeposit: 'Required Deposit',
    amount: 'Amount (₹)', upiId: 'UPI ID', requestWithdrawal: 'Request Withdrawal',
    wdLocked: 'Complete all requirements to unlock withdrawals.',
    couponRedeem: 'Redeem Coupon', couponCode: 'Coupon Code', redeem: 'Redeem',
    withdrawalHistory: 'Withdrawal History', withdrawalSection: 'Withdrawal',
    refer: 'Refer', yourCode: 'Your referral code', copyCode: 'Copy Code', share: 'Share',
    copyLink: 'Copy Link', referralEarnings: 'Referral Earnings',
    referExplainer: 'Invite a new user with your referral code. After the referral becomes valid, you receive ₹20 and the new user receives ₹10.',
    referralHistory: 'Referral History',
    deposit: 'Deposit', depositRequirement: 'Deposit Requirement',
    depositExplainer: 'A verified deposit of ₹50 is required before you can request a withdrawal. This protects the platform against fake accounts. Only verified payments count.',
    submitDeposit: 'Submit Deposit', method: 'Method', refId: 'Payment Reference ID',
    note: 'Note (optional)', submit: 'Submit',
    depositNote: 'Deposits are verified manually by the administrator against the payment reference. Your requirement only completes after verification.',
    depositHistory: 'Deposit History',
    profile: 'Profile', referralCode: 'Referral Code', joined: 'Account Created',
    support: 'Need Help?', about: 'About',
    aboutText: 'XYVEN Referral is a referral-based rewards platform designed to help users earn rewards by inviting genuine new members. Rewards, withdrawals and account activity are subject to platform rules and verification.',
    logout: 'Logout', notifications: 'Notifications', markAllRead: 'Mark all read',
    home: 'Home', accountCreated: 'Account created', welcome: 'Welcome back',
  },
  hi: {
    tagline: 'असली नए सदस्यों को आमंत्रित करके कमाएं।',
    signIn: 'साइन इन', signUp: 'साइन अप', username: 'यूज़रनेम या ईमेल', password: 'पासवर्ड',
    fullName: 'पूरा नाम', email: 'जीमेल / ईमेल', refCode: 'रेफ़रल कोड (वैकल्पिक)',
    createAccount: 'खाता बनाएं', passHint: 'कम से कम 8 अक्षर, एक बड़ा अक्षर, एक छोटा अक्षर और एक अंक।',
    noAccount: 'नए हैं? खाता बनाएं।',
    dashboard: 'डैशबोर्ड', totalReferrals: 'कुल रेफ़रल', validReferrals: 'वैध रेफ़रल',
    totalEarnings: 'कुल कमाई', availableBalance: 'उपलब्ध शेष',
    totalWithdrawn: 'कुल निकाला गया', pendingWithdrawal: 'लंबित निकासी',
    totalDeposited: 'कुल जमा', minReferrals: 'न्यूनतम रेफ़रल',
    minWithdrawal: 'न्यूनतम निकासी', requiredDeposit: 'आवश्यक जमा',
    amount: 'राशि (₹)', upiId: 'UPI आईडी', requestWithdrawal: 'निकासी का अनुरोध करें',
    wdLocked: 'निकासी अनलॉक करने के लिए सभी शर्तें पूरी करें।',
    couponRedeem: 'कूपन रिडीम करें', couponCode: 'कूपन कोड', redeem: 'रिडीम',
    withdrawalHistory: 'निकासी इतिहास', withdrawalSection: 'निकासी',
    refer: 'रेफ़र करें', yourCode: 'आपका रेफ़रल कोड', copyCode: 'कोड कॉपी करें', share: 'शेयर',
    copyLink: 'लिंक कॉपी करें', referralEarnings: 'रेफ़रल कमाई',
    referExplainer: 'अपने रेफ़रल कोड से नए उपयोगकर्ता को आमंत्रित करें। रेफ़रल वैध होने पर आपको ₹20 और नए उपयोगकर्ता को ₹10 मिलते हैं।',
    referralHistory: 'रेफ़रल इतिहास',
    deposit: 'जमा', depositRequirement: 'जमा आवश्यकता',
    depositExplainer: 'निकासी से पहले ₹50 का सत्यापित जमा आवश्यक है। यह प्लेटफ़ॉर्म को फ़र्ज़ी खातों से बचाता है। केवल सत्यापित भुगतान मान्य हैं।',
    submitDeposit: 'जमा सबमिट करें', method: 'माध्यम', refId: 'भुगतान संदर्भ आईडी',
    note: 'नोट (वैकल्पिक)', submit: 'सबमिट करें',
    depositNote: 'जमा को व्यवस्थापक द्वारा भुगतान संदर्भ के आधार पर सत्यापित किया जाता है। सत्यापन के बाद ही शर्त पूरी होती है।',
    depositHistory: 'जमा इतिहास',
    profile: 'प्रोफ़ाइल', referralCode: 'रेफ़रल कोड', joined: 'खाता बनाया',
    support: 'सहायता चाहिए?', about: 'परिचय',
    aboutText: 'XYVEN Referral एक रेफ़रल-आधारित रिवॉर्ड्स प्लेटफ़ॉर्म है जो असली नए सदस्यों को आमंत्रित करके कमाने में मदद करता है।',
    logout: 'लॉग आउट', notifications: 'सूचनाएं', markAllRead: 'सभी पढ़ी हुई चिह्नित करें',
    home: 'होम', accountCreated: 'खाता बन गया', welcome: 'वापसी पर स्वागत है',
  },
  hg: {
    tagline: 'Genuine naye members ko invite karke kamao.',
    signIn: 'Sign In', signUp: 'Sign Up', username: 'Username ya Email', password: 'Password',
    fullName: 'Poora Naam', email: 'Gmail / Email', refCode: 'Referral Code (optional)',
    createAccount: 'Account Banao', passHint: 'Kam se kam 8 character, ek uppercase, ek lowercase aur ek number.',
    noAccount: 'Naye ho? Account banao.',
    dashboard: 'Dashboard', totalReferrals: 'Total Referrals', validReferrals: 'Valid Referrals',
    totalEarnings: 'Total Earnings', availableBalance: 'Available Balance',
    totalWithdrawn: 'Total Withdrawn', pendingWithdrawal: 'Pending Withdrawal',
    totalDeposited: 'Total Deposited', minReferrals: 'Minimum Referrals',
    minWithdrawal: 'Minimum Withdrawal', requiredDeposit: 'Required Deposit',
    amount: 'Amount (₹)', upiId: 'UPI ID', requestWithdrawal: 'Withdrawal Request Karo',
    wdLocked: 'Withdrawal unlock karne ke liye saari requirements poori karo.',
    couponRedeem: 'Coupon Redeem Karo', couponCode: 'Coupon Code', redeem: 'Redeem',
    withdrawalHistory: 'Withdrawal History', withdrawalSection: 'Withdrawal',
    refer: 'Refer', yourCode: 'Tumhara referral code', copyCode: 'Code Copy Karo', share: 'Share',
    copyLink: 'Link Copy Karo', referralEarnings: 'Referral Earnings',
    referExplainer: 'Apne referral code se naya user invite karo. Referral valid hone par tumhe ₹20 aur naye user ko ₹10 milte hain.',
    referralHistory: 'Referral History',
    deposit: 'Deposit', depositRequirement: 'Deposit Requirement',
    depositExplainer: 'Withdrawal se pehle ₹50 ka verified deposit zaroori hai. Ye platform ko fake accounts se bachata hai.',
    submitDeposit: 'Deposit Submit Karo', method: 'Method', refId: 'Payment Reference ID',
    note: 'Note (optional)', submit: 'Submit Karo',
    depositNote: 'Deposit admin dwara reference ke against verify hoti hai.',
    depositHistory: 'Deposit History',
    profile: 'Profile', referralCode: 'Referral Code', joined: 'Account Created',
    support: 'Help Chahiye?', about: 'About',
    aboutText: 'XYVEN Referral ek referral-based rewards platform hai jo genuine naye members ko invite karke earn karne me help karta hai.',
    logout: 'Logout', notifications: 'Notifications', markAllRead: 'Sab read mark karo',
    home: 'Home', accountCreated: 'Account ban gaya', welcome: 'Wapas aane par swagat',
  },
};

const getLang = () => localStorage.getItem('xyven_lang') || 'en';
const setLang = (l) => { localStorage.setItem('xyven_lang', l); };
const t = (key) => (I18N[getLang()] && I18N[getLang()][key]) || I18N.en[key] || key;

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.documentElement.lang = getLang() === 'hi' ? 'hi' : 'en';
}

/* ==========================================================================
   Lucide icons — safe, retry-aware
   ========================================================================== */
function applyLucide() {
  try {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  } catch (_) {}
}

/* ==========================================================================
   Toast
   ========================================================================== */
function toast(msg, type = 'info', ms = 4000) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const icons = { success: 'check-circle', error: 'alert-circle', warn: 'alert-triangle', info: 'info' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i data-lucide="${icons[type] || 'info'}"></i><span></span>`;
  el.querySelector('span').textContent = msg;
  c.appendChild(el);
  applyLucide();
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, ms);
}

/* ==========================================================================
   Fetch wrapper (CSRF + JSON)
   ========================================================================== */
async function api(path, options = {}) {
  const opts = {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  };
  let csrf = null;
  try { csrf = sessionStorage.getItem('xyven_csrf'); } catch (_) {}
  if (csrf && opts.method && opts.method !== 'GET') opts.headers['x-csrf-token'] = csrf;

  let res;
  try { res = await fetch(path, opts); }
  catch (e) { throw new Error('Network error. Check your connection.'); }

  let data = null;
  try { data = await res.json(); } catch (_) {}

  // Persist any new CSRF token sent by server
  if (data && data.csrf) {
    try { sessionStorage.setItem('xyven_csrf', data.csrf); } catch (_) {}
  }

  if (!res.ok) {
    const err = new Error(data?.message || `Request failed (${res.status})`);
    err.status = res.status; err.code = data?.error;
    throw err;
  }
  return data;
}

/* ==========================================================================
   Device signal
   ========================================================================== */
function deviceSignal() {
  try {
    let sig = localStorage.getItem('xyven_ds');
    if (!sig) {
      sig = btoa([navigator.userAgent, screen.width + 'x' + screen.height, navigator.language,
        (Intl.DateTimeFormat().resolvedOptions().timeZone || '')].join('|'));
      localStorage.setItem('xyven_ds', sig);
    }
    return sig;
  } catch (_) { return ''; }
}

/* ==========================================================================
   Animated counters
   ========================================================================== */
function animateCounter(el, to, isMoney = false, decimals = 0) {
  if (!el) return;
  const from = Number(el.dataset.v || 0);
  el.dataset.v = to;
  const reduce = (typeof matchMedia === 'function') && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.textContent = fmt(to, isMoney, decimals); return; }
  const start = performance.now(), dur = 900;
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(from + (to - from) * eased, isMoney, decimals);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function fmt(n, isMoney, decimals) {
  const v = Number(n) || 0;
  if (isMoney) return '₹' + (v / 100).toFixed(2);
  return decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString();
}

/* ==========================================================================
   Background canvas
   ========================================================================== */
function startCanvas() {
  const c = document.getElementById('grid-canvas');
  if (!c) return;
  if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = c.getContext('2d');
  if (!ctx) return;
  let w, h, dots = [];
  function resize() {
    w = c.width = innerWidth; h = c.height = innerHeight;
    dots = Array.from({ length: Math.min(60, Math.floor(w / 25)) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.3 + .3,
    }));
  }
  resize(); addEventListener('resize', resize);
  (function loop() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(140,180,255,.35)';
    ctx.strokeStyle = 'rgba(91,140,255,.06)';
    const gs = 70;
    for (let x = 0; x < w; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(loop);
  })();
}

/* ==========================================================================
   Helpers
   ========================================================================== */
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const fmtMoney = (p) => '₹' + (Number(p) / 100).toFixed(2);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const fmtDateTime = (d) => d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
const statusCls = (s) => 'status status-' + String(s || '').toLowerCase();
const emptyState = (msg, icon = 'inbox') =>
  `<div class="empty"><i data-lucide="${icon}"></i>${esc(msg)}</div>`;

function promptConfirm(title, message, confirmText = 'Confirm', danger = false) {
  return new Promise((resolve) => {
    const root = document.getElementById('modal-root');
    if (!root) return resolve(false);
    root.innerHTML = `
      <div class="modal-bg" id="modal-bg">
        <div class="glass modal">
          <h3>${esc(title)}</h3>
          <p class="muted small">${esc(message)}</p>
          <div class="modal-actions">
            <button class="btn btn-ghost btn-sm" id="modal-cancel">Cancel</button>
            <button class="btn ${danger ? 'btn-danger' : ''} btn-sm" id="modal-confirm">${esc(confirmText)}</button>
          </div>
        </div>
      </div>`;
    applyLucide();
    const done = (v) => { root.innerHTML = ''; resolve(v); };
    document.getElementById('modal-cancel').onclick = () => done(false);
    document.getElementById('modal-bg').onclick = (e) => { if (e.target.id === 'modal-bg') done(false); };
    document.getElementById('modal-confirm').onclick = () => done(true);
  });
}

/* ==========================================================================
   Language selector
   ========================================================================== */
function initLang() {
  const sel = document.getElementById('lang');
  if (!sel) return;
  sel.value = getLang();
  sel.addEventListener('change', () => {
    setLang(sel.value);
    applyI18n();
    if (window.__refresh) window.__refresh();
  });
}

/* ==========================================================================
   LOGIN / SIGNUP PAGE
   ========================================================================== */
function initAuthPage() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  if (!loginForm || !signupForm) return;

  const params = new URLSearchParams(location.search);
  const ref = params.get('ref');
  if (ref) {
    const sTab = document.querySelector('[data-tab="signup"]');
    if (sTab) sTab.click();
    const input = signupForm.querySelector('[name="referralCode"]');
    if (input) input.value = ref.toUpperCase();
  }

  document.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
      const target = document.getElementById(btn.dataset.tab + '-form');
      if (target) target.classList.add('active');
    });
  });

  document.querySelectorAll('[data-toggle="password"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const inp = btn.parentElement.querySelector('input');
      if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
    });
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(loginForm);
    const btn = loginForm.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    try {
      const res = await api('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username: fd.get('username'), password: fd.get('password') }),
      });
      if (res.csrf) sessionStorage.setItem('xyven_csrf', res.csrf);
      toast('Signed in. Redirecting...', 'success');
      setTimeout(() => location.href = '/app', 400);
    } catch (err) {
      toast(err.message || 'Login failed.', 'error');
      if (btn) btn.disabled = false;
    }
  });

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(signupForm);
    const btn = signupForm.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    try {
      const res = await api('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          name: fd.get('name'),
          username: fd.get('username'),
          email: fd.get('email'),
          password: fd.get('password'),
          referralCode: String(fd.get('referralCode') || '').trim().toUpperCase(),
          deviceSignal: deviceSignal(),
        }),
      });
      if (res.csrf) sessionStorage.setItem('xyven_csrf', res.csrf);
      toast('Account created. Redirecting...', 'success');
      setTimeout(() => location.href = '/app', 500);
    } catch (err) {
      toast(err.message || 'Signup failed.', 'error');
      if (btn) btn.disabled = false;
    }
  });

  // Bootstrap CSRF
  api('/api/me').then((d) => {
    if (d.csrf) sessionStorage.setItem('xyven_csrf', d.csrf);
  }).catch(() => {});
}

/* ==========================================================================
   APP (Dashboard SPA)
   ========================================================================== */
function initAppPage() {
  if (!document.getElementById('view-home')) return;

  let state = { user: null, referrals: null, unread: 0 };

  document.querySelectorAll('.nav-item').forEach((b) => {
    b.addEventListener('click', () => showView(b.dataset.view));
  });
  const bell = document.getElementById('bell');
  if (bell) bell.addEventListener('click', () => showView('notifications'));

  function showView(v) {
    document.querySelectorAll('.view').forEach((s) => s.classList.toggle('active', s.id === 'view-' + v));
    document.querySelectorAll('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.view === v));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (v === 'refer') loadRefer();
    if (v === 'deposit') loadDeposits();
    if (v === 'profile') loadProfile();
    if (v === 'notifications') loadNotifications();
  }

  const logout = async () => {
    try { await api('/api/logout', { method: 'POST' }); } catch (_) {}
    try { sessionStorage.removeItem('xyven_csrf'); } catch (_) {}
    location.href = '/login';
  };
  const lo1 = document.getElementById('logout-btn');
  const lo2 = document.getElementById('logout-btn-2');
  if (lo1) lo1.addEventListener('click', logout);
  if (lo2) lo2.addEventListener('click', logout);

  async function loadSummary() {
    const d = await api('/api/me/summary');
    const cards = {
      totalReferrals: [d.totalReferrals, false],
      validReferrals: [d.validReferrals, false],
      totalEarnings: [d.totalEarnings, true],
      balance: [d.balance, true],
      totalWithdrawn: [d.totalWithdrawn, true],
      pendingWithdrawal: [d.pendingWithdrawal, true],
      totalDeposited: [d.depositTotal, true],
    };
    for (const [k, [val, money]] of Object.entries(cards)) {
      const card = document.querySelector(`[data-key="${k}"]`);
      if (!card) continue;
      card.classList.remove('skeleton');
      animateCounter(card.querySelector('[data-counter]'), val, money);
    }
    const pill = document.getElementById('balance-pill');
    if (pill) pill.textContent = fmtMoney(d.balance);

    const sub = document.getElementById('wd-submit');
    const hint = document.getElementById('wd-hint');
    if (sub) sub.disabled = !d.checks.canWithdraw;
    if (hint) {
      if (d.checks.canWithdraw) {
        hint.textContent = 'All requirements met. You can request a withdrawal.';
        hint.style.color = 'var(--accent)';
      } else {
        const missing = [];
        if (!d.checks.hasReferrals) missing.push(`${d.checks.minReferrals} valid referrals`);
        if (!d.checks.hasDeposit) missing.push(`₹${d.checks.requiredDeposit / 100} verified deposit`);
        if (!d.checks.hasBalance) missing.push(`₹${d.checks.minWithdrawal / 100} available balance`);
        hint.textContent = 'Requirements not met: ' + missing.join(', ') + '.';
        hint.style.color = '';
      }
    }
  }

  async function loadProfile() {
    const d = await api('/api/me');
    if (!d.user) return;
    state.user = d.user;
    const av = document.getElementById('avatar'); if (av) av.textContent = (d.user.name || '?').charAt(0).toUpperCase();
    const nm = document.getElementById('pf-name'); if (nm) nm.textContent = d.user.name;
    const un = document.getElementById('pf-username'); if (un) un.textContent = '@' + d.user.username;
    const em = document.getElementById('pf-email'); if (em) em.textContent = d.user.email;
    const cd = document.getElementById('pf-code'); if (cd) cd.textContent = d.user.referralCode;
    const jn = document.getElementById('pf-joined'); if (jn) jn.textContent = fmtDate(d.user.createdAt);
  }

  async function loadRefer() {
    const d = await api('/api/me/referrals');
    state.referrals = d;
    const rc = document.getElementById('ref-code'); if (rc) rc.textContent = d.referralCode;
    const rl = document.getElementById('ref-link'); if (rl) rl.value = d.referralLink;
    animateCounter(document.getElementById('ref-total'), d.total, false);
    animateCounter(document.getElementById('ref-valid'), d.valid, false);
    animateCounter(document.getElementById('ref-earn'), d.earnings, true);

    const wrap = document.getElementById('ref-history');
    if (!wrap) return;
    if (!d.history.length) {
      wrap.innerHTML = emptyState('No referrals yet. Share your code to get started.', 'users');
    } else {
      wrap.innerHTML = `<table><thead><tr><th>User</th><th>Status</th><th>Joined</th></tr></thead><tbody>` +
        d.history.map((r) => `<tr><td>@${esc(r.username)}</td><td><span class="${statusCls(r.status)}">${esc(r.status)}</span></td><td class="mono-cell">${fmtDate(r.created_at)}</td></tr>`).join('') +
        `</tbody></table>`;
    }
    applyLucide();
  }

  const cc = document.getElementById('copy-code');
  if (cc) cc.addEventListener('click', () => {
    const code = document.getElementById('ref-code').textContent;
    navigator.clipboard.writeText(code).then(() => toast('Referral code copied.', 'success'));
  });
  const cl = document.getElementById('copy-link');
  if (cl) cl.addEventListener('click', () => {
    const link = document.getElementById('ref-link').value;
    navigator.clipboard.writeText(link).then(() => toast('Referral link copied.', 'success'));
  });
  const sh = document.getElementById('share-btn');
  if (sh) sh.addEventListener('click', async () => {
    const data = state.referrals;
    if (!data) return;
    if (navigator.share) {
      try { await navigator.share({ title: 'XYVEN Referral', text: data.shareText }); } catch (_) {}
    } else {
      try { await navigator.clipboard.writeText(data.shareText); toast('Share text copied.', 'success'); } catch (_) {}
    }
  });

  async function loadDeposits() {
    const d = await api('/api/deposits');
    const req = document.getElementById('dep-required'); if (req) req.textContent = '₹' + (d.required / 100);
    const wrap = document.getElementById('dep-history');
    if (!wrap) return;
    if (!d.deposits.length) wrap.innerHTML = emptyState('No deposit requests yet.', 'receipt');
    else {
      wrap.innerHTML = `<table><thead><tr><th>Request ID</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>` +
        d.deposits.map((r) => `<tr><td class="mono-cell">${esc(r.request_id)}</td><td>${fmtMoney(r.amount_paise)}</td><td><span class="${statusCls(r.status)}">${esc(r.status)}</span></td><td class="mono-cell">${fmtDate(r.created_at)}</td></tr>`).join('') +
        `</tbody></table>`;
    }
    applyLucide();
  }

  const depForm = document.getElementById('dep-form');
  if (depForm) depForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const btn = e.target.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    try {
      await api('/api/deposits', {
        method: 'POST',
        body: JSON.stringify({
          amount: Number(fd.get('amount')),
          method: fd.get('method'),
          referenceId: fd.get('referenceId'),
          note: fd.get('note'),
        }),
      });
      toast('Deposit request submitted. Awaiting verification.', 'success');
      e.target.reset();
      loadDeposits();
    } catch (err) { toast(err.message, 'error'); }
    finally { if (btn) btn.disabled = false; }
  });

  async function loadWithdrawals() {
    const d = await api('/api/withdrawals');
    const wrap = document.getElementById('wd-history');
    if (!wrap) return;
    if (!d.history.length) wrap.innerHTML = emptyState('No withdrawals yet.', 'banknote');
    else {
      wrap.innerHTML = `<table><thead><tr><th>Request ID</th><th>Amount</th><th>UPI ID</th><th>Status</th><th>Date</th></tr></thead><tbody>` +
        d.history.map((r) => `<tr><td class="mono-cell">${esc(r.request_id)}</td><td>${fmtMoney(r.amount_paise)}</td><td class="mono-cell">${esc(r.upi_id)}</td><td><span class="${statusCls(r.status)}">${esc(r.status)}</span></td><td class="mono-cell">${fmtDate(r.created_at)}</td></tr>`).join('') +
        `</tbody></table>`;
    }
    applyLucide();
  }

  const wdForm = document.getElementById('wd-form');
  if (wdForm) wdForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const btn = document.getElementById('wd-submit');
    if (btn) btn.disabled = true;
    try {
      const r = await api('/api/withdrawals', {
        method: 'POST',
        body: JSON.stringify({ amount: Number(fd.get('amount')), upiId: fd.get('upiId') }),
      });
      toast(`Withdrawal request ${r.withdrawal.request_id} submitted.`, 'success');
      e.target.reset();
      loadWithdrawals(); loadSummary();
    } catch (err) { toast(err.message, 'error'); if (btn) btn.disabled = false; }
  });

  const cf = document.getElementById('coupon-form');
  if (cf) cf.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      const r = await api('/api/coupons/redeem', { method: 'POST', body: JSON.stringify({ code: fd.get('code') }) });
      toast(`Coupon redeemed. ₹${(r.amount / 100).toFixed(2)} credited.`, 'success');
      e.target.reset();
      loadSummary();
    } catch (err) { toast(err.message, 'error'); }
  });

  async function loadNotifications() {
    const d = await api('/api/notifications');
    state.unread = d.unread;
    updateBadge(d.unread);
    const wrap = document.getElementById('notif-list');
    if (!wrap) return;
    if (!d.notifications.length) {
      wrap.innerHTML = emptyState('No notifications yet.', 'bell-off');
    } else {
      wrap.innerHTML = d.notifications.map((n) => `
        <div class="glass notif-card ${n.is_read ? '' : 'unread'}" data-id="${n.id}">
          <div class="notif-icon"><i data-lucide="${notifIcon(n.type)}"></i></div>
          <div class="notif-body">
            <h4>${esc(n.title)}</h4>
            <p>${esc(n.body)}</p>
            <div class="notif-time">${fmtDateTime(n.created_at)}</div>
          </div>
        </div>`).join('');
      document.querySelectorAll('.notif-card').forEach((el) => {
        el.addEventListener('click', async () => {
          if (el.classList.contains('unread')) {
            try {
              await api(`/api/notifications/${el.dataset.id}/read`, { method: 'POST' });
              el.classList.remove('unread');
              state.unread = Math.max(0, state.unread - 1);
              updateBadge(state.unread);
            } catch (_) {}
          }
        });
      });
    }
    applyLucide();
  }

  const ma = document.getElementById('mark-all');
  if (ma) ma.addEventListener('click', async () => {
    try {
      await api('/api/notifications/read-all', { method: 'POST' });
      document.querySelectorAll('.notif-card').forEach((el) => el.classList.remove('unread'));
      state.unread = 0; updateBadge(0);
      toast('All notifications marked as read.', 'success');
    } catch (e) { toast(e.message, 'error'); }
  });

  function notifIcon(type) {
    return ({ reward: 'gift', referral: 'users', withdrawal: 'banknote', deposit: 'arrow-down-circle', security: 'shield-alert', account: 'user-check', announcement: 'megaphone' })[type] || 'bell';
  }
  function updateBadge(count) {
    const b = document.getElementById('bell-count');
    if (!b) return;
    b.textContent = count > 99 ? '99+' : count;
    b.classList.toggle('hidden', count <= 0);
  }
  async function pollUnread() {
    try { const d = await api('/api/notifications/unread'); updateBadge(d.unread); } catch (_) {}
  }

  async function init() {
    try {
      const me = await api('/api/me');
      if (me.csrf) sessionStorage.setItem('xyven_csrf', me.csrf);
      if (!me.authenticated) return location.href = '/login';
      state.user = me.user;
      const pill = document.getElementById('balance-pill');
      if (pill) pill.textContent = fmtMoney(me.user.balance);
      const welcome = document.getElementById('welcome');
      if (welcome) welcome.textContent = t('welcome') + ', ' + me.user.name;
      await loadSummary();
      await loadWithdrawals();
      await pollUnread();
    } catch (err) {
      if (err.status === 401) return location.href = '/login';
      toast(err.message, 'error');
    }
  }

  window.__refresh = () => { applyI18n(); loadSummary().catch(() => {}); };
  setInterval(pollUnread, 30000);
  init();
}

/* ==========================================================================
   ADMIN PANEL
   ========================================================================== */
function initAdminPage() {
  const loginWrap = document.getElementById('admin-login');
  const panel = document.getElementById('admin-panel');
  const loginForm = document.getElementById('admin-login-form');
  if (!loginWrap || !panel || !loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      const r = await api('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username: fd.get('username'), password: fd.get('password') }),
      });
      if (r.csrf) sessionStorage.setItem('xyven_csrf', r.csrf);
      showPanel();
    } catch (err) { toast(err.message, 'error'); }
  });

  const logoutBtn = document.getElementById('admin-logout');
  if (logoutBtn) logoutBtn.addEventListener('click', async () => {
    try { await api('/api/admin/logout', { method: 'POST' }); } catch (_) {}
    try { sessionStorage.removeItem('xyven_csrf'); } catch (_) {}
    location.reload();
  });

  document.querySelectorAll('.side-item').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.side-item').forEach((x) => x.classList.toggle('active', x === b));
      document.querySelectorAll('.admin-tab').forEach((x) => x.classList.toggle('active', x.id === 'tab-' + b.dataset.tab));
      loadTab(b.dataset.tab);
    });
  });

  function loadTab(tab) {
    if (tab === 'overview') loadOverview();
    else if (tab === 'users') loadUsers();
    else if (tab === 'withdrawals') loadWithdrawals();
    else if (tab === 'deposits') loadDeposits();
    else if (tab === 'coupons') loadCoupons();
    else if (tab === 'transactions') loadTxns();
    else if (tab === 'audit') loadAudit();
  }

  async function showPanel() {
    loginWrap.style.display = 'none';
    panel.style.display = 'block';
    try {
      const me = await api('/api/admin/me');
      if (me.csrf) sessionStorage.setItem('xyven_csrf', me.csrf);
      if (!me.authenticated) { loginWrap.style.display = 'grid'; panel.style.display = 'none'; return; }
      loadOverview();
    } catch (_) { loginWrap.style.display = 'grid'; panel.style.display = 'none'; }
  }

  async function loadOverview() {
    const s = await api('/api/admin/stats');
    const cards = [
      ['Total Users', s.total_users, false], ['Active Users', s.active_users, false],
      ['Suspended Users', s.suspended_users, false], ['Total Referrals', s.total_referrals, false],
      ['Valid Referrals', s.valid_referrals, false], ['Total Rewards', s.total_rewards, true],
      ['Total Deposits', s.total_deposits, false], ['Pending Deposits', s.pending_deposits, false],
      ['Deposit Value', s.deposit_value, true], ['Total Withdrawals', s.total_withdrawals, false],
      ['Pending Withdrawals', s.pending_withdrawals, false], ['Completed Withdrawals', s.completed_withdrawals, false],
      ['Rejected Withdrawals', s.rejected_withdrawals, false], ['Withdrawn Value', s.withdrawn_value, true],
    ];
    const el = document.getElementById('admin-stats');
    if (!el) return;
    el.innerHTML = cards.map(([label, v, money]) => `
      <div class="glass stat-card">
        <div class="stat-label">${esc(label)}</div>
        <div class="stat-value">${money ? fmtMoney(v) : Number(v).toLocaleString()}</div>
        <i class="stat-icon" data-lucide="activity"></i>
      </div>`).join('');
    applyLucide();
  }

  async function loadUsers(q = '') {
    const d = await api('/api/admin/users' + (q ? '?q=' + encodeURIComponent(q) : ''));
    const wrap = document.getElementById('admin-users');
    if (!wrap) return;
    if (!d.users.length) { wrap.innerHTML = emptyState('No users found.', 'users'); applyLucide(); return; }
    wrap.innerHTML = `<table><thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Balance</th><th>Refs</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead><tbody>` +
      d.users.map((u) => `
        <tr>
          <td class="mono-cell">${u.id}</td>
          <td>${esc(u.username)}</td>
          <td class="small">${esc(u.email)}</td>
          <td>${fmtMoney(u.balance_paise)}</td>
          <td class="mono-cell">${u.valid_refs || 0}</td>
          <td><span class="${statusCls(u.status)}">${esc(u.status)}</span></td>
          <td class="mono-cell">${fmtDate(u.created_at)}</td>
          <td>
            <button class="btn btn-sm btn-ghost" data-view-user="${u.id}">View</button>
            ${u.status === 'active'
              ? `<button class="btn btn-sm btn-warn" data-suspend="${u.id}">Suspend</button>`
              : `<button class="btn btn-sm btn-success" data-unsuspend="${u.id}">Unsuspend</button>`}
          </td>
        </tr>`).join('') + `</tbody></table>`;

    wrap.querySelectorAll('[data-view-user]').forEach((b) => b.onclick = () => viewUser(Number(b.dataset.viewUser)));
    wrap.querySelectorAll('[data-suspend]').forEach((b) => b.onclick = () => suspendUser(Number(b.dataset.suspend)));
    wrap.querySelectorAll('[data-unsuspend]').forEach((b) => b.onclick = () => unsuspendUser(Number(b.dataset.unsuspend)));
  }

  async function viewUser(id) {
    const d = await api(`/api/admin/users/${id}`);
    const u = d.user;
    const root = document.getElementById('modal-root');
    if (!root) return;
    root.innerHTML = `
      <div class="modal-bg" id="modal-bg">
        <div class="glass modal">
          <h3>${esc(u.name)} <span class="muted mono small">#${u.id}</span></h3>
          <p class="muted small">@${esc(u.username)} · ${esc(u.email)} · ${fmtMoney(u.balance_paise)}</p>
          <p class="muted small mt-14">Referral Code: <b class="mono">${esc(u.referral_code)}</b></p>
          <p class="muted small">Deposit: ${u.deposit_verified ? 'Verified' : 'Not verified'}</p>
          <h4 style="margin-top:16px">Recent Transactions</h4>
          <div class="table-wrap mt-14">
            <table><thead><tr><th>Txn</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead><tbody>
              ${d.transactions.slice(0, 8).map((t) => `<tr><td class="mono-cell">${esc(t.txn_id)}</td><td>${esc(t.type)}</td><td>${t.direction === 'credit' ? '+' : '-'}${fmtMoney(t.amount_paise)}</td><td><span class="${statusCls(t.status)}">${esc(t.status)}</span></td></tr>`).join('')}
            </tbody></table>
          </div>
          <h4 style="margin-top:16px">Adjust Balance</h4>
          <div class="field mt-14"><input class="input" id="adj-amount" type="number" placeholder="e.g. 50 or -20" step="1"></div>
          <div class="field"><input class="input" id="adj-reason" placeholder="Reason"></div>
          <button class="btn btn-sm" id="adj-btn">Apply Adjustment</button>
          <div class="modal-actions"><button class="btn btn-ghost btn-sm" id="modal-cancel">Close</button></div>
        </div>
      </div>`;
    applyLucide();
    document.getElementById('modal-cancel').onclick = () => root.innerHTML = '';
    document.getElementById('modal-bg').onclick = (e) => { if (e.target.id === 'modal-bg') root.innerHTML = ''; };
    document.getElementById('adj-btn').onclick = async () => {
      const amount = Number(document.getElementById('adj-amount').value);
      const reason = document.getElementById('adj-reason').value || 'Manual adjustment';
      if (!amount) return toast('Enter a non-zero amount.', 'error');
      try {
        await api(`/api/admin/users/${id}/adjust`, { method: 'POST', body: JSON.stringify({ amount, reason }) });
        toast('Balance adjusted.', 'success');
        root.innerHTML = ''; loadUsers();
      } catch (err) { toast(err.message, 'error'); }
    };
  }

  async function suspendUser(id) {
    const ok = await promptConfirm('Suspend account?', 'The user will be logged out and blocked.', 'Suspend', true);
    if (!ok) return;
    try { await api(`/api/admin/users/${id}/suspend`, { method: 'POST', body: JSON.stringify({}) }); toast('User suspended.', 'success'); loadUsers(); }
    catch (e) { toast(e.message, 'error'); }
  }
  async function unsuspendUser(id) {
    try { await api(`/api/admin/users/${id}/unsuspend`, { method: 'POST', body: JSON.stringify({}) }); toast('User restored.', 'success'); loadUsers(); }
    catch (e) { toast(e.message, 'error'); }
  }

  const us = document.getElementById('user-search');
  if (us) us.addEventListener('input', (e) => {
    clearTimeout(window.__searchT);
    window.__searchT = setTimeout(() => loadUsers(e.target.value.trim()), 300);
  });

  async function loadWithdrawals() {
    const d = await api('/api/admin/withdrawals');
    const wrap = document.getElementById('admin-wds');
    if (!wrap) return;
    if (!d.withdrawals.length) { wrap.innerHTML = emptyState('No withdrawal requests.', 'banknote'); applyLucide(); return; }
    wrap.innerHTML = `<table><thead><tr><th>Request ID</th><th>User</th><th>Amount</th><th>UPI ID</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>` +
      d.withdrawals.map((w) => `
        <tr>
          <td class="mono-cell">${esc(w.request_id)}</td>
          <td>@${esc(w.username)}</td>
          <td>${fmtMoney(w.amount_paise)}</td>
          <td class="mono-cell">${esc(w.upi_id)}</td>
          <td><span class="${statusCls(w.status)}">${esc(w.status)}</span></td>
          <td class="mono-cell">${fmtDate(w.created_at)}</td>
          <td>
            ${w.status === 'pending' ? `<button class="btn btn-sm btn-success" data-act="approve" data-rid="${esc(w.request_id)}">Approve</button><button class="btn btn-sm btn-danger" data-act="reject" data-rid="${esc(w.request_id)}">Reject</button>` : ''}
            ${(w.status === 'pending' || w.status === 'approved') ? `<button class="btn btn-sm" data-act="complete" data-rid="${esc(w.request_id)}">Complete</button>` : ''}
          </td>
        </tr>`).join('') + `</tbody></table>`;

    wrap.querySelectorAll('[data-act]').forEach((b) => b.onclick = async () => {
      const act = b.dataset.act, rid = b.dataset.rid;
      const labels = { approve: 'approve', reject: 'reject', complete: 'mark completed' };
      const ok = await promptConfirm(`Confirm ${labels[act]}`, `Request ${rid}?`, 'Confirm', act === 'reject');
      if (!ok) return;
      let note = '';
      if (act === 'reject') { try { note = prompt('Optional reason:', '') || ''; } catch (_) { note = ''; } }
      try {
        await api(`/api/admin/withdrawals/${rid}/${act}`, { method: 'POST', body: JSON.stringify({ note }) });
        toast(`Withdrawal ${act}d.`, 'success'); loadWithdrawals();
      } catch (e) { toast(e.message, 'error'); }
    });
  }

  async function loadDeposits() {
    const d = await api('/api/admin/deposits');
    const wrap = document.getElementById('admin-deps');
    if (!wrap) return;
    if (!d.deposits.length) { wrap.innerHTML = emptyState('No deposit requests.', 'receipt'); applyLucide(); return; }
    wrap.innerHTML = `<table><thead><tr><th>Request ID</th><th>User</th><th>Amount</th><th>Reference</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>` +
      d.deposits.map((r) => `
        <tr>
          <td class="mono-cell">${esc(r.request_id)}</td>
          <td>@${esc(r.username)}</td>
          <td>${fmtMoney(r.amount_paise)}</td>
          <td class="mono-cell">${esc(r.reference_id)}</td>
          <td><span class="${statusCls(r.status)}">${esc(r.status)}</span></td>
          <td class="mono-cell">${fmtDate(r.created_at)}</td>
          <td>${r.status === 'pending' ? `<button class="btn btn-sm btn-success" data-act="verify" data-rid="${esc(r.request_id)}">Verify</button><button class="btn btn-sm btn-danger" data-act="reject" data-rid="${esc(r.request_id)}">Reject</button>` : ''}</td>
        </tr>`).join('') + `</tbody></table>`;

    wrap.querySelectorAll('[data-act]').forEach((b) => b.onclick = async () => {
      const act = b.dataset.act, rid = b.dataset.rid;
      const ok = await promptConfirm(`Confirm ${act} deposit`, `Request ${rid}? Only after confirming payment.`, act === 'verify' ? 'Verify' : 'Reject', act === 'reject');
      if (!ok) return;
      let note = '';
      if (act === 'reject') { try { note = prompt('Optional reason:', '') || ''; } catch (_) { note = ''; } }
      try {
        await api(`/api/admin/deposits/${rid}/${act}`, { method: 'POST', body: JSON.stringify({ note }) });
        toast(`Deposit ${act}ed.`, 'success'); loadDeposits();
      } catch (e) { toast(e.message, 'error'); }
    });
  }

  async function loadCoupons() {
    const d = await api('/api/admin/coupons');
    const wrap = document.getElementById('admin-coupons');
    if (!wrap) return;
    if (!d.coupons.length) { wrap.innerHTML = emptyState('No coupons yet.', 'ticket'); applyLucide(); return; }
    wrap.innerHTML = `<table><thead><tr><th>Code</th><th>Reward</th><th>Uses</th><th>Per User</th><th>Expires</th><th>Status</th><th>Actions</th></tr></thead><tbody>` +
      d.coupons.map((c) => `
        <tr>
          <td class="mono-cell">${esc(c.code)}</td>
          <td>${fmtMoney(c.reward_paise)}</td>
          <td>${c.redemptions}${c.max_uses > 0 ? '/' + c.max_uses : ''}</td>
          <td>${c.per_user_limit}</td>
          <td class="mono-cell">${c.expires_at ? fmtDate(c.expires_at) : '—'}</td>
          <td><span class="${c.active ? 'status status-active' : 'status status-rejected'}">${c.active ? 'active' : 'inactive'}</span></td>
          <td>
            <button class="btn btn-sm btn-ghost" data-toggle="${c.id}" data-active="${c.active}">${c.active ? 'Disable' : 'Enable'}</button>
            <button class="btn btn-sm btn-danger" data-del="${c.id}">Delete</button>
          </td>
        </tr>`).join('') + `</tbody></table>`;

    wrap.querySelectorAll('[data-toggle]').forEach((b) => b.onclick = async () => {
      const active = b.dataset.active === 'true';
      await api(`/api/admin/coupons/${b.dataset.toggle}`, { method: 'PUT', body: JSON.stringify({ active: !active }) });
      loadCoupons();
    });
    wrap.querySelectorAll('[data-del]').forEach((b) => b.onclick = async () => {
      const ok = await promptConfirm('Delete coupon?', 'This cannot be undone.', 'Delete', true);
      if (!ok) return;
      await api(`/api/admin/coupons/${b.dataset.del}`, { method: 'DELETE' });
      toast('Coupon deleted.', 'success'); loadCoupons();
    });
  }

  const nc = document.getElementById('new-coupon');
  if (nc) nc.addEventListener('click', () => {
    const root = document.getElementById('modal-root');
    if (!root) return;
    root.innerHTML = `
      <div class="modal-bg" id="modal-bg">
        <div class="glass modal">
          <h3>New Coupon</h3>
          <div class="field"><label>Code</label><input class="input" id="c-code" placeholder="WELCOME50" style="text-transform:uppercase"></div>
          <div class="field"><label>Reward (₹)</label><input class="input" id="c-reward" type="number" value="20" step="1"></div>
          <div class="field"><label>Max uses (0 = unlimited)</label><input class="input" id="c-max" type="number" value="0"></div>
          <div class="field"><label>Per user limit</label><input class="input" id="c-per" type="number" value="1"></div>
          <div class="field"><label>Expires at (optional)</label><input class="input" id="c-exp" type="datetime-local"></div>
          <div class="modal-actions">
            <button class="btn btn-ghost btn-sm" id="modal-cancel">Cancel</button>
            <button class="btn btn-sm" id="c-save">Create</button>
          </div>
        </div>
      </div>`;
    applyLucide();
    document.getElementById('modal-cancel').onclick = () => root.innerHTML = '';
    document.getElementById('modal-bg').onclick = (e) => { if (e.target.id === 'modal-bg') root.innerHTML = ''; };
    document.getElementById('c-save').onclick = async () => {
      try {
        await api('/api/admin/coupons', {
          method: 'POST',
          body: JSON.stringify({
            code: document.getElementById('c-code').value,
            reward: Number(document.getElementById('c-reward').value),
            maxUses: Number(document.getElementById('c-max').value) || 0,
            perUserLimit: Number(document.getElementById('c-per').value) || 1,
            expiresAt: document.getElementById('c-exp').value || null,
            active: true,
          }),
        });
        toast('Coupon created.', 'success');
        root.innerHTML = ''; loadCoupons();
      } catch (e) { toast(e.message, 'error'); }
    };
  });

  async function loadTxns() {
    const d = await api('/api/admin/transactions');
    const wrap = document.getElementById('admin-txns');
    if (!wrap) return;
    if (!d.transactions.length) { wrap.innerHTML = emptyState('No transactions.', 'list'); applyLucide(); return; }
    wrap.innerHTML = `<table><thead><tr><th>Txn ID</th><th>User</th><th>Type</th><th>Direction</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>` +
      d.transactions.map((t) => `<tr><td class="mono-cell">${esc(t.txn_id)}</td><td>@${esc(t.username)}</td><td>${esc(t.type)}</td><td>${esc(t.direction)}</td><td>${t.direction === 'credit' ? '+' : '-'}${fmtMoney(t.amount_paise)}</td><td><span class="${statusCls(t.status)}">${esc(t.status)}</span></td><td class="mono-cell">${fmtDateTime(t.created_at)}</td></tr>`).join('') +
      `</tbody></table>`;
  }

  async function loadAudit() {
    const d = await api('/api/admin/audit');
    const wrap = document.getElementById('admin-audit');
    if (!wrap) return;
    if (!d.logs.length) { wrap.innerHTML = emptyState('No audit entries.', 'scroll-text'); applyLucide(); return; }
    wrap.innerHTML = `<table><thead><tr><th>When</th><th>Admin</th><th>Action</th><th>Target</th></tr></thead><tbody>` +
      d.logs.map((l) => `<tr><td class="mono-cell">${fmtDateTime(l.created_at)}</td><td>${esc(l.admin_username || '—')}</td><td>${esc(l.action)}</td><td class="small">${esc(l.target_type || '')} ${l.target_id ? '#' + esc(l.target_id) : ''}</td></tr>`).join('') +
      `</tbody></table>`;
  }

  const bf = document.getElementById('broadcast-form');
  if (bf) bf.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      const r = await api('/api/admin/notifications/broadcast', {
        method: 'POST',
        body: JSON.stringify({
          audience: fd.get('audience'),
          userId: fd.get('userId') ? Number(fd.get('userId')) : null,
          title: fd.get('title'),
          body: fd.get('body'),
        }),
      });
      toast(`Sent to ${r.sent} user(s).`, 'success');
      e.target.reset();
    } catch (err) { toast(err.message, 'error'); }
  });

  const aud = document.querySelector('[name="audience"]');
  if (aud) aud.addEventListener('change', (e) => {
    const w = document.getElementById('single-user-wrap');
    if (w) w.style.display = e.target.value === 'single' ? 'block' : 'none';
  });

  api('/api/admin/me').then((me) => {
    if (me.csrf) sessionStorage.setItem('xyven_csrf', me.csrf);
    if (me.authenticated) showPanel();
  }).catch(() => {});
}

/* ==========================================================================
   BOOT — bulletproof
   ========================================================================== */
function boot() {
  if (window.__xyven_booted) return;
  window.__xyven_booted = true;
  try { startCanvas(); } catch (_) {}
  try { initLang(); } catch (_) {}
  try { applyI18n(); } catch (_) {}
  try { initAuthPage(); } catch (e) { console.error('[boot] auth', e); }
  try { initAppPage(); } catch (e) { console.error('[boot] app', e); }
  try { initAdminPage(); } catch (e) { console.error('[boot] admin', e); }
  applyLucide();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// Safety net: if lucide loads late, re-render icons.
window.addEventListener('load', () => {
  boot();
  setTimeout(applyLucide, 300);
  setTimeout(applyLucide, 1500);
});
