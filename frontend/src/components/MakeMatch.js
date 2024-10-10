import React, { useState } from 'react';
import Navbar from './Navbar';

function MakeMatch() {
    const [gameName, setGameName] = useState('');
    const [gameMode, setGameMode] = useState('');
    const [gameRound, setGameRound] = useState('');
    const [gameRoundLevel, setGameRoundLevel] = useState('');
    const [customRoomID, setCustomRoomID] = useState('');
    const [players, setPlayers] = useState([
        { pid: 'F84UDFUI', name: 'Ayush Kothari', uid: '78784758485433', gameName: 'Ashu', contact: '6396979579', selected: false },
        // Add more players here...
    ]);

    const matchID = 'JDIE45SE'; // Example ID

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

    const handleSubmit = () => {
        const matchData = {
            matchID,
            gameName,
            gameMode,
            gameRound,
            gameRoundLevel,
            customRoomID,
            selectedPlayers: players.filter(player => player.selected).map(player => player.pid),
        };
        console.log(matchData);
    };

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
                            value={matchID} 
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
                            <option value="FREE FIRE">FREE FIRE</option>
                            <option value="BGMI">BGMI</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Current Game Round</label>
                        <input 
                            type="text" 
                            value={gameRound} 
                            onChange={(e) => setGameRound(e.target.value)} 
                            placeholder="Current Game Round" 
                            className="w-full bg-gray-800 border border-gray-600 p-2 rounded" 
                        />
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
                        <label className="text-sm font-semibold">Game Round Level</label>
                        <select 
                            value={gameRoundLevel} 
                            onChange={(e) => setGameRoundLevel(e.target.value)} 
                            className="w-full bg-gray-800 border border-gray-600 p-2 rounded"
                        >
                            <option value="" disabled>Select Game Round Level</option>
                            <option value="1">Level 1</option>
                            <option value="2">Level 2</option>
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
                            {players.map((player, index) => (
                                <tr key={index} className="text-center hover:bg-gray-700">
                                    <td className="p-2 border border-gray-600">{index + 1}</td>
                                    <td className="p-2 border border-gray-600">{player.pid}</td>
                                    <td className="p-2 border border-gray-600">{player.name}</td>
                                    <td className="p-2 border border-gray-600">{player.uid}</td>
                                    <td className="p-2 border border-gray-600">{player.gameName}</td>
                                    <td className="p-2 border border-gray-600">{player.contact}</td>
                                    <td className="p-2 border border-gray-600">
                                        <input
                                            type="checkbox"
                                            checked={player.selected || false}
                                            onChange={() => handleSelectPlayer(index)}
                                        />
                                    </td>
                                </tr>
                            ))}
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
                        value={customRoomID}
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
