'use client';

import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import { useEffect, useState } from 'react';

// the main function for the home page after login
export default function PostLoginHomePage() {

  // set up the router so we can change pages
  const router = useRouter();

  // Set up a state to store top 3 players, w/ default info
  const [topThree, setTopThree] = useState([
      { username: 'player1', score: 0, winRate: '0%', streak: 0 },
      { username: 'player2', score: 0, winRate: '0%', streak: 0 },
      { username: 'player3', score: 0, winRate: '0%', streak: 0 },
    ]);

    // runs once when the page first loads
    useEffect(() => {
      // get all player stats from the supabase
      fetch('/api/allPlayerStats')
      // conver to json
        .then(res => res.json())
        .then(data => {
          // go through each player and create a new object with info
          const sorted = data.map(player => {
            // calculate win rate as a percent
              const winRate = (player.wins / (player.wins + player.losses + player.draws) * 100 ).toFixed(0) + '%';

              return {
                username: player.username,
                score: player.score,
                winRate, // how often they win
                // longest win streak, or 0 if nothing there
                streak: player.best_win_streak || 0,
              };
            })

          // save the list to the topThree state so it shows on the page
          setTopThree(sorted);
        });
    }, []);

    // the part that shows up on the screen
  return (
    <>
      <Navbar />

      {/* main content container
       full width with max size, centered horizontally, vertical layout */}
      <main className="w-full max-w-5xl mx-auto px-4 min-h-screen flex flex-col items-center justify-start py-10 text-white font-[var(--font-press-start)]">
        
        {/* welcome + avatar section
         grows to fill space, centered content, with spacing below */}
        <div className="flex-grow flex flex-col items-center justify-center text-center mb-12">
          {/* avatar icon container
           circle shape, centered, with border and large emoji */}
          <div className="w-24 h-24 rounded-full border-2 border-pink-500 flex items-center justify-center text-3xl mb-4">
            👤
          </div>
          {/* welcome message
           small green text with bottom margin */}
          <p className="text-green-400 text-sm mb-6">Welcome, User</p>

          {/* play button
           pink background, bold text, hover/focus animations */}
          <button
            onClick={() => router.push('/rps')}
            className="px-6 py-3 text-black bg-pink-500 rounded-lg text-lg font-bold transition
            active:scale-95 focus:ring-2 hover:bg-pink-400 focus:outline-none focus:ring-blue-500 transform"
          >
            Play
          </button>
        </div>


        {/* leaderboard section
         max width, styled border, spacing and text color */}
        <section className="w-full max-w-3xl border-2 border-pink-500 rounded-xl p-4 text-white mt-10">
          {/* leaderboard title */}
          <h2 className="text-center text-xl text-green-400 font-bold mb-4">GLOBAL LEADERBOARD</h2>
          {/* table setup
           full width, small text, centered cells  */}
          <table className="w-full text-center text-sm">
            {/* table header row
             colored background, bold black text  */}
            <thead className="bg-pink-500 text-black font-bold">
              <tr>
                <th className="p-2">User</th>
                <th className="p-2">Score</th>
                <th className="p-2">Win Rate</th>
                <th className="p-2">Streak</th>
              </tr>
            </thead>

            {/* table body
             dark background, white text, pink lines between rows */}
            <tbody className="bg-black text-white divide-y divide-pink-800">
              <tr>
                <td className="p-2">🥇 {topThree[0].username}</td>
                <td className="p-2">{topThree[0].score}</td>
                <td className="p-2">{topThree[0].winRate}</td>
                <td className="p-2">{topThree[0].streak}</td>
              </tr>
              <tr>
                <td className="p-2">🥈 {topThree[1].username}</td>
                <td className="p-2">{topThree[1].score}</td>
                <td className="p-2">{topThree[1].winRate}</td>
                <td className="p-2">{topThree[1].streak}</td>
              </tr>
              <tr>
                <td className="p-2">🥉 {topThree[2].username}</td>
                <td className="p-2">{topThree[2].score}</td>
                <td className="p-2">{topThree[2].winRate}</td>
                <td className="p-2">{topThree[2].streak}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
