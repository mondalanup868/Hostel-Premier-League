import React, { useState } from 'react';
import Navbar from './Navbar';

function RegistrationDetails() {
    const [selectedGameName, setSelectedGameName] = useState('');
    const [selectedGameMode, setSelectedGameMode] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data (This should be fetched from an API or a state)
    const data = [
        {
            pid: 'WERO9JRK',
            gameName: 'FREE FIRE',
            gameMode: 'SOLO',
            teamName: 'THE ACE SQUAD',
            players: [
                { id: '394058473812', name: 'HITESH BHATT', email: 'ayushkothari147@gmail.com', contact: '6396979579' },
            ],
            transactionID: 'RTGF6396979579',
        },
        // Add more data as required...
    ];

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-black text-white px-10 py-8">
                <div className="flex items-center justify-between mb-8">
                    {/* Game Name Filter */}
                    <div className="space-x-4 flex items-center">
                        <div className="flex flex-col">
                            <label>Game Name</label>
                            <select
                                value={selectedGameName}
                                onChange={(e) => setSelectedGameName(e.target.value)}
                                className="bg-gray-800 text-white border border-gray-600 p-2 rounded"
                            >
                                <option value="">Choose Game Name</option>
                                <option value="FREE FIRE">FREE FIRE</option>
                                <option value="BGMI">BGMI</option>
                            </select>
                        </div>

                        {/* Game Mode Filter */}
                        <div className="flex flex-col">
                            <label>Game Mode</label>
                            <select
                                value={selectedGameMode}
                                onChange={(e) => setSelectedGameMode(e.target.value)}
                                className="bg-gray-800 text-white border border-gray-600 p-2 rounded"
                            >
                                <option value="">Choose Game Mode</option>
                                <option value="SOLO">SOLO</option>
                                <option value="DUO">DUO</option>
                                <option value="SQUAD">SQUAD</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search here..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded p-2 text-white"
                        />
                        <button className="bg-gray-600 p-2 rounded">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a4 4 0 11-4-4 4 4 0 014 4zM18.364 18.364l-4.95-4.95" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-auto">
                    <table className="min-w-full table-auto bg-gray-900 border border-gray-600">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="p-2 border border-gray-600">S.No</th>
                                <th className="p-2 border border-gray-600">PID</th>
                                <th className="p-2 border border-gray-600">Game Name</th>
                                <th className="p-2 border border-gray-600">Game Mode</th>
                                <th className="p-2 border border-gray-600">Team Name</th>
                                <th className="p-2 border border-gray-600">Player Game ID</th>
                                <th className="p-2 border border-gray-600">Player Name</th>
                                <th className="p-2 border border-gray-600">Player Email</th>
                                <th className="p-2 border border-gray-600">Player Contact</th>
                                <th className="p-2 border border-gray-600">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((entry, index) => (
                                <tr key={index} className="text-center">
                                    <td className="p-2 border border-gray-600">{index + 1}</td>
                                    <td className="p-2 border border-gray-600">{entry.pid}</td>
                                    <td className="p-2 border border-gray-600">{entry.gameName}</td>
                                    <td className="p-2 border border-gray-600">{entry.gameMode}</td>
                                    <td className="p-2 border border-gray-600">{entry.teamName}</td>
                                    {entry.players.map((player, idx) => (
                                        <React.Fragment key={idx}>
                                            <td className="p-2 border border-gray-600">{player.id}</td>
                                            <td className="p-2 border border-gray-600">{player.name}</td>
                                            <td className="p-2 border border-gray-600">{player.email}</td>
                                            <td className="p-2 border border-gray-600">{player.contact}</td>
                                        </React.Fragment>
                                    ))}
                                    <td className="p-2 border border-gray-600">{entry.transactionID}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button className="p-2 bg-gray-600 rounded hover:bg-gray-700">{'<'}</button>
                    {[1, 2, 3, 4, 5, 6].map((page) => (
                        <button key={page} className="p-2 bg-gray-600 rounded hover:bg-gray-700">
                            {page}
                        </button>
                    ))}
                    <button className="p-2 bg-gray-600 rounded hover:bg-gray-700">{'>'}</button>
                </div>
            </div>
        </div>
    );
}

export default RegistrationDetails;
