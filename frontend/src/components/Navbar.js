import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DP from '../assets/dp.jpeg';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Toggle dropdown on profile picture click
  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle logout function
  const handleLogout = () => {
    // Clear all data from localStorage
    localStorage.clear(); // This clears all localStorage data, not just 'authToken'
  
    // Optionally clear sessionStorage if you are using it as well
    sessionStorage.clear(); 
  
    // Redirect to the login page or any desired route
    navigate('/');
  };

  return (
    <div>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto flex justify-between text-white">
          <div className="flex justify-center items-center font-bold text-4xl">PVS</div>
          <div className="flex justify-evenly gap-10 items-center">
            <Link to="/home">
              <div>Registration Form</div>
            </Link>
            <Link to="/home/reg-details">
              <div>Registration Details</div>
            </Link>
            <Link to="/home/make-match">
              <div>Make Match</div>
            </Link>
            <Link to="/home/view-match-details">
              <div>View Match Details</div>
            </Link>
            <Link to="/home/cheat-report">
              <div>Cheat Report</div>
            </Link>
            <Link to="">
              <div>Winners</div>
            </Link>
          </div>
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
              onClick={handleProfileClick}
            >
              <img src={DP} alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-2 z-20">
                <div className="px-4 py-2 text-black">
                  <p className="">Name: Anup Mondal</p>
                  <p className="">Position: Admin</p>

                </div>
                <div className="px-4 py-2">
                  <button
                    onClick={handleLogout}
                    className="text-black font-bold text-xl w-full text-lcenter bg-red-300 p-2 rounded  hover:bg-red-500  hover:text-white items-center"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
