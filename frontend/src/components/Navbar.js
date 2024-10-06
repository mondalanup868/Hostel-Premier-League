import React, { useState, useEffect, useRef } from 'react';
import DP from '../assets/dp.jpeg';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-4xl font-bold">
          PVS
        </div>
        <div className="flex space-x-10 justify-center items-center">
          <a href="#" className="relative text-white after:absolute after:left-0 after:right-0 after:bottom-[-5px] after:bg-white after:h-[2px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 text-xl font-semibold">
            Registration Form
          </a>
          <a href="#" className="relative text-white after:absolute after:left-0 after:right-0 after:bottom-[-5px] after:bg-white after:h-[2px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 text-xl font-semibold">
            Registration Details
          </a>
          <a href="#" className="relative text-white after:absolute after:left-0 after:right-0 after:bottom-[-5px] after:bg-white after:h-[2px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 text-xl font-semibold">
            Make Match
          </a>
          <a href="#" className="relative text-white after:absolute after:left-0 after:right-0 after:bottom-[-5px] after:bg-white after:h-[2px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 text-xl font-semibold">
            View Match Details
          </a>
          <div className="relative" ref={dropdownRef}>
            <img
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white p-1"
              src={DP}
              alt="Profile"
              onClick={toggleDropdown}
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-blue-300 rounded-lg shadow-lg py-2">
                <p href="#" className="block px-4 py-2 text-gray-800">Anup Mondal</p>
                <p href="#" className="block px-4 py-2 text-gray-800">Admin</p>
                <div href="#" className="block px-4 py-2 bg-red-400 mx-2 text-center rounded-md text-gray-800 cursor-pointer">Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
