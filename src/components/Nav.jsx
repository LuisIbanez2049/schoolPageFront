import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logOutAction } from '../redux/actions/authenticationAction';

function Nav() {

    const [isVisible, setIsVisible] = useState(false)
    const [isOnclick, setIsOnclick] = useState(false)

    const dispatch = useDispatch();

    return (
        <nav>
            <div className={`${isVisible ? "" : "hidden"} min-h-screen w-[100vw] absolute z-0`}>
                <button className=' block w-full h-[98vh] cursor-default' onClick={() => {
                    setIsOnclick(false)
                    setIsVisible(false)
                }}></button>
            </div>
            <div className=' min-w-screen h-[100px] border-2 border-black py-2 px-4 flex flex-row justify-between'>
                <div className='flex flex-row'>
                    <div id='logo' className='h-[80px] w-[80px] border border-black'>

                    </div>
                    <div id='pageName' className='h-[80px] w-[150px] border border-black'>

                    </div>
                </div>


                <div id='profile' className=' relative h-[80px] w-[80px] border border-black flex flex-row justify-center items-center'>
                    <button onClick={() => {
                        if (isOnclick) {
                            setIsOnclick(false)
                            setIsVisible(false)
                        } else {
                            setIsOnclick(true)
                            setIsVisible(true)
                        }
                    }}>
                        <span className={`text-[40px] text-[${isOnclick ? "#EFB071" : "black"}] hover:text-[#EFB071]`}> <i className="fa-solid fa-user"></i> </span>
                    </button>

                    <div className={`absolute z-10 right-8 top-[80px] w-[250px] flex flex-col items-center bg-[#7eaaaa] pt-4 rounded-[15px] shadow-xl transition-all duration-500 transform ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                        }`}>

                        <div className='text-gray-100 flex flex-col items-center'>
                            <h1 className='text-[17px] font-semibold'> Luis </h1>
                            <div className='w-[75px] h-[75px] border border-black rounded-full'></div>
                            <h1> luis@gmail.com </h1>
                            <h1 className='text-[18px]'> Welcome Luis Ibañez </h1>
                        </div>

                        <div className='w-full flex flex-col items-center bg-gray-100 rounded-b-[15px]'>
                            <div className='w-full border border-[#EFB071]'></div>
                            <div className='w-full py-3'>

                                <div className=' hover:bg-gray-300 '>
                                    <button className=' block w-full'
                                        onClick={() => {

                                        }}>
                                        <h1 className='p-1 text-start mx-2 font-thin'> <span className='mr-[10px]'> <i class="fa-solid fa-gear"></i> </span> Configuration</h1>
                                    </button>
                                </div>

                                <div className=' hover:bg-gray-300 '>
                                    <button className=' block w-full' onClick={() => {
                                        dispatch(logOutAction())
                                    }}>
                                        <h1 className='p-1 text-start mx-2 font-thin'> <span className='mr-[10px]'> <i className="fa-solid fa-right-to-bracket"></i> </span> Logout </h1>
                                    </button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Nav