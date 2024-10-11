import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const registerURL = `${process.env.REACT_APP_SERVER_URL}/users/user-register`;
const uidNameFetch = 'https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=IND&uid=';

function SoloFF() {
    const [playerGameName, setPlayerGameName] = useState('');
    const [playerEmail, setPlayerEmail] = useState('');
    const [playerContact, setPlayerContact] = useState('');
   
    
    const [collegeId, setCollegeId] = useState('');
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

    function generatePID() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let PID = '';
        for (let i = 0; i < 8; i++) {
            PID += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return PID;
    }


    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if transaction ID and confirm transaction ID match
        if (transactionId !== confirmTransactionId) {
            setError('Both Transaction IDs are not the same. Please enter a valid ID.');
            toast.error('Both Transaction IDs are not the same.');
            return;
        }

        setError('');

        const data = {
            PID: generatePID(),
            gameName: 'FREEFIRE',
            gameMode: 'SOLO',
            teamName: 'NONE',
            names: [playerGameName],
            emails: [playerEmail],
            contacts: [playerContact],
            uids: [
                e.target.player_UID.value,
            ],
            uidNames: [
                e.target.uidName.value,
            ],
            collegeNames: ['Dev Bhoomi Uttarakhand University'],
            collegeIds: [collegeId],
            transactionId,
            transactionMode
        };

        // Send the data to the backend using fetch API
        try {
            const response = await fetch(registerURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Registration successful!');
                console.log('Registration successful:', result);

                // Reset form fields after successful registration
                setPlayerGameName('');
                setPlayerEmail('');
                setPlayerContact('');
                setCollegeId('');
                setTransactionMode('');
                setTransactionId('');
                setConfirmTransactionId('');
            } else {
                setError(result.message || 'Registration failed.');
                toast.error(result.message || 'Registration failed.');
            }
        } catch (error) {
            setError('An error occurred during registration.');
            toast.error('An error occurred during registration.');
        }
    };


    return (
        <div>
            <Navbar />
            <section className="md:p-10 p-4 flex justify-center items-center">
                <div className="w-full max-w-5xl px-4">
                    <div className="space-y-6">
                        <h1 className='flex justify-center items-center font-bold text-4xl'>Solo Battle</h1>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4">
                                {/* Game Name */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Game Name:</label>
                                    <input
                                        type="text"
                                        name="gameName"
                                        className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                                        value="FREEFIRE"
                                        readOnly
                                    />
                                </div>
                                {/* Game Mode */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Game Mode:</label>
                                    <input
                                        type="text"
                                        name="gameMode"
                                        className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                                        value="SOLO"
                                        readOnly
                                    />
                                </div>
                                {/* Player Name */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Player Name:</label>
                                    <input
                                        type="text"
                                        name="playerName"
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
                                        name="email"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder="Enter your email"
                                        required
                                        value={playerEmail}
                                        onChange={(e) => setPlayerEmail(e.target.value)}
                                    />
                                </div>

                                {/* Player Phone Number */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Player Phone Number:</label>
                                    <input
                                        type="tel" // Changed to tel for phone number
                                        name="contact"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder="Enter your phone number"
                                        required
                                        value={playerContact}
                                        onChange={(e) => setPlayerContact(e.target.value)}
                                    />
                                </div>

                                {/* Player Game UID */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Player Game UID:</label>
                                    
                                        <input
                                            type="text"
                                            name="player_UID"
                                            className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                            placeholder="Enter your game UID"
                                            required
                                            
                                        />
                                        
                                    
                                </div>

                                {/* Player Game Name */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Player UID Name:</label>
                                    <input
                                        type="text"
                                        name="uidName" // Update name if you want
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder="Your game name is..."
                                        required
                                    />
                                </div>

                                {/* College ID */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">College ID:</label>
                                    <input
                                        type="text"
                                        name="collegeId"
                                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                        placeholder="Enter your college ID"
                                        required
                                        value={collegeId}
                                        onChange={(e) => setCollegeId(e.target.value)}
                                    />
                                </div>


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
                            <div className='md:flex md:gap-4'>
                                {/* Transaction ID */}
                                <div className="col-span-1 w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Transaction ID:</label>
                                    <input
                                        type="text"
                                        name="transactionId"
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
                                        placeholder={transactionMode === 'CASH' ? 'NONE' : 'Confirm your transaction ID'}
                                        value={confirmTransactionId}
                                        onChange={(e) => setConfirmTransactionId(e.target.value)}
                                        readOnly={transactionMode === 'CASH'}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="col-span-1 w-full">
                                    <p className="text-red-500">{error}</p>
                                </div>
                            )}

                            <button type="submit" className="my-4 w-full bg-purple-600 text-white font-medium rounded-lg px-4 py-4 text-xl ">Submit</button>
                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
}

export default SoloFF;