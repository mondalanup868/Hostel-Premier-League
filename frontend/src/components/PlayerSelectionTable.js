import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const playersDetail = `${process.env.REACT_APP_SERVER_URL}/matches/getMatch`;
const winnerRegistration = `${process.env.REACT_APP_SERVER_URL}/matches/registerWinner`;
const nextRoundURL = `${process.env.REACT_APP_SERVER_URL}/matches/setNextRound`;

const PlayerSelectionTable = () => {

    function generateRandomID() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let PID = '';
        for (let i = 0; i < 8; i++) {
            PID += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return PID;
    }

    const navigate = useNavigate();
    let matchId = localStorage.getItem('matchId'); // Get Match ID from local storage

    const [matchData, setMatchData] = useState(null); // State to store match and player details
    const [selectedPlayers, setSelectedPlayers] = useState({}); // State to store selected players for next match
    const [selectionType, setSelectionType] = useState('next-match'); // State to control selection mode
    const [winnerRanks, setWinnerRanks] = useState({}); // State to store ranks for winner selection
    const [rankRange, setRankRange] = useState(); // Default rank range for winner selection

    // Track assigned ranks
    const assignedRanks = Object.values(winnerRanks).filter(Boolean);


    // Fetch match and player data from the server
    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await fetch(playersDetail, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ matchId }), // Send matchId to the backend
                });
                const data = await response.json();
                console.log(data); // Log data for debugging

                if (data.match && data.players) {
                    const match = data.match;
                    setMatchData({ match, players: data.players });

                    // Initialize selectedPlayers state from match data
                    const initialPlayers = {};
                    if (match.selectedPIds) {
                        match.selectedPIds.forEach(id => {
                            initialPlayers[id] = true; // Players in selectedPIds are selected by default
                        });
                        setSelectedPlayers(initialPlayers);
                    }
                }
            } catch (err) {
                console.error('Error fetching match data:', err);
            }
        };

        fetchMatchData();
    }, [matchId]);

    // Handle player selection toggle for next match
    const togglePlayerSelection = (id) => {
        setSelectedPlayers({
            ...selectedPlayers,
            [id]: !selectedPlayers[id], // Toggle selected player state
        });
    };

    // Handle rank change for winner selection
    const handleRankChange = (id, newRank) => {
        const oldRank = winnerRanks[id];

        // Release the old rank and assign the new rank
        setWinnerRanks({
            ...winnerRanks,
            [id]: newRank,
        });
    };

    // Handle range input change for winner rank selection
    const handleRankRangeChange = (e) => {
        const value = parseInt(e.target.value, 10);
        // Ensure the rank range is a positive number
        if (!isNaN(value) && value > 0) {
            setRankRange(value);
        }
    };

    // Register winner function
    const registerWinner = async () => {
        const winners = Array(rankRange).fill('NONE');  // Initialize with 'NONE' for unfilled ranks
    
        // Map players to their respective ranks
        Object.keys(winnerRanks).forEach(pid => {
            const rank = winnerRanks[pid];
            if (rank) {
                winners[rank - 1] = pid;  // Assign player PID to the correct rank position (rank - 1 because array is 0-indexed)
            }
        });
    
        try {
            const response = await fetch(winnerRegistration, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    winnerId: generateRandomID(),
                    matchId,
                    gameName: matchData.match.gameName,  // Adjust based on your data
                    gameMode: matchData.match.gameMode,  // Adjust based on your data
                    winner1: winners[0] || 'NONE',  // Fill with winners in rank order
                    winner2: winners[1] || 'NONE',
                    winner3: winners[2] || 'NONE',
                    winner4: winners[3] || 'NONE',
                    winner5: winners[4] || 'NONE',
                    winner6: winners[5] || 'NONE',
                }),
            });
    
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                navigate('/home/view-match-details');  // Redirect to match details
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error('Error registering winner:', err);
        }
    };
    

    // Set next round function
    const setNextRound = async () => {
        const matchSelectedIds = Object.keys(selectedPlayers).filter(pid => selectedPlayers[pid]);

        try {
            const response = await fetch(nextRoundURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    matchId,
                    matchSelectedIds,
                }),
            });

            const data = await response.json();
            if (data.message) {
                toast.success(data.message);
                navigate('/home/view-match-details'); // Redirect to match details
            }
        } catch (err) {
            console.error('Error setting next round:', err);
            alert('Error setting next round');
        }
    };

    // Render loading state if match data hasn't been loaded yet
    if (!matchData || !matchData.players) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-900 min-h-screen p-8 flex flex-col items-center text-white">
            <div className="text-left w-full max-w-5xl">
                <div className="flex">
                    <button
                        className="bg-red-600 text-white rounded p-2 m-2"
                        onClick={() => {
                            localStorage.clear('matchId');
                            navigate("/home/view-match-details"); // Redirect back to match details
                        }}
                    >
                        Close
                    </button>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold">Match ID: {matchData.match.matchId}</h1>
                        <h2 className="text-xl font-semibold">Custom ID: {matchData.match.customId}</h2>
                    </div>
                    <div className="mt-4">
                        <label className="font-semibold mr-2 text-2xl">Select for:</label>
                        <select
                            className="bg-gray-800 text-white p-2 rounded text-xl"
                            value={selectionType}
                            onChange={(e) => setSelectionType(e.target.value)} // Update selection type

                        >
                            <option value="next-match">Next match</option>
                            <option value="winner">Select Winner</option>
                        </select>
                    </div>
                </div>

                {selectionType === 'winner' && (
                    <div className="mt-4 flex justify-end items-center">
                        <label className="font-semibold mr-2 text-2xl">Total Winners Range:</label>
                        <input
                            type="number"
                            value={rankRange}
                            onChange={handleRankRangeChange} // Handle change in rank range
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
                            {matchData.players.map((player, index) => (
                                <tr
                                    key={player.PID}
                                    className={`${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}`}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{player.PID}</td>
                                    <td className="border px-4 py-2">{player.names[0]}</td>
                                    <td className="border px-4 py-2">{player.uids[0]}</td>
                                    <td className="border px-4 py-2">{player.uidNames[0]}</td>
                                    <td className="border px-4 py-2">{player.contacts[0]}</td>
                                    <td className="border px-4 py-2">
                                        {selectionType === 'next-match' ? (
                                            <button
                                                className={`${selectedPlayers[player.PID] ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded`}
                                                onClick={() => togglePlayerSelection(player.PID)} // Toggle player selection
                                            >
                                                {selectedPlayers[player.PID] ? 'Selected' : 'Not Selected'}
                                            </button>
                                        ) : (
                                            <select
                                                className="bg-gray-800 text-white p-2 rounded"
                                                value={winnerRanks[player.PID] || ''}
                                                onChange={(e) => handleRankChange(player.PID, e.target.value)}
                                            >
                                                <option value="">Select Rank</option>
                                                {[...Array(rankRange).keys()].map((_, i) => i + 1)
                                                    .map(rank => (
                                                        <option
                                                            key={rank}
                                                            value={rank}
                                                            // Disable the rank if it's already taken by another player
                                                            disabled={assignedRanks.includes(String(rank)) && winnerRanks[player.PID] !== String(rank)}
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
                    <button
                        className="bg-purple-600 text-white font-bold py-2 px-6 rounded hover:bg-purple-700 transition duration-300"
                        onClick={() => {
                            if (selectionType === 'next-match') {
                                setNextRound();  // Call setNextRound if selectionType is 'next-match'
                            } else {
                                registerWinner(); // Otherwise, call registerWinner
                            }
                            toast.success("Winner Selection Compleated "); // Display the toast message after the function call
                        }}
                    >
                        {selectionType === 'next-match' ? 'Next Match' : 'Submit Winner'}
                    </button>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PlayerSelectionTable;
