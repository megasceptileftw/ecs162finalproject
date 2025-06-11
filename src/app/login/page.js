'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

// the main function for the login page
export default function LoginPage() {
  
  // lets us change the page
  const router = useRouter()

  // state variables to store what the user types
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // connection to supabase
  const supabase = createClient()

  // function to log the user in when they click the button
  const handleLogin = async () => {
    const {data,error} = await supabase.auth.signInWithPassword({
      email, // use the email the user typed
      password // use the password the user typed
    });

    // if theres a problem,
    if (error) {
      // show an alert message
      alert(`Login failed: ${error.message}`);
    } else {// otherwise, go to the home page
      router.push('/home')
    }
  }

    return (
    <>
      <Navbar />

      {/* centered login screen
       full height minus navbar, centered both ways */}
      <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 text-white font-[var(--font-press-start)]">
        
        {/* login card container
         max width, padding, border, background, and shadow */}
        <div className="w-full max-w-md border border-pink-500 rounded-xl p-8 bg-black bg-opacity-50 shadow-lg">
          
          {/* login title
           centered, large green text with spacing below */}
          <h1 className="text-2xl text-center text-green-400 mb-8">Login</h1>

          {/* Email Box */}
          {/* small green text with spacing */}
          <label className="block text-green-400 text-xs mb-2">Email</label>
          
          {/* email input field
           full width, padded, styled with borders, colored text and focus effect */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-6 text-sm bg-black border border-pink-500 text-green-300 placeholder-pink-300 
            rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* password box */}
          <label className="block text-green-400 text-xs mb-2">Password</label>
          
          {/* password input field
           same style as email input, with margin below */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-8 text-sm bg-black border border-pink-500 text-green-300 placeholder-pink-300 
            rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* Login Button */}
          {/* full width, bright pink background, hover/focus effects, bold text */}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-pink-500 hover:bg-pink-400 text-black rounded-lg transition font-bold tracking-wider
            active:scale-95 focus:ring-2 hover:bg-pink-400 focus:outline-none focus:ring-blue-500 transform"
          >
            Continue
          </button>

          {/* link to create account
           small pink text, centered with underline on hover */}
          <Link
          href="/register"
          className="block mt-6 text-center text-xs text-pink-300 hover:underline transition"
        >
          Create Account
        </Link>
        </div>
      </main>
    </>
  );
}