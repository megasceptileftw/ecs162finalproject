//rafce
'use client'
import React, { useState } from 'react'
import ProfileCard from './profileCard'

const Navbar = () => {
  let [displayProfile, setDisplayProfile] = useState('hidden')
  function toggleProfile() {
    if (displayProfile === 'hidden'){
      setDisplayProfile('flex')
    }
    else{
    setDisplayProfile('hidden')
    }
  }
  return (
    <nav className="flex justify-between items-center border-2 min-w-full min-h-20 rounded-md pl-3 pr-3 sticky top-0">
        <div className='text-2xl font-semibold'>Rock Paper Scissors</div>
        <div className='flex justify-between gap-3 min-w-38'>
            <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3'>Rankings</button>
            <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3' onClick={toggleProfile}>Profile</button>
            <ProfileCard displayType={displayProfile}/>
        </div>
    </nav>
  )
}

export default Navbar