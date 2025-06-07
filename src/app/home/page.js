'use client';

import { useRouter } from 'next/navigation';

export default function PostLoginHomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-between px-6 py-10 text-black bg-white">
      {/* Space for Navbar */}
      <div className="h-20 w-full" />

      {/* User avatar + welcome */}
      <div className="flex flex-col items-center gap-4 mb-10">
        {/* Avatar circle */}
        <div className="w-24 h-24 rounded-full border-2 border-gray-400 flex items-center justify-center text-3xl">
          👤
        </div>

        <p className="text-lg font-medium">Welcome, User</p>

        <button
          onClick={() => router.push('/rps')}
          className="mt-2 px-8 py-4 text-xl bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Play
        </button>
      </div>

      {/* Divider */}
      <hr className="my-8 w-full max-w-3xl border-t border-gray-300" />

      {/* Leaderboard Table */}
        <section className="w-full max-w-4xl pb-12">
          <h2 className="text-center text-2xl font-semibold mb-4">Global Leaderboard</h2>
          <div className="overflow-x-auto">
            <table
              className="w-full table-auto bg-white  text-sm rounded shadow border border-gray-300  text-black "
              aria-label="Top 10 leaderboard"
            >
              <thead className="bg-gray-200  text-left">
                <tr>
                  <th className="p-2">User</th>
                  <th className="p-2">Score</th>
                  <th className="p-2">Win Rate</th>
                  <th className="p-2">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 ">
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
  );
}
