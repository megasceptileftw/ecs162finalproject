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
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-4">Rock Paper Scissors</h1>
          <p className="text-lg max-w-md mb-6">
            Ultimate rock paper scissors game! Track your score and play bots!
          </p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 text-white bg-green-600 rounded-lg text-lg hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            Login to Play
          </button>
        </div>

        {/* Divider */}
        <hr className="my-12 w-full max-w-3xl border-t border-gray-300" />

        {/* Leaderboard Table */}
        <section className="w-full max-w-4xl pb-12">
          <h2 className="text-center text-2xl font-semibold mb-4">Global Leaderboard</h2>
          <div className="overflow-x-auto">
            <table
              className="w-full table-auto bg-white text-sm rounded shadow border border-gray-300 text-black"
              aria-label="Top 10 leaderboard"
            >
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-2">User</th>
                  <th className="p-2">Score</th>
                  <th className="p-2">Win Rate</th>
                  <th className="p-2">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-2">User1</td>
                  <td className="p-2">20</td>
                  <td className="p-2">75.5%</td>
                  <td className="p-2">150</td>
                </tr>
                {/* Add more rows dynamically later */}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/*footer , do we need this?*/}
      {/* <footer className="w-full text-center py-6 text-sm text-gray-500">
        ECS 162
      </footer> */}
    </>
  );
}
