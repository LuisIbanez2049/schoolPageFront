
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingView from '../LoadingView'
import ConfirmationPopUpAlert from '../ConfirmationPopUpAlert'
import CommentUserCardAdmin from './CommentUserCardAdmin'
import AnswerUserCardAdmin from './AnswerUserCardAdmin'
// import { logOutAction } from '../redux/actions/authenticationAction'
// import { logOutUserAction } from '../redux/actions/authenticatedUserInformationAction'


function UserInformation() {

    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))
    const [userInformation, setUserInformation] = useState({})
    const [userSubjects, setUserSubjects] = useState([])
    const [idSubject, setIdSubject] = useState()
    const [userComments, setUserComments] = useState([])
    const [answers, setAnswers] = useState([])

    const [viewNamePen, setViewNamePen] = useState(false)
    const [viewInputEditName, setViewInputEditName] = useState(false)
    const [inputValueName, setInputValueName] = useState("") //---------------
    const [isDisabledInputName, setIsDisabledInputName] = useState(true)

    const [viewLastNamePen, setViewLastNamePen] = useState(false)
    const [viewInputEditLastName, setViewInputEditLastName] = useState(false)
    const [inputValueLastName, setInputValueLastName] = useState("") //---------------
    const [isDisabledInputLastName, setIsDisabledInputLastName] = useState(true)

    const [viewDniPen, setViewDniPen] = useState(false)
    const [viewInputEditDni, setViewInputEditDni] = useState(false)
    const [inputValueDni, setInputValueDni] = useState("") //---------------
    const [isDisabledInputDni, setIsDisabledInputDni] = useState(true)

    const [viewEmailPen, setViewEmailPen] = useState(false)
    const [viewInputEditEmail, setViewInputEditEmail] = useState(false)
    const [inputValueEmail, setInputValueEmail] = useState("") //---------------
    const [isDisabledInputEmail, setIsDisabledInputEmail] = useState(true)

    const [viewProfileImgPen, setViewProfileImgPen] = useState(false)
    const [viewInputEditProfileImg, setViewInputEditProfileImg] = useState(false)
    const [inputValueProfileImg, setInputValueProfileImg] = useState("") //---------------
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

    const [viewConfirmationComponent, setViewConfirmationComponent] = useState(false)


    const [availableComments, setAvailableComments] = useState([])
    const [disableComments, setDisableComments] = useState([])
    const [selectValue, setselectValue] = useState("all")
    const [viewAllComments, setViewAllComments] = useState(true)
    const [viewAvailableComments, setViewAvailableComments] = useState(false)
    const [viewDisabledComments, setViewDisabledComments] = useState(false)


    const [availableAnswers, setAvailableAnswers] = useState([])
    const [disabledAnswers, setDisabledAnswers] = useState([])
    const [selectValueAnswers, setSelectValueAnswers] = useState("allAnswers")
    const [viewAllAnswers, setViewAllAnswers] = useState(true)
    const [viewAvailableAnswers, setViewAvailableAnswers] = useState(false)
    const [viewDisabledAnswers, setViewDisabledAnswers] = useState(false)



    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setViewLoadingComponent(true)
        axios.get(`http://localhost:8080/api/usuarios/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                setViewLoadingComponent(false)
                setUserInformation(response.data)
                setUserComments(response.data.comentarioAdminDTOS)
                setAnswers(response.data.respuestaDTOS)
                setUserSubjects(response.data.usuarioMaterias)
                setInputValueName(response.data.name)
                setInputValueLastName(response.data.lastName)
                setInputValueDni(response.data.dni)
                setInputValueEmail(response.data.mail)
                setInputValueProfileImg(response.data.userProfileImg)
                //------------------------------------------------
                // window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                setViewLoadingComponent(false)
                console.log(error)
            });
    }, [])


    useEffect(() => {
        let auxAvailbaleComments = userComments && userComments.filter(comment => comment.asset === true)
        setAvailableComments(auxAvailbaleComments)

        let auxDisableComments = userComments && userComments.filter(comment => comment.asset === false)
        setDisableComments(auxDisableComments)
    }, [userComments])

    useEffect(() => {
        if (selectValue == "all") {
            setViewAllComments(true)
            setViewAvailableComments(false)
            setViewDisabledComments(false)
        } else if (selectValue == "available") {
            setViewAllComments(false)
            setViewAvailableComments(true)
            setViewDisabledComments(false)
        } else {
            setViewAllComments(false)
            setViewAvailableComments(false)
            setViewDisabledComments(true)
        }
    }, [selectValue])



    function editUserParemeters(body) {
        setViewLoadingComponent(true)
        console.log(body)
        axios.patch(`http://localhost:8080/api/usuarios/configurationAdmin`, body, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                setViewLoadingComponent(false)
                console.log(response.data)
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
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

    function expelUserFromSubject() {
        setViewLoadingComponent(true)
        const bodyExpelUser = {
            idMateria: idSubject,
            idUsuario: id
        }
        console.log(bodyExpelUser)
        axios.patch("http://localhost:8080/api/usuarios/leaveSubject", bodyExpelUser, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                setViewLoadingComponent(false)
                console.log(response.data)
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                setViewLoadingComponent(false)
                console.log(error)
            })
    }

    const handleOnCancelFuntionPopUpComponent = () => {
        setViewConfirmationComponent(false)
        setIdSubject("")
    }



    useEffect(() => {
        let auxAvailbaleAnswers = answers && answers.filter(answer => answer.asset === true)
        setAvailableAnswers(auxAvailbaleAnswers)

        let auxDisableAnswers = answers && answers.filter(answer => answer.asset === false)
        setDisabledAnswers(auxDisableAnswers)
    }, [answers])


    useEffect(() => {
        if (selectValueAnswers == "allAnswers") {
            setViewAllAnswers(true)
            setViewAvailableAnswers(false)
            setViewDisabledAnswers(false)
        } else if (selectValueAnswers == "availableAnswers") {
            setViewAllAnswers(false)
            setViewAvailableAnswers(true)
            setViewDisabledAnswers(false)
        } else {
            setViewAllAnswers(false)
            setViewAvailableAnswers(false)
            setViewDisabledAnswers(true)
        }
    }, [selectValueAnswers, answers])


    return (
        <div className='flex flex-col min-h-screen'>

            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <LoadingView show={viewLoadingComponent} />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}


            {/* ------------------------------------------------------------CONFIRMATION POPOUP MESSAGE------------------------------------------------------------ */}
            <ConfirmationPopUpAlert isShow={viewConfirmationComponent} handleOnConfirmFunction={expelUserFromSubject} handleOnCancelFunction={handleOnCancelFuntionPopUpComponent}
                message={"Do you want to expel this user from the subject?"} />
            {/* ------------------------------------------------------------CONFIRMATION POPOUP MESSAGE------------------------------------------------------------ */}


            <div className=' relative w-full min-h-screen flex flex-col items-center bg-gray-200 mb-[80px] pb-[60px]'>

                {/* ------------------------------------------------------------FLECHA VOLVER ATRAS------------------------------------------------------------ */}
                {/* userInformationLocalStorage && userInformationLocalStorage.rol */}
                <div className=' absolute left-0 p-2 lg:p-5'>
                    <button onClick={() => { navigate(`/adminViewUsers`) }}>
                        <h1> <i className="fa-solid fa-share fa-flip-horizontal text-[30px] lg:text-[40px] hover:text-[#f3a04d]"></i> </h1>
                    </button>
                </div>
                {/* ------------------------------------------------------------FLECHA VOLVER ATRAS------------------------------------------------------------ */}



                {/* --------------------------------------------------IMG - FULLNAME - DNI - EMAIL-------------------------------------------------- */}
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
                                        setInputValueProfileImg(userInformation.userProfileImg)
                                        setViewInputEditProfileImg(false)
                                        setErrorMessageEmail("")
                                        setShowErrorMessageEmail(false)
                                    }}>
                                        <i className="fa-solid fa-circle-xmark text-red-500"></i>
                                    </button>
                                    <button onClick={() => {
                                        const upDateBody = { id: id, name: "", lastName: "", dni: "", email: "", profileImg: inputValueProfileImg }
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
                                            setShowErrorMessageName(false)
                                        }} />

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
                                            setInputValueName(userInformation.name)
                                            setViewInputEditName(false)
                                            setIsDisabledInputName(true)
                                            setErrorMessageName("")
                                            setShowErrorMessageName(false)
                                        }}>
                                            <i className="fa-solid fa-circle-xmark text-[25px] lg:text-[30px] text-red-500"></i>
                                        </button>
                                        <button onClick={() => {
                                            const upDateBody = { id: id, name: inputValueName, lastName: "", dni: "", email: "", profileImg: "" }
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
                                            setInputValueLastName(userInformation.lastName)
                                            setViewInputEditLastName(false)
                                            setIsDisabledInputLastName(true)
                                            setErrorMessageLastName("")
                                            setShowErrorMessageLastName(false)
                                        }}>
                                            <i className="fa-solid fa-circle-xmark text-[25px] lg:text-[30px] text-red-500"></i>
                                        </button>
                                        <button onClick={() => {
                                            const upDateBody = { id: id, name: "", lastName: inputValueLastName, dni: "", email: "", profileImg: "" }
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
                                        setInputValueDni(userInformation.dni)
                                        setViewInputEditDni(false)
                                        setIsDisabledInputDni(true)
                                        setErrorMessageDNI("")
                                        setShowErrorMessageDNI(false)
                                    }}>
                                        <i className="fa-solid fa-circle-xmark text-[25px] lg:text-[30px] text-red-500"></i>
                                    </button>
                                    <button onClick={() => {
                                        const upDateBody = { id: id, name: "", lastName: "", dni: inputValueDni, email: "", profileImg: "" }
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


                            <div className={` hidden z-0 absolute top-[-30px] transition-all duration-500 transform ${showPopUpMessage ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"
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
                                        setInputValueEmail(userInformation.mail)
                                        setViewInputEditEmail(false)
                                        setIsDisabledInputEmail(true)
                                        setShowPopUpMessage(false)
                                        setShowErrorMessageEmail(false)
                                        setErrorMessageEmail("")
                                    }}>
                                        <i className="fa-solid fa-circle-xmark text-[25px] lg:text-[30px] text-red-500"></i>
                                    </button>
                                    <button onClick={() => {
                                        const upDateBody = { id: id, name: "", lastName: "", dni: "", email: inputValueEmail, profileImg: "" }
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
                {/* --------------------------------------------------IMG - FULLNAME - DNI - EMAIL-------------------------------------------------- */}


                {/* -------------------------------------------------------------------------SUBJECTS FROM USER------------------------------------------------------------------------- */}
                <div className='border border-gray-300 w-[95%] mt-[25px] p-2 rounded-xl bg-slate-200 shadow-md'>
                    <div className='mb-[15px]'>
                        <h1 className='text-[25px] font-bold text-[#000000d3] underline'>SUBJECTS</h1>
                    </div>

                    <div className='flex flex-col gap-4 lg:gap-8'>
                        {userSubjects && userSubjects.length > 0 && userSubjects.map(subject => {
                            return (<>
                                <div className='flex flex-row gap-4 text-[16px] lg:text-[20px] font-semibold'>
                                    <h1 className='border border-gray-400 w-[220px] lg:w-[350px] bg-green-300 rounded-md p-2'> {(subject.nombreMateria).toUpperCase()}
                                        <span className=' text-[16px] font-thin'> [{subject.jornadaTurno}] </span>
                                    </h1>
                                    <button className='bg-red-500 p-1 rounded-md' onClick={() => {
                                        setIdSubject(subject.materiaId)
                                        setViewConfirmationComponent(true)
                                    }}>
                                        <h1><span className='text-[14px]'>EXPEL</span> <i className="fa-solid fa-thumbs-down"></i> </h1>
                                    </button>
                                </div>
                            </>)
                        })}

                        <div className={`${userSubjects && userSubjects.length == 0 ? "show" : "hidden"} `}>
                            <h1 className='font-extrabold text-[40px] text-[#00000075] text-center'>NO RESULTS</h1>
                        </div>
                    </div>
                </div>
                {/* -------------------------------------------------------------------------SUBJECTS FROM USER------------------------------------------------------------------------- */}



                {/* ----------------------------------------------------------------------------COMMENT CARDS---------------------------------------------------------------------------- */}
                <div className='border border-gray-300 w-[95%] mt-[25px] p-2 rounded-xl bg-slate-200 shadow-md'>
                    <h1 className='text-center text-[30px] font-extrabold text-[#000000a9]'>COMMENTS</h1>

                    <div className='mt-[30px]'>

                        <div className='mb-[30px]'>
                            <select name="opciones" className='bg-slate-300 p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] text-[14px] lg:text-[16px] shadow-sm' onChange={(e) => {
                                setselectValue(e.target.value)
                            }}>
                                <option value="all">All comments</option>
                                <option value="available">Available comments</option>
                                <option value="disabled">Disabled comments</option>
                            </select>
                        </div>


                        <div className={`${viewAllComments ? "show" : "hidden"}`}>
                            <div className="flex flex-col gap-8">
                                {userComments && userComments.length > 0 && userComments.map(comment => {
                                    return (<>
                                        <CommentUserCardAdmin commentId={comment && comment.id} viewMoreDetailsCommentBoolean={true}/>
                                    </>)
                                })}
                            </div>

                            <div className={`${userComments && userComments.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>

                        <div className={`${viewAvailableComments ? "show" : "hidden"}`}>
                            <div className="flex flex-col gap-8">
                                {availableComments && availableComments.length > 0 && availableComments.map(comment => {
                                    return (<>
                                        <CommentUserCardAdmin commentId={comment && comment.id} viewMoreDetailsCommentBoolean={true}/>
                                    </>)
                                })}
                            </div>

                            <div className={`${availableComments && availableComments.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>

                        <div className={`${viewDisabledComments ? "show" : "hidden"}`}>

                            <div className="flex flex-col gap-8">
                                {disableComments && disableComments.length > 0 && disableComments.map(comment => {
                                    return (<>
                                        <CommentUserCardAdmin commentId={comment && comment.id} viewMoreDetailsCommentBoolean={true}/>
                                    </>)
                                })}
                            </div>

                            <div className={`${disableComments && disableComments.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>


                    </div>
                </div>
                {/* ----------------------------------------------------------------------------COMMENT CARDS---------------------------------------------------------------------------- */}






                {/* ----------------------------------------------------------------------------ANSWERS CARDS---------------------------------------------------------------------------- */}
                <div className='border border-gray-300 w-[95%] mt-[80px] lg:mt-[100px] p-2 rounded-xl bg-slate-200 shadow-md'>

                    <h1 className='text-center text-[30px] font-extrabold text-[#000000a9]'>ANSWERS</h1>


                    <div className=' bg-slate-300 px-2 py-4 rounded-[10px]'>
                        <div className='mb-[30px]'>
                            <select name="opciones" className='bg-slate-100 p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] text-[14px] lg:text-[16px] shadow-sm' onChange={(e) => {
                                setSelectValueAnswers(e.target.value)
                            }}>
                                <option value="allAnswers">All answers</option>
                                <option value="availableAnswers">Available answers</option>
                                <option value="disabledAnswers">Disabled answers</option>
                            </select>
                        </div>


                        <div className={`${viewAllAnswers ? "show" : "hidden"}`}>
                            <div className="flex flex-col gap-8">
                                {answers && answers.length > 0 && answers.map(answer => {
                                    return (<>
                                        <AnswerUserCardAdmin answerId={answer.id} viewMoreDetailsAnswerBoolean={true}/>
                                    </>)
                                })}
                            </div>

                            <div className={`${answers && answers.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>

                        <div className={`${viewAvailableAnswers ? "show" : "hidden"}`}>
                            <div className="flex flex-col gap-8">
                                {availableAnswers && availableAnswers.length > 0 && availableAnswers.map(answer => {
                                    return (<>
                                        <AnswerUserCardAdmin answerId={answer.id} viewMoreDetailsAnswerBoolean={true}/>
                                    </>)
                                })}
                            </div>

                            <div className={`${availableAnswers && availableAnswers.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>

                        <div className={`${viewDisabledAnswers ? "show" : "hidden"}`}>

                            <div className="flex flex-col gap-8">
                                {disabledAnswers && disabledAnswers.length > 0 && disabledAnswers.map(answer => {
                                    return (<>
                                        <AnswerUserCardAdmin answerId={answer.id} viewMoreDetailsAnswerBoolean={true}/>
                                    </>)
                                })}
                            </div>

                            <div className={`${disabledAnswers && disabledAnswers.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>
                    </div>



                </div>
                {/* ----------------------------------------------------------------------------ANSWERS CARDS---------------------------------------------------------------------------- */}



            </div>
        </div>
    )
}

export default UserInformation