
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingView from '../LoadingView'
// import { logOutAction } from '../redux/actions/authenticationAction'
// import { logOutUserAction } from '../redux/actions/authenticatedUserInformationAction'


function UserInformation() {

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

    const [errorMessageName, setErrorMessageName] = useState("")
    const [showErrorMessageName, setShowErrorMessageName] = useState(false)

    const [errorMessageLastName, setErrorMessageLastName] = useState("")
    const [showErrorMessageLastName, setShowErrorMessageLastName] = useState(false)

    const [errorMessageDNI, setErrorMessageDNI] = useState("")
    const [showErrorMessageDNI, setShowErrorMessageDNI] = useState(false)

    const [errorMessageEmail, setErrorMessageEmail] = useState("")
    const [showErrorMessageEmail, setShowErrorMessageEmail] = useState(false)

    const [viewLoadingComponent, setViewLoadingComponent] = useState(false)



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
        setViewLoadingComponent(true)
        console.log(body)
        axios.patch(`http://localhost:8080/api/usuarios/configuration`, body, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                setViewLoadingComponent(false)
                console.log(response.data)
                updateLocalStorage()
                if (response.data.includes("Email")) {
                    // dispatch(logOutAction())
                    // dispatchUser(logOutUserAction())
                    // navigate("/")
                    //------------------------------------------------
                    window.location.reload()
                    //------------------------------------------------
                }
            })
            .catch((error) => {
                setViewLoadingComponent(false)
                console.log(error)
                console.log(error.response.data)
                if (error.response.data.includes("first name")) {
                    setErrorMessageName(error.response.data)
                    setShowErrorMessageName(true)
                }
                if (error.response.data.includes("last name")) {
                    setErrorMessageLastName(error.response.data)
                    setShowErrorMessageLastName(true)
                }
                if (error.response.data.includes("DNI")) {
                    setErrorMessageDNI(error.response.data)
                    setShowErrorMessageDNI(true)
                }
                if (error.response.data.includes("Email") || error.response.data.includes("email")) {
                    setErrorMessageEmail(error.response.data)
                    setShowErrorMessageEmail(true)
                }
            })
    }


    return (
        <div className='flex flex-col min-h-screen'>

            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <LoadingView show={viewLoadingComponent}/>
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}


            <div className=' relative w-full min-h-screen flex flex-col items-center bg-gray-200'>

                {/* ------------------------------------------------------------FLECHA VOLVER ATRAS------------------------------------------------------------ */}
                {/* userInformationLocalStorage && userInformationLocalStorage.rol */}
                <div className=' absolute left-0 p-2 lg:p-5'>
                    <button onClick={() => { navigate(`${userInformationLocalStorage && userInformationLocalStorage.rol === "ADMIN" ? "/adminViewSubjects" : "/materias"}`) }}>
                        <h1> <i className="fa-solid fa-share fa-flip-horizontal text-[30px] lg:text-[40px] hover:text-[#f3a04d]"></i> </h1>
                    </button>
                </div>
                {/* ------------------------------------------------------------FLECHA VOLVER ATRAS------------------------------------------------------------ */}




                <div className=' w-[95%] lg:w-[800px]  flex flex-col border border-[#00000046] shadow-xl rounded-[30px] mt-[20%] lg:mt-[5%]'>


                    {/* ----------------------------------------------------------------------------------------------------IMG IMG IMG----------------------------------------------------------------------------- */}
                    <div className=' relative w-full flex flex-row justify-center items-center bg-[#476c77] p-4 rounded-t-[30px]'
                        onMouseEnter={() => { setViewProfileImgPen(true) }} onMouseLeave={() => { setViewProfileImgPen(false) }}>

                        <div className=' absolute top-0 right-0 p-6'>
                            {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                            <span className={``}>
                                <button className={`${viewProfileImgPen ? "show" : "hidden"}`} onClick={() => {
                                    setViewInputEditProfileImg(true)
                                    setIsDisabledInputProfileImg(false)
                                }}>
                                    <i className="fa-solid fa-pen text-[30px]"></i>
                                </button>
                            </span>
                            {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                        </div>

                        <div className={`${viewInputEditProfileImg ? "show" : "hidden"} absolute w-full h-full bg-[#0000009c] flex flex-row  justify-center items-center rounded-t-[30px]`}>
                            {/* ----------------------------------------------------------------INPUT MAS DOS BOTONES -------------------------------------------------- */}
                            <div className={` ${viewInputEditProfileImg ? "show" : "hidden"}  bg-[#f3f2f2] flex lg:flex-row flex-col justify-center items-center p-2 lg:p-6 rounded-[12px] lg:rounded-[20px]`}>
                                <input type="text" value={inputValueProfileImg} className='bg-gray-300 p-1 lg:p-2 lg:w-[600px] text-[12px] lg:text-[16px] w-[270px] rounded-[5px]' onChange={(e) => { setInputValueProfileImg(e.target.value) }} />

                                <div className=' ml-2 flex flex-row gap-3 text-[25px] lg:text-3xl'>
                                    <button onClick={() => {
                                        setInputValueProfileImg(userInformationLocalStorage.userProfileImg)
                                        setViewInputEditProfileImg(false)
                                        setErrorMessageEmail("")
                                        setShowErrorMessageEmail(false)
                                    }}>
                                        <i className="fa-solid fa-circle-xmark text-red-500"></i>
                                    </button>
                                    <button onClick={() => {
                                        const upDateBody = { name: "", lastName: "", dni: "", email: "", profileImg: inputValueProfileImg }
                                        editUserParemeters(upDateBody)
                                    }}>
                                        <i className="fa-solid fa-circle-check text-green-500"></i>
                                    </button>
                                </div>
                            </div>
                            {/* ----------------------------------------------------------------INPUT MAS DOS BOTONES -------------------------------------------------- */}
                        </div>

                        <div className=''>
                            <img className='w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] rounded-full shadow-lg' src={inputValueProfileImg} alt="" />
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------------------------------------------IMG IMG IMG----------------------------------------------------------------------------- */}




                    <div className='w-full flex flex-col justify-around bg-[#EFB071] font-extrabold text-gray-800 p-2 lg:p-4 rounded-b-[30px]'>

                        <div className=' flex flex-col lg:flex-row justify-center items-center'>

                            {/* ----------------------------------------------------------------------------------------------------NAME NAME NAME-------------------------------------------------- */}
                            <div className='flex flex-row w-[310px]' onMouseEnter={() => { setViewNamePen(true) }} onMouseLeave={() => { setViewNamePen(false) }}>

                                <div>
                                    <input className={`text-[22px] lg:text-[45px] text-start lg:text-center ${viewInputEditName ? "border border-gray-800 rounded-[5px]" : ""} px-1 focus:outline-none focus:border-none w-[270px] bg-transparent`} 
                                    type="text" value={inputValueName} disabled={isDisabledInputName}
                                        onChange={(e) => { 
                                            setInputValueName(e.target.value)
                                            setErrorMessageName("")
                                            setShowErrorMessageName(false) }} />

                                    <div className={`z-0  transition-all duration-500 transform ${showErrorMessageName ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"
                                        }`}>
                                        <h1 className='p-1 bg-[#ff00008a] rounded-[10px] text-[13px] lg:text-[16px] font-semibold shadow-lg inline-block'> <i className="fa-solid fa-triangle-exclamation"></i> {errorMessageName} </h1>
                                    </div>
                                </div>

                                <div className=' relative w-[100px]'>
                                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                                    <span className={``}>
                                        <button className={`${viewNamePen ? "show" : "hidden"}`} onClick={() => {
                                            setViewInputEditName(true)
                                            setIsDisabledInputName(false)
                                        }}>
                                            <i className="fa-solid fa-pen text-[25px] lg:text-[30px]"></i>
                                        </button>
                                    </span>
                                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                                    <div className={` ${viewInputEditName ? "show" : "hidden"} absolute top-[-5px]  flex flex-col items-center justify-center gap-2 lg:gap-1 bg-gray-200 rounded-[5px] p-1`}>
                                        <button onClick={() => {
                                            setInputValueName(userInformationLocalStorage.name)
                                            setViewInputEditName(false)
                                            setIsDisabledInputName(true)
                                            setErrorMessageName("")
                                            setShowErrorMessageName(false)
                                        }}>
                                            <i className="fa-solid fa-circle-xmark text-[25px] lg:text-[30px] text-red-500"></i>
                                        </button>
                                        <button onClick={() => {
                                            const upDateBody = { name: inputValueName, lastName: "", dni: "", email: "", profileImg: "" }
                                            editUserParemeters(upDateBody)
                                        }}>
                                            <i className="fa-solid fa-circle-check text-[25px] lg:text-[30px] text-green-500"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* ----------------------------------------------------------------------------------------------------NAME NAME NAME-------------------------------------------------- */}



                            {/* ----------------------------------------------------------------------------------------------------LASTNAME LASTNAME LASTNAME-------------------------------------------------- */}
                            <div className='flex flex-row w-[310px] ' onMouseEnter={() => { setViewLastNamePen(true) }} onMouseLeave={() => { setViewLastNamePen(false) }}>

                                <div>
                                    <input className={`text-[22px] lg:text-[45px] text-start lg:text-center ${viewInputEditLastName ? "border border-gray-800 rounded-[5px]" : ""} px-1 focus:outline-none focus:border-none w-[270px] bg-transparent`}
                                     type="text" value={inputValueLastName} disabled={isDisabledInputLastName}
                                        onChange={(e) => {
                                            setInputValueLastName(e.target.value)
                                            setErrorMessageLastName("")
                                            setShowErrorMessageLastName(false)
                                        }} />

                                    <div className={`z-0  transition-all duration-500 transform ${showErrorMessageLastName ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"
                                        }`}>
                                        <h1 className='p-1 bg-[#ff00008a] rounded-[10px] text-[13px] lg:text-[16px] font-semibold shadow-lg inline-block'> <i className="fa-solid fa-triangle-exclamation"></i> {errorMessageLastName} </h1>
                                    </div>

                                </div>

                                <div className=' relative w-[100px] '>
                                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                                    <span className={``}>
                                        <button className={`${viewLastNamePen ? "show" : "hidden"}`} onClick={() => {
                                            setViewInputEditLastName(true)
                                            setIsDisabledInputLastName(false)
                                        }}>
                                            <i className="fa-solid fa-pen text-[25px] lg:text-[30px]"></i>
                                        </button>
                                    </span>
                                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                                    <div className={` ${viewInputEditLastName ? "show" : "hidden"} absolute top-[-5px]  flex flex-col items-center justify-center gap-2 lg:gap-1 bg-gray-200 rounded-[5px] p-1`}>
                                        <button onClick={() => {
                                            setInputValueLastName(userInformationLocalStorage.lastName)
                                            setViewInputEditLastName(false)
                                            setIsDisabledInputLastName(true)
                                            setErrorMessageLastName("")
                                            setShowErrorMessageLastName(false)
                                        }}>
                                            <i className="fa-solid fa-circle-xmark text-[25px] lg:text-[30px] text-red-500"></i>
                                        </button>
                                        <button onClick={() => {
                                            const upDateBody = { name: "", lastName: inputValueLastName, dni: "", email: "", profileImg: "" }
                                            editUserParemeters(upDateBody)
                                        }}>
                                            <i className="fa-solid fa-circle-check text-[25px] lg:text-[30px] text-green-500"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* ----------------------------------------------------------------------------------------------------LASTNAME LASTNAME LASTNAME-------------------------------------------------- */}

                        </div>


                        {/* ----------------------------------------------------------------------------------------------------DNI DNI DNI-------------------------------------------------- */}
                        <div className='flex flex-row w-[310px] ' onMouseEnter={() => { setViewDniPen(true) }} onMouseLeave={() => { setViewDniPen(false) }}>
                            <div>
                                <input className={`text-[18px] lg:text-[40px] ${viewInputEditDni ? "border border-gray-800 rounded-[5px]" : ""} px-1 focus:outline-none focus:border-none w-[270px] bg-transparent`} 
                                type="text" value={inputValueDni} disabled={isDisabledInputDni}
                                    onChange={(e) => {
                                        setInputValueDni(e.target.value)
                                        setErrorMessageDNI("")
                                        setShowErrorMessageDNI(false)
                                    }} />

                                <div className={`z-0  transition-all duration-500 transform ${showErrorMessageDNI ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"
                                    }`}>
                                    <h1 className='p-1 bg-[#ff00008a] rounded-[10px] text-[13px] lg:text-[16px] font-semibold shadow-lg inline-block'> <i className="fa-solid fa-triangle-exclamation"></i> {errorMessageDNI} </h1>
                                </div>
                            </div>

                            <div className=' relative w-[100px] '>
                                {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                                <span className={``}>
                                    <button className={`${viewDniPen ? "show" : "hidden"}`} onClick={() => {
                                        setViewInputEditDni(true)
                                        setIsDisabledInputDni(false)
                                    }}>
                                        <i className="fa-solid fa-pen text-[25px] lg:text-[30px]"></i>
                                    </button>
                                </span>
                                {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                                <div className={` ${viewInputEditDni ? "show" : "hidden"} absolute top-[-5px] flex flex-col items-center justify-center gap-1 bg-gray-200 rounded-[5px] p-1`}>
                                    <button onClick={() => {
                                        setInputValueDni(userInformationLocalStorage.dni)
                                        setViewInputEditDni(false)
                                        setIsDisabledInputDni(true)
                                        setErrorMessageDNI("")
                                        setShowErrorMessageDNI(false)
                                    }}>
                                        <i className="fa-solid fa-circle-xmark text-[25px] lg:text-[30px] text-red-500"></i>
                                    </button>
                                    <button onClick={() => {
                                        const upDateBody = { name: "", lastName: "", dni: inputValueDni, email: "", profileImg: "" }
                                        editUserParemeters(upDateBody)
                                    }}>
                                        <i className="fa-solid fa-circle-check text-[25px] lg:text-[30px] text-green-500"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* ----------------------------------------------------------------------------------------------------DNI DNI DNI-------------------------------------------------- */}


                        {/* ----------------------------------------------------------------------------------------------------EMAIL EMAIL EMAIL-------------------------------------------------- */}
                        <div className=' relative flex flex-row w-[310px] lg:w-[490px]' onMouseEnter={() => { setViewEmailPen(true) }} onMouseLeave={() => { setViewEmailPen(false) }}>


                            <div className={`z-0 absolute top-[-30px] transition-all duration-500 transform ${showPopUpMessage ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"
                                }`}>
                                <h1 className='p-1 bg-[#ffd900] rounded-[10px] text-[13px] lg:text-[15px] font-normal shadow-lg'> <i className="fa-solid fa-triangle-exclamation"></i> If you change your email, you must login again.</h1>
                            </div>


                            <div>
                                <input className={`text-[18px] lg:text-[40px] ${viewInputEditEmail ? "border border-gray-800 rounded-[5px]" : ""} px-1 focus:outline-none  focus:border-none w-[274px] lg:w-[450px] bg-transparent`}
                                 type="text" value={inputValueEmail} disabled={isDisabledInputEmail}
                                    onChange={(e) => {
                                        setInputValueEmail(e.target.value)
                                        setShowErrorMessageEmail(false)
                                        setErrorMessageEmail("")
                                    }} />

                                <div className={`z-0  transition-all duration-500 transform ${showErrorMessageEmail ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"
                                    }`}>
                                    <h1 className='p-1 bg-[#ff00008a] rounded-[10px] text-[13px] lg:text-[16px] font-semibold shadow-lg inline-block'> <i className="fa-solid fa-triangle-exclamation"></i> {errorMessageEmail} </h1>
                                </div>
                            </div>

                            <div className=' relative w-[50px]'>
                                {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                                <span className={``}>
                                    <button className={`${viewEmailPen ? "show" : "hidden"}`} onClick={() => {
                                        setViewInputEditEmail(true)
                                        setIsDisabledInputEmail(false)
                                        setShowPopUpMessage(true)
                                    }}>
                                        <i className="fa-solid fa-pen text-[25px] lg:text-[30px]"></i>
                                    </button>
                                </span>
                                {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                                <div className={` ${viewInputEditEmail ? "show" : "hidden"} absolute top-[-5px] flex flex-col items-center justify-center gap-1 bg-gray-200 rounded-[5px] p-1`}>
                                    <button onClick={() => {
                                        setInputValueEmail(userInformationLocalStorage.mail)
                                        setViewInputEditEmail(false)
                                        setIsDisabledInputEmail(true)
                                        setShowPopUpMessage(false)
                                        setShowErrorMessageEmail(false)
                                        setErrorMessageEmail("")
                                    }}>
                                        <i className="fa-solid fa-circle-xmark text-[25px] lg:text-[30px] text-red-500"></i>
                                    </button>
                                    <button onClick={() => {
                                        const upDateBody = { name: "", lastName: "", dni: "", email: inputValueEmail, profileImg: "" }
                                        editUserParemeters(upDateBody)
                                    }}>
                                        <i className="fa-solid fa-circle-check text-[25px] lg:text-[30px] text-green-500"></i>
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

export default UserInformation