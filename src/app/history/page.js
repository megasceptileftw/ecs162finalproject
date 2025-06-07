'use client';
import clsx from 'clsx';

// match history page, based on leaderboard page
export default function historyPage() {
  const currentUser = 'You'; // replace with auth user later

  // temporary data, until the database works 
  const tempData = [
    {  match: 1, username: 'User', opponent: 'Bot', result: 'Win', date: '06/06/2025' },
    {  match: 2, username: 'User', opponent: 'Bot', result: 'Loss', date: '06/06/2025' },
    {  match: 3, username: 'User', opponent: 'Bot', result: 'Loss', date: '06/04/2025' },
    {  match: 4, username: 'User', opponent: 'Bot', result: 'Win', date: '06/03/2025' },
  ];
  
  // tailwind css classes from cheat sheet: https://www.creative-tim.com/twcomponents/cheatsheet/
  // or, from examples in docs: https://tailwindcss.com/docs/installation/using-vite

  return (
    // make seperate divs for the screen and the contents 
    // make the white background take up the whole screen
    <div className="min-h-screen bg-white p-10">
        {/*set the max width of the table to 64rem, or 1024 pixels, 
        centered horizontally, black text */}
      <div className="max-w-5xl mx-auto text-black">
        {/*large bold title*/}
        <h1 className="text-4xl font-bold text-left"> Match History📈</h1>
        {/*subtext, grey, spacing on the bottom and top*/}
        <p className="text-gray-500 mb-6 mt-2">History of all matches you have played</p>

        {/*rounded edges and slight shadow for the chart*/}
        <div className="overflow-x-auto rounded-2xl shadow ">
             {/* make an html table: https://www.w3schools.com/html/html_tables.asp 
             make it span the whole width */}
          <table className="min-w-full">
            {/*set the background and text color, center it*/}
            <thead className="bg-gray-100 text-gray-600 text-center">
              <tr>
                {/*make all of the headers, with a bit of padding*/}
                <th className="p-3">MATCH</th>
                <th className="p-3">USERNAME</th>
                <th className="p-3">OPPONENT</th>
                <th className="p-3">RESULT</th>
                <th className="p-3">DATE</th>
              </tr>
            </thead>
            {/*loop through the data using .map, and use it to fill out the cells in the row,  
            similar to here: https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/  */}
            <tbody>
              {tempData.map((player, index) => (
                <tr key={player.username}
                // use clsx for conditional styling
                // https://nextjs.org/learn/dashboard-app/css-styling
                className={clsx(
                    // put a border on top of them all and make grey on hover
                    'border-t hover:bg-gray-100',
                    // make every other one light gray by default
                    index % 2 === 1 && 'even:bg-gray-50',
                    // if the username is the logged in user, make it yellow
                    player.username === currentUser && 'bg-yellow-50 font-semibold'
                )}
                >
                {/*fill out the cells, using the data*/}
                <td className="p-3 text-center">{player.match}</td>
                <td className="p-3 text-center">{player.username}</td>
                <td className="p-3 text-center">{player.opponent}</td>
                <td className="p-3 text-center">{player.result}</td>
                <td className="p-3 text-center">{player.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
