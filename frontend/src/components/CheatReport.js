import React, { useState } from 'react';
import Navbar from './Navbar';

const fetchUserUrl = `${process.env.REACT_APP_SERVER_URL}/users/user-getByPID`; // This will POST with the PID to get user details
const banUserUrl = `${process.env.REACT_APP_SERVER_URL}/users/user-ban`;
const getUserStatus = `${process.env.REACT_APP_SERVER_URL}/users/user-getUserStatus`;
const unbanUserUrl = `${process.env.REACT_APP_SERVER_URL}/users/user-unban`;

const CheatReport = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null); // Initially null until search is performed
    const [userStatus, setUserStatus] = useState(null); // To store user status
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle the search functionality (fetching player details by PID)
    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(fetchUserUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ PID: searchTerm }) // Send PID in POST body
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            console.log(data);
            
            // Set the 'user' field from response to state
            if (data.success && data.user) {
                setUser(data.user);  // Extract and set the user data
                // Fetch user status after fetching user data
                fetchUserStatus(data.user.PID);
            } else {
                setError("User not found");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch the user status
    const fetchUserStatus = async (PID) => {
        try {
            const response = await fetch(getUserStatus, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ PID }) // Send PID in POST body
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user status');
            }

            const data = await response.json();
            console.log(data);

            if (data.status) {
                setUserStatus(data.status); // Set user status
            } else {
                setError("Status not found");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle banning the entire squad/duo associated with the PID
    const handleBan = async () => {
        if (!user || !user.PID) return;

        try {
            const response = await fetch(banUserUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ PID: user.PID }) // Send PID in POST body for banning
            });

            if (!response.ok) {
                throw new Error('Failed to ban the players');
            }

            console.log(`Team with PID: ${user.PID} banned successfully.`);
            // Optionally reset user state after banning
            setUser(null); // Reset user data after successful ban
            setUserStatus(null); // Reset user status
        } catch (err) {
            console.error('Ban failed:', err.message);
        }
    };

    // Handle unbanning the entire squad/duo associated with the PID
    const handleUnban = async () => {
        if (!user || !user.PID) return;

        try {
            // Call the banUserUrl with appropriate request to unban
            // Assuming your API can handle a request to unban by passing the same PID
            const response = await fetch(unbanUserUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ PID: user.PID, action: 'unban' }) // Include action if needed
            });

            if (!response.ok) {
                throw new Error('Failed to unban the players');
            }

            console.log(`Team with PID: ${user.PID} unbanned successfully.`);
            // Optionally reset user state after unbanning
            setUser(null); // Reset user data after successful unban
            setUserStatus(null); // Reset user status
        } catch (err) {
            console.error('Unban failed:', err.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-5">
                {/* Search Bar */}
                <div className="flex space-x-4 mb-8">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter PID"
                        className="bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition ease-in-out"
                    >
                        Search
                    </button>
                </div>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* Player Data Table */}
                {user && (
                    <div className="overflow-x-auto w-full lg:w-2/3">
                        <table className="w-full bg-gray-800 rounded-lg shadow-lg text-left">
                            <thead>
                                <tr className="text-gray-300">
                                    <th className="py-4 px-6">S.NO</th>
                                    <th className="py-4 px-6">PID</th>
                                    <th className="py-4 px-6">Player Name</th>
                                    <th className="py-4 px-6">Player UID</th>
                                    <th className="py-4 px-6">Player Game Name</th>
                                    <th className="py-4 px-6">Contact Number</th>
                                    <th className="py-4 px-6">Current Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.names.map((name, index) => (
                                    <tr key={user.uids[index]} className="border-t border-gray-700 text-white">
                                        <td className="py-4 px-6">{index + 1}.</td>
                                        <td className="py-4 px-6">{user.PID}</td>
                                        <td className="py-4 px-6">{name}</td>
                                        <td className="py-4 px-6">{user.uids[index]}</td>
                                        <td className="py-4 px-6">{user.uidNames[index]}</td>
                                        <td className="py-4 px-6">{user.contacts[index]}</td>
                                        <td className={`py-4 px-6 ${userStatus === 'GOOD' ? 'text-green-400' : 'text-red-500'}`}>
                                            {userStatus}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Ban/Unban Button */}
                        <div className="mt-8">
                            {userStatus === 'GOOD' ? (
                                <button
                                    onClick={handleBan}
                                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition ease-in-out"
                                >
                                    Ban Entire Team
                                </button>
                            ) : (
                                <button
                                    onClick={handleUnban}
                                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition ease-in-out"
                                >
                                    Unban Entire Team
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheatReport;
