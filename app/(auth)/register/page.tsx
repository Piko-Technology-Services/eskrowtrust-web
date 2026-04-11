'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthAPI } from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await AuthAPI.register(form);
      setToken(res.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
          --bg:      #f5f4f0;
          --surface: #ffffff;
          --border:  #e8e6e0;
          --ink:     #1a1916;
          --muted:   #8a877e;
          --accent:  #2a2926;
          --red:     #c1440e;
        }

        html, body { height: 100%; background: var(--bg); }

        .auth-shell {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          background: var(--bg);
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 36px 32px 32px;
        }

        .auth-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 6px;
        }

        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.8px;
          color: var(--ink);
          margin-bottom: 28px;
        }

        .auth-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          letter-spacing: -0.5px;
          color: var(--ink);
          margin-bottom: 28px;
          display: block;
        }
        .auth-logo span { color: var(--muted); }

        .divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 28px;
        }

        /* Two-col grid for paired fields */
        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 14px;
        }

        .field label {
          font-size: 12px;
          font-weight: 500;
          color: var(--muted);
          letter-spacing: 0.3px;
        }

        .field input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          background: var(--bg);
          outline: none;
          transition: border-color 0.15s, background 0.15s;
        }

        .field input::placeholder { color: #c0bdb6; }
        .field input:focus {
          border-color: var(--accent);
          background: var(--surface);
        }

        .section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: var(--muted);
          margin: 20px 0 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .submit-btn {
          width: 100%;
          margin-top: 8px;
          padding: 11px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          letter-spacing: 0.2px;
          transition: opacity 0.15s;
        }
        .submit-btn:hover:not(:disabled) { opacity: 0.85; }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .auth-error {
          font-size: 13px;
          color: var(--red);
          padding: 10px 12px;
          background: #fff1ec;
          border-radius: 8px;
          border: 1px solid #f5cfc4;
          margin-bottom: 16px;
        }

        .auth-footer {
          margin-top: 20px;
          font-size: 13px;
          color: var(--muted);
        }
        .auth-footer a {
          color: var(--ink);
          font-weight: 500;
          text-decoration: none;
        }
        .auth-footer a:hover { text-decoration: underline; }

        @media (max-width: 420px) {
          .auth-card { padding: 28px 20px 24px; }
          .field-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="auth-shell">
        <div className="auth-card">
          <span className="auth-logo">arc<span>.</span>hq</span>
          <div className="divider" />

          <p className="auth-eyebrow">Get started</p>
          <h1 className="auth-title">Create account</h1>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>

            {/* ── Identity ── */}
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="+1 555 000"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="address">Address <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span></label>
              <input
                id="address"
                type="text"
                placeholder="123 Main St, City"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            {/* ── Security ── */}
            <div className="section-label">Security</div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="confirm">Confirm password</label>
              <input
                id="confirm"
                type="password"
                placeholder="••••••••"
                required
                onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
}