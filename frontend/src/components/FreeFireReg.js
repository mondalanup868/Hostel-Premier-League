import React, { useState } from 'react';
import Navbar from './Navbar';
import BgImg from '../assets/loginBg.jpg';
import SoloFF from './SoloFF';
import DuoFF from './DuoFF';

function FreeFireReg() {


    return (
        <div className='relative min-h-screen flex flex-col'
            style={{
                backgroundImage: `url(${BgImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <Navbar />
            <div className='bg-blue-300'>
                <div className='flex justify-around p-5 bg-blue-400'>
                    <div className='text-2xl font-bold text-white'>Free Fire</div>
                    <div className='text-2xl font-bold border-2 border-blue-600 px-3 hover:bg-blue-600 rounded-xl text-white bg-blue-600'>Solo Battle</div>
                    <div className='text-2xl font-bold border-2 border-blue-600 px-3 hover:bg-blue-600 rounded-xl text-white'>Duo Battle</div>
                    <div className='text-2xl font-bold border-2 border-blue-600 px-3 hover:bg-blue-600 rounded-xl text-white'>Squad Battle</div>
                </div>
                <SoloFF/>
                {/* <DuoFF/> */}
            </div>
        </div>
    );
} 

export default FreeFireReg;
