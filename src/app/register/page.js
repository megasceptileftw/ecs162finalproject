'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import { createClient } from '@/utils/supabase/client'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClient()

  const handleSignUp = async () => {

    const {data,error} = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(`Sign up failed: ${error.message}`);
    } else {
     alert('Please check your inbox to finish making your account');
     router.push('/login');
    }
  }

  return (
    <>
    <Navbar />
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 text-white font-[var(--font-press-start)]">
        <div className="w-full max-w-md border border-pink-500 rounded-xl p-8 bg-black bg-opacity-50 shadow-lg">
        <h1 className="text-2xl text-center text-green-400 mb-8">Sign Up</h1>

        <label className="block text-green-400 text-xs mb-2">Email</label>
        <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block text-green-400 text-xs mb-2">Password</label>
        <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded"
        />

        <button
          onClick={handleSignUp}
          className="w-full py-3 bg-pink-500 hover:bg-pink-400 text-black rounded-lg transition font-bold tracking-wider"
        >
          Create Account
        </button>
        </div>
    </main>
  </>
  )
}
