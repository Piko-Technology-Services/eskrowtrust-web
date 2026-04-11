'use client';

import { useState } from 'react';
import { AuthAPI } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await AuthAPI.forgotPassword({ email });
      setMessage(res.status || 'Reset link sent');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
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
          --green:   #2d6a4f;
        }

        html, body { height: 100%; background: var(--bg); }

        .auth-shell {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: var(--bg);
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
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
          margin-bottom: 8px;
        }

        .auth-subtitle {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 28px;
          line-height: 1.5;
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

        .auth-success {
          font-size: 13px;
          color: var(--green);
          padding: 10px 12px;
          background: #edf7f2;
          border-radius: 8px;
          border: 1px solid #b7deca;
          margin-bottom: 16px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
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
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .auth-footer a:hover { text-decoration: underline; }

        @media (max-width: 420px) {
          .auth-card { padding: 28px 20px 24px; }
        }
      `}</style>

      <div className="auth-shell">
        <div className="auth-card">
          <span className="auth-logo">arc<span>.</span>hq</span>
          <div className="divider" />

          <p className="auth-eyebrow">Account recovery</p>
          <h1 className="auth-title">Forgot password?</h1>
          <p className="auth-subtitle">Enter your email and we'll send you a link to reset your password.</p>

          {error && <div className="auth-error">{error}</div>}
          {message && (
            <div className="auth-success">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
          </form>

          <p className="auth-footer">
            <a href="/login">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}