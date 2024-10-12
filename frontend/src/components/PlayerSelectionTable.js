import React, { useState } from 'react';
import Navbar from './Navbar';
import Arrow from '../assets/arrow.png'

const PlayerSelectionTable = () => {
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

    const togglePlayerSelection = (id) => {
        setSelectedPlayers({
            ...selectedPlayers,
            [id]: !selectedPlayers[id],
        });
    };

    return (
        <div>
            <Navbar />
            <div className="bg-gray-900 min-h-screen p-8 flex flex-col items-center text-white">
                <div className="text-left w-full max-w-5xl">
                    <div className='flex justify-between items-center '>
                        <div>
                            {/* <div className='bg-purple-500 flex justify-start '>X</div> */}
                            <h1 className="text-xl font-semibold">GAME ID: F84UDFUI</h1>
                            <h2 className="text-xl font-semibold">CUSTOM ID: 5678945685</h2>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold mr-2 text-2xl">Select for :</label>
                            <select className="bg-gray-800 text-white p-2 rounded text-xl">
                                <option value="next-match">Next match</option>
                                <option value="winner">Select Winner</option>
                            </select>
                        </div>
                    </div>

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
                                    <th className="px-4 py-2 border">Player Selection</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(selectedPlayers).map((id, index) => (
                                    <tr
                                        key={id}
                                        className={`${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'
                                            }`}
                                    >
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">F84UDFUI</td>
                                        <td className="border px-4 py-2">Ayush Kothari</td>
                                        <td className="border px-4 py-2">7878475845433</td>
                                        <td className="border px-4 py-2">Ashu</td>
                                        <td className="border px-4 py-2">6396979579</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className={`${selectedPlayers[id]
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                                    } px-4 py-2 rounded`}
                                                onClick={() => togglePlayerSelection(id)}
                                            >
                                                {selectedPlayers[id] ? 'Selected' : 'Not Selected'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button className="bg-purple-600 text-white font-bold py-2 px-6 rounded hover:bg-purple-700 transition duration-300">
                            Next Match
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerSelectionTable;
