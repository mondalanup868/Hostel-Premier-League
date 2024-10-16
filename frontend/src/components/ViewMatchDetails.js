import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const matchesDetail = `${process.env.REACT_APP_SERVER_URL}/matches/getAllMatches`;
const maxLevelFetch = `${process.env.REACT_APP_SERVER_URL}/matches/getMaxGRLevel`;

function ViewMatchDetails() {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;
    const [data, setData] = useState([]); // State to store fetched matches
    const [gameName, setGameName] = useState('');
    const [gameMode, setGameMode] = useState('');
    const [GRLevel, setGRLevel] = useState('');
    const [loading, setLoading] = useState(false);
    const [maxGRLevel, setMaxGRLevel] = useState(1); // State for max GRLevel

    // Dropdown data
    const gameNames = ['FREEFIRE', 'BGMI'];
    const gameModes = ['SOLO', 'DUO', 'SQUAD'];

    // Fetch the max GRLevel from backend
    const fetchMaxGRLevel = async () => {
        try {
            const response = await fetch(maxLevelFetch);
            const result = await response.json();
            if (result.success) {
                setMaxGRLevel(result.maxGRLevel); // Set the max GRLevel from the response
            }
        } catch (err) {
            console.error('Error fetching max GRLevel:', err);
        }
    };

    // Fetch matches data from backend based on filter criteria
    const fetchMatches = async () => {
        setLoading(true);
        try {
            const response = await fetch(matchesDetail, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameName: gameName || undefined,
                    gameMode: gameMode || undefined,
                    GRLevel: GRLevel || undefined,
                    currentMatchRound: GRLevel ? Number(GRLevel.replace('Level ', '')) : undefined,
                }),
            });
            const result = await response.json();
            if (result.success) {
                setData(result.match);
            } else {
                setData([]);
            }
        } catch (err) {
            console.error('Error fetching matches:', err);
            setData([]);
        }
        setLoading(false);
    };

    // Handle page change for pagination
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Fetch matches when any of the filter values change
    useEffect(() => {
        fetchMatches();
    }, [gameName, gameMode, GRLevel]);

    // Fetch max GRLevel when component mounts
    useEffect(() => {
        fetchMaxGRLevel();
    }, []);

    const startRow = (currentPage - 1) * rowsPerPage;
    const paginatedData = data.slice(startRow, startRow + rowsPerPage);



    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white p-4">
                {/* Dropdown Filters */}
                <div className="flex justify-around mb-4">
                    <select
                        className="p-2 border rounded bg-gray-600"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                    >
                        <option value="">Select Game Name</option>
                        {gameNames.map((name, idx) => (
                            <option key={idx} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="p-2 border rounded bg-gray-600"
                        value={gameMode}
                        onChange={(e) => setGameMode(e.target.value)}
                    >
                        <option value="">Select Game Mode</option>
                        {gameModes.map((mode, idx) => (
                            <option key={idx} value={mode}>
                                {mode}
                            </option>
                        ))}
                    </select>

                    <select
                        className="p-2 border rounded bg-gray-600"
                        value={GRLevel}
                        onChange={(e) => setGRLevel(e.target.value)}
                    >
                        <option value="">Select Game Round Level</option>
                        {[...Array(maxGRLevel)].map((_, idx) => (
                            <option key={idx + 1} value={idx + 1}>
                                Level {idx + 1}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Loading state */}
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <>
                        {/* Table */}
                        <table className="table-auto w-full border-collapse border border-gray-400">
                            <thead>
                                <tr>
                                    <th className="border p-2">S.NO</th>
                                    <th className="border p-2">Match ID</th>
                                    <th className="border p-2">Total Player / Total Team</th>
                                    <th className="border p-2">Custom ID</th>
                                    <th className="border p-2">Match Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((row, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border p-2">{startRow + index + 1}</td>
                                            <td className="border p-2 text-blue-500 hover:underline">
                                                <Link
                                                onClick={() => localStorage.setItem('matchId', row.matchId)}
                                                    to={{
                                                        
                                                        pathname: '/home/view-match-details/player-selection',
                                                        state: { matchId: row.matchId }
                                                    }}
                                                    
                                                >
                                                    {row.matchId}
                                                </Link>
                                            </td>
                                            <td className="border p-2">{row.selectedPIds.length}</td>
                                            <td className="border p-2">{row.customId}</td>
                                            <td className="border p-2">
                                                <span
                                                    className={
                                                        row.matchStatus === 'COMPLETED'
                                                            ? 'text-green-500'
                                                            : row.matchStatus === 'INCOMPLETE'
                                                                ? 'text-red-500'
                                                                : ''
                                                    }
                                                >
                                                    {row.matchStatus}
                                                </span>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center p-4" colSpan="5">
                                            No matches found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex justify-center mt-4">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`mx-1 px-3 py-1 border ${currentPage === i + 1 ? 'bg-white text-black' : 'bg-white text-gray-400'}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ViewMatchDetails;
