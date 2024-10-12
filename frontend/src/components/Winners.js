import React, { useState } from 'react';
import Navbar from './Navbar';

const Winners = () => {
  const [gameName, setGameName] = useState('');
  const [gameMode, setGameMode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const data = [
    {
      pid: 'WER09J8K',
      gameName: 'Free Fire',
      gameMode: 'Solo',
      teamName: 'The Ace Squad',
      playerGameId: '394058475812',
      playerName: 'Hitesh Bhatt',
      playerEmail: 'ayushkothari01@gmail.com',
      playerContact: '6396979759',
      transactionId: 'RTEG6396979759',
    },
    // Add more rows as per your table data...
  ];

  const handleFetch = () => {
    // Fetch or filter data based on selected game name and mode
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const displayedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
        <Navbar/>
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-evenly items-center mb-10">
        <div className="mr-4 flex justify-center items-center gap-4">
          <label className="block text-white mb-2">Game Name :</label>
          <select
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            <option value="">Select Game Name</option>
            <option value="Free Fire">Free Fire</option>
            <option value="BGMI">BGMI</option>
          </select>
        </div>
        <div className="mr-4 flex justify-center items-center gap-4">
          <label className="block text-white mb-2">Game Mode :</label>
          <select
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            <option value="">Select Game Mode</option>
            <option value="Solo">Solo</option>
            <option value="Duo">Duo</option>
            <option value="Squad">Squad</option>
          </select>
        </div>
        <button
          onClick={handleFetch}
          className="bg-purple-600 px-6 py-2 rounded text-white"
        >
          Fetch
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 border">S.No</th>
              <th scope="col" className="px-6 py-3 border">PID</th>
              <th scope="col" className="px-6 py-3 border">Game Name</th>
              <th scope="col" className="px-6 py-3 border">Game Mode</th>
              <th scope="col" className="px-6 py-3 border">Team Name</th>
              <th scope="col" className="px-6 py-3 border">Player Game ID</th>
              <th scope="col" className="px-6 py-3 border">Player Name</th>
              <th scope="col" className="px-6 py-3 border">Player Email</th>
              <th scope="col" className="px-6 py-3 border">Player Contact</th>
              <th scope="col" className="px-6 py-3 border">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((row, index) => (
              <tr key={row.pid} className="bg-gray-800 border-b">
                <td className="px-6 py-4 border">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="px-6 py-4 border">{row.pid}</td>
                <td className="px-6 py-4 border">{row.gameName}</td>
                <td className="px-6 py-4 border">{row.gameMode}</td>
                <td className="px-6 py-4 border">{row.teamName}</td>
                <td className="px-6 py-4 border">{row.playerGameId}</td>
                <td className="px-6 py-4 border">{row.playerName}</td>
                <td className="px-6 py-4 border">{row.playerEmail}</td>
                <td className="px-6 py-4 border">{row.playerContact}</td>
                <td className="px-6 py-4 border">{row.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-5 space-x-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-600 px-4 py-2 rounded text-white"
        >
          Previous
        </button>
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded ${currentPage === page ? 'bg-purple-600' : 'bg-gray-600'} text-white`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === 6} // Replace 6 with total pages count
          className="bg-gray-600 px-4 py-2 rounded text-white"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default Winners;
