'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';

// the main function for the home page after login
export default function HomePage() {
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
    <> <Navbar />
    {/* main page layout
     full screen height, column layout, center items, spacing/padding */}
      <main className="min-h-screen flex flex-col items-center justify-start px-6 py-10 text-foreground font-[var(--font-geist-sans)]">
        {/* section with title, icons, and login button
         centered and spaced vertically */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          {/* big page title */}
          <h1 className="text-4xl font-bold mb-4">Rock Paper Scissors</h1>

          {/* icons row
           spaced apart horizontally  */}
          <div className="flex gap-8 my-6">
            <Image src="/rock.png" alt="Rock" width={64} height={64} />
            <Image src="/paper.png" alt="Paper" width={64} height={64} />
            <Image src="/scissors.png" alt="Scissors" width={64} height={64} />
          </div>

          {/* game description text, limited width, some margin  */}
          <p className="text-lg max-w-md mb-6">
            Ultimate rock paper scissors game! Track your score and play bots!
          </p>

          {/* login button, bright, rounded, with hover/focus effects */}
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 text-black bg-pink-500 rounded-lg text-lg font-bold hover:bg-pink-400
            active:scale-95 focus:ring-2 hover:bg-pink-400 focus:outline-none focus:ring-blue-500 transition transform"
          >
            Login to Play
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
