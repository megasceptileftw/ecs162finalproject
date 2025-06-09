'use client';

import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";

export default function PostLoginHomePage() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <main className="w-full max-w-5xl mx-auto px-4 min-h-screen flex flex-col items-center justify-between py-10 text-white font-[var(--font-press-start)]">
        
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
        <section className="w-full max-w-xl border-2 border-pink-500 rounded-xl p-4 text-white">
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
                <td className="p-2">🥇 User</td>
                <td className="p-2">30</td>
                <td className="p-2">75.0%</td>
                <td className="p-2">4</td>
              </tr>
              <tr>
                <td className="p-2">🥈 User</td>
                <td className="p-2">25</td>
                <td className="p-2">62.5%</td>
                <td className="p-2">1</td>
              </tr>
              <tr>
                <td className="p-2">🥉 User</td>
                <td className="p-2">10</td>
                <td className="p-2">60.0%</td>
                <td className="p-2">2</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
