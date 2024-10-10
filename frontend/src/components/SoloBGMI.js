import React, { useState } from 'react';
import Navbar from './Navbar';

function SoloBGMI() {
    const [playerGameName, setPlayerGameName] = useState('');
    const [transactionMode, setTransactionMode] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [confirmTransactionId, setConfirmTransactionId] = useState('');
    const [error, setError] = useState('');

    // Function to handle transaction mode selection
    const handleTransactionModeChange = (e) => {
        const selectedMode = e.target.value;
        setTransactionMode(selectedMode);
        if (selectedMode === 'CASH') {
            setTransactionId('NONE');
            setConfirmTransactionId('NONE');
        } else {
            setTransactionId('');
            setConfirmTransactionId('');
        }
    };

    // Placeholder function for fetching player name based on UID
    const fetchPlayerGameName = () => {
        setPlayerGameName('Fetched Player Name');
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if transaction ID and confirm transaction ID match
        if (transactionId !== confirmTransactionId) {
            setError('Both Transaction IDs are not same Please enter the valid ID'); // Set error message
        } else {
            setError(''); // Clear any previous error
            // Proceed with registration
            console.log('Registration successful!'); // Here, implement the actual registration logic
        }
    };

    return (
        <div>
            <Navbar />
            <section className="md:p-10 p-4 flex justify-center items-center">
                <div className="w-full max-w-5xl px-4">
                    <div className="space-y-6 ">
                        <h1 className='flex justify-center items-center font-bold text-4xl'>Solo Battle</h1>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4">
                                {/* Game Name */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Game Name:</label>
                                    <input
                                        type="text"
                                        className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                                        value="BGMI"
                                        readOnly
                                    />
                                </div>
                                {/* Game Mode */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Game Mode:</label>
                                    <input
                                        type="text"
                                        className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                                        value="Solo"
                                        readOnly
                                    />
                                </div>
                                {/* Player Name */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Player Name:</label>
                                    <input
                                        type="text"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder="Enter your name"
                                        required
                                        value={playerGameName}
                                        onChange={(e) => setPlayerGameName(e.target.value)}
                                    />
                                </div>

                                {/* Player Email */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Player Email:</label>
                                    <input
                                        type="email"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                {/* Player Phone Number */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Player Phone Number:</label>
                                    <input
                                        type="number"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>

                                {/* Player Game UID */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Player Game UID:</label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                            placeholder="Enter your game UID"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={fetchPlayerGameName}
                                            className="ml-2 bg-purple-600 text-white font-medium rounded-lg px-4 py-2 text-sm"
                                        >
                                            Verify
                                        </button>
                                    </div>
                                </div>

                                {/* Player Game Name */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Player Game Name:</label>
                                    <input
                                        type="text"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder="Your game name is..."
                                        value={playerGameName}
                                        onChange={(e) => setPlayerGameName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* College Name */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">College Name:</label>
                                    <input
                                        type="text"
                                        className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                                        value="Dev Bhoomi Uttarakhand University"
                                        readOnly
                                    />
                                </div>

                                {/* College ID */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">College ID:</label>
                                    <input
                                        type="text"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder="Enter your college ID"
                                        required
                                    />
                                </div>

                                {/* Transaction Mode */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Transaction Mode:</label>
                                    <select
                                        name="transactionMode"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
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
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Transaction ID:</label>
                                    <input
                                        type="text"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder={transactionMode === 'CASH' ? 'NONE' : 'Enter your transaction ID'}
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        readOnly={transactionMode === 'CASH'}
                                        required
                                    />
                                </div>

                                {/* Confirm Transaction ID */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Transaction ID:</label>
                                    <input
                                        type="text"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder="Confirm your transaction ID"
                                        value={confirmTransactionId}
                                        onChange={(e) => setConfirmTransactionId(e.target.value)}
                                        readOnly={transactionMode === 'CASH'}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Error message for mismatched IDs */}
                            {error && <p className="text-red-500">{error}</p>}

                            <button
                                type="submit"
                                className="w-full text-white font-medium rounded-lg px-5 py-3 text-center text-2xl bg-purple-700 hover:bg-purple-900"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SoloBGMI;
