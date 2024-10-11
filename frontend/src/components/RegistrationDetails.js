import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const registerationDetailURL = `${process.env.REACT_APP_SERVER_URL}/users/user-getAll`;

function RegistrationDetails() {
    const [data, setData] = useState([]);
    const [selectedGameName, setSelectedGameName] = useState('');
    const [selectedGameMode, setSelectedGameMode] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Moved this line outside
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the backend when the component loads
        const fetchData = async () => {
            try {
                const response = await fetch(registerationDetailURL, {
                    method: 'POST', // Specify POST method
                    headers: {
                        'Content-Type': 'application/json', // Set content type as JSON
                    },
                    body: JSON.stringify({}), // Adjust body data if needed
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const usersData = await response.json();
                setData(usersData); // Assuming the data from the backend is structured properly
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter the data based on selected game name, mode, and search term
    const filteredData = data.filter((entry) => {
        const matchesGameName = selectedGameName ? entry.gameName === selectedGameName : true;
        const matchesGameMode = selectedGameMode ? entry.gameMode === selectedGameMode : true;
        const matchesSearchTerm = searchTerm ? 
        
            entry.uidNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase())) || 
            entry.emails.some(email => email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            entry.contacts.some(contact => contact.includes(searchTerm)) : true; // Ensure matching by case-insensitive name/email/contact

        return matchesGameName && matchesGameMode && matchesSearchTerm;
    });

    // Function to join player details
    const getPlayerDetails = (entry) => {
        const playerNames = entry.uidNames.join(', ');
        const playerEmails = entry.emails.join(', ');
        const playerContacts = entry.contacts.join(', ');

        return {
            names: playerNames,
            emails: playerEmails,
            contacts: playerContacts,
        };
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-black text-white px-10 py-8">
                <div className="flex items-center justify-between mb-8">
                    {/* Game Name Filter */}
                    <div className="space-x-4 flex items-center">
                        <div className="flex flex-col">
                            <label>Game Name</label>
                            <select
                                value={selectedGameName}
                                onChange={(e) => setSelectedGameName(e.target.value)}
                                className="bg-gray-800 text-white border border-gray-600 p-2 rounded"
                            >
                                <option value="">Choose Game Name</option>
                                <option value="FREEFIRE">FREE FIRE</option>
                                <option value="BGMI">BGMI</option>
                            </select>
                        </div>

                        {/* Game Mode Filter */}
                        <div className="flex flex-col">
                            <label>Game Mode</label>
                            <select
                                value={selectedGameMode}
                                onChange={(e) => setSelectedGameMode(e.target.value)}
                                className="bg-gray-800 text-white border border-gray-600 p-2 rounded"
                            >
                                <option value="">Choose Game Mode</option>
                                <option value="SOLO">SOLO</option>
                                <option value="DUO">DUO</option>
                                <option value="SQUAD">SQUAD</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search here..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded p-2 text-white"
                        />
                        <button className="bg-gray-600 p-2 rounded">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a4 4 0 11-4-4 4 4 0 014 4zM18.364 18.364l-4.95-4.95" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Table structure */}
                <div className="overflow-auto">
                    <table className="min-w-full table-auto bg-gray-900 border border-gray-600">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="p-2 border border-gray-600">S.No</th>
                                <th className="p-2 border border-gray-600">PID</th>
                                <th className="p-2 border border-gray-600">Game Name</th>
                                <th className="p-2 border border-gray-600">Game Mode</th>
                                <th className="p-2 border border-gray-600">Team Name</th>
                                <th className="p-2 border border-gray-600">Player Game ID</th>
                                <th className="p-2 border border-gray-600">Player Name(s)</th>
                                <th className="p-2 border border-gray-600">Player Email(s)</th>
                                <th className="p-2 border border-gray-600">Player Contact(s)</th>
                                <th className="p-2 border border-gray-600">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((entry, index) => {
                                    const { names, emails, contacts } = getPlayerDetails(entry);
                                    return (
                                        <tr key={index} className="text-center">
                                            <td className="p-2 border border-gray-600">{index + 1}</td>
                                            <td className="p-2 border border-gray-600">{entry.PID}</td>
                                            <td className="p-2 border border-gray-600">{entry.gameName}</td>
                                            <td className="p-2 border border-gray-600">{entry.gameMode}</td>
                                            <td className="p-2 border border-gray-600">{entry.teamName}</td>
                                            <td className="p-2 border border-gray-600">{entry.uids.join(', ')}</td>
                                            <td className="p-2 border border-gray-600">{names}</td>
                                            <td className="p-2 border border-gray-600">{emails}</td>
                                            <td className="p-2 border border-gray-600">{contacts}</td>
                                            <td className="p-2 border border-gray-600">{entry.transactionId}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td className="p-4 text-center text-gray-400" colSpan="10">
                                        {selectedGameName || selectedGameMode ? 'No matching data found.' : 'Please select a game and mode to see the data.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RegistrationDetails;
