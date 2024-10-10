import React, { useState } from 'react';
import Navbar from './Navbar';

const registerURL = `${process.env.REACT_APP_SERVER_URL}/users/user-register`;
const uidNameFetch = `https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=IND&uid=`;

function DuoFF() {
  const [player1_UID, setFirstPlayerUID] = useState('');
  const [player2_UID, setSecondPlayerUID] = useState('');
  const [uidName, setPlayer1_UID] = useState('');
  const [uid2Name, setPlayer2_UID] = useState('');
  const [transactionMode, setTransactionMode] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [confirmTransactionId, setConfirmTransactionId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

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

  // Function to fetch the first player's game name based on UID
  const fetchFirstPlayerGameName = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(uidNameFetch + player1_UID, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.status === 200) {
        let uidName = result.basicInfo.nickname;
        console.log("uid name:", uidName)
        setPlayer1_UID(uidName);
        setError('');
      } else {
        setError(result.message || 'Failed to fetch UID name.');
        console.error('Error fetching UID name:', result.message);
      }
    } catch (error) {
      console.error('Error during UID fetch:', error);
      setError('An error occurred while fetching UID name.');
    } finally {
      setLoading(false); // Stop loading
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

  // Function to fetch the second player's game name based on UID
  const fetchSecondPlayerGameName = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(uidNameFetch + player2_UID, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
     

      if (response.status === 200) {
        let uid2Name = result.basicInfo.nickname;
        console.log("Second player UID name: ",uid2Name);
        setPlayer2_UID(uid2Name);
        setError('');
      } else {
        setError(result.message || 'Failed to fetch UID name.');
        console.error('Error fetching UID name:', result.message);
      }
    } catch (error) {
      console.error('Error during UID fetch:', error);
      setError('An error occurred while fetching UID name.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionId !== confirmTransactionId) {
      setError('Both Transaction IDs are not same. Please enter a valid ID.');
    } else {
      setError('');

      // Create the data object to send to the backend
      const data = {
        PID: generatePID(),
        gameName: "FREEFIRE",
        gameMode: "DUO",
        teamName: e.target.teamName.value,
        names: [
          e.target.player1_name.value,
          e.target.player2_name.value,
        ],
        emails: [
          e.target.player1_email.value,
          e.target.player2_email.value,
        ],
        contacts: [
          e.target.player1_contact.value,
          e.target.player2_contact.value,
        ],
        uids: [
          e.target.player1_UID.value, 
          e.target.player2_UID.value, 
        ],
        uidNames: [
          uidName,
          uid2Name,
        ],
        collegeNames: [
          e.target.player1_collegeName.value,
          e.target.player2_collegeName.value,
        ],
        collegeIds: [
          e.target.player1_collegeId.value,
          e.target.player2_collegeId.value,
        ],
        transactionId: transactionId,
        transactionMode: transactionMode,
      };

      // Send data to backend
      fetch(registerURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
          // Optionally, redirect the user or display a success message
        })
        .catch((error) => {
          console.error('Error:', error);
          setError('Failed to register. Please try again.');
        });
    }
  };

  return (
    <div>
      <Navbar />
      <section className="md:p-10 p-4 flex justify-center items-center">
        <div className="w-full max-w-5xl px-4">
          <div className="space-y-6 ">
            <h1 className='flex justify-center items-center font-bold text-4xl'>Duo Battle</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                <label className="block text-sm font-medium text-gray-900">Game Name:</label>
                <input
                  type="text"
                  name="gameName"
                  className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                  value="Free Fire"
                  readOnly
                />
              </div>
              {/* Game Mode */}
              <div className="col-span-1 w-full">
                <label className="block text-sm font-medium text-gray-900">Game Mode:</label>
                <input
                  type="text"
                  name="gameMode"
                  className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                  value="Duo"
                  readOnly
                />
              </div>
              <div className='flex justify-between'>
                {/* First Player */}
                <div className=''>
                  <div className="">
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

                    {/* Player UID */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">First Player UID:</label>
                      <input
                        type="text"
                        name="player1_UID"
                        onChange={(e) => setFirstPlayerUID(e.target.value)}
                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        placeholder="Enter your UID"
                        required
                      />
                      <button type="button" onClick={fetchFirstPlayerGameName} className="ml-2 bg-purple-600 text-white font-medium rounded-lg px-4 py-2 text-sm">
                        Fetch Game Name
                      </button>
                    </div>

                    {/* Player Game Name */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">First Player UID Name:</label>
                      <input
                        type="text"
                        name="player1_uidName"
                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        placeholder="Your game name is..."
                        value={uidName}
                        readOnly
                      />
                    </div>

                    {/* Player College Name */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">First Player College Name:</label>
                      <input
                        type="text"
                        name="player1_collegeName"
                        value="Dev Bhoomi Uttarakhand University"
                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        placeholder="Enter your college name"
                        required
                        readOnly
                      />
                    </div>

                    {/* Player College ID */}
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
                </div>

                {/* Second Player */}
                <div className=''>
                  <div className="">
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

                    {/* Player UID */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Second Player UID:</label>
                      <input
                        type="text"
                        name="player2_UID"
                        onChange={(e) => setSecondPlayerUID(e.target.value)}
                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        placeholder="Enter your UID"
                        required
                      />
                      <button type="button" onClick={fetchSecondPlayerGameName} className="ml-2 bg-purple-600 text-white font-medium rounded-lg px-4 py-2 text-sm">
                        Fetch Game Name
                      </button>

                      
                    </div>

                    {/* Player Game Name */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Second Player UID Name:</label>
                      <input
                        type="text"
                        name="player2_uidName"
                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        placeholder="Your game name is..."
                        value={uid2Name}
                        readOnly
                      />
                    </div>

                    {/* Player College Name */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Second Player College Name:</label>
                      <input
                        type="text"
                        name="player2_collegeName"
                        value="Dev Bhoomi Uttarakhand University"
                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        placeholder="Enter your college name"
                        required
                        readOnly
                      />
                    </div>

                    {/* Player College ID */}
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
                </div>
              </div>

              {/* Transaction Mode */}
              <div className="col-span-1 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">Transaction Mode:</label>
                <select
                  value={transactionMode}
                  onChange={handleTransactionModeChange}
                  className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                  required
                >
                  <option value="">Select transaction mode</option>
                  <option value="CASH">CASH</option>
                  <option value="ONLINE">ONLINE</option>
                </select>
              </div>

              {/* Transaction ID */}
              <div className="col-span-1 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">Transaction ID:</label>
                <input
                  type="text"
                  name="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                  placeholder="Enter your Transaction ID"
                  required
                />
              </div>

              {/* Confirm Transaction ID */}
              <div className="col-span-1 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Transaction ID:</label>
                <input
                  type="text"
                  name="confirmTransactionId"
                  value={confirmTransactionId}
                  onChange={(e) => setConfirmTransactionId(e.target.value)}
                  className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                  placeholder="Re-enter your Transaction ID"
                  required
                />
              </div>

              

              {/* Error Message */}
              {error && <div className="text-red-600">{error}</div>}

              {/* Submit Button */}
              <button
                type="submit"
                className="flex justify-center items-center w-full text-white font-medium rounded-lg px-5 py-3 text-center text-2xl bg-purple-700 hover:bg-purple-900"
              >
                {loading ? 'Submitting...' : 'Register Duo'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DuoFF;
