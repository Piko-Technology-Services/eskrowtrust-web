// lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: Method;
  body?: any;
  headers?: Record<string, string>;
}

const getToken = () => {
  if (typeof document === 'undefined') return null;

  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='));

  return match ? match.split('=')[1] : null;
};

export async function apiRequest(
  endpoint: string,
  options: RequestOptions = {}
) {
  const token = getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

export const DashboardAPI = {
  get: () => apiRequest('/dashboard'),
};

export const WalletAPI = {
  deposit: (payload: { amount: number, phone: string, mno: string }) =>
    apiRequest('/wallet/deposit', {
      method: 'POST',
      body: payload,
    }),
};

// AUTH HELPERS

export const AuthAPI = {
  register: (payload: any) =>
    apiRequest('/auth/register', { method: 'POST', body: payload }),

  login: (payload: any) =>
    apiRequest('/auth/login', { method: 'POST', body: payload }),

  forgotPassword: (payload: any) =>
    apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: payload,
    }),

  resetPassword: (payload: any) =>
    apiRequest('/auth/reset-password', {
      method: 'POST',
      body: payload,
    }),

  completeProfile: (payload: any) =>
    apiRequest('/auth/complete-profile', {
      method: 'POST',
      body: payload,
    }),
};