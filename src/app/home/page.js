'use client';

import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import { useEffect, useState } from 'react';

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

      <main className="w-full max-w-5xl mx-auto px-4 min-h-screen flex flex-col items-center justify-start py-10 text-white font-[var(--font-press-start)]">
        
        {/* Welcome + Avatar Section */}
        <div className="flex-grow flex flex-col items-center justify-center text-center mb-12">
          <div className="w-24 h-24 rounded-full border-2 border-pink-500 flex items-center justify-center text-3xl mb-4">
            👤
          </div>
          <p className="text-green-400 text-sm mb-6">Welcome, User</p>

          <button
            onClick={() => router.push('/rps')}
            className="px-6 py-3 text-black bg-pink-500 rounded-lg text-lg font-bold hover:bg-pink-400 transition"
          >
            Play
          </button>
        </div>


        {/* Leaderboard */}
        <section className="w-full max-w-3xl border-2 border-pink-500 rounded-xl p-4 text-white mt-10">
          <h2 className="text-center text-xl text-green-400 font-bold mb-4">GLOBAL LEADERBOARD</h2>
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
    </>
  );
}
