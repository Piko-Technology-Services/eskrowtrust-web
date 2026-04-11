"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { removeToken } from '@/lib/auth';

// ─── Icons (inline SVG to avoid extra deps) ──────────────────────────────────

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const navLinks = [
  {
    label: "Overview",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Projects",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Team",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const stats = [
  { label: "Total Revenue", value: "$48,295", change: "+12.5%", up: true },
  { label: "Active Users", value: "3,842", change: "+4.1%", up: true },
  { label: "Open Tickets", value: "27", change: "-8.3%", up: false },
  { label: "Conversion", value: "6.4%", change: "+1.2%", up: true },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close sidebar on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarOpen]);

  // Prevent body scroll when sidebar open on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleLogout = () => {
    // Replace with your actual logout logic (e.g. call API then redirect)
    removeToken();
    router.push('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:       #f5f4f0;
          --surface:  #ffffff;
          --border:   #e8e6e0;
          --ink:      #1a1916;
          --muted:    #8a877e;
          --accent:   #2a2926;
          --green:    #2d6a4f;
          --red:      #c1440e;
          --sidebar-w: 256px;
          --nav-h:    56px;
        }

        html, body { height: 100%; background: var(--bg); }

        .shell {
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ── Topbar ── */
        .topbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          height: var(--nav-h);
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center;
          padding: 0 20px;
          gap: 16px;
        }

        .topbar-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 17px;
          letter-spacing: -0.5px;
          color: var(--ink);
          flex: 1;
        }

        .topbar-logo span { color: var(--muted); font-weight: 700; }

        .icon-btn {
          width: 36px; height: 36px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--ink);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, border-color 0.15s;
        }
        .icon-btn:hover { background: var(--bg); }

        .avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          display: flex; align-items: center; justify-content: center;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        /* ── Sidebar overlay ── */
        .sidebar-overlay {
          display: none;
          position: fixed; inset: 0; z-index: 60;
          background: rgba(26,25,22,0.35);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .sidebar-overlay.open { display: block; opacity: 1; }

        /* ── Sidebar ── */
        .sidebar {
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 70;
          width: var(--sidebar-w);
          background: var(--surface);
          border-right: 1px solid var(--border);
          display: flex; flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          padding: 0;
        }
        .sidebar.open { transform: translateX(0); }

        .sidebar-head {
          height: var(--nav-h);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .sidebar-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: -0.5px;
        }
        .sidebar-logo span { color: var(--muted); }

        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 400;
          color: var(--muted);
          cursor: pointer;
          border: none; background: none; width: 100%; text-align: left;
          transition: background 0.13s, color 0.13s;
        }
        .nav-item:hover { background: var(--bg); color: var(--ink); }
        .nav-item.active { background: var(--bg); color: var(--ink); font-weight: 500; }
        .nav-item.active svg { opacity: 1; }
        .nav-item svg { opacity: 0.6; flex-shrink: 0; }

        .sidebar-footer {
          padding: 12px 10px;
          border-top: 1px solid var(--border);
        }

        .logout-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 400;
          color: var(--red);
          cursor: pointer;
          border: none; background: none; width: 100%; text-align: left;
          transition: background 0.13s;
          font-family: 'DM Sans', sans-serif;
        }
        .logout-btn:hover { background: #fff1ec; }
        .logout-btn svg { flex-shrink: 0; }

        /* ── Main content ── */
        .main {
          margin-top: var(--nav-h);
          padding: 32px 24px 48px;
          flex: 1;
        }

        .page-header {
          margin-bottom: 28px;
        }

        .page-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 4px;
        }

        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.8px;
          color: var(--ink);
        }

        /* ── Stats grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }

        @media (min-width: 640px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
        }

        .stat-label {
          font-size: 11px;
          letter-spacing: 0.5px;
          color: var(--muted);
          margin-bottom: 8px;
          font-weight: 400;
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--ink);
          margin-bottom: 4px;
        }

        .stat-change {
          font-size: 12px;
          font-weight: 500;
        }
        .stat-change.up { color: var(--green); }
        .stat-change.down { color: var(--red); }

        /* ── Content cards ── */
        .cards-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 640px) {
          .cards-row { grid-template-columns: 1fr 1fr; }
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
        }

        .card-title {
          font-size: 12px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 500;
          margin-bottom: 16px;
        }

        .activity-list { display: flex; flex-direction: column; gap: 12px; }

        .activity-item {
          display: flex; align-items: center; gap: 10px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .activity-item:last-child { border-bottom: none; padding-bottom: 0; }

        .activity-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        .activity-text { font-size: 13px; color: var(--ink); flex: 1; }
        .activity-time { font-size: 11px; color: var(--muted); flex-shrink: 0; }

        /* ── Topbar logout (desktop shortcut, hidden on very small screens) ── */
        .topbar-logout {
          display: none;
          align-items: center; gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          background: none;
          border: 1px solid var(--border);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.13s, border-color 0.13s, background 0.13s;
        }
        .topbar-logout:hover { color: var(--red); border-color: var(--red); background: #fff1ec; }

        @media (min-width: 480px) {
          .topbar-logout { display: flex; }
        }
      `}</style>

      <div className="shell">
        {/* ── Sidebar overlay ── */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* ── Sidebar ── */}
        <aside ref={sidebarRef} className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-head">
            <div className="sidebar-logo">arc<span>.</span>hq</div>
            <button className="icon-btn" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </button>
          </div>

          <nav className="sidebar-nav">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className={`nav-item ${activeNav === link.label ? "active" : ""}`}
                onClick={() => { setActiveNav(link.label); setSidebarOpen(false); }}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <LogoutIcon />
              Log out
            </button>
          </div>
        </aside>

        {/* ── Top navbar ── */}
        <header className="topbar">
          <button
            className="icon-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          <div className="topbar-logo">arc<span>.</span>hq</div>

          <button className="topbar-logout" onClick={handleLogout}>
            <LogoutIcon />
            Log out
          </button>

          <div className="avatar">JD</div>
        </header>

        {/* ── Page content ── */}
        <main className="main">
          <div className="page-header">
            <p className="page-label">Dashboard</p>
            <h1 className="page-title">Welcome back, Jane.</h1>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.change}</div>
              </div>
            ))}
          </div>

          {/* Cards row */}
          <div className="cards-row">
            <div className="card">
              <div className="card-title">Recent Activity</div>
              <div className="activity-list">
                {[
                  { text: "New user registration completed", time: "2m ago" },
                  { text: "Invoice #1048 marked as paid", time: "18m ago" },
                  { text: "Deployment to production succeeded", time: "1h ago" },
                  { text: "Support ticket #302 resolved", time: "3h ago" },
                ].map((item) => (
                  <div className="activity-item" key={item.text}>
                    <div className="activity-dot" />
                    <span className="activity-text">{item.text}</span>
                    <span className="activity-time">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-title">Quick Actions</div>
              <div className="activity-list">
                {[
                  { text: "Create new project", time: "→" },
                  { text: "Invite team member", time: "→" },
                  { text: "View reports", time: "→" },
                  { text: "Update billing info", time: "→" },
                ].map((item) => (
                  <div className="activity-item" key={item.text} style={{ cursor: "pointer" }}>
                    <div className="activity-dot" />
                    <span className="activity-text">{item.text}</span>
                    <span className="activity-time">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}