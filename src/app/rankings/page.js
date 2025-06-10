'use client';
import clsx from 'clsx';
import Navbar from "@/components/navbar";
import { useEffect, useState } from 'react';


export default function rankingsPage() {
const currentUser = 'You'; // replace with auth user later

// use useEffect to fetch data as shown here:
// https://www.geeksforgeeks.org/reactjs/fetching-data-from-an-api-with-useeffect-and-usestate-hook/
// makes a variable called players to store the list of top players
const [players, setPlayers] = useState([]);

  // runs once when the page loads, is used to get data from database
  useEffect(() => {
    // fetches the data from the backend api route 
    // instead of directly from supabase
    fetch('/api/allPlayerStats')
      .then((res) => res.json())
      // takes the data we got and reformat for our table
      .then((data) => {
        // go through each player data using .map,
        const playerList = data.map((player, index) => {
          // calculate how many games they played,
          const totalGames = player.wins + player.losses + player.draws;
          // and their win rate 
          let winRate;
          if (totalGames > 0) {
            winRate = player.wins / totalGames;
          } else {
            winRate = 0;
          }

          // make a new object w/ player info in the format we want
          return {
            username: player.username,
            rank: index + 1,
            elo: player.score,
            winRate,
            gamesPlayed: totalGames,
          };
        });

        // save list of players so we can show it on the page
        setPlayers(playerList);
      });
  }, []);


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
    <>
      <Navbar />

      {/* make separate divs for the screen and the contents  */}
      {/* make the black background take up the whole screen */}
      <div className="min-h-[calc(100vh-5rem)] bg-black px-4 py-10 text-white font-[var(--font-press-start)]">
        {/* set the max width of the table to 64rem, or 1024 pixels, 
            centered horizontally, black text */}
        <div className="max-w-5xl mx-auto">
          {/* large bold title */}
          <h1 className="text-3xl text-green-400 mb-2">🏆 Rankings</h1>
          {/* subtext, grey, spacing on the bottom and top */}
          <p className="text-pink-300 text-xs mb-8 mt-1">Top-ranked players of all time</p>

          {/* rounded edges and slight shadow for the chart */}
          <div className="overflow-x-auto rounded-2xl shadow-lg border border-pink-500 bg-black bg-opacity-50">
            {/* make an html table: https://www.w3schools.com/html/html_tables.asp 
                make it span the whole width */}
            <table className="min-w-full">
              {/* set the background and text color, center it */}
              <thead className="bg-pink-500 bg-opacity-30 text-green-300 text-center text-xs">
                <tr>
                  {/* make all of the headers, with a bit of padding */}
                  <th className="p-3">RANK</th>
                  <th className="p-3">USERNAME</th>
                  <th className="p-3">ELO</th>
                  <th className="p-3">WIN RATE</th>
                  <th className="p-3">GAMES PLAYED</th>
                </tr>
              </thead>
              {/* loop through the data using .map, and use it to fill out the cells in the row,  
                  similar to here: https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/ */}
              <tbody>
                {players.map((player, index) => (
                  <tr
                    key={player.username}
                    // use clsx for conditional styling
                    // https://nextjs.org/learn/dashboard-app/css-styling
                    className={clsx(
                      // put a border on top of them all and make pink on hover
                      'border-t border-pink-500 hover:bg-pink-500 hover:bg-opacity-10 transition',
                      // make every other one slightly transparent
                      index % 2 === 1 && 'even:bg-white/5',
                      // if the username is the logged in user, make it stand out
                      player.username === currentUser && 'bg-yellow-100/10 text-yellow-300 font-bold'
                    )}
                  >
                    {/* fill out the cells, using the data */}
                    <td className="p-3 text-center">{player.rank} {medalTopThree(player.rank)}</td>
                    <td className="p-3 text-center">{player.username}</td>
                    <td className="p-3 text-center">{player.elo}</td>
                    <td className="p-3 text-center">{(player.winRate * 100).toFixed(0)}%</td>
                    <td className="p-3 text-center">{player.gamesPlayed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
    </>
  );
}
