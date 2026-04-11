// app/(auth)/forgot-password/page.tsx

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>

        <p className="text-sm text-gray-500 mb-6">
          Enter your email to receive a reset link
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-500">{error}</div>
        )}

        {message && (
          <div className="mb-4 text-sm text-green-600">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          <a href="/login">Back to Login</a>
        </p>
      </div>
    </div>
  );
}