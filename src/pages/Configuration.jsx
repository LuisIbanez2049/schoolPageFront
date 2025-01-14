import React from 'react'

function Configuration() {
  return (
    <div className='flex flex-col min-h-screen'>
        <div className='w-full min-h-screen flex flex-col items-center border-2 border-red-600'>

            <div className='w-[65%] flex flex-row border border-black mt-[12%]'>
                <div className='w-[50%] flex flex-row justify-center items-center'>
                    <div className='w-[300px] h-[300px] rounded-full border border-black'>

                    </div>
                </div>

                <div className='w-[50%] flex flex-col justify-around border border-red-600 text-[35px] font-extrabold text-gray-800'>
                    <input className='text-[45px] text-center focus:outline-none focus:border-none' type="text" value={"Luis Ibañez"}/>
                    <h1>94706333</h1>
                    <h1>luis@gmail.com</h1>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Configuration