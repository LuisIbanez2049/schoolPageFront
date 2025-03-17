import React, { useState } from 'react'
import SendButton from "../assets/sendbutton.png"
import axios from 'axios'

function InputAddAnswer({ color, userName, onClickFunction, onClickCancelFunction, onChangeFunction, valueInput }) {

    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))

    return (
        <div>
            <div className=' rounded-[10px] shadow-md border border-[#00000025]'>
                <div className='flex flex-row justify-between'>
                    <div className='w-[15%] lg:w-[8%] flex flex-row justify-center items-center'>
                        <div className='w-[40px] lg:w-[66px] pl-1 h-[40px] lg:h-[66px] rounded-full overflow-hidden'
                            style={{
                                backgroundImage: `url('${userInformationLocalStorage.userProfileImg}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}>
                        </div>
                    </div>

                    <div className='w-[85%] lg:w-[95%] flex flex-col items-center '>
                        <div className=' w-full flex flex-row py-1 px-3 lg:p-2 justify-between'>
                            <div className=' w-[85%] lg:w-[93%]'>

                                <div className=' flex flex-col lg:flex-row flex-wrap'>
                                    <div className='flex flex-row px-0 lg:px-2'>
                                        <span className=' font-semibold text-[#0000ffc0] text-[8px] lg:text-[16px]'> <i className="fa-brands fa-threads"></i>{userName}</span>
                                    </div>

                                    <div className='w-full lg:w-[85%]'>
                                        <textarea name="" id="" className={`h-[25px] lg:h-[50px] w-full lg:w-full text-pretty font-light pr-1 lg:pr-2 bg-transparent text-[10px] lg:text-[16px] border-b border-[#00000071] focus:border-[${color}] focus:outline-none transition-colors peer`}
                                            placeholder='Add answer...' value={valueInput} onChange={onChangeFunction}></textarea>

                                        <div className='w-full flex flex-row justify-end pr-3'>
                                            <button onClick={onClickCancelFunction}>
                                                <h1 className='text-[10px] lg:text-[15px] font-bold text-[#ff0000af]'>CANCEL</h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <button onClick={onClickFunction}>
                                <div className={` rounded-full bg-[${color}] p-[1px]`}>
                                    <img src={SendButton} alt="" className='w-[27px] h-[27px] lg:w-[50px] lg:h-[50px] transition-all duration-300 hover:translate-x-1' />
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