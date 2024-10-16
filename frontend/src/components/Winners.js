import React, { useState } from 'react';
import Navbar from './Navbar';

const fetchWinners = `${process.env.REACT_APP_SERVER_URL}/matches/getWinners`;

const Winners = () => {
  const [gameName, setGameName] = useState('');
  const [gameMode, setGameMode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [winners, setWinners] = useState([]); // State to hold winners data
  const [error, setError] = useState(null); // State to handle errors
  const rowsPerPage = 3;

  const handleFetch = async () => {
    try {
      const response = await fetch(fetchWinners, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameName, gameMode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch winners');
      }

      const data = await response.json();
      console.log(data);
      setWinners(data.winners); // Set the fetched winners
      setCurrentPage(1); // Reset to first page on new fetch
      setError(null); // Clear previous errors
    } catch (err) {
      setError(err.message); // Set error message
      setWinners([]); // Clear winners on error
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const displayedData = winners.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <Navbar />
      <div className="p-10 bg-gray-900 min-h-screen text-white">
        <div className="flex justify-evenly items-center mb-10">
          <div className="mr-4 flex justify-center items-center gap-4">
            <label className="block text-white mb-2">Game Name:</label>
            <select
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              <option value="">Select Game Name</option>
              <option value="FREEFIRE">FREE FIRE</option>
              <option value="BGMI">BGMI</option>
            </select>
          </div>
          <div className="mr-4 flex justify-center items-center gap-4">
            <label className="block text-white mb-2">Game Mode:</label>
            <select
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              <option value="">Select Game Mode</option>
              <option value="SOLO">Solo</option>
              <option value="DUO">Duo</option>
              <option value="SQUAD">Squad</option>
            </select>
          </div>
          <button
            onClick={handleFetch}
            className="bg-purple-600 px-6 py-2 rounded text-white"
          >
            Fetch
          </button>
        </div>

        {/* Display error message if exists */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Display winners or a no winners message */}
        {winners.length === 0 ? (
          <div className="text-white text-lg">No winners available.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 border">Position</th>
                  <th scope="col" className="px-6 py-3 border">PID</th>
                  <th scope="col" className="px-6 py-3 border">Team Name</th>
                  <th scope="col" className="px-6 py-3 border">Players Name</th>
                  <th scope="col" className="px-6 py-3 border">Players UID</th>
                  <th scope="col" className="px-6 py-3 border">Players Email</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((row, index) => (
                  <tr key={row.PID} className="bg-gray-800 border-b">
                    <td className="px-6 py-4 border">{row.position}</td>
                    <td className="px-6 py-4 border">{row.PID}</td>
                    <td className="px-6 py-4 border">{row.teamName}</td>
                    <td className="px-6 py-4 border">{row.name}</td>
                    <td className="px-6 py-4 border">{row.gameUID}</td>
                    <td className="px-6 py-4 border">{row.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-5 space-x-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-600 px-4 py-2 rounded text-white"
          >
            Previous
          </button>
          {[...Array(Math.ceil(winners.length / rowsPerPage)).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`px-4 py-2 rounded ${currentPage === page + 1 ? 'bg-purple-600' : 'bg-gray-600'} text-white`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(winners.length / rowsPerPage)}
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
