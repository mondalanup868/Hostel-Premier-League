import React, { useState } from 'react'
import Navbar from './Navbar';

function ViewMatchDetails() {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;

    // Sample data for table rows
    const data = Array(45).fill({
        matchId: 'F84UDFUI',
        totalPlayer: 15,
        customId: '458930495842',
        matchStatus: 'Running',
    });

    // Handle pagination
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Dropdown data
    const gameNames = ['Free Fire', 'BGMI'];
    const gameModes = ['Solo Battle', 'Duo Battle', 'Squad Battle'];
    const gameRounds = ['Round 1', 'Round 2', 'Round 3'];

    const startRow = (currentPage - 1) * rowsPerPage;
    const paginatedData = data.slice(startRow, startRow + rowsPerPage);

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-gray-600 text-white p-4">
                {/* Dropdown Filters */}
                <div className="flex justify-around mb-4">
                    <select className="p-2 border rounded bg-gray-600">
                        <option>Select Game Name</option>
                        {gameNames.map((name, idx) => (
                            <option key={idx}>{name}</option>
                        ))}
                    </select>
                    <select className="p-2 border rounded bg-gray-600">
                        <option>Select Game Mode</option>
                        {gameModes.map((mode, idx) => (
                            <option key={idx}>{mode}</option>
                        ))}
                    </select>
                    <select className="p-2 border rounded bg-gray-600">
                        <option>Select Game Round Level</option>
                        {gameRounds.map((round, idx) => (
                            <option key={idx}>{round}</option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <table className="table-auto w-full text-left border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border p-2">S.NO</th>
                            <th className="border p-2">Match ID</th>
                            <th className="border p-2">Total Player</th>
                            <th className="border p-2">Custom ID</th>
                            <th className="border p-2">Match Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => (
                            <tr key={index} className="text-center">
                                <td className="border p-2">{startRow + index + 1}</td>
                                <td className="border p-2 text-blue-500">{row.matchId}</td>
                                <td className="border p-2">{row.totalPlayer}</td>
                                <td className="border p-2">{row.customId}</td>
                                <td className="border p-2">
                                    <span className={row.matchStatus === 'Completed' ? 'text-green-500' : ''}>
                                        {row.matchStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={`mx-1 px-3 py-1 border ${currentPage === i + 1 ? 'bg-white text-black' : 'bg-white text-gray-400'
                                }`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewMatchDetails