import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutAction } from '../redux/actions/authenticationAction';
import EasyLearn from "../assets/EASYLEARNpng.png"
import { useNavigate } from 'react-router-dom';
import { logOutUserAction } from '../redux/actions/authenticatedUserInformationAction';
function Nav() {

    const [isVisible, setIsVisible] = useState(false)
    const [isOnclick, setIsOnclick] = useState(false)

    const dispatch = useDispatch();
    const dispatchUser = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(store => store.authenticationReducer)
    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))

    return (
        <nav className='bg-[#476c77]'>
            <div className={`${isVisible ? "" : "hidden"} min-h-screen w-[99vw] absolute z-20`}>
                <button className=' block w-full h-[98vh] cursor-default' onClick={() => {
                    setIsOnclick(false)
                    setIsVisible(false)
                }}></button>
            </div>
            <div className=' min-w-screen h-[100px] py-2 px-4 flex flex-row justify-between'>

                {/* --------------------------------------------------------------------LOGO LOGO LOGO----------------------------------------------- */}
                <div className='flex flex-row ' >
                    <div className=' h-full flex flex-row justify-center items-center '>
                        <div id='logo' className='h-[60px] w-[60px] lg:h-[80px] lg:w-[80px] '>
                            <img src={EasyLearn} alt="" />
                        </div>
                    </div>
                    <div id='pageName' className='h-[80px] w-[150px]  flex flex-row ml-[5px] lg:ml-[0px] lg:justify-center items-center'>
                        <h1 className='text-[22px] lg:text-[27px] text-[#efb071]'>EASYLEARN</h1>
                    </div>
                </div>
                {/* --------------------------------------------------------------------LOGO LOGO LOGO----------------------------------------------- */}



                {userInformationLocalStorage && userInformationLocalStorage.rol === "ADMIN" ?
                    <>
                        <div className='flex flex-row gap-10'>
                            <button>
                                {/* color button is selected: #db9854 */}
                                <h1 className={` w-[133px] text-[25px] font-bold bg-[#efb071] py-1 px-2 rounded-[10px] text-[#000000af]`}>SUBJECTS</h1>
                            </button>

                            <button>
                                <h1 className={`w-[133px] text-[25px] font-bold bg-[#efb071] py-1 px-2 rounded-[10px] text-[#000000af]`}>USERS</h1>
                            </button>
                        </div>
                    </> : <></>}



                <div id='profile' className=' relative h-[80px] w-[80px] flex flex-row justify-center items-center'>
                    <button onClick={() => {
                        if (isOnclick) {
                            setIsOnclick(false)
                            setIsVisible(false)
                        } else {
                            setIsOnclick(true)
                            setIsVisible(true)
                        }
                    }}>
                        <span className={`text-[30px] lg:text-[40px] text-[${isOnclick ? "#EFB071" : "black"}] hover:text-[#EFB071]`}> <i className="fa-solid fa-user"></i> </span>
                    </button>

                    <div className={`absolute right-8 top-[80px] w-[250px] flex flex-col items-center bg-[#7eaaaa] pt-4 rounded-[15px] shadow-xl transition-all duration-500 transform ${isVisible ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"
                        }`}>

                        {userInformationLocalStorage ? <>
                            <div className='text-gray-100 flex flex-col items-center'>
                                <h1 className='text-[17px] font-semibold'> {userInformationLocalStorage.name} </h1>

                                <div className='w-[90px] h-[90px] my-[10px] border border-gray-400 rounded-full' style={{
                                    backgroundImage: `url('${userInformationLocalStorage.userProfileImg}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}>

                                </div>

                                <h1 className='text-[18px]'> {userInformationLocalStorage.name + " " + userInformationLocalStorage.lastName} </h1>
                                <h1 className='mb-[5px]'> {userInformationLocalStorage.mail} </h1>
                            </div>
                        </> : <> </>}


                        <div className='w-full flex flex-col items-center bg-gray-100 rounded-b-[15px]'>
                            <div className='w-full border border-[#EFB071]'></div>
                            <div className='w-full py-3'>

                                <div className=' hover:bg-gray-300 '>
                                    <button className=' block w-full'
                                        onClick={() => {
                                            navigate("configuration")
                                            setIsVisible(false)
                                            setIsOnclick(false)
                                        }}>
                                        <h1 className='p-1 text-start mx-2 font-thin'> <span className='mr-[10px]'> <i className="fa-solid fa-gear"></i> </span> Configuration</h1>
                                    </button>
                                </div>

                                <div className=' hover:bg-gray-300 '>
                                    <a href="/">
                                        <button className=' block w-full' onClick={() => {
                                            dispatch(logOutAction())
                                            dispatchUser(logOutUserAction())
                                        }}>
                                            <h1 className='p-1 text-start mx-2 font-thin'> <span className='mr-[10px]'> <i className="fa-solid fa-right-to-bracket"></i> </span> Logout </h1>
                                        </button>
                                    </a>
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