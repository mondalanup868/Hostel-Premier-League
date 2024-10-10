import React, { useState } from 'react';
import Navbar from './Navbar';

function DuoBGMI() {
  const [firstPlayerGameName, setFirstPlayerGameName] = useState('');
  const [secondPlayerGameName, setSecondPlayerGameName] = useState('');
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
  const fetchFirstPlayerGameName = () => {
    setFirstPlayerGameName('Fetched Player 1');
  };

  const fetchSecondPlayerGameName = () => {
    setSecondPlayerGameName('Fetched Player 2');
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
            <h1 className='flex justify-center items-center font-bold text-4xl'>Duo Battle</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Team name */}
              <div className="col-span-1 w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Team Name:</label>
                    <input
                        type="text"
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
                  className="bg-blue-50 border border-blue-300 text-green-500 text-sm rounded-lg w-full p-2.5"
                  value="BGMI"
                  readOnly
                />
              </div>
              {/* Game Mode */}
              <div className="col-span-1 w-full">
                <label className="block  text-sm font-medium text-gray-900">Game Mode:</label>
                <input
                  type="text"
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
                          className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                          placeholder="Enter your game UID"
                          required
                        />
                        <button
                          type="button"
                          onClick={fetchFirstPlayerGameName}
                          className="ml-2 bg-purple-600 text-white font-medium rounded-lg px-4 py-2 text-sm"
                        >
                          Verify
                        </button>
                      </div>
                    </div>

                    {/* Player Game Name */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">First Player Game Name:</label>
                      <input
                        type="text"
                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        placeholder="Your game name is..."
                        value={firstPlayerGameName}
                        onChange={(e) => setFirstPlayerGameName(e.target.value)}
                        required
                      />
                    </div>

                    {/* College Name */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">First Player College Name:</label>
                      <input
                        type="text"
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
                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        placeholder="Enter your college ID"
                        required
                      />
                    </div>

                  </div>
                </div>
                {/* Second Player */}
                <div>
                  <div className="">
                    {/* Player Name */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Second Player Name:</label>
                      <input
                        type="text"
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
                          className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                          placeholder="Enter your game UID"
                          required
                        />
                        <button
                          type="button"
                          onClick={fetchSecondPlayerGameName}
                          className="ml-2 bg-purple-600 text-white font-medium rounded-lg px-4 py-2 text-sm"
                        >
                          Verify
                        </button>
                      </div>
                    </div>

                    {/* Player Game Name */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Second Player Game Name:</label>
                      <input
                        type="text"
                        className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        placeholder="Your game name is..."
                        value={secondPlayerGameName}
                        onChange={(e) => setSecondPlayerGameName(e.target.value)}
                        required
                      />
                    </div>

                    {/* College Name */}
                    <div className="col-span-1 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900">Second Player College Name:</label>
                      <input
                        type="text"
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
                className="flex justify-center items-center w-full text-white font-medium rounded-lg px-5 py-3 text-center text-2xl bg-purple-700 hover:bg-purple-900"
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

export default DuoBGMI;
