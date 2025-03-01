import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutAction } from '../redux/actions/authenticationAction';
import EasyLearn from "../assets/EASYLEARNpng.png"
import { useNavigate } from 'react-router-dom';
import { logOutUserAction } from '../redux/actions/authenticatedUserInformationAction';
import axios from 'axios';
function Nav() {

    const [isVisible, setIsVisible] = useState(false)
    const [isOnclick, setIsOnclick] = useState(false)

    const [isOnclickSubjectsAdmin, setIsOnclickSubjectsAdmin] = useState(true)


    const dispatch = useDispatch();
    const dispatchUser = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(store => store.authenticationReducer)
    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))

    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token && token.replace(/"/g, '');

    const [userInformation, setUserInformation] = useState({})
    const [notifications, setNotifications] = useState([])
    const [contador, setContador] = useState(0);



    useEffect(() => {
        axios.get("http://localhost:8080/api/auth/current", {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setUserInformation(response.data)

            })
            .catch((error) => {
                console.log(error)
            });
    }, [token])

    useEffect(() => {
        axios.get("http://localhost:8080/api/auth/current", {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                setNotifications(response.data.notificacionDTOS)

            })
            .catch((error) => {
                console.log(error)
            });
    }, [contador])

    

    useEffect(() => {
        const intervalo = setInterval(() => {
                setContador(prevContador => prevContador + 1);
        }, 3000);

        return () => clearInterval(intervalo); // Limpia el intervalo al desmontar el componente
    }, []);




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
                <div className='flex flex-col lg:flex-row ' >
                    <div className=' h-full flex flex-row justify-center items-center'>
                        <div id='logo' className='h-[60px] w-[60px] lg:h-[80px] lg:w-[80px]'>
                            <img src={EasyLearn} alt="" />
                        </div>
                    </div>
                    <div id='pageName' className='h-[80px] lg:w-[150px]  flex flex-row  lg:ml-[0px] lg:justify-center items-center '>
                        <h1 className='text-[20px] lg:text-[27px] text-[#efb071]'>EASYLEARN</h1>
                    </div>
                </div>
                {/* --------------------------------------------------------------------LOGO LOGO LOGO----------------------------------------------- */}

                <div>
                    <h1>{contador}</h1>
                </div>



                {userInformationLocalStorage && userInformationLocalStorage.rol === "ADMIN" ?
                    <>
                        <div className='flex flex-col justify-center items-center lg:flex-row gap-4 lg:gap-10 '>
                            <button onClick={() => {
                                setIsOnclickSubjectsAdmin(true)
                                navigate("/adminViewSubjects")
                            }}>
                                {/* color button is selected: #db9854 */}
                                <h1 className={` w-[70px] lg:w-[133px] text-[12px] lg:text-[25px] font-bold ${isOnclickSubjectsAdmin ? "bg-[#a1764a] text-[#ffffffe5]" : "bg-[#efb071] text-[#000000af]"} py-1 px-2 rounded-[6px] lg:rounded-[10px]`}>SUBJECTS</h1>
                            </button>

                            <button onClick={() => {
                                setIsOnclickSubjectsAdmin(false)
                                navigate("/adminViewUsers")
                            }}>
                                <h1 className={`w-[70px] lg:w-[133px] text-[12px] lg:text-[25px] font-bold ${isOnclickSubjectsAdmin ? "bg-[#efb071] text-[#000000af]" : "bg-[#a1764a] text-[#ffffffe5]"} py-1 px-2 rounded-[6px] lg:rounded-[10px] text-[#000000af]`}>USERS</h1>
                            </button>
                        </div>
                    </> : <></>}



                <div id='profile' className=' relative h-[80px] w-[80px] flex flex-row justify-center items-center'>


                    <div className='flex flex-row gap-6  mr-[30px]'>

                        <button className=' relative'>
                            <span className=' absolute top-3 left-[-12px] w-[24px] h-[24px] bg-red-500 rounded-full text-[15px]'>{notifications.length}</span>
                            <i className="fa-solid fa-bell text-[30px] text-slate-100"></i>
                        </button>

                        <button onClick={() => {
                            if (isOnclick) {
                                setIsOnclick(false)
                                setIsVisible(false)
                            } else {
                                setIsOnclick(true)
                                setIsVisible(true)
                            }
                        }}>
                            {/* <span className={`text-[30px] lg:text-[40px] text-[${isOnclick ? "#EFB071" : "black"}] hover:text-[#EFB071]`}> <i className="fa-solid fa-user"></i> </span> */}
                            {/* border border-[${isOnclick ? "#EFB071" : "gray"}]  */}
                            <div className={`w-[65px] h-[65px] my-[10px] ${isOnclick ? "border-2 border-[#EFB071]" : "border border-gray-400"}  hover:border-[#EFB071] rounded-full`} style={{
                                // backgroundImage: `url('${userInformationLocalStorage && userInformationLocalStorage.userProfileImg}')`,
                                backgroundImage: `url('${userInformation && userInformation.userProfileImg}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}>

                            </div>
                        </button>
                    </div>

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