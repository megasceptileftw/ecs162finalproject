import React, { useEffect, useState } from 'react'

const ProfileCard = ({ displayType }) => {
  let classType = `${displayType} flex-col justify-center absolute mt-18 border-2 p-6`

  const [stats, setStats] = useState()
  useEffect(() => {
    fetch('/api/playerStats')
      .then((res) => res.json())
      .then((data) => setStats(data[0]))
  }, [])
  if (!stats) return null


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
      <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" className="self-center rounded-full max-w-20"/>
      <div className="self-center">Score: {stats.score}</div>
      <div className="self-center">Total: {stats.total_games}</div>
      <div className="self-center">Wins: {stats.wins}</div>
      <div className="self-center">Losses: {stats.losses}</div>
      <div className="self-center">Draws: {stats.draws}</div>
      <button className="self-center border rounded-sm mb-2 p-1 text-sm">Match History</button>
      <button className="self-center border rounded-sm p-1 text-sm text-red-600" onClick={logout}>Logout</button>
    </div>
  )
}

export default ProfileCard
