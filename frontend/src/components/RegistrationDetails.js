import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const registerationDetailURL = `${process.env.REACT_APP_SERVER_URL}/users/user-getAll`;
const updateURL = `${process.env.REACT_APP_SERVER_URL}/users/user-update`;

function RegistrationDetails() {
    const [data, setData] = useState([]);
    const [selectedGameName, setSelectedGameName] = useState('');
    const [selectedGameMode, setSelectedGameMode] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [editingRowIndex, setEditingRowIndex] = useState(null); // Track the index of the row being edited
    const [editedRowData, setEditedRowData] = useState({}); // Store the edited data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(registerationDetailURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const usersData = await response.json();
                setData(usersData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = (index, entry) => {
        setEditingRowIndex(index);
        setEditedRowData({ ...entry, uids: entry.uids.join(', '), uidNames: entry.uidNames.join(', '), emails: entry.emails.join(', '), contacts: entry.contacts.join(', ') });
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setEditedRowData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSaveClick = async (index) => {
        const updatedData = [...data];
        const updatedRow = {
            ...editedRowData,
            uids: editedRowData.uids.split(',').map((uid) => uid.trim()),
            uidNames: editedRowData.uidNames.split(',').map((name) => name.trim()),
            emails: editedRowData.emails.split(',').map((email) => email.trim()),
            contacts: editedRowData.contacts.split(',').map((contact) => contact.trim()),
        };
    
        updatedData[index] = updatedRow;
        setData(updatedData);
        setEditingRowIndex(null);
    
        try {
            // Send the updated row data to the backend
            const response = await fetch(updateURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PID: updatedRow.PID,
                    gameName: updatedRow.gameName,
                    gameMode: updatedRow.gameMode,
                    teamName: updatedRow.teamName,
                    names: updatedRow.uidNames,
                    emails: updatedRow.emails,
                    contacts: updatedRow.contacts,
                    uids: updatedRow.uids,
                    uidNames: updatedRow.uidNames,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
    
            const result = await response.json();
            console.log('Update successful:', result);
    
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    

    const filteredData = data.filter((entry) => {
        const matchesGameName = selectedGameName ? entry.gameName === selectedGameName : true;
        const matchesGameMode = selectedGameMode ? entry.gameMode === selectedGameMode : true;
        const matchesSearchTerm = searchTerm
            ? entry.uidNames.some((name) => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
              entry.emails.some((email) => email.toLowerCase().includes(searchTerm.toLowerCase())) ||
              entry.contacts.some((contact) => contact.includes(searchTerm))
            : true;

        return matchesGameName && matchesGameMode && matchesSearchTerm;
    });

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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a4 4 0 11-4-4 4 4 0 014 4zM18.364 18.364l-4.95-4.95"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

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
                                <th className="p-2 border border-gray-600">Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((entry, index) => {
                                    const { names, emails, contacts } = getPlayerDetails(entry);

                                    return editingRowIndex === index ? (
                                        <tr key={index} className="text-center">
                                            <td className="p-2 border border-gray-600">{index + 1}</td>
                                            <td className="p-2 border border-gray-600">{entry.PID}</td>
                                            <td className="p-2 border border-gray-600">{entry.gameName}</td>
                                            <td className="p-2 border border-gray-600">{entry.gameMode}</td>
                                            <td className="p-2 border border-gray-600">
                                                <input
                                                    value={editedRowData.teamName}
                                                    onChange={(e) => handleInputChange(e, 'teamName')}
                                                    className="bg-gray-800 border border-gray-600 rounded p-2 text-white"
                                                />
                                            </td>
                                            <td className="p-2 border border-gray-600">
                                                <input
                                                    value={editedRowData.uids}
                                                    onChange={(e) => handleInputChange(e, 'uids')}
                                                    className="bg-gray-800 border border-gray-600 rounded p-2 text-white"
                                                />
                                            </td>
                                            <td className="p-2 border border-gray-600">
                                                <input
                                                    value={editedRowData.uidNames}
                                                    onChange={(e) => handleInputChange(e, 'uidNames')}
                                                    className="bg-gray-800 border border-gray-600 rounded p-2 text-white"
                                                />
                                            </td>
                                            <td className="p-2 border border-gray-600">
                                                <input
                                                    value={editedRowData.emails}
                                                    onChange={(e) => handleInputChange(e, 'emails')}
                                                    className="bg-gray-800 border border-gray-600 rounded p-2 text-white"
                                                />
                                            </td>
                                            <td className="p-2 border border-gray-600">
                                                <input
                                                    value={editedRowData.contacts}
                                                    onChange={(e) => handleInputChange(e, 'contacts')}
                                                    className="bg-gray-800 border border-gray-600 rounded p-2 text-white"
                                                />
                                            </td>
                                            <td className="p-2 border border-gray-600">{entry.transactionId}</td>
                                            <td className="p-2 border border-gray-600">
                                                <button
                                                    onClick={() => handleSaveClick(index)}
                                                    className="bg-green-600 hover:bg-green-700 p-2 rounded"
                                                >
                                                    Save
                                                </button>
                                            </td>
                                        </tr>
                                    ) : (
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
                                            <td className="p-2 border border-gray-600">
                                                <button
                                                    onClick={() => handleEditClick(index, entry)}
                                                    className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="11" className="p-4 text-center">
                                        No results found.
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
