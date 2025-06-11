'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import { createClient } from '@/utils/supabase/client'

export default function SignUpPage() {
  // allows for page navigation
  const router = useRouter()

  // saves the email and password the user types
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // connects to supabase 
  const supabase = createClient()

  // function runs when the user clicks the "Create Account" button
  const handleSignUp = async () => {

    // try to sign the user up with the email and password they entered
    const {data,error} = await supabase.auth.signUp({
      email,
      password,
    });

    // if theres an error, 
    if (error) {
      // show a message
      alert(`Sign up failed: ${error.message}`);
    } else {
      // If sign up worked, ask them to check their email
     alert('Please check your inbox to finish making your account');
      // then send them to the login page
     router.push('/login');
    }
  }

  return (
    <>
      <Navbar />

      {/* centered sign-up screen
       full height minus navbar, horizontally and vertically centered */}
      <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 text-white font-[var(--font-press-start)]">
        
        {/* sign-up card container
         max width, padding, border, rounded corners, dark background, and shadow */}
        <div className="w-full max-w-md border border-pink-500 rounded-xl p-8 bg-black bg-opacity-50 shadow-lg">
          
          {/* page title
           large green text, centered, with spacing below */}
          <h1 className="text-2xl text-center text-green-400 mb-8">Sign Up</h1>

          {/* email label
           small green text with bottom spacing */}
          <label className="block text-green-400 text-xs mb-2">Email</label>

          {/* email input
           full width, padded, bordered, rounded */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          />

          {/* password label */}
          <label className="block text-green-400 text-xs mb-2">Password</label>

          {/* password input
           similar styling to email input */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded"
          />

          {/* create account button
           wide, bright, rounded, with hover/focus/press effects */}
          <button
            onClick={handleSignUp}
            className="w-full py-3 bg-pink-500 text-black rounded-lg transition font-bold tracking-wider
            active:scale-95 focus:ring-2 hover:bg-pink-400 focus:outline-none focus:ring-blue-500 transform"
          >
            Create Account
          </button>
        </div>
      </main>
    </>
  )
}
