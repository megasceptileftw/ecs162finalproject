//rafce
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center border-2 min-w-full min-h-20 rounded-md pl-3 pr-3">
        <div className='text-2xl font-semibold'>Rock Paper Scissors</div>
        <div className='flex justify-between gap-3 min-w-38'>
            <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3'>Rankings</button>
            <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3'>Profile</button>
        </div>
    </nav>
  )
}

export default Navbar