import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import LoginBg from '../assets/loginBg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome component
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Eye icons

const serverUrl = process.env.REACT_APP_SERVER_URL;
console.log("serverUrl: ", serverUrl);
const loginURL = `${serverUrl}/admins/admin-login`;

function Login() {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate(); // Use useNavigate hook

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Received:", data);

        const { adminId, email, contact, name } = data.admin;

        localStorage.setItem('adminId', adminId);
        localStorage.setItem('email', email);
        localStorage.setItem('contact', contact);
        localStorage.setItem('name', name);
        localStorage.setItem('token', data.token);

        console.log("Token:", data.token);

        toast.success("Login successful");
        setAdmin({ email: "", password: "" });

        navigate('/home', { state: { adminId, email, contact, name } });
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500 "
    
      style={{ backgroundImage: `url(${LoginBg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
     >
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md p-8 bg-transparent shadow-md rounded-lg border border-white h-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Admin Login</h1>

        <div className="mb-7 ">
          <input
            type="email"
            id="email"
            name='email'
            placeholder="Email"
            value={admin.email}  // Access email from admin state
            onChange={handleInput}
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none bg-transparent text-white"
          />
        </div>

        <div className="mb-7 relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            id="password"
            name='password'
            placeholder="Password"
            value={admin.password}  // Access password from admin state
            onChange={handleInput}
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none bg-transparent text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="absolute right-6 top-3 text-gray-400"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <div className='mt-20 flex justify-center'>

          <button
            type="submit"
            className="w-80 bg-transparent text-xl text-slate-50 py-2 rounded-lg border hover:bg-slate-50 hover:text-red-500 hover:transition duration-200"
          >
            Log In
          </button>
        </div>
      </form>

      {/* Toast container to display the toast messages */}
      <ToastContainer />
    </div>
  );
}

export default Login;
