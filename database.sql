CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  referral_code TEXT NOT NULL UNIQUE,
  referred_by INT REFERENCES users(id) ON DELETE SET NULL,
  balance_paise BIGINT NOT NULL DEFAULT 0 CHECK (balance_paise >= 0),
  total_earned_paise BIGINT NOT NULL DEFAULT 0,
  total_withdrawn_paise BIGINT NOT NULL DEFAULT 0,
  deposit_total_paise BIGINT NOT NULL DEFAULT 0,
  deposit_verified BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended')),
  risk_score INT NOT NULL DEFAULT 0,
  flagged BOOLEAN NOT NULL DEFAULT FALSE,
  flag_reason TEXT,
  signup_ip_hash TEXT,
  last_ip_hash TEXT,
  device_hash TEXT,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_ip ON users(signup_ip_hash);

CREATE TABLE IF NOT EXISTS referrals (
  id SERIAL PRIMARY KEY,
  referrer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referred_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','valid','rejected')),
  reason TEXT,
  signup_ip_hash TEXT,
  device_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  validated_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_refs_referrer ON referrals(referrer_id, status);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  txn_id TEXT NOT NULL UNIQUE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('credit','debit')),
  amount_paise BIGINT NOT NULL CHECK (amount_paise > 0),
  status TEXT NOT NULL DEFAULT 'completed',
  description TEXT,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  balance_after_paise BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_txn_user ON transactions(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS deposits (
  id SERIAL PRIMARY KEY,
  request_id TEXT NOT NULL UNIQUE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_paise BIGINT NOT NULL CHECK (amount_paise > 0),
  method TEXT NOT NULL DEFAULT 'upi',
  reference_id TEXT NOT NULL,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','verified','rejected')),
  admin_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_dep_status ON deposits(status);

CREATE TABLE IF NOT EXISTS withdrawals (
  id SERIAL PRIMARY KEY,
  request_id TEXT NOT NULL UNIQUE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_paise BIGINT NOT NULL CHECK (amount_paise > 0),
  upi_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','completed')),
  admin_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_wd_status ON withdrawals(status);

CREATE TABLE IF NOT EXISTS coupons (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  reward_paise BIGINT NOT NULL CHECK (reward_paise > 0),
  max_uses INT NOT NULL DEFAULT 0,
  per_user_limit INT NOT NULL DEFAULT 1,
  min_valid_referrals INT NOT NULL DEFAULT 0,
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id SERIAL PRIMARY KEY,
  coupon_id INT NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_paise BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_cr ON coupon_redemptions(coupon_id, user_id);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_notif_user ON notifications(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  last_login_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  sid VARCHAR NOT NULL PRIMARY KEY,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expire ON admin_sessions(expire);

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  admin_username TEXT,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  detail JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR NOT NULL PRIMARY KEY,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_expire ON sessions(expire);
