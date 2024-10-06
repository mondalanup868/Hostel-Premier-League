import React, { useState } from 'react';

function SoloReg() {
    const [playerName, setPlayerName] = useState('');
    const [transactionMode, setTransactionMode] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const handleTransactionModeChange = (e) => {
        setTransactionMode(e.target.value);
        if (e.target.value === 'CASH') {
            setTransactionId('NONE'); // If CASH, set transaction ID to "NONE"
        } else {
            setTransactionId(''); // Reset transaction ID for other modes
        }
    };

    const fetchPlayerName = () => {
        // API call to fetch player name based on UID
        setPlayerName('Fetched Player Name'); // Placeholder for fetched name
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-6 sm:p-8">
                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-center">
                                Solo Battle
                            </h1>
                            <form className="space-y-6" action="#">
                                {/* Grid layout for 2x2 inputs */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Player Name */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Player Name:
                                        </label>
                                        <input 
                                            type="text" 
                                            name="playerName" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                                            value={playerName} 
                                            onChange={(e) => setPlayerName(e.target.value)} 
                                            placeholder="Enter your name"
                                        />
                                        <button type="button" onClick={fetchPlayerName} className="mt-1 text-sm text-blue-600">
                                            Fetch Player Name
                                        </button>
                                    </div>

                                    {/* Player Game UID */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Player Game UID:</label>
                                        <input 
                                            type="text" 
                                            name="playerGameUID" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                                            placeholder="Enter your game UID" 
                                            required 
                                        />
                                    </div>

                                    {/* Player Email */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Player Email:</label>
                                        <input 
                                            type="email" 
                                            name="playerEmail" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                                            placeholder="Enter your email" 
                                            required 
                                        />
                                    </div>

                                    {/* Player Phone Number */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Player Phone Number:</label>
                                        <input 
                                            type="number" 
                                            name="playerPhone" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                                            placeholder="Enter your phone number" 
                                            required 
                                        />
                                    </div>
                                    
                                    {/* Player Game Name */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Player Game Name:</label>
                                        <input 
                                            type="text" 
                                            name="playerGameName" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                                            placeholder="Your game name is..." 
                                            required 
                                        />
                                    </div>

                                    {/* College Name */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">College Name:</label>
                                        <input 
                                            type="text" 
                                            name="collegeName" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                                            value="Dev Bhoomi Uttarakhand University"
                                            readOnly
                                        />
                                    </div>

                                    {/* College ID */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">College ID:</label>
                                        <input 
                                            type="text" 
                                            name="collegeID" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                                            placeholder="Enter your college ID" 
                                            required 
                                        />
                                    </div>

                                    {/* Transaction Mode */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transaction Mode:</label>
                                        <select 
                                            name="transactionMode" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                                            value={transactionMode} 
                                            onChange={handleTransactionModeChange}
                                            required
                                        >
                                            <option value="">Select Payment Method</option>
                                            <option value="CASH">CASH</option>
                                            <option value="UPI">UPI</option>
                                        </select>
                                    </div>

                                    {/* Transaction ID */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transaction ID:</label>
                                        <input 
                                            type="text" 
                                            name="transactionId" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                                            placeholder={transactionMode === 'CASH' ? 'NONE' : 'Enter your transaction ID'} 
                                            value={transactionId} 
                                            onChange={(e) => setTransactionId(e.target.value)} 
                                            readOnly={transactionMode === 'CASH'}
                                            required
                                        />
                                    </div>

                                    {/* Confirm Transaction ID */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Transaction ID:</label>
                                        <input 
                                            type="text" 
                                            name="confirmTransactionId" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" 
                                            placeholder="Confirm your transaction ID" 
                                            required 
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full text-white font-medium rounded-lg px-5 py-3 text-center dark:focus:ring-primary-800 text-2xl bg-purple-600">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SoloReg;
