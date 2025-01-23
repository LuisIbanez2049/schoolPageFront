import React from 'react'

function ConfirmationPopUpAlert({ isShow, handleOnConfirmFunction, handleOnCancelFunction }) {
    return (
        <div className={` ${isShow ? "show" : "hidden"} fixed top-0 right-0 flex flex-row justify-center items-center  w-[100vw] h-[100vh]  z-30   bg-[#0e010125]`}>
            <div className=' flex flex-col items-center gap-4 shadow-lg sticky top-0 bg-gray-100 p-3 rounded-[20px]'>
                <h1 className='text-[18px] lg:text-[25px]'> Do you want to leave this subject? </h1>

                <div className='w-full flex flex-row justify-center'>
                    <div className='p-3 flex flex-row gap-8 '>
                        <button onClick={handleOnCancelFunction}>
                            <h1 className='rounded-[5px] p-1 lg:p-2 text-[16px] lg:text-[20px] bg-[#ff00007a] font-semibold'>CANCEL</h1>
                        </button>
                        <button onClick={handleOnConfirmFunction}> 
                            <h1 className='rounded-[5px] p-1 lg:p-2 text-[16px] lg:text-[20px] bg-[#00800094] font-semibold'>CONFIRM</h1> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPopUpAlert