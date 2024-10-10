import React, { useState } from 'react'; // Import useState from React
import BGMI from '../assets/Bgmi.jpeg'; // Correct image import
import { Link } from 'react-router-dom'; // Import Link if needed

function BgmiCard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Initialize dropdown state

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown state
  };

  return (
    <div className="relative">
      <img
        src={BGMI}
        alt="BGMI" // Change alt text to match the image
        className="object-cover w-full h-full rounded-lg border-2 border-blue-800 shadow-xl"
      />
      <div className="absolute bottom-0 left-0 w-full text-center p-4 bg-opacity-50">
        <h5 className="mb-2 text-4xl font-bold tracking-tight text-white">BGMI</h5> {/* Update title to match the game */}

        {/* Button to toggle dropdown */}
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center items-center px-4 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
        >
          Register
          <svg
            className="w-4 h-4 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>

        {/* Conditionally render dropdown options */}
        {isDropdownOpen && (
          <div className="mt-2 bg-white rounded-lg shadow-lg w-full">
            <ul className="py-2 text-gray-700">
              <Link to='/home/soloBGMI'>
                <li
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    console.log('Solo selected'); // Handle Solo selection
                  }}
                >
                  Solo
                </li>
              </Link>
              <Link to='/home/duoBGMI'>
                <li
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    console.log('Duo selected'); // Handle Duo selection
                  }}
                >
                  Duo
                </li>
              </Link>
              <Link to='/home/squadBGMI'>
                <li
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    console.log('Squad selected'); // Handle Squad selection
                  }}
                >
                  Squad
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default BgmiCard; // Export the component
