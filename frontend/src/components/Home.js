import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import BgImg from '../assets/loginBg.jpg';
import FreeFireCard from './FreeFireCard';
import BgmiCard from './BgmiCard';

function Home() {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true); // Trigger the animation when the component is mounted
  }, []);

  return (
    <div
      className='relative md:h-screen md:bg-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url(${BgImg})`,
      }}
    >
      <Navbar />
      <h1 className='text-center font-bold text-4xl p-10 text-white'>Select Your Game Type</h1>
      <div className='flex flex-col md:flex-row justify-center items-center gap-6 md:gap-24'>
        <div className='w-4/5 sm:w-3/5 md:w-1/4 lg:w-1/6'>
          <FreeFireCard />
        </div>
        <div className='w-4/5 sm:w-3/5 md:w-1/4 lg:w-1/6'>
          <BgmiCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
