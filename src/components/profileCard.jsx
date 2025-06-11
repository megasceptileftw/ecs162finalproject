import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'



// the ProfileCard component, shows user stats and buttons
const ProfileCard = ({ displayType }) => {
  const router = useRouter();
  // incoming displayType with extra styles to build class name
  let classType = `${displayType} flex-col justify-center absolute mt-18 border-2 p-6 bg-[#0a0014] rounded-md`

  // state that stores the players stats from supabase
  const [stats, setStats] = useState()

  // run this once:
  useEffect(() => {
    fetch('/api/playerStats') // get stats from supabase
      .then((res) => res.json()) // convert to json
      .then((data) => setStats(data[0])) // save the first player in the data
  }, [])

  // if stats havent loaded yet don't show anything 
  if (!stats) return null

  // function takes the user to the match history page
  function navigateHistory() {
    router.push('/history');
  }


  // function logs the user out by calling a logout route
  async function logout() {
    let res = await fetch('/auth/signout', {
      method: 'POST',
    })
    if (res.ok) {
      window.location.href = '/'
    }
  }

  return (
    // main profile card container classType controls visibility + layout (passed in as prop)
    <div className={classType}>
      {/* avatar circle centered, rounded border, large icon in the middle */}
      <div className="self-center w-24 h-24 rounded-full border-2 border-pink-500 flex items-center justify-center text-3xl mb-4">
      👤
      </div>
       {/* centered stat lines */}
      <div className="self-center">Score: {stats.score}</div>
      <div className="self-center">Total: {stats.total_games}</div>
      <div className="self-center">Wins: {stats.wins}</div>
      <div className="self-center">Losses: {stats.losses}</div>
      <div className="self-center">Draws: {stats.draws}</div>
      {/* button for viewing match history centered, bordered, subtle hover/focus effects */}
      <button className="self-center border rounded-sm mb-2 p-1 text-sm
      active:scale-95 focus:ring-2 hover:bg-gray-800 focus:outline-none focus:ring-blue-500 transition transform" onClick={navigateHistory}>Match History</button>
      {/* logout button similar style but with red text */}
      <button className="self-center border rounded-sm p-1 text-sm text-red-600
      active:scale-95 focus:ring-2 hover:bg-gray-800 focus:outline-none focus:ring-blue-500 transition transform" onClick={logout}>Logout</button>
    </div>
  )
}
export default ProfileCard
