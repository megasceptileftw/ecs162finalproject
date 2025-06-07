'use client';
import clsx from 'clsx';
import Navbar from "@/components/navbar";

export default function rankingsPage() {
  const currentUser = 'You'; // replace with auth user later

  // temporary data, until the database works 
  const tempData = [
    { username: 'Player1', rank: 1, elo: 1520, winRate: 0.75, gamesPlayed: 100 },
    { username: 'Player2', rank: 2, elo: 1480, winRate: 0.72, gamesPlayed: 120 },
    { username: 'You', rank: 3, elo: 1440, winRate: 0.68, gamesPlayed: 95 },
    { username: 'Player3', rank: 4, elo: 140, winRate: 0.08, gamesPlayed: 5 },
  ];

  // function to return a award emoji if player is in top 3, or null if not
  function medalTopThree(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  }
  
  // tailwind css classes from cheat sheet: https://www.creative-tim.com/twcomponents/cheatsheet/
  // or, from examples in docs: https://tailwindcss.com/docs/installation/using-vite

  return (
    <><Navbar/>
    {/* make seperate divs for the screen and the contents */}
    {/* make the white background take up the whole screen */}
    <div className="min-h-screen bg-white p-10">
        {/*set the max width of the table to 64rem, or 1024 pixels, 
        centered horizontally, black text */}
      <div className="max-w-5xl mx-auto text-black">
        {/*large bold title*/}
        <h1 className="text-4xl font-bold text-left">  🏆Rankings </h1>
        {/*subtext, grey, spacing on the bottom and top*/}
        <p className="text-gray-500 mb-6 mt-2">Top-ranked players of all time</p>

        {/*rounded edges and slight shadow for the chart*/}
        <div className="overflow-x-auto rounded-2xl shadow ">
             {/* make an html table: https://www.w3schools.com/html/html_tables.asp 
             make it span the whole width */}
          <table className="min-w-full">
            {/*set the background and text color, center it*/}
            <thead className="bg-gray-100 text-gray-600 text-center">
              <tr>
                {/*make all of the headers, with a bit of padding*/}
                <th className="p-3">RANK</th>
                <th className="p-3">USERNAME</th>
                <th className="p-3">ELO</th>
                <th className="p-3">WIN RATE</th>
                <th className="p-3">GAMES PLAYED</th>
              </tr>
            </thead>
            {/*loop through the data using .map, and use it to fill out the cells in the row,  
            similar to here: https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/  */}
            <tbody>
              {tempData.map((player, index) => (
                <tr key={player.username}
                // use clsx for conditional styling
                // https://nextjs.org/learn/dashboard-app/css-styling
                className={clsx(
                    // put a border on top of them all and make grey on hover
                    'border-t hover:bg-gray-100',
                    // make every other one light gray by default
                    index % 2 === 1 && 'even:bg-gray-50',
                    // if the username is the logged in user, make it yellow
                    player.username === currentUser && 'bg-yellow-50 font-semibold'
                )}
                >
                {/*fill out the cells, using the data*/}
                <td className="p-3 text-center">{player.rank} {medalTopThree(player.rank)}</td>
                <td className="p-3 text-center">{player.username}</td>
                <td className="p-3 text-center">{player.elo}</td>
                <td className="p-3 text-center">{player.winRate*100}%</td>
                <td className="p-3 text-center">{player.gamesPlayed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}
