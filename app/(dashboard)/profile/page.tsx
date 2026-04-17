'use client';

import { useRouter } from 'next/navigation';

const baseStyles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

:root {
  --bg:#f5f4f0; --surface:#fff; --border:#e8e6e0;
  --ink:#1a1916; --muted:#8a877e; --green:#2d6a4f;
}

.shell { font-family:'DM Sans',sans-serif; min-height:100vh; background:var(--bg); }

.topbar {
  position:fixed; top:0; left:0; right:0;
  height:56px; background:#fff; border-bottom:1px solid var(--border);
  display:flex; align-items:center; padding:0 20px; gap:12px;
}

 .back-btn {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid var(--border); background: transparent;
          color: var(--ink); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }

.topbar-title { font-family:'Syne'; font-weight:800; flex:1; }

.balance-pill {
  font-size:12px; background:var(--bg);
  padding:5px 10px; border-radius:20px;
}

.main {
  margin-top:56px; padding:24px 16px;
  max-width:520px; margin-left:auto; margin-right:auto;
}

.section-label {
  font-size:11px; text-transform:uppercase;
  color:var(--muted); margin-bottom:10px;
}

.card {
  background:#fff; border:1px solid var(--border);
  border-radius:16px; overflow:hidden;
}

.list-item {
  display:flex; justify-content:space-between;
  padding:14px; border-bottom:1px solid var(--border);
}

.list-item:last-child { border-bottom:none; }

.item-title { font-weight:500; }
.item-sub { font-size:12px; color:var(--muted); }

.amount.in { color:var(--green); }
.amount.out { color:var(--ink); }

.profile-card {
  background:#fff; border:1px solid var(--border);
  border-radius:16px; padding:20px; text-align:center;
  margin-bottom:20px;
}

.avatar-lg {
  width:60px; height:60px; border-radius:50%;
  background:#1a1916; color:#fff;
  display:flex; align-items:center; justify-content:center;
  margin:0 auto 10px;
}

.profile-name { font-weight:600; }
.profile-email { font-size:12px; color:var(--muted); }
`;

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

export default function ProfilePage() {
  const router = useRouter();

  return (
    <>
      <style>{`${baseStyles}`}</style>

      <div className="shell">
        <header className="topbar">
          <button className="back-btn" onClick={() => router.back()}><BackIcon /></button>
          <div className="topbar-title">Profile</div>
          <div className="balance-pill">Verified</div>
        </header>

        <main className="main">
          <div className="profile-card">
            <div className="avatar-lg">JD</div>
            <div className="profile-name">Jane Doe</div>
            <div className="profile-email">jane@example.com</div>
          </div>

          <div className="section-label">Account</div>

          <div className="card">
            <div className="list-item"><span>Phone</span><span>+260 97 0000000</span></div>
            <div className="list-item"><span>Country</span><span>Zambia</span></div>
            <div className="list-item"><span>Currency</span><span>USD</span></div>
          </div>
        </main>
      </div>
    </>
  );
}