'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfileCard from './profileCard'

const Navbar = () => {
  const router = useRouter();
  let [displayProfile, setDisplayProfile] = useState('hidden')
  
  function toggleProfile() {
    if (displayProfile === 'hidden'){
      setDisplayProfile('flex')
    }
    else{
      setDisplayProfile('hidden')
    }
  }

  function handleRankingsClick() {
    router.push('/rankings');
  }

  function handleHomeClick() {
    router.push('/');
  }

  return (
    <nav className="backdrop-blur-md bg-white/70 shadow-md rounded-xl px-6 py-4 m-4 
                    flex items-center justify-between sticky top-0 z-50">
      
      {/* make text clickable */}
      <button
        onClick={handleHomeClick}
        className="text-2xl font-bold tracking-tight text-gray-800 
                   hover:text-green-600 transition-colors 
                   focus:outline-none"
      >Rock Paper Scissors</button>

      <div className="flex justify-between gap-3 min-w-38">
        <button className="btn-slate" onClick={handleRankingsClick}>Rankings</button>
        <button className="btn-slate" onClick={toggleProfile}>Profile</button>
        <ProfileCard displayType={displayProfile}/>
      </div>
    </nav>
  );
}

export default Navbar;
