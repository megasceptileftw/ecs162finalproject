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
  
  

  return (
    <nav className="flex justify-between items-center border-2 min-w-full min-h-20 rounded-md pl-3 pr-3">
        <div className='text-2xl font-semibold'>Rock Paper Scissors</div>
        <div className='flex justify-between gap-3 min-w-38'>
            <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3'>Rankings</button>
            {user ? (
              <>
                <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3' onClick={toggleProfile}>Profile</button>
                <ProfileCard displayType={displayProfile}/>
              </>
            ) : (
              <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3' onClick={navigateLogin}>Login</button>
            )
        }
        </div>
    </nav>
  )
}

export default Navbar