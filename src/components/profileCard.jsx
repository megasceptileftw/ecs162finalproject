import React from 'react'

const ProfileCard = ({displayType}) => {
    let classType = `${displayType} flex-col justify-center absolute mt-18 border-2 p-6`
    async function logout() {
      let res = await fetch('/auth/signout', {
        method: 'POST',
      })
      if (res.ok) {
        window.location.href = '/login'
      }
    }
  return (
    <div className={classType}>
        <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" className='self-center rounded-full max-w-20'></img>
        <div className='self-center'>Stats: 100</div>
        <div className='self-center'>W/L Ratio: 50/100</div>
        <div className='self-center'>Wins: 50</div>
        <div className='self-center'>Losses: 50</div>
        <button className='self-center display: block border rounded-sm mb-2 p-1 text-sm'>Match History</button>
        <button className='self-center display: block border rounded-sm p-1 text-sm text-red-600' onClick={logout}>Logout</button>
    </div>
  )
}

export default ProfileCard