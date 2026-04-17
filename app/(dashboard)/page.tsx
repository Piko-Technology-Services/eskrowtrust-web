"use client";

import { useState, useEffect, useRef } from "react";
import { redirect, useRouter } from 'next/navigation';
import { removeToken } from '@/lib/auth';
import path from "path";

// ─── Icons ────────────────────────────────────────────────────────────────────

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const ReceiveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="8 17 12 21 16 17" /><line x1="12" y1="3" x2="12" y2="21" />
  </svg>
);

const navLinks = [
  { label: "Home", path: "/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { label: "Transactions", path: "/transactions", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { label: "Profile", path: "/profile", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label: "Settings", path: "/settings", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
];

const transactions = [
  { name: "Netflix Subscription", date: "Today, 9:41 AM",  amount: "-$15.99",   out: true,  avatar: "NF" },
  { name: "Salary Deposit",       date: "Today, 8:00 AM",  amount: "+$3,200.00", out: false, avatar: "SD" },
  { name: "Uber Ride",            date: "Yesterday",        amount: "-$12.40",   out: true,  avatar: "UB" },
  { name: "John Doe",             date: "Yesterday",        amount: "+$250.00",  out: false, avatar: "JD" },
  { name: "Amazon Purchase",      date: "Apr 12",           amount: "-$89.00",   out: true,  avatar: "AZ" },
  { name: "Freelance Payment",    date: "Apr 11",           amount: "+$600.00",  out: false, avatar: "FP" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [activeNav, setActiveNav]         = useState("Home");
  const [balanceVisible, setBalanceVisible] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();



  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node))
        setSidebarOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarOpen]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleLogout = () => { removeToken(); router.push('/login'); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #f5f4f0;
          --surface:   #ffffff;
          --border:    #e8e6e0;
          --ink:       #1a1916;
          --muted:     #8a877e;
          --accent:    #2a2926;
          --green:     #2d6a4f;
          --green-bg:  #edf7f2;
          --red:       #c1440e;
          --sidebar-w: 256px;
          --nav-h:     56px;
        }

        html, body { height: 100%; background: var(--bg); }

        .shell { font-family: 'DM Sans', sans-serif; color: var(--ink); min-height: 100vh; display: flex; flex-direction: column; }

        /* Topbar */
        .topbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          height: var(--nav-h); background: var(--surface);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; padding: 0 20px; gap: 16px;
        }
        .topbar-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 17px; letter-spacing: -0.5px; color: var(--ink); flex: 1; }
        .topbar-logo span { color: var(--muted); font-weight: 700; }

        .icon-btn {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid var(--border); background: transparent;
          color: var(--ink); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .icon-btn:hover { background: var(--bg); }

        .avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--accent); color: #fff; font-size: 12px; font-weight: 600;
          display: flex; align-items: center; justify-content: center;
          letter-spacing: 0.5px; flex-shrink: 0;
          cursor: pointer;
        }
        
        .avatar:hover { 
          background: white; color: var(--accent); border: 1px solid var(--accent);
          
          }

        .topbar-logout {
          display: none; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 500;
          color: var(--muted); background: none; border: 1px solid var(--border);
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: color 0.13s, border-color 0.13s, background 0.13s;
        }
        .topbar-logout:hover { color: var(--red); border-color: var(--red); background: #fff1ec; }
        @media (min-width: 480px) { .topbar-logout { display: flex; } }

        /* Sidebar overlay */
        .sidebar-overlay { display: none; position: fixed; inset: 0; z-index: 60; background: rgba(26,25,22,0.35); opacity: 0; transition: opacity 0.25s; }
        .sidebar-overlay.open { display: block; opacity: 1; }

        /* Sidebar */
        .sidebar {
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 70;
          width: var(--sidebar-w); background: var(--surface);
          border-right: 1px solid var(--border);
          display: flex; flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .sidebar.open { transform: translateX(0); }
        .sidebar-head { height: var(--nav-h); display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
        .sidebar-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; letter-spacing: -0.5px; }
        .sidebar-logo span { color: var(--muted); }
        .sidebar-nav { flex: 1; overflow-y: auto; padding: 12px 10px; display: flex; flex-direction: column; gap: 2px; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; font-size: 14px; font-weight: 400; color: var(--muted); cursor: pointer; border: none; background: none; width: 100%; text-align: left; transition: background 0.13s, color 0.13s; }
        .nav-item:hover { background: var(--bg); color: var(--ink); }
        .nav-item.active { background: var(--bg); color: var(--ink); font-weight: 500; }
        .nav-item svg { opacity: 0.6; flex-shrink: 0; }
        .nav-item.active svg { opacity: 1; }
        .sidebar-footer { padding: 12px 10px; border-top: 1px solid var(--border); }
        .logout-btn { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; font-size: 14px; color: var(--red); cursor: pointer; border: none; background: none; width: 100%; text-align: left; transition: background 0.13s; font-family: 'DM Sans', sans-serif; font-weight: 400; }
        .logout-btn:hover { background: #fff1ec; }

        /* Main */
        .main {
          margin-top: var(--nav-h);
          padding: 24px 16px 56px;
          flex: 1;
          max-width: 520px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        .page-header { margin-bottom: 20px; }
        .page-label { font-size: 11px; font-weight: 500; letter-spacing: 1.2px; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
        .page-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; letter-spacing: -0.6px; color: var(--ink); }

        /* ── Balance Card ── */
        .balance-card {
          background: var(--ink);
          border-radius: 20px;
          padding: 26px 22px 22px;
          margin-bottom: 14px;
          position: relative;
          overflow: hidden;
        }

        .balance-card::after {
          content: '';
          position: absolute;
          width: 240px; height: 240px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
          right: -80px; top: -80px; pointer-events: none;
        }

        .bc-inner { position: relative; z-index: 1; }

        .bc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }

        .bc-label { font-size: 10px; font-weight: 500; letter-spacing: 1.4px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px; }

        .bc-amount {  font-size: 38px; font-weight: 800; letter-spacing: -2px; color: #fff; line-height: 1; }
        .bc-hidden { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; letter-spacing: 8px; color: rgba(255,255,255,0.35); line-height: 1; }

        .eye-btn {
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; color: rgba(255,255,255,0.5);
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.15s; flex-shrink: 0;
        }
        .eye-btn:hover { background: rgba(255,255,255,0.13); }

        .bc-bottom { display: flex; align-items: center; justify-content: space-between; }

        .bc-currency { display: flex; align-items: center; gap: 7px; }
        .currency-flag { font-size: 14px; line-height: 1; }
        .currency-code { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.45); letter-spacing: 0.3px; }
        .bc-card-num { font-size: 12px; color: rgba(255,255,255,0.25); letter-spacing: 2px; }

        /* ── Action Cards ── */
        .action-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 22px; }

        .action-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 18px 14px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
          cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .action-card:hover { border-color: #c8c5be; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }

        .action-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .action-icon.send    { background: var(--ink); color: #fff; }
        .action-icon.receive { background: var(--green-bg); color: var(--green); }

        .action-label { font-size: 14px; font-weight: 600; color: var(--ink); letter-spacing: -0.2px; }
        .action-sub   { font-size: 11px; color: var(--muted); margin-top: 1px; }

        /* ── Transactions ── */
        .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .section-title { font-size: 11px; font-weight: 500; letter-spacing: 0.9px; text-transform: uppercase; color: var(--muted); }
        .section-link { font-size: 12px; font-weight: 500; color: var(--muted); text-decoration: none; transition: color 0.13s; }
        .section-link:hover { color: var(--ink); }

        .txn-list { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }

        .txn-item { display: flex; align-items: center; gap: 12px; padding: 13px 16px; border-bottom: 1px solid var(--border); transition: background 0.12s; cursor: default; }
        .txn-item:last-child { border-bottom: none; }
        .txn-item:hover { background: var(--bg); }

        .txn-avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; color: var(--muted); flex-shrink: 0; letter-spacing: 0.3px; }

        .txn-info { flex: 1; min-width: 0; }
        .txn-name { font-size: 13px; font-weight: 500; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; }
        .txn-date { font-size: 11px; color: var(--muted); }

        .txn-amount { font-size: 13px; font-weight: 600; letter-spacing: -0.2px; flex-shrink: 0; }
        .txn-amount.out { color: var(--ink); }
        .txn-amount.in  { color: var(--green); }
      `}</style>

      <div className="shell">
        <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

        {/* Sidebar */}
        <aside ref={sidebarRef} className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-head">
            <div className="sidebar-logo">arc<span>.</span>hq</div>
            <button className="icon-btn" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><CloseIcon /></button>
          </div>
          <nav className="sidebar-nav">
            {navLinks.map((link) => (
              <button  key={link.label} className={`nav-item ${activeNav === link.label ? "active" : ""}`}
                onClick={() => { setActiveNav(link.label); setSidebarOpen(false); router.push(link.path); }}>
                {link.icon}{link.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}><LogoutIcon />Log out</button>
          </div>
        </aside>

        {/* Topbar */}
        <header className="topbar">
          <button className="icon-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><MenuIcon /></button>
          <div className="topbar-logo">arc<span>.</span>hq</div>
          <button className="topbar-logout" onClick={handleLogout}><LogoutIcon />Log out</button>
          <div className="avatar" onClick={() => router.push('/profile')}>JD</div>
        </header>

        {/* Content */}
        <main className="main">
          <div className="page-header">
            <p className="page-label">Wallet</p>
            <h1 className="page-title">Good morning, Jane.</h1>
          </div>

          {/* Balance Card */}
          <div className="balance-card">
            <div className="bc-inner">
              <div className="bc-top">
                <div>
                  <div className="bc-label">Account Balance</div>
                  {balanceVisible
                    ? <div className="bc-amount">$1,000,000.00</div>
                    : <div className="bc-hidden">••••••</div>}
                </div>
                <button className="eye-btn" onClick={() => setBalanceVisible(v => !v)} aria-label="Toggle balance visibility">
                  {balanceVisible ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
              <div className="bc-bottom">
                <div className="bc-currency">
                  <span className="currency-flag">🇺🇸</span>
                  <span className="currency-code">USD · US Dollar</span>
                </div>
                <span className="bc-card-num">•••• 4291</span>
              </div>
            </div>
          </div>

          {/* Send / Receive */}
          <div className="action-row">
            <div className="action-card" onClick={() => router.push('/send')}>
              <div className="action-icon send"><SendIcon /></div>
              <div>
                <div className="action-label">Send Money</div>
                <div className="action-sub">Transfer funds</div>
              </div>
            </div>
            <div className="action-card" onClick={() => router.push('/deposit')}>
              <div className="action-icon receive"><ReceiveIcon /></div>
              <div>
                <div className="action-label">Add Money</div>
                <div className="action-sub">Deposit funds </div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="section-header">
            <div className="section-title">Transaction History</div>
            <a href="/transactions" className="section-link">See all →</a>
          </div>
          <div className="txn-list">
            {transactions.map((t) => (
              <div className="txn-item" key={t.name + t.date}>
                <div className="txn-avatar">{t.avatar}</div>
                <div className="txn-info">
                  <div className="txn-name">{t.name}</div>
                  <div className="txn-date">{t.date}</div>
                </div>
                <div className={`txn-amount ${t.out ? "out" : "in"}`}>{t.amount}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}