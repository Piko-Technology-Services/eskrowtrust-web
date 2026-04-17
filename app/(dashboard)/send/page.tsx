'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ─── Icons ────────────────────────────────────────────────────────────────────
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const ContactIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const BankIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="10" width="18" height="11" rx="1"/><path d="M3 10l9-7 9 7"/>
    <line x1="12" y1="10" x2="12" y2="21"/>
  </svg>
);
const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
    <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><circle cx="18" cy="16" r="1" fill="currentColor"/>
  </svg>
);
const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const methods = [
  { id: 'contact', label: 'To Contact',    sub: 'Send to a saved contact',        icon: <ContactIcon /> },
  { id: 'bank',    label: 'Bank Transfer', sub: 'Transfer to any bank account',   icon: <BankIcon /> },
  { id: 'wallet',  label: 'Wallet Holder', sub: 'Send to another arc.hq wallet',  icon: <WalletIcon /> },
];

const quickAmounts = [500, 1000, 2500, 5000];

const contacts = [
  { name: 'Alice Mwale',    avatar: 'AM', account: '•••• 1234' },
  { name: 'Brian Tembo',    avatar: 'BT', account: '•••• 5678' },
  { name: 'Chanda Phiri',   avatar: 'CP', account: '•••• 9012' },
];

export default function SendMoneyPage() {
  const router = useRouter();
  const [method, setMethod]       = useState('bank');
  const [amount, setAmount]       = useState('');
  const [narration, setNarration] = useState('');
  const [bankCode, setBankCode]   = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [walletId, setWalletId]   = useState('');
  const [contact, setContact]     = useState('');
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    // Replace with real API call:
    // await WalletAPI.send({ amount, method, accountNo, bankCode, narration });
    await new Promise(r => setTimeout(r, 1800));
    const success = Math.random() > 0.3; // demo — replace with real result
    setLoading(false);
    router.push(success ? '/send/success' : '/send/failed');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f5f4f0; --surface: #ffffff; --border: #e8e6e0;
          --ink: #1a1916; --muted: #8a877e; --accent: #2a2926;
          --green: #2d6a4f; --green-bg: #edf7f2; --red: #c1440e;
          --nav-h: 56px;
        }
        html, body { height: 100%; background: var(--bg); }

        .shell { font-family: 'DM Sans', sans-serif; color: var(--ink); min-height: 100vh; }

        /* top nav */
        .topbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          height: var(--nav-h); background: var(--surface);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; padding: 0 20px; gap: 12px;
        }
        .back-btn {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid var(--border); background: transparent;
          color: var(--ink); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .back-btn:hover { background: var(--bg); }
        .topbar-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; letter-spacing: -0.4px; flex: 1; }
        .balance-pill {
          font-size: 12px; font-weight: 500; color: var(--muted);
          background: var(--bg); border: 1px solid var(--border);
          padding: 5px 10px; border-radius: 20px; white-space: nowrap;
        }

        /* main */
        .main { margin-top: var(--nav-h); padding: 24px 16px 64px; max-width: 520px; margin-left: auto; margin-right: auto; }

        /* amount input */
        .amount-block { margin-bottom: 24px; text-align: center; }
        .amount-label { font-size: 11px; font-weight: 500; letter-spacing: 1.2px; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
        .amount-wrap { display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 12px; }
        .amount-currency { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700; color: var(--muted); }
        .amount-input {
          font-family: 'Syne', sans-serif; font-size: 44px; font-weight: 800;
          letter-spacing: -2px; color: var(--ink);
          border: none; outline: none; background: transparent;
          width: 220px; text-align: center;
        }
        .amount-input::placeholder { color: var(--border); }
        .quick-amounts { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
        .quick-btn {
          padding: 6px 14px; border-radius: 20px;
          border: 1px solid var(--border); background: var(--surface);
          font-size: 13px; font-weight: 500; color: var(--muted);
          cursor: pointer; transition: all 0.13s;
        }
        .quick-btn:hover { border-color: var(--accent); color: var(--ink); }
        .quick-btn.active { background: var(--ink); color: #fff; border-color: var(--ink); }

        /* section label */
        .section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.9px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }

        /* method selector */
        .method-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 24px; }
        .method-card {
          border: 1px solid var(--border); border-radius: 12px;
          padding: 14px 10px; cursor: pointer; background: var(--surface);
          display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center;
          transition: border-color 0.15s, box-shadow 0.15s;
          position: relative;
        }
        .method-card:hover { border-color: #c8c5be; }
        .method-card.active { border-color: var(--ink); box-shadow: 0 0 0 1px var(--ink); }
        .method-icon { width: 36px; height: 36px; border-radius: 10px; background: var(--bg); display: flex; align-items: center; justify-content: center; color: var(--muted); }
        .method-card.active .method-icon { background: var(--ink); color: #fff; }
        .method-name { font-size: 12px; font-weight: 500; color: var(--ink); }
        .method-sub  { font-size: 10px; color: var(--muted); line-height: 1.3; }
        .method-check {
          position: absolute; top: 8px; right: 8px;
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--ink); color: #fff;
          display: none; align-items: center; justify-content: center;
        }
        .method-card.active .method-check { display: flex; }

        /* fields */
        .fields { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .field { display: flex; flex-direction: column; gap: 5px; }
        .field label { font-size: 12px; font-weight: 500; color: var(--muted); }
        .field input, .field select {
          padding: 11px 12px; border: 1px solid var(--border);
          border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: var(--ink); background: var(--bg); outline: none;
          transition: border-color 0.15s, background 0.15s;
          appearance: none;
        }
        .field input:focus, .field select:focus { border-color: var(--accent); background: var(--surface); }
        .field input::placeholder { color: #c0bdb6; }

        /* contacts list */
        .contact-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 24px; }
        .contact-item {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px; border: 1px solid var(--border);
          border-radius: 12px; cursor: pointer; background: var(--surface);
          transition: border-color 0.13s;
        }
        .contact-item:hover { border-color: #c8c5be; }
        .contact-item.selected { border-color: var(--ink); box-shadow: 0 0 0 1px var(--ink); }
        .contact-avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: var(--muted); flex-shrink: 0; }
        .contact-item.selected .contact-avatar { background: var(--ink); color: #fff; border-color: var(--ink); }
        .contact-name { font-size: 13px; font-weight: 500; color: var(--ink); }
        .contact-acc  { font-size: 11px; color: var(--muted); }
        .contact-chevron { margin-left: auto; color: var(--border); }

        /* submit */
        .submit-btn {
          width: 100%; padding: 14px; background: var(--ink); color: #fff;
          border: none; border-radius: 12px; font-size: 15px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: opacity 0.15s; letter-spacing: -0.2px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover:not(:disabled) { opacity: 0.85; }
        .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* narration */
        .narration-field textarea {
          padding: 11px 12px; border: 1px solid var(--border);
          border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: var(--ink); background: var(--bg); outline: none; resize: none;
          width: 100%; transition: border-color 0.15s, background 0.15s;
        }
        .narration-field textarea:focus { border-color: var(--accent); background: var(--surface); }
        .narration-field textarea::placeholder { color: #c0bdb6; }

        .divider { height: 1px; background: var(--border); margin: 20px 0; }
      `}</style>

      <div className="shell">
        <header className="topbar">
          <button className="back-btn" onClick={() => router.back()}><BackIcon /></button>
          <div className="topbar-title">Send Money</div>
          <div className="balance-pill">Balance: $1,000,000</div>
        </header>

        <main className="main">
          <form onSubmit={handleSubmit}>

            {/* Amount */}
            <div className="amount-block">
              <div className="amount-label">Enter Amount</div>
              <div className="amount-wrap">
                <span className="amount-currency">$</span>
                <input
                  className="amount-input"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="quick-amounts">
                {quickAmounts.map(q => (
                  <button
                    key={q}
                    type="button"
                    className={`quick-btn ${amount === String(q) ? 'active' : ''}`}
                    onClick={() => setAmount(String(q))}
                  >
                    ${q.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="divider" />

            {/* Method */}
            <div className="section-label" style={{ marginBottom: 10 }}>Send via</div>
            <div className="method-grid">
              {methods.map(m => (
                <div
                  key={m.id}
                  className={`method-card ${method === m.id ? 'active' : ''}`}
                  onClick={() => setMethod(m.id)}
                >
                  <div className="method-check"><CheckIcon /></div>
                  <div className="method-icon">{m.icon}</div>
                  <div>
                    <div className="method-name">{m.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fields based on method */}
            {method === 'contact' && (
              <>
                <div className="section-label">Choose Contact</div>
                <div className="contact-list">
                  {contacts.map(c => (
                    <div
                      key={c.name}
                      className={`contact-item ${contact === c.name ? 'selected' : ''}`}
                      onClick={() => setContact(c.name)}
                    >
                      <div className="contact-avatar">{c.avatar}</div>
                      <div>
                        <div className="contact-name">{c.name}</div>
                        <div className="contact-acc">{c.account}</div>
                      </div>
                      <div className="contact-chevron"><ChevronIcon /></div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {method === 'bank' && (
              <div className="fields">
                <div className="field">
                  <label>Bank</label>
                  <select value={bankCode} onChange={e => setBankCode(e.target.value)} required>
                    <option value="">Select bank…</option>
                    <option value="044">Access Bank</option>
                    <option value="058">Guaranty Trust Bank</option>
                    <option value="011">First Bank</option>
                    <option value="057">Zenith Bank</option>
                    <option value="033">United Bank for Africa</option>
                  </select>
                </div>
                <div className="field">
                  <label>Account Number</label>
                  <input type="text" placeholder="0000000000" maxLength={10} value={accountNo} onChange={e => setAccountNo(e.target.value)} required />
                </div>
              </div>
            )}

            {method === 'wallet' && (
              <div className="fields">
                <div className="field">
                  <label>Wallet ID or Email</label>
                  <input type="text" placeholder="user@example.com or WALLET-XXXX" value={walletId} onChange={e => setWalletId(e.target.value)} required />
                </div>
              </div>
            )}

            {/* Narration */}
            <div className="fields narration-field">
              <div className="field">
                <label>Narration <span style={{ fontWeight: 400, opacity: 0.5 }}>(optional)</span></label>
                <textarea rows={2} placeholder="What's this for?" value={narration} onChange={e => setNarration(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading || !amount}>
              {loading
                ? <><div className="spinner" /> Processing…</>
                : <>Continue · {amount ? `$${parseFloat(amount).toLocaleString('en', { minimumFractionDigits: 2 })}` : '$0.00'}</>
              }
            </button>

          </form>
        </main>
      </div>
    </>
  );
}