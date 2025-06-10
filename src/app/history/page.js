'use client';
import clsx from 'clsx';
import Navbar from "@/components/navbar";
import { useEffect, useState } from 'react';

// match history page, based on leaderboard page
export default function historyPage() {
  const [currentUser, setCurrentUser] = useState('You');
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {

    fetch('/api/playerStats')
      .then(res => res.json())
      .then(data => {

        const userEmail = data[0].username;
        setCurrentUser(userEmail);

        // then fetch match history
        fetch('/api/gameHistory')
          .then(res => res.json())
          .then(data => {
            data.sort((a, b) => new Date(b.played_at) - new Date(a.played_at));
            const listHistory = data.map((game, index) => ({
              match: index + 1,
              username: userEmail,
              opponent: 'Bot',
              result: `${game.result.toUpperCase()} (${game.player_choice} vs ${game.bot_choice})`,
              date: new Date(game.played_at).toLocaleString('en-US'),
            }));
            setHistoryData(listHistory);
          });
      });
  }, []);
  
  // tailwind css classes from cheat sheet: https://www.creative-tim.com/twcomponents/cheatsheet/
  // or, from examples in docs: https://tailwindcss.com/docs/installation/using-vite

  return (
        <>
      <Navbar />
    {/* make separate divs for the screen and the contents */}
    {/* make the black background take up the whole screen*/}
    <div className="min-h-screen bg-black px-4 py-10 text-white font-[var(--font-press-start)]">
        {/* set the max width of the table to 64rem, or 1024 pixels, 
        centered horizontally */}
      <div className="max-w-5xl mx-auto">
        {/* large bold title */}
        <h1 className="text-3xl text-green-400 mb-2"> Match History📈</h1>
        {/* subtext, pink, spacing on the bottom and top */}
        <p className="text-pink-300 text-xs mb-8 mt-1">History of all matches you have played</p>

        {/* rounded edges and slight shadow for the chart */}
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-pink-500 bg-black bg-opacity-50">
             {/* make an html table: https://www.w3schools.com/html/html_tables.asp 
             make it span the whole width */}
          <table className="min-w-full">
            {/* set the background and text color, center it */}
            <thead className="bg-pink-500 bg-opacity-30 text-green-300 text-center text-xs">
              <tr>
                {/* make all of the headers, with a bit of padding */}
                <th className="p-3">MATCH</th>
                <th className="p-3">USERNAME</th>
                <th className="p-3">OPPONENT</th>
                <th className="p-3">RESULT</th>
                <th className="p-3">DATE</th>
              </tr>
            </thead>
            {/* loop through the data using .map, and use it to fill out the cells in the row,  
            similar to here: https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/  */}
            <tbody>
              {historyData.map((player, index) => (
                <tr key={player.match}
                // use clsx for conditional styling
                // https://nextjs.org/learn/dashboard-app/css-styling
                className={clsx(
                    // put a border on top of them all and make pink on hover
                    'border-t border-pink-500 hover:bg-pink-500 hover:bg-opacity-10 transition',
                    // use startsWith to see if it's a win or loss, and color it:
                    // https://www.w3schools.com/jsref/jsref_startswith.asp
                    player.result.startsWith('WIN') && 'bg-green-100/10 text-green-300 font-bold',
                    player.result.startsWith('LOSE') && 'bg-red-100/10 text-red-300 font-bold'
                )}
                >
                {/* fill out the cells, using the data */}
                <td className="p-3 text-center">{player.match}</td>
                <td className="p-3 text-center">{player.username}</td>
                <td className="p-3 text-center">{player.opponent}</td>
                <td className="p-3 text-center">{player.result}</td>
                <td className="p-3 text-center">{player.date}</td>
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
