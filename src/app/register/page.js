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
     alert('Sign up successful! Redirecting to home page...');
     router.push('/home');
    }
  }

  return (
    <>
    <Navbar />
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 text-black bg-white">
        <div className="w-full max-w-sm border border-gray-300 rounded-xl p-8 shadow-md mt-12">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded"
        />

        <button
            onClick={handleSignUp}
            className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700 transition"
        >
            Create Account
        </button>
        </div>
    </main>
  </>
  )
}
