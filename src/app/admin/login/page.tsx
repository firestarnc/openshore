'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Check Password (Hardcoded as requested)
    if (password === 'Surefore890Hint') {
      // 2. Set a "Session" token in LocalStorage
      // (This tells the browser "I am logged in")
      localStorage.setItem('admin_session', 'true');
      
      // 3. Redirect to Dashboard
      router.push('/admin');
    } else {
      setError('Incorrect password');
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

          <button className="w-full bg-[#C19A6B] text-white py-4 font-bold tracking-widest text-sm rounded hover:bg-neutral-800 transition-colors">
            ENTER DASHBOARD
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