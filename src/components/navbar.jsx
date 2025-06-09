//rafce
'use client'
import React, { useState } from 'react'
import ProfileCard from './profileCard'
import { useRouter } from 'next/navigation';

const Navbar = () => {
  let [displayProfile, setDisplayProfile] = useState('hidden')
  const router = useRouter();
  function toggleProfile() {
    if (displayProfile === 'hidden'){
      setDisplayProfile('flex')
    }
    else{
    setDisplayProfile('hidden')
    }
  }
  function goToRankings() {
    router.push('/rankings')
  }
  return (
    <nav className="flex justify-between items-center border-2 min-w-full min-h-20 rounded-md pl-3 pr-3">
        <div className='text-2xl font-semibold'>Rock Paper Scissors</div>
        <div className='flex justify-between gap-3 min-w-38'>
            <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3'onClick={goToRankings}>Rankings</button>
            <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3' onClick={toggleProfile}>Profile</button>
            <ProfileCard displayType={displayProfile}/>
        </div>
    </nav>
  )
}

export default Navbar