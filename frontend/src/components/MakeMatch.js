import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const maxLevelFetch = `${process.env.REACT_APP_SERVER_URL}/matches/getMaxGRLevel`;
const remainingURL = `${process.env.REACT_APP_SERVER_URL}/matches/getRemaining`;
const makeMatchURL = `${process.env.REACT_APP_SERVER_URL}/matches/makeMatch`;

function MakeMatch() {
    const [gameName, setGameName] = useState('');
    const [gameMode, setGameMode] = useState('');
    const [currentMatchRound, setcurrentMatchRound] = useState(''); // Maintain current round
    const [gameRoundLevel, setGameRoundLevel] = useState('');
    const [maxGRLevel, setMaxGRLevel] = useState(0); // Store max GRLevel
    const [customId, setCustomRoomID] = useState('');
    const [players, setPlayers] = useState([]); // Make this dynamic

    // Fetch the max GRLevel when gameName and gameMode are selected
    useEffect(() => {
        const fetchMaxGRLevel = async () => {
            if (gameName && gameMode) {
                try {
                    const response = await fetch(maxLevelFetch, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ gameName, gameMode })
                    });
                    const maxLevel = await response.json();
                    setMaxGRLevel(maxLevel); // Set the max GRLevel
                } catch (error) {
                    console.error('Error fetching max GRLevel:', error);
                }
            }
        };
        fetchMaxGRLevel();
    }, [gameName, gameMode]);

    // Fetch remaining players when criteria are selected (gameName, gameMode, currentMatchRound)
    useEffect(() => {
        const fetchRemainingPlayers = async () => {
            if (gameName && gameMode && currentMatchRound) {
                try {
                    const response = await fetch(remainingURL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            gameName,
                            gameMode,
                            GRLevel: Number(gameRoundLevel),
                            currentMatchRound: Number(currentMatchRound)
                        })
                    });


                    const playersData = await response.json();
                    setPlayers(playersData); // Set players dynamically
                } catch (error) {
                    console.error('Error fetching remaining players:', error);
                }
            }
        };
        fetchRemainingPlayers();
    }, [gameName, gameMode, gameRoundLevel, currentMatchRound]);

    function generateMatchId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let matchId = '';
        for (let i = 0; i < 8; i++) {
            matchId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return matchId;
    }

    const matchId = generateMatchId(); // Example ID

    const handleSelectPlayer = (index) => {
        const updatedPlayers = [...players];
        updatedPlayers[index].selected = !updatedPlayers[index].selected;
        setPlayers(updatedPlayers);
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        const updatedPlayers = players.map(player => ({ ...player, selected: isChecked }));
        setPlayers(updatedPlayers);
    };

    const handleSubmit = async () => {
        const matchData = {
            matchId,
            gameName,
            gameMode,
            GRLevel: Number(gameRoundLevel), // Cast gameRoundLevel to number if needed
            currentMatchRound: Number(currentMatchRound), // Ensure it's a number
            customId,
            selectedPIds: players.filter(player => player.selected).map(player => player.PID),
        };
    
        try {
            const response = await fetch(makeMatchURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(matchData), // Convert matchData to a JSON string
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                alert('Error making match: ' + errorData.message);
            } else {
                const result = await response.json();
                console.log('Success:', result);
                alert('Match successfully created!');
            }
        } catch (error) {
            console.error('Error during the request:', error);
            alert('An error occurred while making the match.');
        }
    };
    

    // Create Game Round Level options based on maxGRLevel
    const gameRoundLevelOptions = Array.from({ length: maxGRLevel }, (_, i) => (
        <option key={i} value={i}>Level {i}</option>
    ));

    // Create Current Game Round options (fixed for 3 rounds)
    const currentMatchRoundOptions = [
        { value: 0, label: 'Round 1' },
        { value: 1, label: 'Round 2' },
        { value: 2, label: 'Round 3' }
    ].map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
    ));

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-10">
                {/* Form Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div>
                        <label className="text-sm font-semibold">Match ID</label>
                        <input
                            type="text"
                            value={matchId}
                            disabled
                            className="w-full bg-gray-800 border border-gray-600 p-2 rounded text-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Game Name</label>
                        <select
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 p-2 rounded"
                        >
                            <option value="" disabled>Select Game Name</option>
                            <option value="FREEFIRE">FREE FIRE</option>
                            <option value="BGMI">BGMI</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Game Mode</label>
                        <select
                            value={gameMode}
                            onChange={(e) => setGameMode(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 p-2 rounded"
                        >
                            <option value="" disabled>Select Game Mode</option>
                            <option value="SOLO">SOLO</option>
                            <option value="DUO">DUO</option>
                            <option value="SQUAD">SQUAD</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Current Game Round</label>
                        <select
                            value={currentMatchRound}
                            onChange={(e) => setcurrentMatchRound(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 p-2 rounded"
                        >
                            <option value="" disabled>Select Current Game Round</option>
                            {currentMatchRoundOptions}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Game Round Level</label>
                        <select
                            value={gameRoundLevel}
                            onChange={(e) => setGameRoundLevel(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 p-2 rounded"
                        >
                            <option value="" disabled>Select Game Round Level</option>
                            {gameRoundLevelOptions}
                        </select>
                    </div>
                    <div className="col-span-2">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded mt-4">
                            GET LIST
                        </button>
                    </div>
                </div>

                {/* Player Selection Table */}
                <div className="overflow-auto mb-8">
                    <table className="min-w-full bg-gray-800 text-white border border-gray-600">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="p-2 border border-gray-600">S.No</th>
                                <th className="p-2 border border-gray-600">PID</th>
                                <th className="p-2 border border-gray-600">Player Name</th>
                                <th className="p-2 border border-gray-600">Player UID</th>
                                <th className="p-2 border border-gray-600">Player Game Name</th>
                                <th className="p-2 border border-gray-600">Contact</th>
                                <th className="p-2 border border-gray-600">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                    /> Select All
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-4">No players available</td>
                                </tr>
                            ) : (
                                players.map((player, index) => (
                                    <tr key={index} className="text-center hover:bg-gray-700">
                                        <td className="p-2 border border-gray-600">{index + 1}</td>
                                        <td className="p-2 border border-gray-600">{player.PID}</td>
                                        <td className="p-2 border border-gray-600">{player.names}</td>
                                        <td className="p-2 border border-gray-600">{player.uids}</td>
                                        <td className="p-2 border border-gray-600">{player.gameName}</td>
                                        <td className="p-2 border border-gray-600">{player.contacts}</td>
                                        <td className="p-2 border border-gray-600">
                                            <input
                                                type="checkbox"
                                                checked={player.selected || false}
                                                onChange={() => handleSelectPlayer(index)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between mb-4 text-sm">
                    <div>
                        <label>Total Selected: {players.filter(player => player.selected).length}</label>
                    </div>
                    <div>
                        <label>Total Players: {players.length}</label>
                    </div>
                </div>

                {/* Custom Room ID */}
                <div className="mb-4">
                    <label className="text-sm font-semibold">Custom Room ID</label>
                    <input
                        type="text"
                        value={customId}
                        onChange={(e) => setCustomRoomID(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 p-2 rounded"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded">
                        Make Match
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MakeMatch;