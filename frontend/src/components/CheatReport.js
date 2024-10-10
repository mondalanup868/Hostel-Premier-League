import React, { useState } from 'react';
import Navbar from './Navbar';

const CheatReport = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [playerData, setPlayerData] = useState({
        pid: 'F84UDFUI',
        playerName: 'Ayush Kothari',
        playerUID: '7878475845433',
        playerGameName: 'Ashu',
        contactNumber: '6396979579',
        currentStatus: 'Good'
    });

    const handleSearch = () => {
        // Handle search logic here, if applicable
        console.log('Search Term:', searchTerm);
    };

    const handleBan = () => {
        // Handle the banning of the player here
        console.log('Player Banned:', playerData.pid);
    };

    return (
        <div>
            <Navbar/>
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-5">
            {/* Search Bar */}
            <div className="flex space-x-4 mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={playerData.pid}
                    className="bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition ease-in-out"
                >
                    Search
                </button>
            </div>

            {/* Player Data Table */}
            <div className="overflow-x-auto w-full lg:w-2/3">
                <table className="w-full bg-gray-800 rounded-lg shadow-lg text-left">
                    <thead>
                        <tr className="text-gray-300">
                            <th className="py-4 px-6">S.NO</th>
                            <th className="py-4 px-6">PID</th>
                            <th className="py-4 px-6">Players Name</th>
                            <th className="py-4 px-6">Players UID</th>
                            <th className="py-4 px-6">Players Game Name</th>
                            <th className="py-4 px-6">Contact Number</th>
                            <th className="py-4 px-6">Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-700 text-white">
                            <td className="py-4 px-6">1.</td>
                            <td className="py-4 px-6">{playerData.pid}</td>
                            <td className="py-4 px-6">{playerData.playerName}</td>
                            <td className="py-4 px-6">{playerData.playerUID}</td>
                            <td className="py-4 px-6">{playerData.playerGameName}</td>
                            <td className="py-4 px-6">{playerData.contactNumber}</td>
                            <td className="py-4 px-6 text-green-400">{playerData.currentStatus}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Ban Button */}
            <button
                onClick={handleBan}
                className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition ease-in-out"
            >
                Ban
            </button>
        </div>
        </div>
    );
};

export default CheatReport;
