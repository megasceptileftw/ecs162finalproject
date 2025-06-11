'use client';

import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import { useEffect, useState } from 'react';
import Image from "next/image";

export default function PostLoginHomePage() {
  const router = useRouter();
  
  const [topThree, setTopThree] = useState([
      { username: 'player1', score: 0, winRate: '0%', streak: 0 },
      { username: 'player2', score: 0, winRate: '0%', streak: 0 },
      { username: 'player3', score: 0, winRate: '0%', streak: 0 },
    ]);
  
    useEffect(() => {
      fetch('/api/allPlayerStats')
        .then(res => res.json())
        .then(data => {
          const sorted = data.map(player => {
              const winRate = (player.wins / (player.wins + player.losses + player.draws) * 100 ).toFixed(0) + '%';
              return {
                username: player.username,
                score: player.score,
                winRate,
                streak: player.best_win_streak || 0,
              };
            })
  
          setTopThree(sorted);
        });
    }, []);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen flex flex-col items-center justify-start px-6 py-10 text-foreground font-[var(--font-geist-sans)]">

        <div className="flex flex-col items-center justify-center text-center mb-12">

          
        </div>
        {/* CENTER TITLE */}
        <header className="my-8">
          <h1 className="text-4xl font-bold mb-4">
            WELCOME, USER
          </h1>
        </header>

        <main className="flex flex-col items-center space-y-12 z-10">
          {/* Avatar */}
          <div className="relative">
            <Image
              src="/avatar.png"
              width={192}
              height={192}
              alt="User avatar"
              className="rounded-full border-4 border-pink-500 shadow-lg"
            />
           
          </div>

          {/* Play button */}
          <button
            onClick={() => router.push('/rps')}
            className="px-6 py-3 text-black bg-pink-500 rounded-lg text-lg font-bold hover:bg-pink-400
            active:scale-95 focus:ring-2 hover:bg-pink-400 focus:outline-none focus:ring-blue-500 transition transform"
          >
            Play
          </button>

          {/* Leaderboard Table */}
          <section className="w-full max-w-3xl border-2 border-pink-500 rounded-xl p-4 text-white mt-10">
            <h2 className="text-center text-xl text-green-400 font-bold mb-4">GLOBAL TOP 3</h2>
            <table className="w-full text-center text-sm">
              <thead className="bg-pink-500 text-black font-bold">
                <tr>
                  <th className="p-2">User</th>
                  <th className="p-2">Score</th>
                  <th className="p-2">Win Rate</th>
                  <th className="p-2">Streak</th>
                </tr>
              </thead>
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
      </main>
    </>
  );
}
