'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from "@/components/navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      router.push('/home');
    }
  };

  return (
    <>
      <Navbar />
    
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 text-black bg-white">
      <div className="w-full max-w-sm border border-gray-300 rounded-xl p-8 shadow-md mt-12">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded 
                    focus:outline-none focus:ring-2 focus:ring-green-400 
                    focus:border-transparent transition-all duration-150"
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded 
                    focus:outline-none focus:ring-2 focus:ring-green-400 
                    focus:border-transparent transition-all duration-150"
        />

        <button
          onClick={handleLogin}
            className="btn-emerald"
        >
          Continue
        </button>
      </div>
    </main>

    </>
  );
}
