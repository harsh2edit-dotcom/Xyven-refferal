'use strict';

/* ==================== i18n ==================== */
const I18N = {
  en: { tagline:'Earn by inviting genuine new members.', signIn:'Sign In', signUp:'Sign Up', username:'Username or Email', password:'Password', fullName:'Full Name', email:'Gmail / Email', refCode:'Referral Code (optional)', createAccount:'Create Account', passHint:'Min 8 chars with uppercase, lowercase and number.', noAccount:'New here? Create an account.', dashboard:'Dashboard', totalReferrals:'Total Referrals', validReferrals:'Valid Referrals', totalEarnings:'Total Earnings', availableBalance:'Available Balance', totalWithdrawn:'Total Withdrawn', pendingWithdrawal:'Pending Withdrawal', totalDeposited:'Total Deposited', minReferrals:'Minimum Referrals', minWithdrawal:'Minimum Withdrawal', requiredDeposit:'Required Deposit', amount:'Amount (₹)', upiId:'UPI ID', requestWithdrawal:'Request Withdrawal', wdLocked:'Complete all requirements to unlock withdrawals.', couponRedeem:'Redeem Coupon', couponCode:'Coupon Code', redeem:'Redeem', withdrawalHistory:'Withdrawal History', withdrawalSection:'Withdrawal', refer:'Refer', yourCode:'Your referral code', copyCode:'Copy Code', share:'Share', copyLink:'Copy Link', referralEarnings:'Referral Earnings', referExplainer:'Invite a new user with your referral code. After the referral becomes valid, you receive ₹20 and the new user receives ₹10.', referralHistory:'Referral History', deposit:'Deposit', depositRequirement:'Deposit Requirement', submitDeposit:'Submit Deposit', depositHistory:'Deposit History', profile:'Profile', referralCode:'Referral Code', joined:'Account Created', support:'Need Help?', about:'About', aboutText:'XYVEN Referral is a referral-based rewards platform.', logout:'Logout', notifications:'Notifications', markAllRead:'Mark all read', home:'Home', welcome:'Welcome back' },
  hi: { tagline:'असली नए सदस्यों को आमंत्रित करके कमाएं।', signIn:'साइन इन', signUp:'साइन अप', username:'यूज़रनेम या ईमेल', password:'पासवर्ड', fullName:'पूरा नाम', email:'जीमेल / ईमेल', refCode:'रेफ़रल कोड', createAccount:'खाता बनाएं', passHint:'8+ अक्षर, बड़ा-छोटा अक्षर और अंक।', noAccount:'नए हैं? खाता बनाएं।', dashboard:'डैशबोर्ड', totalReferrals:'कुल रेफ़रल', validReferrals:'वैध रेफ़रल', totalEarnings:'कुल कमाई', availableBalance:'उपलब्ध शेष', totalWithdrawn:'कुल निकाला', pendingWithdrawal:'लंबित निकासी', totalDeposited:'कुल जमा', minReferrals:'न्यूनतम रेफ़रल', minWithdrawal:'न्यूनतम निकासी', requiredDeposit:'आवश्यक जमा', amount:'राशि (₹)', upiId:'UPI आईडी', requestWithdrawal:'निकासी अनुरोध', wdLocked:'सभी शर्तें पूरी करें।', couponRedeem:'कूपन रिडीम', couponCode:'कूपन कोड', redeem:'रिडीम', withdrawalHistory:'निकासी इतिहास', withdrawalSection:'निकासी', refer:'रेफ़र', yourCode:'आपका रेफ़रल कोड', copyCode:'कोड कॉपी', share:'शेयर', copyLink:'लिंक कॉपी', referralEarnings:'रेफ़रल कमाई', referExplainer:'रेफ़रल वैध होने पर ₹20 मिलते हैं।', referralHistory:'रेफ़रल इतिहास', deposit:'जमा', depositRequirement:'जमा आवश्यकता', submitDeposit:'जमा सबमिट', depositHistory:'जमा इतिहास', profile:'प्रोफ़ाइल', referralCode:'रेफ़रल कोड', joined:'खाता बनाया', support:'सहायता', about:'परिचय', aboutText:'XYVEN Referral एक रेफ़रल प्लेटफ़ॉर्म है।', logout:'लॉग आउट', notifications:'सूचनाएं', markAllRead:'सभी पढ़ी', home:'होम', welcome:'स्वागत' },
  hg: { tagline:'Genuine naye members ko invite karke kamao.', signIn:'Sign In', signUp:'Sign Up', username:'Username ya Email', password:'Password', fullName:'Poora Naam', email:'Gmail / Email', refCode:'Referral Code', createAccount:'Account Banao', passHint:'8+ chars, uppercase, lowercase aur number.', noAccount:'Naye ho? Account banao.', dashboard:'Dashboard', totalReferrals:'Total Referrals', validReferrals:'Valid Referrals', totalEarnings:'Total Earnings', availableBalance:'Available Balance', totalWithdrawn:'Total Withdrawn', pendingWithdrawal:'Pending Withdrawal', totalDeposited:'Total Deposited', minReferrals:'Minimum Referrals', minWithdrawal:'Minimum Withdrawal', requiredDeposit:'Required Deposit', amount:'Amount (₹)', upiId:'UPI ID', requestWithdrawal:'Withdrawal Request', wdLocked:'Saari requirements poori karo.', couponRedeem:'Coupon Redeem Karo', couponCode:'Coupon Code', redeem:'Redeem', withdrawalHistory:'Withdrawal History', withdrawalSection:'Withdrawal', refer:'Refer', yourCode:'Tumhara referral code', copyCode:'Code Copy', share:'Share', copyLink:'Link Copy', referralEarnings:'Referral Earnings', referExplainer:'Referral valid hone par ₹20 milte hain.', referralHistory:'Referral History', deposit:'Deposit', depositRequirement:'Deposit Requirement', submitDeposit:'Deposit Submit', depositHistory:'Deposit History', profile:'Profile', referralCode:'Referral Code', joined:'Account Created', support:'Help', about:'About', aboutText:'XYVEN Referral ek rewards platform hai.', logout:'Logout', notifications:'Notifications', markAllRead:'Sab read', home:'Home', welcome:'Wapas swagat' },
};

const getLang = () => { try { return localStorage.getItem('xyven_lang') || 'en'; } catch(_) { return 'en'; } };
const setLang = (l) => { try { localStorage.setItem('xyven_lang', l); } catch(_) {} };
const t = (key) => (I18N[getLang()] && I18N[getLang()][key]) || I18N.en[key] || key;

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
}

function applyLucide() {
  try { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); } catch(_) {}
}

/* ==================== Toast ==================== */
function toast(msg, type, ms) {
  type = type || 'info'; ms = ms || 4000;
  const c = document.getElementById('toast-container');
  if (!c) return;
  const icons = { success:'check-circle', error:'alert-circle', warn:'alert-triangle', info:'info' };
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.innerHTML = '<i data-lucide="' + (icons[type] || 'info') + '"></i><span></span>';
  el.querySelector('span').textContent = msg;
  c.appendChild(el);
  applyLucide();
  setTimeout(function() { el.classList.add('out'); setTimeout(function() { el.remove(); }, 300); }, ms);
}

/* ==================== POPUP ==================== */
function popup(opts) {
  opts = opts || {};
  const title = opts.title || 'Notice';
  const message = opts.message || '';
  const type = opts.type || 'info';
  const btnText = opts.btnText || 'OK';
  const onClose = opts.onClose || null;

  const root = document.getElementById('popup-root');
  if (!root) { alert(title + '\n\n' + message); if (onClose) onClose(); return; }

  const icons = { success:'check-circle-2', error:'alert-circle', warn:'alert-triangle', info:'info' };
  root.innerHTML = '<div class="popup-bg" id="popup-bg"><div class="glass popup">' +
    '<div class="popup-icon ' + type + '"><i data-lucide="' + (icons[type] || 'info') + '"></i></div>' +
    '<h3>' + esc(title) + '</h3>' +
    '<p>' + esc(message) + '</p>' +
    '<button class="btn btn-block" id="popup-close">' + esc(btnText) + '</button>' +
  '</div></div>';
  applyLucide();
  const close = function() { root.innerHTML = ''; if (onClose) onClose(); };
  document.getElementById('popup-close').onclick = close;
  document.getElementById('popup-bg').onclick = function(e) { if (e.target.id === 'popup-bg') close(); };
}

/* ==================== API ==================== */
async function api(path, options) {
  options = options || {};
  const opts = {
    credentials: 'same-origin',
    headers: Object.assign({ 'Content-Type': 'application/json' }, options.headers || {}),
    method: options.method,
    body: options.body,
  };
  let csrf = null;
  try { csrf = sessionStorage.getItem('xyven_csrf'); } catch(_) {}
  if (csrf && opts.method && opts.method !== 'GET') opts.headers['x-csrf-token'] = csrf;
  let res;
  try { res = await fetch(path, opts); }
  catch (e) { throw new Error('Network error. Check your connection.'); }
  let data = null;
  try { data = await res.json(); } catch(_) {}
  if (data && data.csrf) { try { sessionStorage.setItem('xyven_csrf', data.csrf); } catch(_) {} }
  if (!res.ok) {
    const err = new Error((data && data.message) || ('Request failed (' + res.status + ')'));
    err.status = res.status;
    err.code = data && data.error;
    throw err;
  }
  return data;
}

function deviceSignal() {
  try {
    let sig = localStorage.getItem('xyven_ds');
    if (!sig) {
      sig = btoa([navigator.userAgent, screen.width + 'x' + screen.height, navigator.language].join('|'));
      localStorage.setItem('xyven_ds', sig);
    }
    return sig;
  } catch(_) { return ''; }
}

/* ==================== Helpers ==================== */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}
const fmtMoney = (p) => '₹' + (Number(p) / 100).toFixed(2);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const fmtDateTime = (d) => d ? new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—';
const statusCls = (s) => 'status status-' + String(s || '').toLowerCase();
const emptyState = (msg, icon) => '<div class="empty"><i data-lucide="' + (icon || 'inbox') + '"></i>' + esc(msg) + '</div>';

function animateCounter(el, to, isMoney) {
  if (!el) return;
  const from = Number(el.dataset.v || 0);
  el.dataset.v = to;
  const reduce = (typeof matchMedia === 'function') && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.textContent = fmt(to, isMoney); return; }
  const start = performance.now(), dur = 900;
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(from + (to - from) * eased, isMoney);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function fmt(n, isMoney) {
  const v = Number(n) || 0;
  return isMoney ? '₹' + (v / 100).toFixed(2) : Math.round(v).toLocaleString();
}

/* ==================== Canvas ==================== */
function startCanvas() {
  const c = document.getElementById('grid-canvas');
  if (!c) return;
  if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = c.getContext('2d'); if (!ctx) return;
  let w, h, dots = [];
  function resize() {
    w = c.width = innerWidth; h = c.height = innerHeight;
    dots = [];
    const count = Math.min(50, Math.floor(w / 30));
    for (let i = 0; i < count; i++) dots.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.3 + .3 });
  }
  resize();
  addEventListener('resize', resize);
  (function loop() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(140,180,255,.35)';
    ctx.strokeStyle = 'rgba(91,140,255,.06)';
    for (let x = 0; x < w; x += 70) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 70) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(loop);
  })();
}

/* ==================== Modal Confirm ==================== */
function promptConfirm(title, message, confirmText, danger) {
  return new Promise(function(resolve) {
    const root = document.getElementById('modal-root');
    if (!root) return resolve(false);
    root.innerHTML = '<div class="modal-bg" id="modal-bg"><div class="glass modal"><h3>' + esc(title) + '</h3><p class="muted small">' + esc(message) + '</p><div class="modal-actions"><button class="btn btn-ghost btn-sm" id="modal-cancel">Cancel</button><button class="btn ' + (danger ? 'btn-danger' : '') + ' btn-sm" id="modal-confirm">' + esc(confirmText || 'Confirm') + '</button></div></div></div>';
    applyLucide();
    const done = function(v) { root.innerHTML = ''; resolve(v); };
    document.getElementById('modal-cancel').onclick = function() { done(false); };
    document.getElementById('modal-bg').onclick = function(e) { if (e.target.id === 'modal-bg') done(false); };
    document.getElementById('modal-confirm').onclick = function() { done(true); };
  });
}

/* ==================== Language ==================== */
function initLang() {
  const sel = document.getElementById('lang');
  if (!sel) return;
  sel.value = getLang();
  sel.addEventListener('change', function() {
    setLang(sel.value); applyI18n();
    if (window.__refresh) window.__refresh();
  });
}

/* ==================== AUTH PAGE ==================== */
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

  document.querySelectorAll('.tab').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab').forEach(function(b) { b.classList.toggle('active', b === btn); });
      document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
      const target = document.getElementById(btn.dataset.tab + '-form');
      if (target) target.classList.add('active');
    });
  });

  document.querySelectorAll('[data-toggle="password"]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const inp = btn.parentElement.querySelector('input');
      if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
    });
  });

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const fd = new FormData(loginForm);
    const btn = loginForm.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    try {
      const res = await api('/api/login', { method: 'POST', body: JSON.stringify({ username: fd.get('username'), password: fd.get('password') }) });
      if (res.csrf) sessionStorage.setItem('xyven_csrf', res.csrf);
      popup({
        type: 'success', title: 'Welcome Back!',
        message: 'Signed in successfully as @' + res.user.username + '. Redirecting to dashboard...',
        btnText: 'Continue',
        onClose: function() { location.href = '/app'; }
      });
      setTimeout(function() { location.href = '/app'; }, 1200);
    } catch (err) {
      popup({ type: 'error', title: 'Login Failed', message: err.message || 'Please check your credentials.' });
      if (btn) btn.disabled = false;
    }
  });

  signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const fd = new FormData(signupForm);
    const btn = signupForm.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    try {
      const res = await api('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          name: fd.get('name'), username: fd.get('username'), email: fd.get('email'),
          password: fd.get('password'),
          referralCode: String(fd.get('referralCode') || '').trim().toUpperCase(),
          deviceSignal: deviceSignal(),
        }),
      });
      if (res.csrf) sessionStorage.setItem('xyven_csrf', res.csrf);
      popup({
        type: 'success', title: 'Account Created!',
        message: 'Welcome @' + res.user.username + '!\n\nYour unique referral code is: ' + res.user.referralCode,
        btnText: 'Go to Dashboard',
        onClose: function() { location.href = '/app'; }
      });
      setTimeout(function() { location.href = '/app'; }, 1800);
    } catch (err) {
      const isIpErr = err.code === 'IP_ALREADY_USED';
      popup({
        type: 'error',
        title: isIpErr ? 'Access Denied' : 'Signup Failed',
        message: err.message || 'Please try again.'
      });
      if (btn) btn.disabled = false;
    }
  });

  api('/api/me').then(function(d) { if (d.csrf) sessionStorage.setItem('xyven_csrf', d.csrf); }).catch(function() {});
}

/* ==================== APP DASHBOARD ==================== */
function initAppPage() {
  if (!document.getElementById('view-home')) return;
  const state = { user: null, referrals: null, unread: 0, config: { upiId: 'harshsinghs@fam', requiredDeposit: 5000 } };

  document.querySelectorAll('.nav-item').forEach(function(b) {
    b.addEventListener('click', function() { showView(b.dataset.view); });
  });
  const bell = document.getElementById('bell');
  if (bell) bell.addEventListener('click', function() { showView('notifications'); });

  function showView(v) {
    document.querySelectorAll('.view').forEach(function(s) { s.classList.toggle('active', s.id === 'view-' + v); });
    document.querySelectorAll('.nav-item').forEach(function(b) { b.classList.toggle('active', b.dataset.view === v); });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (v === 'refer') loadRefer();
    if (v === 'deposit') loadDeposits();
    if (v === 'profile') loadProfile();
    if (v === 'notifications') loadNotifications();
  }

  const logout = async function() {
    try { await api('/api/logout', { method: 'POST' }); } catch(_) {}
    try { sessionStorage.removeItem('xyven_csrf'); } catch(_) {}
    location.href = '/login';
  };
  const lo1 = document.getElementById('logout-btn');
  if (lo1) lo1.addEventListener('click', async function() {
    const ok = await promptConfirm('Log out?', 'You will need to sign in again.', 'Log Out', false);
    if (ok) logout();
  });
  const lo2 = document.getElementById('logout-btn-2');
  if (lo2) lo2.addEventListener('click', logout);

  async function loadSummary() {
    const d = await api('/api/me/summary');
    const cards = {
      totalReferrals: [d.totalReferrals, false], validReferrals: [d.validReferrals, false],
      totalEarnings: [d.totalEarnings, true], balance: [d.balance, true],
      totalWithdrawn: [d.totalWithdrawn, true], pendingWithdrawal: [d.pendingWithdrawal, true],
      totalDeposited: [d.depositTotal, true],
    };
    for (const k in cards) {
      const card = document.querySelector('[data-key="' + k + '"]');
      if (!card) continue;
      card.classList.remove('skeleton');
      animateCounter(card.querySelector('[data-counter]'), cards[k][0], cards[k][1]);
    }
    const pill = document.getElementById('balance-pill');
    if (pill) pill.textContent = fmtMoney(d.balance);
    const sub = document.getElementById('wd-submit');
    if (sub) sub.disabled = !d.checks.canWithdraw;
    const hint = document.getElementById('wd-hint');
    if (hint) {
      if (d.checks.canWithdraw) { hint.textContent = 'All requirements met. You can request a withdrawal.'; hint.style.color = 'var(--accent)'; }
      else {
        const missing = [];
        if (!d.checks.hasReferrals) missing.push(d.checks.minReferrals + ' valid referrals');
        if (!d.checks.hasDeposit) missing.push('₹' + (d.checks.requiredDeposit / 100) + ' verified deposit');
        if (!d.checks.hasBalance) missing.push('₹' + (d.checks.minWithdrawal / 100) + ' balance');
        hint.textContent = 'Locked: ' + missing.join(', ') + '.';
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
    if (!d.history.length) wrap.innerHTML = emptyState('No referrals yet. Share your code!', 'users');
    else wrap.innerHTML = '<table><thead><tr><th>User</th><th>Status</th><th>Joined</th></tr></thead><tbody>' + d.history.map(function(r) {
      return '<tr><td>@' + esc(r.username) + '</td><td><span class="' + statusCls(r.status) + '">' + esc(r.status) + '</span></td><td class="mono-cell">' + fmtDate(r.created_at) + '</td></tr>';
    }).join('') + '</tbody></table>';
    applyLucide();
  }

  const cc = document.getElementById('copy-code');
  if (cc) cc.addEventListener('click', function() {
    const code = document.getElementById('ref-code').textContent;
    navigator.clipboard.writeText(code).then(function() {
      popup({ type: 'success', title: 'Code Copied', message: 'Your referral code ' + code + ' has been copied to clipboard.' });
    });
  });
  const cl = document.getElementById('copy-link');
  if (cl) cl.addEventListener('click', function() {
    const link = document.getElementById('ref-link').value;
    navigator.clipboard.writeText(link).then(function() {
      popup({ type: 'success', title: 'Link Copied', message: 'Referral link copied. Share it with friends.' });
    });
  });
  const sh = document.getElementById('share-btn');
  if (sh) sh.addEventListener('click', async function() {
    const data = state.referrals;
    if (!data) return;
    if (navigator.share) {
      try { await navigator.share({ title: 'XYVEN Referral', text: data.shareText }); popup({ type: 'success', title: 'Shared!', message: 'Thanks for sharing XYVEN Referral.' }); } catch(_) {}
    } else {
      try { await navigator.clipboard.writeText(data.shareText); popup({ type: 'success', title: 'Copied', message: 'Share text copied to clipboard.' }); } catch(_) {}
    }
  });

  /* ---------- DEPOSIT FLOW ---------- */
  let depState = { amount: 5000, screenshot: null, step: 1 };

  async function loadConfig() {
    try {
      const c = await api('/api/config');
      state.config = c;
      const upiEl = document.getElementById('upi-id-text');
      if (upiEl) upiEl.textContent = c.upiId;
    } catch(_) {}
  }

  function showStep(n) {
    depState.step = n;
    ['1', '2', '3'].forEach(function(i) {
      const el = document.getElementById('dep-step-' + i);
      if (el) el.style.display = (i === String(n)) ? 'block' : 'none';
    });
    if (n === 2) renderQR();
  }

  function renderQR() {
    const box = document.getElementById('qr-canvas');
    if (!box) return;
    box.innerHTML = '';
    const amt = depState.amount / 100;
    const upiUrl = 'upi://pay?pa=' + state.config.upiId + '&pn=' + encodeURIComponent('XYVEN Referral') + '&am=' + amt.toFixed(2) + '&cu=INR&tn=' + encodeURIComponent('Deposit to XYVEN');
    if (window.QRCode) {
      try {
        new QRCode(box, { text: upiUrl, width: 220, height: 220, colorDark: '#000000', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.H });
      } catch(e) { box.innerHTML = '<p class="muted small">QR unavailable — use UPI ID below</p>'; }
    } else {
      box.innerHTML = '<p class="muted small" style="padding:20px">QR loading... Use UPI ID below.</p>';
    }
    const display = document.getElementById('dep-display-amt');
    if (display) display.textContent = '₹' + amt.toFixed(2);
  }

  const nextBtn = document.getElementById('dep-next-btn');
  if (nextBtn) nextBtn.addEventListener('click', function() {
    const amtInput = document.getElementById('dep-amount-input');
    const amt = Number(amtInput.value);
    if (!amt || amt < 1) return popup({ type: 'error', title: 'Invalid Amount', message: 'Enter a valid amount of at least ₹1.' });
    if (amt > 100000) return popup({ type: 'error', title: 'Amount Too High', message: 'Maximum deposit is ₹1,00,000.' });
    depState.amount = Math.round(amt * 100);
    showStep(2);
  });

  const backBtn = document.getElementById('dep-back-btn');
  if (backBtn) backBtn.addEventListener('click', function() { showStep(1); });

  const copyUpi = document.getElementById('copy-upi');
  if (copyUpi) copyUpi.addEventListener('click', function() {
    const id = document.getElementById('upi-id-text').textContent;
    navigator.clipboard.writeText(id).then(function() {
      popup({ type: 'success', title: 'UPI ID Copied', message: id + ' copied to clipboard.' });
    });
  });

  const paidBtn = document.getElementById('dep-paid-btn');
  if (paidBtn) paidBtn.addEventListener('click', function() {
    popup({
      type: 'info', title: 'Confirm Payment',
      message: 'Make sure you have completed the UPI payment of ₹' + (depState.amount / 100).toFixed(2) + ' before proceeding.',
      btnText: 'Yes, I have paid',
      onClose: function() { showStep(3); }
    });
  });

  const backBtn2 = document.getElementById('dep-back2-btn');
  if (backBtn2) backBtn2.addEventListener('click', function() { showStep(2); });

  const uploadBox = document.getElementById('upload-box');
  const fileInput = document.getElementById('dep-screenshot');
  if (uploadBox && fileInput) {
    uploadBox.addEventListener('click', function() { fileInput.click(); });
    fileInput.addEventListener('change', function() {
      const file = fileInput.files[0];
      if (!file) return;
      if (file.size > 3 * 1024 * 1024) {
        popup({ type: 'error', title: 'File Too Large', message: 'Screenshot must be under 3MB. Please use a smaller image.' });
        fileInput.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = function(ev) {
        depState.screenshot = ev.target.result;
        const preview = document.getElementById('screenshot-preview');
        const placeholder = document.getElementById('upload-placeholder');
        if (preview) { preview.src = ev.target.result; preview.style.display = 'block'; }
        if (placeholder) placeholder.style.display = 'none';
      };
      reader.readAsDataURL(file);
    });
  }

  const submitBtn = document.getElementById('dep-submit-btn');
  if (submitBtn) submitBtn.addEventListener('click', async function() {
    const utr = (document.getElementById('dep-utr').value || '').trim().toUpperCase();
    const note = (document.getElementById('dep-note').value || '').trim();
    if (!utr || utr.length < 8) return popup({ type: 'error', title: 'Missing UTR', message: 'Enter the UTR / Reference number from your payment app.' });
    if (!depState.screenshot) return popup({ type: 'error', title: 'Missing Screenshot', message: 'Please attach the payment screenshot.' });

    submitBtn.disabled = true;
    try {
      const r = await api('/api/deposits', {
        method: 'POST',
        body: JSON.stringify({ amount: depState.amount / 100, utrNumber: utr, screenshot: depState.screenshot, note: note }),
      });
      popup({
        type: 'success', title: 'Deposit Submitted',
        message: 'Your deposit request ' + r.deposit.request_id + ' for ₹' + (depState.amount / 100).toFixed(2) + ' has been submitted. Admin will verify it shortly.',
        btnText: 'Great!',
        onClose: function() {
          depState.screenshot = null;
          document.getElementById('dep-utr').value = '';
          document.getElementById('dep-note').value = '';
          const preview = document.getElementById('screenshot-preview'); if (preview) { preview.style.display = 'none'; preview.src = ''; }
          const placeholder = document.getElementById('upload-placeholder'); if (placeholder) placeholder.style.display = 'block';
          showStep(1);
          loadDeposits();
        }
      });
    } catch (err) {
      popup({ type: 'error', title: 'Deposit Failed', message: err.message });
    } finally { submitBtn.disabled = false; }
  });

  async function loadDeposits() {
    const d = await api('/api/deposits');
    const req = document.getElementById('dep-required');
    if (req) req.textContent = '₹' + (d.required / 100);
    if (d.upiId) state.config.upiId = d.upiId;
    const wrap = document.getElementById('dep-history');
    if (!wrap) return;
    if (!d.deposits.length) wrap.innerHTML = emptyState('No deposit requests yet.', 'receipt');
    else wrap.innerHTML = '<table><thead><tr><th>Request ID</th><th>Amount</th><th>UTR</th><th>Status</th><th>Date</th></tr></thead><tbody>' + d.deposits.map(function(r) {
      return '<tr><td class="mono-cell">' + esc(r.request_id) + '</td><td>' + fmtMoney(r.amount_paise) + '</td><td class="mono-cell">' + esc(r.utr_number || '—') + '</td><td><span class="' + statusCls(r.status) + '">' + esc(r.status) + '</span></td><td class="mono-cell">' + fmtDate(r.created_at) + '</td></tr>';
    }).join('') + '</tbody></table>';
    applyLucide();
  }

  async function loadWithdrawals() {
    const d = await api('/api/withdrawals');
    const wrap = document.getElementById('wd-history');
    if (!wrap) return;
    if (!d.history.length) wrap.innerHTML = emptyState('No withdrawals yet.', 'banknote');
    else wrap.innerHTML = '<table><thead><tr><th>Request ID</th><th>Amount</th><th>UPI ID</th><th>Status</th><th>Date</th></tr></thead><tbody>' + d.history.map(function(r) {
      return '<tr><td class="mono-cell">' + esc(r.request_id) + '</td><td>' + fmtMoney(r.amount_paise) + '</td><td class="mono-cell">' + esc(r.upi_id) + '</td><td><span class="' + statusCls(r.status) + '">' + esc(r.status) + '</span></td><td class="mono-cell">' + fmtDate(r.created_at) + '</td></tr>';
    }).join('') + '</tbody></table>';
    applyLucide();
  }

  const wdForm = document.getElementById('wd-form');
  if (wdForm) wdForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const btn = document.getElementById('wd-submit');
    if (btn) btn.disabled = true;
    try {
      const r = await api('/api/withdrawals', { method: 'POST', body: JSON.stringify({ amount: Number(fd.get('amount')), upiId: fd.get('upiId') }) });
      popup({ type: 'success', title: 'Withdrawal Requested', message: 'Request ' + r.withdrawal.request_id + ' for ₹' + (r.withdrawal.amount_paise / 100).toFixed(2) + ' has been submitted for review.' });
      e.target.reset();
      loadWithdrawals(); loadSummary();
    } catch (err) {
      popup({ type: 'error', title: 'Withdrawal Failed', message: err.message });
      if (btn) btn.disabled = false;
    }
  });

  const cf = document.getElementById('coupon-form');
  if (cf) cf.addEventListener('submit', async function(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      const r = await api('/api/coupons/redeem', { method: 'POST', body: JSON.stringify({ code: fd.get('code') }) });
      popup({ type: 'success', title: 'Coupon Redeemed!', message: '₹' + (r.amount / 100).toFixed(2) + ' has been credited to your balance.' });
      e.target.reset(); loadSummary();
    } catch (err) {
      popup({ type: 'error', title: 'Coupon Failed', message: err.message });
    }
  });

  async function loadNotifications() {
    const d = await api('/api/notifications');
    state.unread = d.unread;
    updateBadge(d.unread);
    const wrap = document.getElementById('notif-list');
    if (!wrap) return;
    if (!d.notifications.length) wrap.innerHTML = emptyState('No notifications yet.', 'bell-off');
    else {
      wrap.innerHTML = d.notifications.map(function(n) {
        return '<div class="glass notif-card ' + (n.is_read ? '' : 'unread') + '" data-id="' + n.id + '"><div class="notif-icon"><i data-lucide="' + notifIcon(n.type) + '"></i></div><div class="notif-body"><h4>' + esc(n.title) + '</h4><p>' + esc(n.body) + '</p><div class="notif-time">' + fmtDateTime(n.created_at) + '</div></div></div>';
      }).join('');
      document.querySelectorAll('.notif-card').forEach(function(el) {
        el.addEventListener('click', async function() {
          if (el.classList.contains('unread')) {
            try {
              await api('/api/notifications/' + el.dataset.id + '/read', { method: 'POST' });
              el.classList.remove('unread');
              state.unread = Math.max(0, state.unread - 1);
              updateBadge(state.unread);
            } catch(_) {}
          }
        });
      });
    }
    applyLucide();
  }

  const ma = document.getElementById('mark-all');
  if (ma) ma.addEventListener('click', async function() {
    try {
      await api('/api/notifications/read-all', { method: 'POST' });
      document.querySelectorAll('.notif-card').forEach(function(el) { el.classList.remove('unread'); });
      state.unread = 0; updateBadge(0);
      popup({ type: 'success', title: 'All Read', message: 'All notifications marked as read.' });
    } catch (e) { popup({ type: 'error', title: 'Failed', message: e.message }); }
  });

  function notifIcon(type) {
    const map = { reward: 'gift', referral: 'users', withdrawal: 'banknote', deposit: 'arrow-down-circle', security: 'shield-alert', account: 'user-check', announcement: 'megaphone' };
    return map[type] || 'bell';
  }
  function updateBadge(count) {
    const b = document.getElementById('bell-count');
    if (!b) return;
    b.textContent = count > 99 ? '99+' : count;
    b.classList.toggle('hidden', count <= 0);
  }
  async function pollUnread() {
    try { const d = await api('/api/notifications/unread'); updateBadge(d.unread); } catch(_) {}
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
      await loadConfig();
      await loadSummary();
      await loadWithdrawals();
      await loadDeposits();
      await pollUnread();
    } catch (err) {
      if (err.status === 401) return location.href = '/login';
      popup({ type: 'error', title: 'Error', message: err.message });
    }
  }

  window.__refresh = function() { applyI18n(); loadSummary().catch(function() {}); };
  setInterval(pollUnread, 30000);
  init();
}

/* ==================== ADMIN PANEL ==================== */
function initAdminPage() {
  const loginWrap = document.getElementById('admin-login');
  const panel = document.getElementById('admin-panel');
  const loginForm = document.getElementById('admin-login-form');
  if (!loginWrap || !panel || !loginForm) return;

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      const r = await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ username: fd.get('username'), password: fd.get('password') }) });
      if (r.csrf) sessionStorage.setItem('xyven_csrf', r.csrf);
      popup({ type: 'success', title: 'Admin Authenticated', message: 'Welcome ' + r.admin.username + '. Loading dashboard...', btnText: 'Continue' });
      showPanel();
    } catch (err) {
      popup({ type: 'error', title: 'Login Failed', message: err.message });
    }
  });

  const logoutBtn = document.getElementById('admin-logout');
  if (logoutBtn) logoutBtn.addEventListener('click', async function() {
    const ok = await promptConfirm('Log out?', 'You will be returned to login.', 'Log Out', true);
    if (!ok) return;
    try { await api('/api/admin/logout', { method: 'POST' }); } catch(_) {}
    try { sessionStorage.removeItem('xyven_csrf'); } catch(_) {}
    location.reload();
  });

  const refreshBtn = document.getElementById('admin-refresh');
  if (refreshBtn) refreshBtn.addEventListener('click', function() {
    const active = document.querySelector('.side-item.active');
    if (active) loadTab(active.dataset.tab);
    toast('Refreshed', 'success', 2000);
  });

  document.querySelectorAll('.side-item').forEach(function(b) {
    b.addEventListener('click', function() {
      document.querySelectorAll('.side-item').forEach(function(x) { x.classList.toggle('active', x === b); });
      document.querySelectorAll('.admin-tab').forEach(function(x) { x.classList.toggle('active', x.id === 'tab-' + b.dataset.tab); });
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
    const [s, r] = await Promise.all([api('/api/admin/stats'), api('/api/admin/recent')]);
    const cards = [
      ['Total Users', s.total_users, false], ['Active Users', s.active_users, false],
      ['Suspended', s.suspended_users, false], ['Referrals', s.total_referrals, false],
      ['Valid Referrals', s.valid_referrals, false], ['Total Rewards', s.total_rewards, true],
      ['Total Deposits', s.total_deposits, false], ['Pending Deposits', s.pending_deposits, false],
      ['Deposit Value', s.deposit_value, true], ['Withdrawals', s.total_withdrawals, false],
      ['Pending Withdrawals', s.pending_withdrawals, false], ['Completed Withdrawals', s.completed_withdrawals, false],
      ['Rejected Withdrawals', s.rejected_withdrawals, false], ['Withdrawn Value', s.withdrawn_value, true],
    ];
    const el = document.getElementById('admin-stats');
    if (el) {
      el.innerHTML = cards.map(function(c) {
        return '<div class="glass stat-card"><div class="stat-label">' + esc(c[0]) + '</div><div class="stat-value">' + (c[2] ? fmtMoney(c[1]) : Number(c[1]).toLocaleString()) + '</div><i class="stat-icon" data-lucide="activity"></i></div>';
      }).join('');
    }
    const ru = document.getElementById('recent-users');
    if (ru) {
      if (!r.users.length) ru.innerHTML = emptyState('No users yet.', 'users');
      else ru.innerHTML = '<table><thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Code</th><th>Balance</th><th>Status</th><th>Joined</th></tr></thead><tbody>' + r.users.map(function(u) {
        return '<tr><td class="mono-cell">' + u.id + '</td><td>' + esc(u.username) + '</td><td class="small">' + esc(u.email) + '</td><td class="mono-cell">' + esc(u.referral_code) + '</td><td>' + fmtMoney(u.balance_paise) + '</td><td><span class="' + statusCls(u.status) + '">' + esc(u.status) + '</span></td><td class="mono-cell">' + fmtDateTime(u.created_at) + '</td></tr>';
      }).join('') + '</tbody></table>';
    }
    const rd = document.getElementById('recent-deposits');
    if (rd) {
      if (!r.deposits.length) rd.innerHTML = emptyState('No deposits yet.', 'receipt');
      else rd.innerHTML = '<table><thead><tr><th>Request ID</th><th>User</th><th>Amount</th><th>UTR</th><th>Status</th><th>Date</th></tr></thead><tbody>' + r.deposits.map(function(d) {
        return '<tr><td class="mono-cell">' + esc(d.request_id) + '</td><td>@' + esc(d.username) + '</td><td>' + fmtMoney(d.amount_paise) + '</td><td class="mono-cell">' + esc(d.utr_number || '—') + '</td><td><span class="' + statusCls(d.status) + '">' + esc(d.status) + '</span></td><td class="mono-cell">' + fmtDateTime(d.created_at) + '</td></tr>';
      }).join('') + '</tbody></table>';
    }
    applyLucide();
  }

  async function loadUsers(q) {
    q = q || '';
    const d = await api('/api/admin/users' + (q ? '?q=' + encodeURIComponent(q) : ''));
    const wrap = document.getElementById('admin-users');
    if (!wrap) return;
    if (!d.users.length) { wrap.innerHTML = emptyState('No users found.', 'users'); applyLucide(); return; }
    wrap.innerHTML = '<table><thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Balance</th><th>Refs</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead><tbody>' +
      d.users.map(function(u) {
        return '<tr>' +
          '<td class="mono-cell">' + u.id + '</td><td>' + esc(u.username) + '</td>' +
          '<td class="small">' + esc(u.email) + '</td><td>' + fmtMoney(u.balance_paise) + '</td>' +
          '<td class="mono-cell">' + (u.valid_refs || 0) + '</td>' +
          '<td><span class="' + statusCls(u.status) + '">' + esc(u.status) + '</span></td>' +
          '<td class="mono-cell">' + fmtDate(u.created_at) + '</td>' +
          '<td><button class="btn btn-sm btn-ghost" data-view-user="' + u.id + '">View</button> ' +
          (u.status === 'active' ? '<button class="btn btn-sm btn-warn" data-suspend="' + u.id + '">Suspend</button>' : '<button class="btn btn-sm btn-success" data-unsuspend="' + u.id + '">Restore</button>') +
          '</td></tr>';
      }).join('') + '</tbody></table>';
    wrap.querySelectorAll('[data-view-user]').forEach(function(b) { b.onclick = function() { viewUser(Number(b.dataset.viewUser)); }; });
    wrap.querySelectorAll('[data-suspend]').forEach(function(b) { b.onclick = function() { suspendUser(Number(b.dataset.suspend)); }; });
    wrap.querySelectorAll('[data-unsuspend]').forEach(function(b) { b.onclick = function() { unsuspendUser(Number(b.dataset.unsuspend)); }; });
  }

  async function viewUser(id) {
    const d = await api('/api/admin/users/' + id);
    const u = d.user;
    const root = document.getElementById('modal-root');
    if (!root) return;
    root.innerHTML = '<div class="modal-bg" id="modal-bg"><div class="glass modal"><h3>' + esc(u.name) + ' <span class="muted mono small">#' + u.id + '</span></h3>' +
      '<p class="muted small">@' + esc(u.username) + ' · ' + esc(u.email) + ' · ' + fmtMoney(u.balance_paise) + '</p>' +
      '<p class="muted small mt-14">Referral Code: <b class="mono">' + esc(u.referral_code) + '</b></p>' +
      '<p class="muted small">Deposit: ' + (u.deposit_verified ? 'Verified' : 'Not verified') + '</p>' +
      '<h4 style="margin-top:16px">Recent Transactions</h4><div class="table-wrap mt-14"><table><thead><tr><th>Txn</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead><tbody>' +
        d.transactions.slice(0, 8).map(function(t) { return '<tr><td class="mono-cell">' + esc(t.txn_id) + '</td><td>' + esc(t.type) + '</td><td>' + (t.direction === 'credit' ? '+' : '-') + fmtMoney(t.amount_paise) + '</td><td><span class="' + statusCls(t.status) + '">' + esc(t.status) + '</span></td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<h4 style="margin-top:16px">Adjust Balance</h4>' +
      '<div class="field mt-14"><input class="input" id="adj-amount" type="number" placeholder="e.g. 50 or -20" step="1"></div>' +
      '<div class="field"><input class="input" id="adj-reason" placeholder="Reason"></div>' +
      '<button class="btn btn-sm" id="adj-btn">Apply</button>' +
      '<div class="modal-actions"><button class="btn btn-ghost btn-sm" id="modal-cancel">Close</button></div></div></div>';
    applyLucide();
    document.getElementById('modal-cancel').onclick = function() { root.innerHTML = ''; };
    document.getElementById('modal-bg').onclick = function(e) { if (e.target.id === 'modal-bg') root.innerHTML = ''; };
    document.getElementById('adj-btn').onclick = async function() {
      const amount = Number(document.getElementById('adj-amount').value);
      const reason = document.getElementById('adj-reason').value || 'Manual adjustment';
      if (!amount) return popup({ type: 'error', title: 'Invalid Amount', message: 'Enter a non-zero amount.' });
      try {
        await api('/api/admin/users/' + id + '/adjust', { method: 'POST', body: JSON.stringify({ amount: amount, reason: reason }) });
        popup({ type: 'success', title: 'Balance Adjusted', message: 'User ' + u.username + ' balance updated by ₹' + amount + '.' });
        root.innerHTML = ''; loadUsers();
      } catch (err) { popup({ type: 'error', title: 'Failed', message: err.message }); }
    };
  }

  async function suspendUser(id) {
    const ok = await promptConfirm('Suspend account?', 'The user will be logged out and blocked. This action is logged.', 'Suspend', true);
    if (!ok) return;
    try {
      await api('/api/admin/users/' + id + '/suspend', { method: 'POST', body: JSON.stringify({}) });
      popup({ type: 'success', title: 'User Suspended', message: 'User has been suspended.' });
      loadUsers();
    } catch (e) { popup({ type: 'error', title: 'Failed', message: e.message }); }
  }
  async function unsuspendUser(id) {
    try {
      await api('/api/admin/users/' + id + '/unsuspend', { method: 'POST', body: JSON.stringify({}) });
      popup({ type: 'success', title: 'User Restored', message: 'User account restored.' });
      loadUsers();
    } catch (e) { popup({ type: 'error', title: 'Failed', message: e.message }); }
  }

  const us = document.getElementById('user-search');
  if (us) us.addEventListener('input', function(e) {
    clearTimeout(window.__searchT);
    window.__searchT = setTimeout(function() { loadUsers(e.target.value.trim()); }, 300);
  });

  async function loadWithdrawals() {
    const d = await api('/api/admin/withdrawals');
    const wrap = document.getElementById('admin-wds');
    if (!wrap) return;
    if (!d.withdrawals.length) { wrap.innerHTML = emptyState('No withdrawal requests.', 'banknote'); applyLucide(); return; }
    wrap.innerHTML = '<table><thead><tr><th>Request ID</th><th>User</th><th>Amount</th><th>UPI</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>' +
      d.withdrawals.map(function(w) {
        return '<tr><td class="mono-cell">' + esc(w.request_id) + '</td><td>@' + esc(w.username) + '</td><td>' + fmtMoney(w.amount_paise) + '</td><td class="mono-cell">' + esc(w.upi_id) + '</td><td><span class="' + statusCls(w.status) + '">' + esc(w.status) + '</span></td><td class="mono-cell">' + fmtDate(w.created_at) + '</td><td>' +
          (w.status === 'pending' ? '<button class="btn btn-sm btn-success" data-act="approve" data-rid="' + esc(w.request_id) + '">Approve</button> <button class="btn btn-sm btn-danger" data-act="reject" data-rid="' + esc(w.request_id) + '">Reject</button> ' : '') +
          ((w.status === 'pending' || w.status === 'approved') ? '<button class="btn btn-sm" data-act="complete" data-rid="' + esc(w.request_id) + '">Complete</button>' : '') +
        '</td></tr>';
      }).join('') + '</tbody></table>';
    wrap.querySelectorAll('[data-act]').forEach(function(b) {
      b.onclick = async function() {
        const act = b.dataset.act, rid = b.dataset.rid;
        const labels = { approve: 'approve', reject: 'reject', complete: 'mark completed' };
        const ok = await promptConfirm('Confirm ' + labels[act], 'Request ' + rid + '? This action is logged.', 'Confirm', act === 'reject');
        if (!ok) return;
        let note = '';
        if (act === 'reject') { try { note = prompt('Optional reason for rejection:', '') || ''; } catch(_) {} }
        try {
          await api('/api/admin/withdrawals/' + rid + '/' + act, { method: 'POST', body: JSON.stringify({ note: note }) });
          popup({ type: 'success', title: 'Done', message: 'Withdrawal ' + act + 'd successfully.' });
          loadWithdrawals();
        } catch (e) { popup({ type: 'error', title: 'Failed', message: e.message }); }
      };
    });
  }

  async function loadDeposits() {
    const d = await api('/api/admin/deposits');
    const wrap = document.getElementById('admin-deps');
    if (!wrap) return;
    if (!d.deposits.length) { wrap.innerHTML = emptyState('No deposit requests.', 'receipt'); applyLucide(); return; }
    wrap.innerHTML = '<table><thead><tr><th>Request ID</th><th>User</th><th>Amount</th><th>UTR</th><th>SS</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>' +
      d.deposits.map(function(r) {
        return '<tr><td class="mono-cell">' + esc(r.request_id) + '</td><td>@' + esc(r.username) + '</td><td>' + fmtMoney(r.amount_paise) + '</td><td class="mono-cell">' + esc(r.utr_number || '—') + '</td><td>' +
          (r.has_screenshot ? '<button class="btn btn-sm btn-ghost" data-ss="' + esc(r.request_id) + '">View</button>' : '—') + '</td>' +
          '<td><span class="' + statusCls(r.status) + '">' + esc(r.status) + '</span></td><td class="mono-cell">' + fmtDate(r.created_at) + '</td><td>' +
          (r.status === 'pending' ? '<button class="btn btn-sm btn-success" data-act="verify" data-rid="' + esc(r.request_id) + '">Verify</button> <button class="btn btn-sm btn-danger" data-act="reject" data-rid="' + esc(r.request_id) + '">Reject</button>' : '') +
        '</td></tr>';
      }).join('') + '</tbody></table>';
    wrap.querySelectorAll('[data-ss]').forEach(function(b) {
      b.onclick = async function() {
        try {
          const s = await api('/api/admin/deposits/' + b.dataset.ss + '/screenshot');
          const root = document.getElementById('modal-root');
          root.innerHTML = '<div class="modal-bg" id="modal-bg"><div class="glass modal"><h3>Payment Screenshot</h3><p class="muted small">Request ' + esc(b.dataset.ss) + '</p><img src="' + s.screenshot + '" style="width:100%;border-radius:12px;margin-top:14px"><div class="modal-actions"><button class="btn btn-ghost btn-sm" id="modal-cancel">Close</button></div></div></div>';
          applyLucide();
          document.getElementById('modal-cancel').onclick = function() { root.innerHTML = ''; };
          document.getElementById('modal-bg').onclick = function(e) { if (e.target.id === 'modal-bg') root.innerHTML = ''; };
        } catch (e) { popup({ type: 'error', title: 'Failed', message: e.message }); }
      };
    });
    wrap.querySelectorAll('[data-act]').forEach(function(b) {
      b.onclick = async function() {
        const act = b.dataset.act, rid = b.dataset.rid;
        const ok = await promptConfirm('Confirm ' + act + ' deposit', 'Request ' + rid + '? Verify only after confirming payment.', act === 'verify' ? 'Verify' : 'Reject', act === 'reject');
        if (!ok) return;
        let note = '';
        if (act === 'reject') { try { note = prompt('Optional reason:', '') || ''; } catch(_) {} }
        try {
          await api('/api/admin/deposits/' + rid + '/' + act, { method: 'POST', body: JSON.stringify({ note: note }) });
          popup({ type: 'success', title: 'Done', message: 'Deposit ' + act + 'ed successfully.' });
          loadDeposits();
        } catch (e) { popup({ type: 'error', title: 'Failed', message: e.message }); }
      };
    });
  }

  async function loadCoupons() {
    const d = await api('/api/admin/coupons');
    const wrap = document.getElementById('admin-coupons');
    if (!wrap) return;
    if (!d.coupons.length) { wrap.innerHTML = emptyState('No coupons yet. Click "New Coupon" to create one.', 'ticket'); applyLucide(); return; }
    wrap.innerHTML = '<table><thead><tr><th>Code</th><th>Reward</th><th>Uses</th><th>Per User</th><th>Min Refs</th><th>Expires</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
      d.coupons.map(function(c) {
        return '<tr><td class="mono-cell"><b>' + esc(c.code) + '</b></td><td>' + fmtMoney(c.reward_paise) + '</td><td>' + c.redemptions + (c.max_uses > 0 ? '/' + c.max_uses : '/∞') + '</td><td>' + c.per_user_limit + '</td><td>' + (c.min_valid_referrals || 0) + '</td><td class="mono-cell">' + (c.expires_at ? fmtDate(c.expires_at) : 'Never') + '</td><td><span class="' + (c.active ? 'status status-active' : 'status status-rejected') + '">' + (c.active ? 'active' : 'inactive') + '</span></td><td><button class="btn btn-sm btn-ghost" data-toggle="' + c.id + '" data-active="' + c.active + '">' + (c.active ? 'Disable' : 'Enable') + '</button> <button class="btn btn-sm btn-danger" data-del="' + c.id + '">Delete</button></td></tr>';
      }).join('') + '</tbody></table>';
    wrap.querySelectorAll('[data-toggle]').forEach(function(b) {
      b.onclick = async function() {
        const active = b.dataset.active === 'true';
        await api('/api/admin/coupons/' + b.dataset.toggle, { method: 'PUT', body: JSON.stringify({ active: !active }) });
        popup({ type: 'success', title: 'Updated', message: 'Coupon ' + (active ? 'disabled' : 'enabled') + '.' });
        loadCoupons();
      };
    });
    wrap.querySelectorAll('[data-del]').forEach(function(b) {
      b.onclick = async function() {
        const ok = await promptConfirm('Delete coupon?', 'This cannot be undone.', 'Delete', true);
        if (!ok) return;
        await api('/api/admin/coupons/' + b.dataset.del, { method: 'DELETE' });
        popup({ type: 'success', title: 'Deleted', message: 'Coupon deleted.' });
        loadCoupons();
      };
    });
  }

  const nc = document.getElementById('new-coupon');
  if (nc) nc.addEventListener('click', function() {
    const root = document.getElementById('modal-root');
    if (!root) return;
    root.innerHTML = '<div class="modal-bg" id="modal-bg"><div class="glass modal"><h3>Create New Coupon</h3>' +
      '<div class="field"><label>Code (A-Z, 0-9, _, -)</label><input class="input" id="c-code" placeholder="WELCOME50" style="text-transform:uppercase"></div>' +
      '<div class="field"><label>Reward Amount (₹)</label><input class="input" id="c-reward" type="number" value="20" step="1"></div>' +
      '<div class="field"><label>Max Uses (0 = unlimited)</label><input class="input" id="c-max" type="number" value="0"></div>' +
      '<div class="field"><label>Per User Limit</label><input class="input" id="c-per" type="number" value="1"></div>' +
      '<div class="field"><label>Min Valid Referrals Required</label><input class="input" id="c-minrefs" type="number" value="0"></div>' +
      '<div class="field"><label>Expires At (optional)</label><input class="input" id="c-exp" type="datetime-local"></div>' +
      '<div class="modal-actions"><button class="btn btn-ghost btn-sm" id="modal-cancel">Cancel</button><button class="btn btn-sm" id="c-save">Create Coupon</button></div>' +
    '</div></div>';
    applyLucide();
    document.getElementById('modal-cancel').onclick = function() { root.innerHTML = ''; };
    document.getElementById('modal-bg').onclick = function(e) { if (e.target.id === 'modal-bg') root.innerHTML = ''; };
    document.getElementById('c-save').onclick = async function() {
      try {
        await api('/api/admin/coupons', {
          method: 'POST',
          body: JSON.stringify({
            code: document.getElementById('c-code').value,
            reward: Number(document.getElementById('c-reward').value),
            maxUses: Number(document.getElementById('c-max').value) || 0,
            perUserLimit: Number(document.getElementById('c-per').value) || 1,
            minValidReferrals: Number(document.getElementById('c-minrefs').value) || 0,
            expiresAt: document.getElementById('c-exp').value || null,
            active: true,
          }),
        });
        popup({ type: 'success', title: 'Coupon Created', message: 'New coupon is now live and ready to redeem.' });
        root.innerHTML = ''; loadCoupons();
      } catch (e) { popup({ type: 'error', title: 'Failed', message: e.message }); }
    };
  });

  async function loadTxns() {
    const d = await api('/api/admin/transactions');
    const wrap = document.getElementById('admin-txns');
    if (!wrap) return;
    if (!d.transactions.length) { wrap.innerHTML = emptyState('No transactions.', 'list'); applyLucide(); return; }
    wrap.innerHTML = '<table><thead><tr><th>Txn ID</th><th>User</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>' +
      d.transactions.map(function(t) { return '<tr><td class="mono-cell">' + esc(t.txn_id) + '</td><td>@' + esc(t.username) + '</td><td>' + esc(t.type) + '</td><td>' + (t.direction === 'credit' ? '+' : '-') + fmtMoney(t.amount_paise) + '</td><td><span class="' + statusCls(t.status) + '">' + esc(t.status) + '</span></td><td class="mono-cell">' + fmtDateTime(t.created_at) + '</td></tr>'; }).join('') +
      '</tbody></table>';
  }

  async function loadAudit() {
    const d = await api('/api/admin/audit');
    const wrap = document.getElementById('admin-audit');
    if (!wrap) return;
    if (!d.logs.length) { wrap.innerHTML = emptyState('No audit entries.', 'scroll-text'); applyLucide(); return; }
    wrap.innerHTML = '<table><thead><tr><th>When</th><th>Admin</th><th>Action</th><th>Target</th></tr></thead><tbody>' +
      d.logs.map(function(l) { return '<tr><td class="mono-cell">' + fmtDateTime(l.created_at) + '</td><td>' + esc(l.admin_username || '—') + '</td><td>' + esc(l.action) + '</td><td class="small">' + esc(l.target_type || '') + ' ' + (l.target_id ? '#' + esc(l.target_id) : '') + '</td></tr>'; }).join('') +
      '</tbody></table>';
  }

  const bf = document.getElementById('broadcast-form');
  if (bf) bf.addEventListener('submit', async function(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      const r = await api('/api/admin/notifications/broadcast', { method: 'POST', body: JSON.stringify({ audience: fd.get('audience'), userId: fd.get('userId') ? Number(fd.get('userId')) : null, title: fd.get('title'), body: fd.get('body') }) });
      popup({ type: 'success', title: 'Broadcast Sent', message: 'Notification sent to ' + r.sent + ' user(s).' });
      e.target.reset();
    } catch (err) { popup({ type: 'error', title: 'Failed', message: err.message }); }
  });

  const aud = document.querySelector('[name="audience"]');
  if (aud) aud.addEventListener('change', function(e) {
    const w = document.getElementById('single-user-wrap');
    if (w) w.style.display = e.target.value === 'single' ? 'block' : 'none';
  });

  api('/api/admin/me').then(function(me) {
    if (me.csrf) sessionStorage.setItem('xyven_csrf', me.csrf);
    if (me.authenticated) showPanel();
  }).catch(function() {});
}

/* ==================== BOOT ==================== */
function boot() {
  if (window.__xyven_booted) return;
  window.__xyven_booted = true;
  try { startCanvas(); } catch(_) {}
  try { initLang(); } catch(_) {}
  try { applyI18n(); } catch(_) {}
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

window.addEventListener('load', function() {
  boot();
  setTimeout(applyLucide, 500);
  setTimeout(applyLucide, 1500);
});
