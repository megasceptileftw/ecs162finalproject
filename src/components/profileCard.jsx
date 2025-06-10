import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'




const ProfileCard = ({ displayType }) => {
  const router = useRouter();
  let classType = `${displayType} flex-col justify-center absolute mt-18 border-2 p-6`

  const [stats, setStats] = useState()
  useEffect(() => {
    fetch('/api/playerStats')
      .then((res) => res.json())
      .then((data) => setStats(data[0]))
  }, [])
  if (!stats) return null

  function navigateHistory() {
    router.push('/history');
  }


  async function logout() {
    let res = await fetch('/auth/signout', {
      method: 'POST',
    })
    if (res.ok) {
      window.location.href = '/'
    }
  }

  return (
    <div className={classType}>
      <div className="self-center w-24 h-24 rounded-full border-2 border-pink-500 flex items-center justify-center text-3xl mb-4">
      👤
      </div>
      <div className="self-center">Score: {stats.score}</div>
      <div className="self-center">Total: {stats.total_games}</div>
      <div className="self-center">Wins: {stats.wins}</div>
      <div className="self-center">Losses: {stats.losses}</div>
      <div className="self-center">Draws: {stats.draws}</div>
      <button className="self-center border rounded-sm mb-2 p-1 text-sm
      active:scale-95 focus:ring-2 hover:bg-gray-800 focus:outline-none focus:ring-blue-500 transition transform" onClick={navigateHistory}>Match History</button>
      <button className="self-center border rounded-sm p-1 text-sm text-red-600
      active:scale-95 focus:ring-2 hover:bg-gray-800 focus:outline-none focus:ring-blue-500 transition transform" onClick={logout}>Logout</button>
    </div>
  )
}
export default ProfileCard
