'use client';
 
// ─────────────────────────────────────────────────────────────────────────────
// app/(dashboard)/send/success/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
 
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
 
const SHARED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  :root {
    --bg: #f5f4f0; --surface: #ffffff; --border: #e8e6e0;
    --ink: #1a1916; --muted: #8a877e; --accent: #2a2926;
    --green: #2d6a4f; --green-bg: #edf7f2;
    --red: #c1440e; --red-bg: #fff1ec;
  }
  html, body { height: 100%; background: var(--bg); }
 
  .shell {
    font-family: 'DM Sans', sans-serif; color: var(--ink);
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 24px 16px;
  }
 
  .card {
    width: 100%; max-width: 400px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 20px; padding: 36px 28px 28px;
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
  }
 
  .icon-ring {
    width: 72px; height: 72px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px; position: relative;
  }
 
  .icon-ring.success { background: var(--green-bg); color: var(--green); }
  .icon-ring.failure { background: var(--red-bg); color: var(--red); }
 
  .icon-ring::before {
    content: ''; position: absolute; inset: -6px;
    border-radius: 50%; border: 1px solid;
    opacity: 0.25; animation: pulse-ring 1.8s ease-out infinite;
  }
  .icon-ring.success::before { border-color: var(--green); }
  .icon-ring.failure::before { border-color: var(--red); }
 
  @keyframes pulse-ring {
    0%   { transform: scale(0.85); opacity: 0.4; }
    70%  { transform: scale(1.15); opacity: 0; }
    100% { transform: scale(1.15); opacity: 0; }
  }
 
  .status-eyebrow {
    font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 6px;
  }
  .status-eyebrow.success { color: var(--green); }
  .status-eyebrow.failure { color: var(--red); }
 
  .status-title {
    font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800;
    letter-spacing: -0.8px; color: var(--ink); margin-bottom: 8px;
  }
 
  .status-desc { font-size: 14px; color: var(--muted); line-height: 1.5; margin-bottom: 28px; }
 
  /* receipt */
  .receipt {
    width: 100%; background: var(--bg); border-radius: 12px;
    padding: 16px; margin-bottom: 24px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .receipt-row { display: flex; justify-content: space-between; align-items: center; }
  .receipt-key { font-size: 12px; color: var(--muted); }
  .receipt-val { font-size: 13px; font-weight: 500; color: var(--ink); }
  .receipt-val.amount { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; letter-spacing: -0.5px; color: var(--ink); }
  .receipt-divider { height: 1px; background: var(--border); }
 
  /* buttons */
  .btn-primary {
    width: 100%; padding: 13px; background: var(--ink); color: #fff;
    border: none; border-radius: 12px; font-size: 14px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.15s;
    margin-bottom: 10px; letter-spacing: -0.1px;
  }
  .btn-primary:hover { opacity: 0.85; }
 
  .btn-secondary {
    width: 100%; padding: 13px; background: transparent; color: var(--muted);
    border: 1px solid var(--border); border-radius: 12px; font-size: 14px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s;
  }
  .btn-secondary:hover { color: var(--ink); border-color: var(--accent); }
 
  .btn-danger {
    width: 100%; padding: 13px; background: var(--red); color: #fff;
    border: none; border-radius: 12px; font-size: 14px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.15s;
    margin-bottom: 10px;
  }
  .btn-danger:hover { opacity: 0.85; }
 
  .ref-tag {
    font-size: 11px; color: var(--muted); margin-top: 16px;
    display: flex; align-items: center; gap: 4px;
  }
  .ref-code { font-family: monospace; letter-spacing: 0.5px; }
 
  /* entrance animation */
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card { animation: fade-up 0.4s ease both; }
`;
 
// ─── SUCCESS PAGE ─────────────────────────────────────────────────────────────
 
export function SendSuccessPage() {
  const router = useRouter();
  // In real usage pull these from router.searchParams or a global state/store
  const amount    = '$1,500.00';
  const recipient = 'Brian Tembo';
  const bank      = 'Guaranty Trust Bank';
  const ref       = 'TXN-01JDKR9F3MXA';
  const date      = new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
 
  return (
    <>
      <style>{SHARED_STYLES}</style>
      <div className="shell">
        <div className="card">
 
          <div className="icon-ring success">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
 
          <div className="status-eyebrow success">Transfer Sent</div>
          <div className="status-title">Money Sent!</div>
          <div className="status-desc">
            Your transfer has been processed and is on its way to {recipient}.
          </div>
 
          <div className="receipt">
            <div className="receipt-row">
              <span className="receipt-key">Amount sent</span>
              <span className="receipt-val amount">{amount}</span>
            </div>
            <div className="receipt-divider" />
            <div className="receipt-row">
              <span className="receipt-key">Recipient</span>
              <span className="receipt-val">{recipient}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-key">Bank</span>
              <span className="receipt-val">{bank}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-key">Date</span>
              <span className="receipt-val">{date}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-key">Status</span>
              <span className="receipt-val" style={{ color: 'var(--green)', fontWeight: 600 }}>Completed ✓</span>
            </div>
          </div>
 
          <button className="btn-primary" onClick={() => router.push('/send')}>
            Send Again
          </button>
          <button className="btn-secondary" onClick={() => router.push('/')}>
            Back to Wallet
          </button>
 
          <div className="ref-tag">
            Ref: <span className="ref-code">{ref}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SendSuccessPage;