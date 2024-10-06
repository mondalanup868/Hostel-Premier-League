import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import FreeFire from '../components/FreeFire';
import Bgmi from '../components/Bgmi';
import BgHome from '../assets/bg.jpg';
import { Link } from 'react-router-dom';
import SoloReg from '../components/SoloReg'

function Home() {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true); // Trigger the animation when the component is mounted
  }, []);

  return (
    <div
      className='relative min-h-screen bg-center overflow-hidden'
      style={{ backgroundImage: `url(${BgHome})` }}
    >
      <Navbar />
      <h1 className='text-center font-bold text-4xl p-10 text-white'>Select Your Game Type</h1>
      <div className='flex flex-row justify-center gap-20 mt-10'>
        <Link to='/home/soloFF'
          className={`transition-transform duration-1000 ${animation ? 'animate-slide-left' : ''}`}
        >
          <FreeFire />
        </Link>
        <div
          className={`transition-transform duration-1000 ${animation ? 'animate-slide-right' : ''}`}
        >
          <Bgmi />
        </div>
      </div>
    </div>
  );
}

export default Home;
