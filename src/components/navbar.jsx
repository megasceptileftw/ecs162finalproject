//rafce
'use client'
import React, { useEffect, useState } from 'react'
import ProfileCard from './profileCard'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

// the top navigation bar that appears on every page
const Navbar = () => {
  // state to control whether the profile card is shown or hidden
  let [displayProfile, setDisplayProfile] = useState('hidden')
  // state to store the current user info
  let [user, setUser] = useState(null)

  // router so we can move between pages
  const router = useRouter();

  // function shows or hides the profile card
  function toggleProfile() {
    if (displayProfile === 'hidden'){
      setDisplayProfile('flex') // show
    }
    else{
    setDisplayProfile('hidden') // hide
    }
  }

  // takes the user to the rankings page
  function goToRankings() {
    router.push('/rankings')
  }

  // sends the user to the login page
  function navigateLogin() {
    router.push('/login');
  }

  // set up supabase client
  const supabase = createClient();

  // run once after page loads:
  useEffect(() => {
    const fetchUser = async () => {
      try { // try to get the current user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch(error) { // show error if there's a problem
        console.error('Error fetching user:', error);
        setUser(null); // user is set to null if there's an error
      }
    };
    fetchUser();
  }, []);

  // when the title is clicked send user to the home page or default page
  function handleTitleClick() {
  if (user) {
    router.push('/home'); // If logged in go to /home
  } else {
    router.push('/');  // If not go to /
  }
}

 // the html that dispays on screen
  return (
    // main navbar container; horizontal layout, spaced items, dark background, sticky at top
    <nav className='flex justify-between items-center border-2 min-w-full min-h-20 rounded-md pl-3 pr-3 sticky top-0 bg-[#0a0014]'>
      {/* website title button. large text, hover/focus effects, smooth transitions */}
        <button className='text-2xl font-semibold hover:text-blue-600 transition-colors
          active:scale-95 focus:ring-2 hover:bg-gray-900 focus:outline-none focus:ring-blue-500 transition transform'
          onClick={handleTitleClick}>
          Rock Paper Scissors
        </button>
        {/* right-side container for buttons
         flexible layout, spacing between buttons */}
        <div className='flex justify-between gap-3 md:min-w-38'>
          {/* styled border button with hover/press effects */}
            <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3
              active:scale-95 focus:ring-2 hover:bg-gray-900 focus:outline-none focus:ring-blue-500 transition transform'
              onClick={goToRankings}>
                {/* show Rankings text only on medium screens and up */}
              <span className='hidden md:inline'>Rankings</span>
              {/* show trophy emoji on small screens */}
              <span className='md:hidden'>🏆</span>
            </button>

            {user ? (
              <>
              {/* profile button same style as other buttons, triggers profile card */}
                <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3
                active:scale-95 focus:ring-2 hover:bg-gray-900 focus:outline-none focus:ring-blue-500 transition transform'
                 onClick={toggleProfile}>
                  {/* show Profile text only on medium and larger screens */}
                 <span className='hidden md:inline'>Profile</span>
                 {/* show icon on small screens */}
                 <span className='md:hidden'>👤</span>
                </button>
                <ProfileCard displayType={displayProfile}/>
              </>
            ) : (
              // login button styled like the others, shown if no user is logged in
              <button className='flex items-center border-2 max-h-10 rounded-sm text-base p-3
                active:scale-95 focus:ring-2 hover:bg-gray-900 focus:outline-none focus:ring-blue-500 transition transform'
                onClick={navigateLogin}>
                  {/* show Login text only on medium+ screens */}
                <span className='hidden md:inline'>Login</span>
                {/* Show lock icon on small screens */}
                <span className='md:hidden'>🔒</span>
              </button>
            )
        }
        </div>
    </nav>
  )
}

export default Navbar