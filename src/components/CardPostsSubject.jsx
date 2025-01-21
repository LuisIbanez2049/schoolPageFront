import { Archive, CalendarDays, FileText, Truck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CommentUser from './CommentUser';
import InputAddComment from './InputAddComment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { hiddenPopUpAction, showPopUpAction } from '../redux/actions/popUpMessageAction';
import store from '../redux/store';
import { falseAuxAction, truAuxAction } from '../redux/actions/auxAction';
import PopUpMessage from './PopUpMessage';
import LoadingView from './LoadingView';

function CardPostsSubject({ color, title, description, date, file, contentId }) {


    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');

    //--------------------------------------------------------------------------------------------
    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))
    //--------------------------------------------------------------------------------------------


    const [viewComments, setViewComments] = useState(false)
    const [showDeletePopUpMesagge, setShowDeletePopUpMesagge] = useState(false)
    const dispatch = useDispatch()

    const [viewTitlePen, setViewTitlePen] = useState(false)
    const [viewDescriptionPen, setViewDescriptionPen] = useState(false)
    const [viewFileUrlPen, setViewFileUrlPen] = useState(false)

    const [valueTitle, setValueTitle] = useState(title)
    const [viewInputEditTitle, setViewInputEditTitle] = useState(false)

    const [valueDescription, setValueDescription] = useState(description)
    const [viewInputEditDescription, setViewInputEditDescription] = useState(false)
    const [isDisabledInputTextArea, setIsDisabledInputTextArea] = useState(true)

    const [valueUrl, setValueUrl] = useState(file)
    const [viewInputEditUrl, setViewInputEditUrl] = useState(false)

    const [bodyEditContent, setBodyEditContent] = useState({})

    const [viewLoadingComponent, setViewLoadingComponent] = useState(false)
    

    function showPopUpFunction(data) {
        dispatch(showPopUpAction(data))
        setTimeout(() => {
            dispatch(hiddenPopUpAction())
        }, 3000) // 3 segundos
    }



    const dateDate = date && date.slice(0, 10);
    const dateHour = date && date.slice(11, 16);
    const divStyle = {
        boxShadow: `0px 5px 8px ${color}`
    }
    const textStyle = {
        textShadow: `0px 0px 1px ${color}`
    }


    useEffect(() => {
        setViewLoadingComponent(true)
        axios.get(`http://localhost:8080/api/contenido/${contentId}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                setViewLoadingComponent(false)
                console.log(response.data)
            })
            .catch((error) => {
                setViewLoadingComponent(false)
                console.log(error)
            })
    }, [])

    const onClickdeleteButtom = () => {
        setShowDeletePopUpMesagge(true)
    }

    const deleteContend = async (event) => {
        event.preventDefault()
        setViewLoadingComponent(true)
        axios.delete(`http://localhost:8080/api/contenido/desactivar/${contentId}`, {
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

    function editContent (body){
        setViewLoadingComponent(true)
        console.log(body)
        axios.patch(`http://localhost:8080/api/contenido/modificar`, body, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        } )
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


    return (
        <div className=" relative w-[96%] lg:w-[1300px] rounded-lg bg-[#f3f2f2] p-3 lg:p-6 shadow-md" style={divStyle}>

            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <LoadingView show={viewLoadingComponent} />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}


            <div className={` ${userInformationLocalStorage.rol == "PROFESOR" ? "show" : "hidden"} absolute z-20 top-1 right-1 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] flex flex-row justify-center items-center rounded-full`}>
                <button onClick={onClickdeleteButtom}>
                    <i className="fa-solid fa-circle-xmark text-[30px] lg:text-[40px] text-red-500"></i>
                </button>
            </div>

            <div className={` absolute top-0 w-[98%] h-full flex flex-row justify-center  items-center transition-all duration-500 transform ${showDeletePopUpMesagge ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"
                } `}>
                <div className='flex flex-col gap-6 bg-[#e4dcd7] p-4 rounded-[20px] shadow-sm'>
                    <h1 className=' text-center text-[20px] font-semibold text-gray-800'> Are you sure you want to <br /> delete this content? </h1>
                    <div className='w-full flex flex-row justify-center gap-8'>
                        <button onClick={() => { setShowDeletePopUpMesagge(false) }}>
                            <h1 className='rounded-[5px] p-2 bg-[#ff00007a] font-semibold'>CANCEL</h1>
                        </button>

                        <button onClick={deleteContend}> <h1 className='rounded-[5px] p-2 bg-[#00800094] font-semibold'>CONFIRM</h1> </button>
                    </div>
                </div>
            </div>


            <div className=' relative z-10'>
                <div className='relative'>

                    {/* ---------------------------------------------------------------- TITLE TITLE TITLE -------------------------------------------------- */}
                    <h1 className={` relative mb-2 text-[20px] lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white bg-[${color}] rounded-[8px] lg:rounded-[15px] p-1 lg:p-2`}
                        onMouseEnter={() => { setViewTitlePen(true) }} onMouseLeave={() => { setViewTitlePen(false) }}>

                        {title}

                        {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                        <span className={` ${userInformationLocalStorage.rol == "PROFESOR" ? "show" : "hidden"} ml-[20px]`}>
                            <button className={`${viewTitlePen ? "show" : "hidden"}`} onClick={() => {
                                setViewInputEditTitle(true)
                            }}>
                                <i class="fa-solid fa-pen text-[20px]"></i>
                            </button>
                        </span>
                        {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}



                        {/* ----------------------------------------------------------------INPUT TITLE MAS DOS BOTONES -------------------------------------------------- */}
                        <div className={` ${viewInputEditTitle ? "show" : "hidden"} absolute top-0 h-full rounded-l-[20px] bg-[${color}] flex flex-row justify-center items-center`}>
                            <input type="text" value={valueTitle} className=' w-[150px] bg-transparent px-1 lg:px-2' onChange={(e) => { setValueTitle(e.target.value) }} />

                            <div className=' ml-2 flex flex-row gap-3'>
                                <button onClick={() => {
                                    setValueTitle(title)
                                    setViewInputEditTitle(false)
                                }}>
                                    <i class="fa-solid fa-circle-xmark text-red-500"></i>
                                </button>
                                <button onClick={() => {
                                    const upDateBody = {idContenido: contentId, titulo: valueTitle, detalleContenido: "", archivo: ""}
                                    setBodyEditContent(upDateBody)
                                    editContent(upDateBody)
                                }}>
                                    <i class="fa-solid fa-circle-check text-green-500"></i>
                                </button>
                            </div>
                        </div>
                        {/* ----------------------------------------------------------------INPUT TITLE MAS DOS BOTONES -------------------------------------------------- */}



                    </h1>
                    {/* ---------------------------------------------------------------- TITLE TITLE TITLE -------------------------------------------------- */}





                    {/* <div className='abso'> <i class="fa-solid fa-pen"></i> </div>  */}
                </div>
                <div className="mb-4 flex items-center text-[12px] lg:text-sm text-gray-500 dark:text-gray-400">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <time >{dateDate} | {dateHour}</time>
                </div>
                {/* <p className=" h-auto mb-6 text-base text-gray-700 dark:text-gray-300">
                    {description}
                </p> */}


                {/* ---------------------------------------------------------------- DESCRIPTION DESCRIPTION DESCRIPTION -------------------------------------------------- */}
                <div className=' relative' onMouseEnter={() => { setViewDescriptionPen(true) }} onMouseLeave={() => { setViewDescriptionPen(false) }}>
                    <textarea name="" id="" className='bg-transparent w-[86%] lg:w-[95%] h-[50px] lg:h-[120px] text-[14px] lg:text-[18px] p-1' value={valueDescription} disabled={isDisabledInputTextArea}
                        onChange={(e) => { setValueDescription(e.target.value) }}></textarea>

                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                    <span className={` relative z-0 ${userInformationLocalStorage.rol == "PROFESOR" ? "show" : "hidden"} ml-[20px]`}>
                        <button className={`${viewDescriptionPen ? "show" : "hidden"}`} onClick={() => {
                            setViewInputEditDescription(true)
                            setIsDisabledInputTextArea(false)
                        }}>
                            <i class="fa-solid fa-pen text-[22px]"></i>
                        </button>
                    </span>
                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                    <div className={` ${viewInputEditDescription ? "show" : "hidden"} absolute z-10 bottom-0 right-[-12px] lg:right-[-20px] text-[20px] lg:text-3xl flex flex-row gap-2 lg:gap-3 lg:p-1 bg-[#f3f2f2]`}>
                        <button onClick={() => {
                            setValueDescription(description)
                            setViewInputEditDescription(false)
                            setIsDisabledInputTextArea(true)
                        }}>
                            <i class="fa-solid fa-circle-xmark text-red-500"></i>
                        </button>
                        <button onClick={() => {
                                    const upDateBody = {idContenido: contentId, titulo: "", detalleContenido: valueDescription, archivo: ""}
                                    setBodyEditContent(upDateBody)
                                    editContent(upDateBody)
                                }}>
                            <i class="fa-solid fa-circle-check text-green-500"></i>
                        </button>
                    </div>

                    <div>

                    </div>
                </div>
                {/* ---------------------------------------------------------------- DESCRIPTION DESCRIPTION DESCRIPTION -------------------------------------------------- */}





                {/* ---------------------------------------------------------------- FILE URL FILE URL FILE URL -------------------------------------------------- */}
                <div className=' relative' onMouseEnter={() => { setViewFileUrlPen(true) }} onMouseLeave={() => { setViewFileUrlPen(false) }}>
                    <a
                        href={`${file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center rounded-[5px] lg:rounded-lg bg-[${color}] px-2 lg:px-4 py-1 lg:py-2 text-center text-sm  text-[#000000c0] font-semibold hover:text-black`}
                    >
                        <FileText className="mr-2 h-5 w-5" />
                        View Document
                    </a>

                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                    <span className={` ${userInformationLocalStorage.rol == "PROFESOR" ? "show" : "hidden"} ml-[20px]`}>
                        <button className={`${viewFileUrlPen ? "show" : "hidden"}`} onClick={() => {
                            setViewInputEditUrl(true)
                        }}>
                            <i class="fa-solid fa-pen text-[20px]"></i>
                        </button>
                    </span>
                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                    <div className={`${viewInputEditUrl ? "show" : "hidden"} absolute top-0 w-full h-full`}>
                        {/* ----------------------------------------------------------------INPUT TITLE MAS DOS BOTONES -------------------------------------------------- */}
                        <div className={` ${viewInputEditUrl ? "show" : "hidden"} absolute top-0 h-full  bg-[#f3f2f2] flex flex-row justify-center items-center`}>
                            <input type="text" value={valueUrl} className='bg-transparent px-2 w-[250px] text-[14px] lg:text-[18px] lg:w-[900px]' onChange={(e) => { setValueUrl(e.target.value) }} />

                            <div className=' ml-2 flex flex-row gap-2 lg:gap-3 text-[20px] lg:text-3xl'>
                                <button onClick={() => {
                                    setValueUrl(file)
                                    setViewInputEditUrl(false)
                                }}>
                                    <i class="fa-solid fa-circle-xmark text-red-500"></i>
                                </button>
                                <button onClick={() => {
                                    const upDateBody = {idContenido: contentId, titulo: "", detalleContenido: "", archivo: valueUrl}
                                    setBodyEditContent(upDateBody)
                                    editContent(upDateBody)
                                }}>
                                    <i class="fa-solid fa-circle-check text-green-500"></i>
                                </button>
                            </div>
                        </div>
                        {/* ----------------------------------------------------------------INPUT TITLE MAS DOS BOTONES -------------------------------------------------- */}
                    </div>

                </div>
                {/* ---------------------------------------------------------------- FILE URL FILE URL FILE URL -------------------------------------------------- */}





                <button className=' block mt-4' onClick={() => {
                    if (viewComments) {
                        setViewComments(false)
                    } else { setViewComments(true) }
                }}>
                    <h1 className={`text-[18px] lg:text-[20px] text-[${color}] font-bold `}>
                        <span style={textStyle}> Comments </span>
                        <span className=' '>
                            <i className={`fa-solid fa-arrow-turn-down transition-all duration-700 transform ${viewComments ? "rotate-180" : "rotate-0"}`}></i>
                        </span>
                    </h1>
                </button>
                <div className={` py-${viewComments ? "3" : "0"} mt-[15px] flex flex-col gap-12 transition-all duration-700 overflow-hidden overflow-y-auto ${viewComments ? "h-[400px]" : "h-0"} `}>

                    <CommentUser color={color} contentId={contentId} />

                </div>
            </div>
        </div>
    )
}

export default CardPostsSubject
