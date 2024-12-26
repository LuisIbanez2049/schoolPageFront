import React, { useState } from 'react'
import SendButton from "../assets/sendButton.png"
import axios from 'axios'

function InputAddAnswer({ color, userName, onClickFunction, onClickCancelFunction, onChangeFunction, valueInput}) {


    return (
        <div>
            <div className=' rounded-[20px] shadow-md border border-[#00000025]'>
                <div className='flex flex-row justify-between'>
                    <div className=' w-[8%] flex flex-row justify-center items-center '>
                        <div className='w-[72px] h-[72px] rounded-full border border-black'>
                            <img src="" alt="" />
                        </div>
                    </div>

                    <div className='w-[95%] flex flex-col items-center '>
                        <div className=' w-full flex flex-row p-2 justify-around '>
                            <div>

                                <div className=' flex flex-row'>
                                    <label htmlFor="" className='flex flex-row justify-center items-center px-2  border-b border-[#00000071]'> <span className=' font-semibold text-[#0000ffc0]'> <i className="fa-brands fa-threads"></i>{userName} </span> </label>
                                    <input className={`h-[50px] w-[750px] text-pretty font-light pr-2 bg-transparent border-b border-[#00000071] focus:border-[${color}] focus:outline-none transition-colors peer`}
                                        type="text" placeholder='Add answer...' value={valueInput} onChange={onChangeFunction} onFocus={() => {setBorderColor("red")}}/>
                                </div>

                                <div className='flex flex-row justify-end pr-3'>
                                    <button onClick={onClickCancelFunction}>
                                        <h1 className='text-[15px] font-bold text-[#ff0000af]'>CANCEL</h1>
                                    </button>
                                </div>

                            </div>

                            <button onClick={onClickFunction}>
                                <div className={` rounded-full bg-[${color}] p-[1px]`}>
                                    <img src={SendButton} alt="" className='w-[50px] h-[50px] transition-all duration-300 hover:translate-x-1' />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputAddAnswer