'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';

export default function HomePage() {
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
        {/* Center Title + Login Button */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Rock Paper Scissors</h1>

          {/* - ICONS */}
          <div className="flex gap-8 my-6">
            <Image src="/rock.png" alt="Rock" width={64} height={64} />
            <Image src="/paper.png" alt="Paper" width={64} height={64} />
            <Image src="/scissors.png" alt="Scissors" width={64} height={64} />
          </div>

          {/* - Description */}
          <p className="text-lg max-w-md mb-6">
            Ultimate rock paper scissors game! Track your score and play bots!
          </p>

          {/* - Login */}
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 text-black bg-pink-500 rounded-lg text-lg font-bold hover:bg-pink-400
            active:scale-95 focus:ring-2 hover:bg-pink-400 focus:outline-none focus:ring-blue-500 transition transform"
          >
            Login to Play
          </button>
        </div>


        

        {/* Leaderboard Table */}
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

      {/*footer , do we need this?*/}
      {/* <footer className="w-full text-center py-6 text-sm text-gray-500">
        ECS 162
      </footer> */}
    </>
  );
}
