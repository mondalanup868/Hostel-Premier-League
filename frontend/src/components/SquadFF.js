import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const registerURL = `${process.env.REACT_APP_SERVER_URL}/users/user-register`;
// const uidNameFetch = `https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=IND&uid=`;

function SquadFF() {
    const [player1_UID, setFirstPlayerUID] = useState('');
    const [player2_UID, setSecondPlayerUID] = useState('');
    const [player3_UID, setThirdPlayerUID] = useState('');
    const [player4_UID, setFourthPlayerUID] = useState('');

    const [uidName, setPlayer1_UID] = useState('');
    const [uid2Name, setPlayer2_UID] = useState('');
    const [uid3Name, setPlayer3_UID] = useState('');
    const [uid4Name, setPlayer4_UID] = useState('');

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

    // Placeholder function for fetching player name based on UID
    

    



 


    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if transaction ID and confirm transaction ID match
        if (transactionId !== confirmTransactionId) {
            setError('Both Transaction IDs are not the same. Please enter a valid ID.');
            toast.error('Both Transaction IDs are not the same.');
            return;
        }

        setError('');
        const data = {
            PID: generatePID(),
            gameName: "FREEFIRE",
            gameMode: "SQUAD",
            teamName: e.target.teamName.value,
            names: [
                e.target.player1_name.value,
                e.target.player2_name.value,
                e.target.player3_name.value,
                e.target.player4_name.value,
            ],
            emails: [
                e.target.player1_email.value,
                e.target.player2_email.value,
                e.target.player3_email.value,
                e.target.player4_email.value,
            ],
            contacts: [
                e.target.player1_contact.value,
                e.target.player2_contact.value,
                e.target.player3_contact.value,
                e.target.player4_contact.value,
            ],
            uids: [
                e.target.player1_UID.value,
                e.target.player2_UID.value,
                e.target.player3_UID.value,
                e.target.player4_UID.value,
            ],
            uidNames: [
                e.target.First_player.value,
                e.target.Second_player.value,
                e.target.Third_player.value,
                e.target.Fourth_player.value,
                
            ],
            collegeNames: [
                e.target.player1_collegeName.value,
                e.target.player2_collegeName.value,
                e.target.player3_collegeName.value,
                e.target.player4_collegeName.value,
            ],
            collegeIds: [
                e.target.player1_collegeId.value,
                e.target.player2_collegeId.value,
                e.target.player3_collegeId.value,
                e.target.player4_collegeId.value,
            ],
            transactionId: transactionId,
            transactionMode: transactionMode,
        };

        // Send data to backend
        try {
            // Send data to backend
            const response = await fetch(registerURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Registration successful!");

                // Reset the form fields
                e.target.reset();

                // Reset state variables
                setTransactionId("");
                setConfirmTransactionId("");  // Also reset confirmTransactionId
                setTransactionMode("");
                setPlayer1_UID("");
                setPlayer2_UID("");
            } else {
                toast.error(result.message || "Registration failed.");
            }
        } catch (error) {
            toast.error("An error occurred during registration.");
        }
    }
    return (
        <div>
            <Navbar />
            <h1 className='flex justify-center items-center font-bold text-4xl m-5'>Squad Battle</h1>
            <form className="space-y-6 m-10" onSubmit={handleSubmit}>
                {/* Team name */}
                <div className="col-span-1 w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Team Name:</label>
                    <input
                        type="text"
                        name="teamName"
                        className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                        placeholder='Enter your team name here'
                        required
                    />
                </div>
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
                        value="SQUAD"
                        readOnly
                    />
                </div>
                <div className='md:flex justify-between '>
                    {/* First Player */}
                    <div className="space-y-6">

                        {/* Player Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">First Player Name:</label>
                            <input
                                type="text"
                                name="player1_name"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your name"
                                required

                            />
                        </div>

                        {/* Player Email */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">First Player Email:</label>
                            <input
                                type="email"
                                name="player1_email"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Player Phone Number */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">First Player Phone Number:</label>
                            <input
                                type="number"
                                name="player1_contact"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Player Game UID */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">First Player Game UID:</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="player1_UID"
                                    // onChange={(e) => setFirstPlayerUID(e.target.value)}
                                    className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                    placeholder="Enter your game UID"
                                    required
                                />
                                
                            </div>
                        </div>

                        {/* Player Game Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">First Player UID Name:</label>
                            <input
                                type="text"
                                name='First_player'
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Your game name is..."
                                required
                            />
                        </div>

                        {/* College Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">First Player College Name:</label>
                            <input
                                type="text"
                                name="player1_collegeName"
                                className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                                value="Dev Bhoomi Uttarakhand University"
                                readOnly
                            />
                        </div>

                        {/* College ID */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">First Player College ID:</label>
                            <input
                                type="text"
                                name="player1_collegeId"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your college ID"
                                required
                            />
                        </div>


                    </div>
                    {/* Second Player */}
                    <div className="space-y-6">

                        {/* Player Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Second Player Name:</label>
                            <input
                                type="text"
                                name="player2_name"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your name"
                                required

                            />
                        </div>

                        {/* Player Email */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Second Player Email:</label>
                            <input
                                type="email"
                                name="player2_email"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Player Phone Number */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Second Player Phone Number:</label>
                            <input
                                type="number"
                                name="player2_contact"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Player Game UID */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Second Player Game UID:</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="player2_UID"
                                    // onChange={(e) => setSecondPlayerUID(e.target.value)}
                                    className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                    placeholder="Enter your game UID"
                                    required
                                />
                                
                            </div>
                        </div>

                        {/* Player Game Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Second Player UID Name:</label>
                            <input
                                type="text"
                                name="Second_player"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Your game name is..."
                                required
                            />
                        </div>

                        {/* College Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Second Player College Name:</label>
                            <input
                                type="text"
                                name="player2_collegeName"
                                className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                                value="Dev Bhoomi Uttarakhand University"
                                readOnly
                            />
                        </div>

                        {/* College ID */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Second Player College ID:</label>
                            <input
                                type="text"
                                name="player2_collegeId"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your college ID"
                                required
                            />
                        </div>


                    </div>
                    {/* Third Player */}
                    <div className="space-y-6">

                        {/* Player Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Third Player Name:</label>
                            <input
                                type="text"
                                name="player3_name"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your name"
                                required

                            />
                        </div>

                        {/* Player Email */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Third Player Email:</label>
                            <input
                                type="email"
                                name="player3_email"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Player Phone Number */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Third Player Phone Number:</label>
                            <input
                                type="number"
                                name="player3_contact"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Player Game UID */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Third Player Game UID:</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="player3_UID"
                                    // onChange={(e) => setThirdPlayerUID(e.target.value)}
                                    className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                    placeholder="Enter your game UID"
                                    required
                                />
                                
                            </div>
                        </div>

                        {/* Player Game Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Third Player Game Name:</label>
                            <input
                                type="text"
                                name="Third_player"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Your game name is..."
                                required
                            />
                        </div>

                        {/* College Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Third Player College Name:</label>
                            <input
                                type="text"
                                name="player3_collegeName"
                                className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                                value="Dev Bhoomi Uttarakhand University"
                                readOnly
                            />
                        </div>

                        {/* College ID */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Third Player College ID:</label>
                            <input
                                type="text"
                                name="player3_collegeId"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your college ID"
                                required
                            />
                        </div>


                    </div>
                    {/* Fourth Player */}
                    <div className="space-y-6">

                        {/* Player Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Fourth Player Name:</label>
                            <input
                                type="text"
                                name="player4_name"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your name"
                                required

                            />
                        </div>

                        {/* Player Email */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Fourth Player Email:</label>
                            <input
                                type="email"
                                name="player4_email"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Player Phone Number */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Fourth Player Phone Number:</label>
                            <input
                                type="number"
                                name="player4_contact"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Player Game UID */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Fourth Player Game UID:</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="player4_UID"
                                    // onChange={(e) => setFourthPlayerUID(e.target.value)}
                                    className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                    placeholder="Enter your game UID"
                                    required
                                />
                                
                            </div>
                        </div>

                        {/* Player Game Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Fourth Player Game Name:</label>
                            <input
                                type="text"
                                name='Fourth_player'
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Your game name is..."
                                required
                            />
                        </div>

                        {/* College Name */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Fourth Player College Name:</label>
                            <input
                                type="text"
                                name="player4_collegeName"
                                className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                                value="Dev Bhoomi Uttarakhand University"
                                readOnly
                            />
                        </div>

                        {/* College ID */}
                        <div className="col-span-1 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Fourth Player College ID:</label>
                            <input
                                type="text"
                                name="player4_collegeId"
                                className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Enter your college ID"
                                required
                            />
                        </div>


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
                {/* Error message for mismatched IDs */}
                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="w-full text-white font-medium rounded-lg px-5 py-3 text-center text-2xl bg-purple-700 hover:bg-purple-900"
                >
                    Register
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default SquadFF