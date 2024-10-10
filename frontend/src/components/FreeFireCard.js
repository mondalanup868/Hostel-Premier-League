import React, { useState } from 'react';
import FreeFireImg from '../assets/FreeFire.jpeg';
import { Link } from 'react-router-dom';

function FreeFireCard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <img
        src={FreeFireImg}
        alt="Free Fire"
        className="object-cover w-full h-full rounded-lg border-2 border-blue-800 shadow-xl"
      />
      <div className="absolute bottom-0 left-0 w-full text-center p-4 bg-opacity-50">
        <h5 className="mb-2 text-4xl font-bold tracking-tight text-white">Free Fire</h5>

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
              <Link to='/home/soloFF'>
                <li
                  className="block px-4 py-2 hover:bg-blue-200 cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    console.log('Solo selected');
                  }}
                >
                  Solo
                </li>
              </Link>
              <Link to='/home/duoFF'>
                <li
                  className="block px-4 py-2 hover:bg-blue-200 cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    console.log('Duo selected');
                  }}
                >
                  Duo
                </li>
              </Link>
              <Link to='/home/squadFF'>
                <li
                  className="block px-4 py-2 hover:bg-blue-200 cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    console.log('Squad selected');
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

export default FreeFireCard;
