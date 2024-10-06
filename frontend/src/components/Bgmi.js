import React from 'react'
import BGMI from '../assets/Bgmi.jpeg'
function Bgmi() {
  return (
    <div className="relative h-screen">
      <div className="relative h-1/2">
        <img src={BGMI} alt="Free Fire" className="object-cover w-full h-full rounded-lg" />
        <div className="absolute bottom-0 left-0 w-full text-center p-4 bg-opacity-50">
          <h5 className="mb-2 text-4xl font-bold tracking-tight text-white">BGMI</h5>
          <a
            href="#"
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
          </a>
        </div>
      </div>
    </div>
  )
}

export default Bgmi