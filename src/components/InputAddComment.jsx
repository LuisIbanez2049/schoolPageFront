import React from 'react'
import SendButton from "../assets/sendButton.png"

function InputAddComment({color, onClickFunctionCancel, onClickFunction, inputValue, onChangeFunction}) {

    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))

    return (
        <div className=' rounded-[12px] lg:rounded-[20px] shadow-md border border-[#00000025]'>
            <div className='flex flex-row justify-between'>
                <div className=' lg:w-[8%] flex flex-row justify-center items-center px-1'>
                    <div className='w-[45px] lg:w-[72px] h-[45px] lg:h-[72px] rounded-full overflow-hidden'>
                        <img src={userInformationLocalStorage.userProfileImg} alt="" />
                    </div>
                </div>

                <div className='w-[85%] lg:w-[95%] flex flex-col items-center '>
                    <div className=' w-full flex flex-row p-1 lg:p-2 justify-around '>
                        <div>

                             <textarea name="" id="" className={`h-[25px] lg:h-[50px] w-[180px] lg:w-[1020px] text-pretty text-[12px] lg:text-[18px] font-light px-1 lg:px-2 bg-transparent border-b border-[#00000071] focus:border-[${color}] focus:outline-none transition-colors peer`}
                             placeholder='Add comment...' value={inputValue} onChange={onChangeFunction}></textarea>

                            <div className='flex flex-row justify-end pr-3'>
                                <button onClick={onClickFunctionCancel}>
                                    <h1 className='text-[11px] lg:text-[15px] font-bold text-[#ff0000af]'>CANCEL</h1>
                                </button>
                            </div>

                        </div>

                        <button onClick={onClickFunction}>
                            <div className={` rounded-full bg-[${color}] p-[1px]`}>
                                <img src={SendButton} alt="" className='w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] transition-all duration-300 hover:translate-x-1' />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputAddComment