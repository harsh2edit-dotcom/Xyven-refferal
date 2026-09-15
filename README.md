# XYVEN Referral

A production-ready referral rewards platform built with Node.js, Express, PostgreSQL and vanilla JavaScript.

Live: https://xyven-refferal.onrender.com

## Features

- Secure signup / login with bcrypt password hashing and HttpOnly session cookies
- Unique referral code per user (format: `XYV#####`)
- Referral rewards: referrer gets ₹20, referred user gets ₹10
- Referral validation with anti-abuse signals (IP hash, device signal, risk scoring)
- Withdrawal system with server-side checks:
  - Minimum 10 valid referrals
  - Minimum ₹200 withdrawal
  - ₹50 verified deposit required
  - No conflicting pending withdrawal
  - Row-level locking prevents double spending
- Deposit submission with manual admin verification (no fake confirmations)
- Persistent notification system (bell + unread count + mark read)
- Coupon system with per-user and global usage limits
- Admin console with user management, deposits, withdrawals, coupons, broadcasts, transactions, audit log
- Full money safety: balances stored in paise integers, all changes through a transactional ledger
- 3 languages only: English, Hindi, Hinglish
- No emojis — Lucide icons throughout

## Tech

- Node.js 18+
- Express 4
- PostgreSQL
- express-session + connect-pg-simple
- bcryptjs
- helmet, express-rate-limit

## Local setup

1. **Install dependencies**
