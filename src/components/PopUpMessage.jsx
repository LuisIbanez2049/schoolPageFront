import React, { useState } from 'react'
import check from "../assets/check.png"

function PopUpMessage({show, message}) {

  return (
    <div className='absolute w-full h-[10px] z-30 flex flex-row justify-center '>
        <div className= {`absolute w-auto h-auto p-2 bg-[#ede6db] rounded-[30px] shadow-xl transition-transform ${show ? "translate-y-[50px]" : "translate-y-[-200px]"} duration-500 flex flex-row`}>
          <img src={check} alt="" className='w-[60px] h-[60px]' /> 
          <h1 className='text-[25px] font-thin text-center m-auto mx-[20px]'> {message} </h1>
        </div>
    </div>
  )
}

export default PopUpMessage