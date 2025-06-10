'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClient()

  const handleLogin = async () => {
    const {data,error} = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(`Login failed: ${error.message}`);
    } else {
      router.push('/home')
    }
  }

  return (
    <>
      <Navbar />

      {/* CENTER LOGIN SCREEN */}
      <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 text-white font-[var(--font-press-start)]">
        <div className="w-full max-w-md border border-pink-500 rounded-xl p-8 bg-black bg-opacity-50 shadow-lg">
          <h1 className="text-2xl text-center text-green-400 mb-8">Login</h1>

          {/* Email Box */}
          <label className="block text-green-400 text-xs mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-6 text-sm bg-black border border-pink-500 text-green-300 placeholder-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* Password Box */}
          <label className="block text-green-400 text-xs mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-8 text-sm bg-black border border-pink-500 text-green-300 placeholder-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-pink-500 hover:bg-pink-400 text-black rounded-lg transition font-bold tracking-wider"
          >
            Continue
          </button>
        </div>
      </main>
    </>
  );
}