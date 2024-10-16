import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DP from '../assets/dp.jpeg';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    adminId: localStorage.getItem('adminId'),
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    contact: localStorage.getItem('contact')
  });

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get current path to manage active link

  // Fetch admin details from localStorage when component mounts
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('admin'));
    if (adminData) {
      setAdminDetails(adminData); // Set the admin details to state
    }
  }, []);

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
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  // Function to check if the link is active
  const isActiveLink = (path) => location.pathname === path;

  return (
    <div>
      <nav className="bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto flex flex-wrap justify-between items-center text-white">
          <div className="flex justify-center items-center font-bold text-4xl">PVS</div>
          <div className="flex flex-wrap justify-evenly gap-4 sm:gap-6 md:gap-10 items-center">
            <Link to="/home">
              <div className={`${isActiveLink('/home') ? 'underline' : ''}`}>Registration Form</div>
            </Link>
            <Link to="/home/reg-details">
              <div className={`${isActiveLink('/home/reg-details') ? 'underline' : ''}`}>Registration Details</div>
            </Link>
            <Link to="/home/make-match">
              <div className={`${isActiveLink('/home/make-match') ? 'underline' : ''}`}>Make Match</div>
            </Link>
            <Link to="/home/view-match-details">
              <div className={`${isActiveLink('/home/view-match-details') ? 'underline' : ''}`}>View Match Details</div>
            </Link>
            <Link to="/home/cheat-report">
              <div className={`${isActiveLink('/home/cheat-report') ? 'underline' : ''}`}>Cheat Report</div>
            </Link>
            <Link to="/home/cheat-winners">
              <div className={`${isActiveLink('/home/cheat-winners') ? 'underline' : ''}`}>Winners</div>
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
                  <p>Name: {adminDetails.name || 'NA'}</p>
                  <p>Email: {adminDetails.email || 'NA'}</p>
                  <p>Contact: {adminDetails.contact || 'NA'}</p>
                </div>
                <div className="px-4 py-2">
                  <button
                    onClick={handleLogout}
                    className="text-black font-bold text-xl w-full text-center bg-red-300 p-2 rounded hover:bg-red-500 hover:text-white items-center"
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
