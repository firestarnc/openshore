'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Send password to SERVER (Secure API)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // 2. Success! Set the session token
        localStorage.setItem('admin_session', 'true');
        router.push('/admin');
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-sm border border-neutral-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#C19A6B]">Admin Access</h1>
          <p className="text-gray-400 text-sm mt-2">Enter your credentials to manage the studio.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-xs uppercase font-bold text-gray-400 tracking-widest mb-2 block">
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 border border-gray-200 rounded focus:border-[#C19A6B] outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          <button 
            disabled={loading}
            className="w-full bg-[#C19A6B] text-white py-4 font-bold tracking-widest text-sm rounded hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {loading ? "VERIFYING..." : "ENTER DASHBOARD"}
          </button>
        </form>
        
        <div className="text-center mt-8">
            <Link href="/" className="text-xs text-gray-400 hover:text-black">
                ← Back to Website
            </Link>
        </div>
      </div>
    </main>
  );
}