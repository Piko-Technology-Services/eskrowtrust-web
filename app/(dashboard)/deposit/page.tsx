'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WalletAPI } from "@/lib/api";

// ─── Icons ────────────────────────────────────────────────────────────────────
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const BankIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="10" width="18" height="11" rx="1" /><path d="M3 10l9-7 9 7" />
    <line x1="12" y1="10" x2="12" y2="21" />
  </svg>
);
const MobileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const CardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const methods = [
  {
    id: 'bank_transfer',
    label: 'Bank Transfer',
    sub: 'Use your virtual account',
    icon: <BankIcon />,
    eta: 'Instant',
  },
  {
    id: 'mobile_money',
    label: 'Mobile Money',
    sub: 'MTN, Airtel, Zamtel',
    icon: <MobileIcon />,
    eta: '~1 min',
  },
  {
    id: 'card',
    label: 'Card',
    sub: 'Visa or Mastercard',
    icon: <CardIcon />,
    eta: 'Instant',
  },
];

const networks = [
  {
    id: 'mtn',
    name: 'MTN',
    color: '#FFCC00',
    logo: '/images/logos/mtn-logo.png',
  },
  {
    id: 'airtel',
    name: 'Airtel',
    color: '#E60000',
    logo: '/images/logos/airtel-logo.png',
  },
];

const quickAmounts = [1000, 2500, 5000, 10000];

export default function AddMoneyPage() {
  const router = useRouter();
  const [method, setMethod] = useState('mobile_money');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [provider, setProvider] = useState('mtn');
  const [cardNo, setCardNo] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [paymentType, setPaymentType] = useState<'mobile' | 'card'>('mobile');

  // Replace with real wallet virtual account from API
  const virtualAccount = { number: '0123456789', bank: 'Wema Bank', name: 'Jane Doe / arc.hq' };

  const handleCopy = () => {
    navigator.clipboard.writeText(virtualAccount.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) return;

    setLoading(true);

    try {
      const res = await WalletAPI.deposit({
        amount: parseFloat(amount),
        phone: phone,
        mno: provider
      });

      const data = res.data;

      // IMPORTANT: send user to Lenco checkout
      // if (data.checkout_url) {
      //   window.location.href = data.checkout_url;
      //   return;
      // }

      // fallback
      // router.push('/deposit/failed');

    } catch (err: any) {
      console.error("Deposit error:", err);
      router.push('/deposit/failed');
    } finally {
      setLoading(false);
    }
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
        .topbar-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; letter-spacing: -0.4px; }

        .main { margin-top: var(--nav-h); padding: 24px 16px 64px; max-width: 520px; margin-left: auto; margin-right: auto; }

        /* amount */
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

        .divider { height: 1px; background: var(--border); margin: 20px 0; }

        /* method list */
        .section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.9px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }

        .method-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        .method-item {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border: 1px solid var(--border);
          border-radius: 14px; cursor: pointer; background: var(--surface);
          transition: border-color 0.13s, box-shadow 0.13s;
          position: relative;
        }
        .method-item:hover { border-color: #c8c5be; }
        .method-item.active { border-color: var(--ink); box-shadow: 0 0 0 0.3px var(--ink); }

        .method-icon-wrap { width: 40px; height: 40px; border-radius: 12px; background: var(--bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--muted); flex-shrink: 0; transition: all 0.13s; }
        .method-item.active .method-icon-wrap { background: var(--ink); color: #fff; border-color: var(--ink); }

        .method-text { flex: 1; }
        .method-name { font-size: 14px; font-weight: 500; color: var(--ink); }
        .method-sub  { font-size: 12px; color: var(--muted); margin-top: 1px; }

        .method-eta {
          font-size: 11px; font-weight: 500;
          padding: 3px 8px; border-radius: 20px;
          background: var(--green-bg); color: var(--green);
        }
        .method-radio {
          width: 18px; height: 18px; border-radius: 50%;
          border: 1.5px solid var(--border); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.13s;
        }
        .method-item.active .method-radio { background: var(--ink); border-color: var(--ink); }

        /* virtual account card */
        .va-card {
          background: var(--bg); border: 1px solid var(--border);
          border-radius: 14px; padding: 16px; margin-bottom: 20px;
        }
        .va-header { font-size: 11px; font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
        .va-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .va-row:last-child { margin-bottom: 0; }
        .va-key { font-size: 12px; color: var(--muted); }
        .va-val { font-size: 13px; font-weight: 500; color: var(--ink); }
        .va-number-row { display: flex; align-items: center; gap: 8px; }
        .va-number { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; letter-spacing: 1px; color: var(--ink); }
        .copy-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 5px 10px; border-radius: 8px;
          border: 1px solid var(--border); background: var(--surface);
          font-size: 12px; font-weight: 500; color: var(--muted);
          cursor: pointer; transition: all 0.13s;
        }
        .copy-btn:hover { color: var(--ink); border-color: var(--accent); }
        .copy-btn.copied { color: var(--green); border-color: var(--green); background: var(--green-bg); }
        .va-note { font-size: 12px; color: var(--muted); line-height: 1.5; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); }

        /* fields */
        .fields { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .field { display: flex; flex-direction: column; gap: 5px; }
        .field label { font-size: 12px; font-weight: 500; color: var(--muted); }
        .field input, .field select {
          padding: 11px 12px; border: 1px solid var(--border);
          border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: var(--ink); background: var(--bg); outline: none;
          transition: border-color 0.15s, background 0.15s; appearance: none;
        }
        .field input:focus, .field select:focus { border-color: var(--accent); background: var(--surface); }
        .field input::placeholder { color: #c0bdb6; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* submit */
        .submit-btn {
          width: 100%; padding: 14px; background: var(--ink); color: #fff;
          border: none; border-radius: 12px; font-size: 15px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          letter-spacing: -0.2px;
        }
        .submit-btn:hover:not(:disabled) { opacity: 0.85; }
        .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* bank transfer doesn't need submit (just show VA) */
        .info-note { font-size: 13px; color: var(--muted); text-align: center; margin-top: 8px; line-height: 1.5; }

        .mno-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.mno-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  transition: all 0.15s ease;
}

.mno-card img {
  width: 100vw;
  height: 32px;
  object-fit: contain;
}

.mno-card span {
  font-size: 14px;
  font-weight: 500;
}

.mno-card:hover {
  border-color: var(--accent);
}

.mno-card.active {
  border-color: var(--ink);
  box-shadow: 0 0 0 0.3px var(--ink);
  background: #f9f9f7;
}
      `}</style>

      <div className="shell">
        <header className="topbar">
          <button className="back-btn" onClick={() => router.back()}><BackIcon /></button>
          <div className="topbar-title">Deposit Money</div>
        </header>

        <main className="main">
          <form onSubmit={handleSubmit}>

            {/* Amount */}
            <div className="amount-block">
              <div className="amount-label">How much?</div>
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
                />
              </div>
              {/* <div className="quick-amounts">
                {quickAmounts.map(q => (
                  <button
                    type="button"
                    key={q}
                    className={`quick-btn ${amount === String(q) ? 'active' : ''}`}
                    onClick={() => setAmount(String(q))}
                  >
                    ${q.toLocaleString()}
                  </button>
                ))}
              </div> */}
            </div>

            <div className="divider" />

            <div className="section-label">Payment Type</div>
            <div className="method-list">

              <div
                className={`method-item ${paymentType === 'mobile' ? 'active' : ''}`}
                onClick={() => setPaymentType('mobile')}
              >
                <div className="method-icon-wrap"><MobileIcon /></div>
                <div className="method-text">
                  <div className="method-name">Mobile Money</div>
                  <div className="method-sub">MTN, Airtel</div>
                </div>
                <div className="method-radio">
                  {paymentType === 'mobile' && <CheckIcon />}
                </div>
              </div>

              <div
                className={`method-item ${paymentType === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentType('card')}
              >
                <div className="method-icon-wrap"><CardIcon /></div>
                <div className="method-text">
                  <div className="method-name">Card</div>
                  <div className="method-sub">Visa / Mastercard</div>
                </div>
                <div className="method-radio">
                  {paymentType === 'card' && <CheckIcon />}
                </div>
              </div>

            </div>

            {paymentType === 'mobile' && (
              <div className="fields">

                <div className="field">
                  <label>Select Network</label>

                  <div className="mno-grid">
                    {networks.map(net => (
                      <div
                        key={net.id}
                        className={`mno-card ${provider === net.id ? 'active' : ''}`}
                        onClick={() => setProvider(net.id)}
                      >
                        <img src={net.logo} alt={net.name} />
                      </div>
                    ))}
                  </div>

                </div>

                <div className="field">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    placeholder={provider === 'mtn' ? '0960 000 000' : '0970 000 000'}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                </div>

              </div>
            )}

            {paymentType === 'card' && (
              <div className="fields">
                <div className="field">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardNo}
                    onChange={e =>
                      setCardNo(
                        e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()
                      )
                    }
                    required
                  />
                </div>

                <div className="field">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    required
                  />
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={e => setExpiry(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={e => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}


            <button type="submit" className="submit-btn" disabled={loading || !amount}>
              {loading
                ? <><div className="spinner" />Processing…</>
                : <>Pay {amount ? `$${parseFloat(amount).toLocaleString('en', { minimumFractionDigits: 2 })}` : '$0.00'}</>
              }
            </button>


          </form>
        </main>
      </div>
    </>
  );
}


//  {/* Method */}
//             <div className="section-label">Payment Method</div>
//             <div className="method-list">
//               {methods.map(m => (
//                 <div
//                   key={m.id}
//                   className={`method-item ${method === m.id ? 'active' : ''}`}
//                   onClick={() => setMethod(m.id)}
//                 >
//                   <div className="method-icon-wrap">{m.icon}</div>
//                   <div className="method-text">
//                     <div className="method-name">{m.label}</div>
//                     <div className="method-sub">{m.sub}</div>
//                   </div>
//                   <div className="method-eta">{m.eta}</div>
//                   <div className="method-radio">
//                     {method === m.id && <CheckIcon />}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Bank Transfer — show virtual account */}
//             {method === 'bank_transfer' && (
//               <>
//                 <div className="section-label">Your Virtual Account</div>
//                 <div className="va-card">
//                   <div className="va-header">Transfer to this account</div>
//                   <div className="va-row">
//                     <span className="va-key">Account Number</span>
//                     <div className="va-number-row">
//                       <span className="va-number">{virtualAccount.number}</span>
//                       <button
//                         type="button"
//                         className={`copy-btn ${copied ? 'copied' : ''}`}
//                         onClick={handleCopy}
//                       >
//                         <CopyIcon />{copied ? 'Copied!' : 'Copy'}
//                       </button>
//                     </div>
//                   </div>
//                   <div className="va-row">
//                     <span className="va-key">Bank</span>
//                     <span className="va-val">{virtualAccount.bank}</span>
//                   </div>
//                   <div className="va-row">
//                     <span className="va-key">Account Name</span>
//                     <span className="va-val">{virtualAccount.name}</span>
//                   </div>
//                   <div className="va-note">
//                     Transfer any amount to the account above. Your wallet balance will be credited instantly once the payment is confirmed.
//                   </div>
//                 </div>
//                 <p className="info-note">No further action needed — just complete your transfer.</p>
//               </>
//             )}

// {/* Mobile Money */}
// {method === 'mobile_money' && (
//   <div className="fields">
//     <div className="field">
//       <label>Provider</label>
//       <select value={provider} onChange={e => setProvider(e.target.value)} required>
//         <option value="">Select provider…</option>
//         <option value="mtn">MTN Mobile Money</option>
//         <option value="airtel">Airtel Money</option>
//         <option value="zamtel">Zamtel Kwacha</option>
//       </select>
//     </div>
//     <div className="field">
//       <label>Mobile Number</label>
//       <input type="tel" placeholder="0971 000 000" value={phone} onChange={e => setPhone(e.target.value)} required />
//     </div>
//   </div>
// )}

//             {/* Card */}
//             {method === 'card' && (
//               <div className="fields">
//                 <div className="field">
//                   <label>Card Number</label>
//                   <input
//                     type="text"
//                     placeholder="0000 0000 0000 0000"
//                     maxLength={19}
//                     value={cardNo}
//                     onChange={e => setCardNo(e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim())}
//                     required
//                   />
//                 </div>
//                 <div className="field">
//                   <label>Cardholder Name</label>
//                   <input type="text" placeholder="Jane Doe" value={cardName} onChange={e => setCardName(e.target.value)} required />
//                 </div>
//                 <div className="field-row">
//                   <div className="field">
//                     <label>Expiry</label>
//                     <input type="text" placeholder="MM/YY" maxLength={5} value={expiry} onChange={e => setExpiry(e.target.value)} required />
//                   </div>
//                   <div className="field">
//                     <label>CVV</label>
//                     <input type="password" placeholder="•••" maxLength={4} value={cvv} onChange={e => setCvv(e.target.value)} required />
//                   </div>
//                 </div>
//               </div>
//             )}