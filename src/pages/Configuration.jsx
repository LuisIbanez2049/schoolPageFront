import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOutAction } from '../redux/actions/authenticationAction'
import { logOutUserAction } from '../redux/actions/authenticatedUserInformationAction'

function Configuration() {

    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))

    const [viewNamePen, setViewNamePen] = useState(false)
    const [viewInputEditName, setViewInputEditName] = useState(false)
    const [inputValueName, setInputValueName] = useState(userInformationLocalStorage.name)
    const [isDisabledInputName, setIsDisabledInputName] = useState(true)

    const [viewLastNamePen, setViewLastNamePen] = useState(false)
    const [viewInputEditLastName, setViewInputEditLastName] = useState(false)
    const [inputValueLastName, setInputValueLastName] = useState(userInformationLocalStorage.lastName)
    const [isDisabledInputLastName, setIsDisabledInputLastName] = useState(true)

    const [viewDniPen, setViewDniPen] = useState(false)
    const [viewInputEditDni, setViewInputEditDni] = useState(false)
    const [inputValueDni, setInputValueDni] = useState(userInformationLocalStorage.dni)
    const [isDisabledInputDni, setIsDisabledInputDni] = useState(true)

    const [viewEmailPen, setViewEmailPen] = useState(false)
    const [viewInputEditEmail, setViewInputEditEmail] = useState(false)
    const [inputValueEmail, setInputValueEmail] = useState(userInformationLocalStorage.mail)
    const [isDisabledInputEmail, setIsDisabledInputEmail] = useState(true)

    const [viewProfileImgPen, setViewProfileImgPen] = useState(false)
    const [viewInputEditProfileImg, setViewInputEditProfileImg] = useState(false)
    const [inputValueProfileImg, setInputValueProfileImg] = useState(userInformationLocalStorage.userProfileImg)
    const [isDisabledInputProfileImg, setIsDisabledInputProfileImg] = useState(true)

    const [showPopUpMessage, setShowPopUpMessage] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');

    const dispatch = useDispatch();
    const dispatchUser = useDispatch();
    const navigate = useNavigate();


    function updateLocalStorage() {

        axios.get("http://localhost:8080/api/auth/current", {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                let objectAux = response.data;
                let user = JSON.parse(localStorage.getItem("userInformation"));
                user = objectAux;
                localStorage.setItem("userInformation", JSON.stringify(user));
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                console.log(error)
            });

    }

    function editUserParemeters(body) {
        console.log(body)
        axios.patch(`http://localhost:8080/api/usuarios/configuration`, body, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                updateLocalStorage()
                if (response.data.includes("Email")) {
                    dispatch(logOutAction())
                    dispatchUser(logOutUserAction())
                    navigate("/")
                    //------------------------------------------------
                    window.location.reload()
                    //------------------------------------------------
                }
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response.data)
                setErrorMessage(error.response.data)
                setShowErrorMessage(true)
            })
    }


    return (
        <div className='flex flex-col min-h-screen'>
            <div className=' relative w-full min-h-screen flex flex-col items-center bg-gray-200'>

                <div className=' absolute left-0 p-5 '>
                    <button onClick={() => { navigate("/materias") }}>
                        <h1> <i className="fa-solid fa-share fa-flip-horizontal text-[40px] hover:text-[#f3a04d]"></i> </h1>
                    </button>
                </div>



                <div className='w-[65%] flex flex-row border border-[#00000046] shadow-xl rounded-[30px] mt-[12%]'>


                    {/* ----------------------------------------------------------------------------------------------------IMG IMG IMG----------------------------------------------------------------------------- */}
                    <div className=' relative w-[40%] flex flex-row justify-center items-center bg-[#476c77] p-4 rounded-l-[30px]'
                        onMouseEnter={() => { setViewProfileImgPen(true) }} onMouseLeave={() => { setViewProfileImgPen(false) }}>

                        <div className=' absolute top-0 right-0 p-6'>
                            {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                            <span className={``}>
                                <button className={`${viewProfileImgPen ? "show" : "hidden"}`} onClick={() => {
                                    setViewInputEditProfileImg(true)
                                    setIsDisabledInputProfileImg(false)
                                }}>
                                    <i class="fa-solid fa-pen text-[30px]"></i>
                                </button>
                            </span>
                            {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                        </div>

                        <div className={`${viewInputEditProfileImg ? "show" : "hidden"} absolute w-full h-full bg-[#0000009c] flex flex-row justify-center items-center rounded-l-[30px]`}>
                            {/* ----------------------------------------------------------------INPUT MAS DOS BOTONES -------------------------------------------------- */}
                            <div className={` ${viewInputEditProfileImg ? "show" : "hidden"}  bg-[#f3f2f2] flex flex-row justify-center items-center p-6 rounded-[20px]`}>
                                <input type="text" value={inputValueProfileImg} className='bg-gray-300 p-2 w-[300px] rounded-[5px]' onChange={(e) => { setInputValueProfileImg(e.target.value) }} />

                                <div className=' ml-2 flex flex-row gap-3 text-3xl'>
                                    <button onClick={() => {
                                        setInputValueProfileImg(userInformationLocalStorage.userProfileImg)
                                        setViewInputEditProfileImg(false)
                                    }}>
                                        <i class="fa-solid fa-circle-xmark text-red-500"></i>
                                    </button>
                                    <button onClick={() => {
                                        const upDateBody = { name: "", lastName: "", dni: "", email: "", profileImg: inputValueProfileImg }
                                        editUserParemeters(upDateBody)
                                    }}>
                                        <i class="fa-solid fa-circle-check text-green-500"></i>
                                    </button>
                                </div>
                            </div>
                            {/* ----------------------------------------------------------------INPUT MAS DOS BOTONES -------------------------------------------------- */}
                        </div>

                        <div className=''>
                            <img className='w-[300px] h-[300px] rounded-full shadow-lg' src={inputValueProfileImg} alt="" />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------------------------------------------IMG IMG IMG----------------------------------------------------------------------------- */}




                    <div className='w-[60%] flex flex-col justify-around bg-[#EFB071] font-extrabold text-gray-800 p-4 rounded-r-[30px]'>

                        <div className=' flex flex-row justify-center'>

                            {/* ----------------------------------------------------------------------------------------------------NAME NAME NAME-------------------------------------------------- */}
                            <div className='flex flex-row  w-[310px]' onMouseEnter={() => { setViewNamePen(true) }} onMouseLeave={() => { setViewNamePen(false) }}>
                                <input className='text-[45px] text-center focus:outline-none focus:border-none w-[270px] bg-transparent' type="text" value={inputValueName} disabled={isDisabledInputName}
                                    onChange={(e) => { setInputValueName(e.target.value) }} />

                                <div className=' relative w-[100px]'>
                                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                                    <span className={``}>
                                        <button className={`${viewNamePen ? "show" : "hidden"}`} onClick={() => {
                                            setViewInputEditName(true)
                                            setIsDisabledInputName(false)
                                        }}>
                                            <i class="fa-solid fa-pen text-[30px]"></i>
                                        </button>
                                    </span>
                                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                                    <div className={` ${viewInputEditName ? "show" : "hidden"} absolute top-[-5px]  flex flex-col items-center justify-center gap-1 bg-gray-200 rounded-[5px] p-1`}>
                                        <button onClick={() => {
                                            setInputValueName(userInformationLocalStorage.name)
                                            setViewInputEditName(false)
                                            setIsDisabledInputName(true)
                                        }}>
                                            <i class="fa-solid fa-circle-xmark text-[30px] text-red-500"></i>
                                        </button>
                                        <button onClick={() => {
                                            const upDateBody = { name: inputValueName }
                                            editUserParemeters(upDateBody)
                                        }}>
                                            <i class="fa-solid fa-circle-check text-[30px] text-green-500"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* ----------------------------------------------------------------------------------------------------NAME NAME NAME-------------------------------------------------- */}



                            {/* ----------------------------------------------------------------------------------------------------LASTNAME LASTNAME LASTNAME-------------------------------------------------- */}
                            <div className='flex flex-row w-[310px] ' onMouseEnter={() => { setViewLastNamePen(true) }} onMouseLeave={() => { setViewLastNamePen(false) }}>
                                <input className='text-[45px] text-center focus:outline-none focus:border-none w-[270px] bg-transparent' type="text" value={inputValueLastName} disabled={isDisabledInputLastName}
                                    onChange={(e) => { setInputValueLastName(e.target.value) }} />

                                <div className=' relative w-[100px] '>
                                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                                    <span className={``}>
                                        <button className={`${viewLastNamePen ? "show" : "hidden"}`} onClick={() => {
                                            setViewInputEditLastName(true)
                                            setIsDisabledInputLastName(false)
                                        }}>
                                            <i class="fa-solid fa-pen text-[30px]"></i>
                                        </button>
                                    </span>
                                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                                    <div className={` ${viewInputEditLastName ? "show" : "hidden"} absolute top-[-5px]  flex flex-col items-center justify-center gap-1 bg-gray-200 rounded-[5px] p-1`}>
                                        <button onClick={() => {
                                            setInputValueLastName(userInformationLocalStorage.lastName)
                                            setViewInputEditLastName(false)
                                            setIsDisabledInputLastName(true)
                                        }}>
                                            <i class="fa-solid fa-circle-xmark text-[30px] text-red-500"></i>
                                        </button>
                                        <button onClick={() => {
                                            const upDateBody = { name: "", lastName: inputValueLastName, dni: "", email: "", profileImg: "" }
                                            editUserParemeters(upDateBody)
                                        }}>
                                            <i class="fa-solid fa-circle-check text-[30px] text-green-500"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* ----------------------------------------------------------------------------------------------------LASTNAME LASTNAME LASTNAME-------------------------------------------------- */}

                        </div>


                        {/* ----------------------------------------------------------------------------------------------------DNI DNI DNI-------------------------------------------------- */}
                        <div className='flex flex-row w-[310px] ' onMouseEnter={() => { setViewDniPen(true) }} onMouseLeave={() => { setViewDniPen(false) }}>
                            <input className='text-[40px] focus:outline-none focus:border-none w-[270px] bg-transparent' type="text" value={inputValueDni} disabled={isDisabledInputDni}
                                onChange={(e) => { setInputValueDni(e.target.value) }} />

                            <div className=' relative w-[100px] '>
                                {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                                <span className={``}>
                                    <button className={`${viewDniPen ? "show" : "hidden"}`} onClick={() => {
                                        setViewInputEditDni(true)
                                        setIsDisabledInputDni(false)
                                    }}>
                                        <i class="fa-solid fa-pen text-[30px]"></i>
                                    </button>
                                </span>
                                {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                                <div className={` ${viewInputEditDni ? "show" : "hidden"} absolute top-[-5px] flex flex-col items-center justify-center gap-1 bg-gray-200 rounded-[5px] p-1`}>
                                    <button onClick={() => {
                                        setInputValueDni(userInformationLocalStorage.dni)
                                        setViewInputEditDni(false)
                                        setIsDisabledInputDni(true)
                                    }}>
                                        <i class="fa-solid fa-circle-xmark text-[30px] text-red-500"></i>
                                    </button>
                                    <button onClick={() => {
                                        const upDateBody = { name: "", lastName: "", dni: inputValueDni, email: "", profileImg: "" }
                                        editUserParemeters(upDateBody)
                                    }}>
                                        <i class="fa-solid fa-circle-check text-[30px] text-green-500"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* ----------------------------------------------------------------------------------------------------DNI DNI DNI-------------------------------------------------- */}


                        {/* ----------------------------------------------------------------------------------------------------EMAIL EMAIL EMAIL-------------------------------------------------- */}
                        <div className=' relative flex flex-row w-[490px]' onMouseEnter={() => { setViewEmailPen(true) }} onMouseLeave={() => { setViewEmailPen(false) }}>


                            <div className={`z-0 absolute top-[-30px]  left-[10px] transition-all duration-500 transform ${showPopUpMessage ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"
                                }`}>
                                <h1 className='p-1 bg-[#ffd900] rounded-[10px] font-normal shadow-lg'> <i className="fa-solid fa-triangle-exclamation"></i> If you change your email, you must login again.</h1>
                            </div>


                            <div>
                                <input className='text-[40px] focus:outline-none focus:border-none w-[450px] bg-transparent' type="text" value={inputValueEmail} disabled={isDisabledInputEmail}
                                    onChange={(e) => {
                                        setInputValueEmail(e.target.value)
                                        setShowErrorMessage(false)
                                        setErrorMessage("")
                                    }} />

                                <div className={`z-0  transition-all duration-500 transform ${showErrorMessage ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"
                                    }`}>
                                    <h1 className='p-1 bg-[#ff00008a] rounded-[10px] font-semibold shadow-lg inline-block'> <i className="fa-solid fa-triangle-exclamation"></i> {errorMessage} </h1>
                                </div>
                            </div>

                            <div className=' relative w-[100px] '>
                                {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                                <span className={``}>
                                    <button className={`${viewEmailPen ? "show" : "hidden"}`} onClick={() => {
                                        setViewInputEditEmail(true)
                                        setIsDisabledInputEmail(false)
                                        setShowPopUpMessage(true)
                                    }}>
                                        <i class="fa-solid fa-pen text-[30px]"></i>
                                    </button>
                                </span>
                                {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                                <div className={` ${viewInputEditEmail ? "show" : "hidden"} absolute top-[-5px] flex flex-col items-center justify-center gap-1 bg-gray-200 rounded-[5px] p-1`}>
                                    <button onClick={() => {
                                        setInputValueEmail(userInformationLocalStorage.mail)
                                        setViewInputEditEmail(false)
                                        setIsDisabledInputEmail(true)
                                        setShowPopUpMessage(false)
                                        setShowErrorMessage(false)
                                        setErrorMessage("")
                                    }}>
                                        <i class="fa-solid fa-circle-xmark text-[30px] text-red-500"></i>
                                    </button>
                                    <button onClick={() => {
                                        const upDateBody = { name: "", lastName: "", dni: "", email: inputValueEmail, profileImg: "" }
                                        editUserParemeters(upDateBody)
                                    }}>
                                        <i class="fa-solid fa-circle-check text-[30px] text-green-500"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* ----------------------------------------------------------------------------------------------------EMAIL EMAIL EMAIL-------------------------------------------------- */}
                                                      
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Configuration