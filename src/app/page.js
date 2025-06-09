'use client';

import Image from "next/image";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-between px-6 py-10 text-foreground font-[var(--font-geist-sans)]">
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
            className="px-6 py-3 text-black bg-pink-500 rounded-lg text-lg font-bold hover:bg-pink-400 transition"
          >
            Login to Play
          </button>
        </div>

        {/* Divider */}
        {/*
        <hr className="my-12 w-full max-w-3xl border-t border-gray-300" />
        */}
        

        {/* Leaderboard Table */}
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

      {/*footer , do we need this?*/}
      {/* <footer className="w-full text-center py-6 text-sm text-gray-500">
        ECS 162
      </footer> */}
    </>
  );
}
