import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const PlayerSelectionTable = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const { matchId } = location.state || {};
    // console.log("Match ID",localStorage.getItem('matchId'));
    let matchId = localStorage.getItem('matchId');

    const [selectedPlayers, setSelectedPlayers] = useState({
        1: true,
        2: true,
        3: true,
        4: true,
        5: false,
        6: true,
        7: false,
        8: true,
        9: false,
        10: false,
        11: true,
        12: true,
        13: false,
    });

    const [selectionType, setSelectionType] = useState('next-match');
    const [winnerRanks, setWinnerRanks] = useState({}); // To store selected ranks for players
    const [rankRange, setRankRange] = useState(); // Default rank range set to 5

    // Track assigned ranks
    const assignedRanks = Object.values(winnerRanks).filter(Boolean);

    const togglePlayerSelection = (id) => {
        setSelectedPlayers({
            ...selectedPlayers,
            [id]: !selectedPlayers[id],
        });
    };

    const handleRankChange = (id, rank) => {
        if (rank) {
            // Update the winnerRanks state with the selected rank
            setWinnerRanks({
                ...winnerRanks,
                [id]: rank,
            });
        }
    };

    const handleRankRangeChange = (e) => {
        const value = parseInt(e.target.value, 10);
        // Ensure the rank range is a positive number
        if (!isNaN(value) && value > 0) {
            setRankRange(value);
        }
    };



    return (
        <div>
            {/* <Navbar /> */}
            <div className="bg-gray-900 min-h-screen p-8 flex flex-col items-center text-white">
                <div className="text-left w-full max-w-5xl">
                    <div className='flex'>
                        <button
                            className="bg-red-600 text-white rounded p-2 m-2"
                            onClick={() => {
                                localStorage.clear('matchId');
                                navigate("/home/view-match-details");
                            }}
                        >
                            Close
                        </button>

                    </div>

                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className="text-xl font-semibold">Match ID: {matchId}</h1>
                            <h2 className="text-xl font-semibold">Custom ID: 5678945685</h2>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold mr-2 text-2xl">Select for :</label>
                            <select
                                className="bg-gray-800 text-white p-2 rounded text-xl"
                                value={selectionType}
                                onChange={(e) => setSelectionType(e.target.value)}
                            >
                                <option value="next-match">Next match</option>
                                <option value="winner">Select Winner</option>
                            </select>
                        </div>
                    </div>

                    {/* Input field for setting the rank range */}
                    {selectionType === 'winner' && (
                        <div className="mt-4 flex justify-end items-center">
                            <label className="font-semibold mr-2 text-2xl">Total Winners Range:</label>
                            <input
                                type="number"
                                value={rankRange}
                                onChange={handleRankRangeChange}
                                className="bg-gray-800 text-white p-2 rounded text-xl"
                                min="1"
                            />
                        </div>
                    )}

                    <div className="m-6">
                        <div className="text-4xl font-bold text-center pb-10">Player Selection Table</div>
                        <table className="table-auto w-full bg-gray-800 rounded-lg">
                            <thead>
                                <tr className="text-left">
                                    <th className="px-4 py-2 border">S.NO</th>
                                    <th className="px-4 py-2 border">PID</th>
                                    <th className="px-4 py-2 border">Player Name</th>
                                    <th className="px-4 py-2 border">Player UID</th>
                                    <th className="px-4 py-2 border">Player Game Name</th>
                                    <th className="px-4 py-2 border">Contact Number</th>
                                    <th className="px-4 py-2 border">
                                        {selectionType === 'next-match' ? 'Player Selection' : 'Rank'}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(selectedPlayers).map((id, index) => (
                                    <tr
                                        key={id}
                                        className={`${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}`}
                                    >
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">F84UDFUI</td>
                                        <td className="border px-4 py-2">Ayush Kothari</td>
                                        <td className="border px-4 py-2">7878475845433</td>
                                        <td className="border px-4 py-2">Ashu</td>
                                        <td className="border px-4 py-2">6396979579</td>
                                        <td className="border px-4 py-2">
                                            {selectionType === 'next-match' ? (
                                                <button
                                                    className={`${selectedPlayers[id] ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded`}
                                                    onClick={() => togglePlayerSelection(id)}
                                                >
                                                    {selectedPlayers[id] ? 'Selected' : 'Not Selected'}
                                                </button>
                                            ) : (
                                                <select
                                                    className="bg-gray-800 text-white p-2 rounded"
                                                    value={winnerRanks[id] || ''}
                                                    onChange={(e) => handleRankChange(id, e.target.value)}
                                                >
                                                    <option value="">Select Rank</option>
                                                    {/* Dynamically generate ranks based on range */}
                                                    {[...Array(rankRange).keys()].map((_, i) => i + 1)
                                                        .map(rank => (
                                                            <option
                                                                key={rank}
                                                                value={rank}
                                                                disabled={assignedRanks.includes(String(rank)) && winnerRanks[id] !== String(rank)}
                                                            >
                                                                {rank}
                                                            </option>
                                                        ))}
                                                </select>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button className="bg-purple-600 text-white font-bold py-2 px-6 rounded hover:bg-purple-700 transition duration-300">
                            {selectionType === 'next-match' ? 'Next Match' : 'Submit Winner'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerSelectionTable;
