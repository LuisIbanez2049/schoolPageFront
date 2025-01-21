import React from 'react'
import BookGif from "../assets/LoadingBookGif.gif"
import { PulseLoader } from 'react-spinners'

function LoadingView({ show }) {
  return (
    <div className={` ${show ? "show" : "hidden"} fixed top-0 right-0 flex flex-row justify-center items-center  w-[100vw] h-[100vh]  z-30 border-2 border-red-600  bg-[#0e010125]`}>
      <div className=' flex flex-col items-center gap-4 shadow-lg sticky top-0 bg-gray-100 p-2 rounded-[20px]'>
        <img src={BookGif} alt="" className=' w-[150px] h-[150px] rounded-full' />

        <PulseLoader
          color="#D0A499"
          loading={true}
          size={20}
          speedMultiplier={1}
        />
      </div>
    </div>
  )
}

export default LoadingView