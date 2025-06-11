//rafce
'use client'
import React, { useEffect, useState } from 'react'
import ProfileCard from './profileCard'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  let [displayProfile, setDisplayProfile] = useState('hidden')
  let [user, setUser] = useState(null)
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

  function navigateLogin() {
    router.push('/login');
  }

  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  function handleTitleClick() {
  if (user) {
    router.push('/home');
  } else {
    router.push('/');
  }
}


  return (
    <nav className='flex justify-between items-center border-2 min-w-full min-h-20 rounded-md pl-3 pr-3 sticky top-0 bg-[#0a0014]'>
        <button className='text-2xl font-semibold hover:text-blue-600 transition-colors
        active:scale-95 focus:ring-2 hover:bg-gray-900 focus:outline-none focus:ring-blue-500 transition transform'
         onClick={handleTitleClick} >Rock Paper Scissors</button>
        <div className='flex justify-between gap-3 min-w-38'>
            <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3
            active:scale-95 focus:ring-2 hover:bg-gray-900 focus:outline-none focus:ring-blue-500 transition transform'
            onClick={goToRankings}>Rankings</button>
            {user ? (
              <>
                <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3
                active:scale-95 focus:ring-2 hover:bg-gray-900 focus:outline-none focus:ring-blue-500 transition transform'
                 onClick={toggleProfile}>Profile</button>
                <ProfileCard displayType={displayProfile}/>
              </>
            ) : (
              <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3
              active:scale-95 focus:ring-2 hover:bg-gray-900 focus:outline-none focus:ring-blue-500 transition transform'
               onClick={navigateLogin}>Login</button>
            )
        }
        </div>
    </nav>
  )
}

export default Navbar