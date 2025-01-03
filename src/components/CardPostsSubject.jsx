// import { Archive, CalendarDays, FileText } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import CommentUser from './CommentUser';
// import InputAddComment from './InputAddComment';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { hiddenPopUpAction, showPopUpAction } from '../redux/actions/popUpMessageAction';
// import store from '../redux/store';
// import { falseAuxAction, truAuxAction } from '../redux/actions/auxAction';

// function CardPostsSubject({ color, title, description, date, file, contentId }) {


//     const token = localStorage.getItem("userToken")
//     let tokenSinComillas = token.replace(/"/g, '');

//     const [comments, setComments] = useState([])
//     const [answers, setAnswers] =useState([])


//     const [viewComments, setViewComments] = useState(false)
//     const [aux, setAux] = useState(false)
//     const [inputValueTextComment, setInputValueTextComment] = useState("")

//     const [reRenderAxiosGetComments, setReRenderAxiosGetComments] = useState(false)

//     const dispatch = useDispatch()
//     const dispatchAux = useDispatch()
//     let auxGlobal = useSelector(store => store.auxReducer)

//     function showPopUpFunction(data) {
//         dispatch(showPopUpAction(data))
//         setTimeout(() => {
//             dispatch(hiddenPopUpAction())
//         }, 3000) // 3 segundos
//       }


//     const handleOnClick = async (event) => {
//         event.preventDefault()

//         let bodyCreateComment = {
//             idContenido: contentId,
//             texto: inputValueTextComment,
//         }
//         axios.post("http://localhost:8080/api/comentario/create", bodyCreateComment, {
//             headers: {
//                 Authorization: `Bearer ${tokenSinComillas}`
//             }
//         })
//         .then((response) => {
//             console.log(response.data)
//             if (aux) {
//                 setAux(false)
//             } else { setAux(true) }

//             if (reRenderAxiosGetComments) {
//                 setReRenderAxiosGetComments(false)
//             } else { setReRenderAxiosGetComments(true) }

//             setInputValueTextComment("")

//             console.log(auxGlobal.isAux)
//             if (auxGlobal.isAux) {
//                 dispatchAux(falseAuxAction())
//             } else { dispatchAux(truAuxAction(response.data)) }

//             showPopUpFunction(response.data)

//         })
//         .catch((error) => {
//             console.log(error)
//         })

//     }

//     const handleOnClickCancel = () => {
//         setInputValueTextComment("")
//     }

//     const handleOnChangeFunction = (e) => {
//         setInputValueTextComment(e.target.value)
//     }

//     useEffect(() => {
//         console.log(comments)
//     }, [])
//     const dateDate = date && date.slice(0, 10);
//     const dateHour = date && date.slice(11, 16);
//     const divStyle = {
//         boxShadow: `0px 5px 8px ${color}`
//     }
//     const textStyle = {
//         textShadow: `0px 0px 1px ${color}`
//     }


//     useEffect(() => {
//         axios.get(`http://localhost:8080/api/contenido/${contentId}`, {
//             headers: {
//                 Authorization: `Bearer ${tokenSinComillas}`
//             }
//         })
//         .then((response) => {
//             console.log(response.data)
//             setComments(response.data.comentarios)
//             setAnswers(response.data.comentarios.respuestas)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
//     }, [aux])


//     return (
//         <div className="w-[1300px] rounded-lg bg-[#f3f2f2] p-6 shadow-md" style={divStyle}>
//             <h1 className={`mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white bg-[${color}] rounded-[15px] p-2`}>{title}</h1>
//             <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
//                 <CalendarDays className="mr-2 h-4 w-4" />
//                 <time >{dateDate} | {dateHour}</time>
//             </div>
//             <p className="mb-6 text-base text-gray-700 dark:text-gray-300">
//                 {description}
//             </p>
//             <a
//                 href={`${file}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`inline-flex items-center rounded-lg bg-[${color}] px-4 py-2 text-center text-sm  text-[#000000c0] font-semibold hover:text-black`}
//             >
//                 <FileText className="mr-2 h-5 w-5" />
//                 View Document
//             </a>
//             <button className=' block mt-4' onClick={() => {
//                 if (viewComments) {
//                     setViewComments(false)
//                 } else { setViewComments(true) }
//             }}>
//                 <h1 className={`text-[20px] text-[${color}] font-bold `}>
//                     <span style={textStyle}> Comments </span>
//                     <span className=' '>
//                         <i className={`fa-solid fa-arrow-turn-down transition-all duration-700 transform ${viewComments ? "rotate-180" : "rotate-0"}`}></i>
//                     </span>
//                 </h1>
//             </button>
//             <div className={` py-${viewComments ? "3" : "0"} mt-[15px] flex flex-col gap-12 transition-all duration-700 overflow-hidden overflow-y-auto ${viewComments ? "h-[400px]" : "h-0"} border border-green-600 `}>
//                 <div className={` ${comments.length <= 0 ? "show" : "hidden"} w-full p-4 bg-[#ffffff69] rounded-[15px] shadow-md border border-[#0000001c]`}>
//                     <h1 className='font-medium text-[18px] text-[#0000009a] text-center'>THERE IS NO COMMENTS YET</h1>
//                 </div>
//                 <div className=' w-[1230px]'>
//                     <InputAddComment color={color} onClickFunction={handleOnClick} inputValue={inputValueTextComment} onChangeFunction={handleOnChangeFunction} onClickFunctionCancel={handleOnClickCancel}/>
//                 </div>
//                 {comments && comments.length > 0 && comments.map(comment => {
//                     return (<>
//                         <CommentUser fullName={comment.nombreUsuario} text={comment.texto} date={comment.fecha} color={color} commentId={comment.id} userIdFromComment={comment.userId} reRenderAux={reRenderAxiosGetComments}/>
//                     </>)
//                 })}
//             </div>
//         </div>
//     )
// }

// export default CardPostsSubject



import { Archive, CalendarDays, FileText } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CommentUser from './CommentUser';
import InputAddComment from './InputAddComment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { hiddenPopUpAction, showPopUpAction } from '../redux/actions/popUpMessageAction';
import store from '../redux/store';
import { falseAuxAction, truAuxAction } from '../redux/actions/auxAction';
import InputAddAnswer from './InputAddAnswer';
import SendButton from "../assets/sendbutton.png"
import { use } from 'react';

function CardPostsSubject({ color, title, description, date, file, contentId }) {


    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');

    const [comments, setComments] = useState([])
    const [answers, setAnswers] = useState([])


    const [viewComments, setViewComments] = useState(false)
    const [aux, setAux] = useState(false)
    const [inputValueTextComment, setInputValueTextComment] = useState("")
    const [inputValueTextAnswer, setInputValueTextAnswer] = useState("")

    const [viewAnswers, setViewAnswers] = useState(false)

    const [showInputAnswer, setShowInputAnswer] = useState(false)


    const [reRenderAxiosGetComments, setReRenderAxiosGetComments] = useState(false)

    const [commentId, setCommentId] = useState(0)

    const dispatch = useDispatch()
    const dispatchAux = useDispatch()
    let auxGlobal = useSelector(store => store.auxReducer)

    function showPopUpFunction(data) {
        dispatch(showPopUpAction(data))
        setTimeout(() => {
            dispatch(hiddenPopUpAction())
        }, 3000) // 3 segundos
    }


    //------------------------------------------------------------------------------------------------------------------
    const handleOnClickCreateComment = async (event) => {
        event.preventDefault()

        let bodyCreateComment = {
            idContenido: contentId,
            texto: inputValueTextComment,
        }
        axios.post("http://localhost:8080/api/comentario/create", bodyCreateComment, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                if (aux) {
                    setAux(false)
                } else { setAux(true) }

                if (reRenderAxiosGetComments) {
                    setReRenderAxiosGetComments(false)
                } else { setReRenderAxiosGetComments(true) }

                setInputValueTextComment("")

                console.log(auxGlobal.isAux)
                if (auxGlobal.isAux) {
                    dispatchAux(falseAuxAction())
                } else { dispatchAux(truAuxAction(response.data)) }

                showPopUpFunction(response.data)

            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleOnClickCancelComment = () => {
        setInputValueTextComment("")
    }

    const handleOnChangeFunctionComment = (e) => {
        setInputValueTextComment(e.target.value)
    }
    //------------------------------------------------------------------------------------------------------------------





    //------------------------------------------------------------------------------------------------------------------
    const handleOnClickCreateAnswer = async (event) => {
        event.preventDefault()

        let bodyCreateAnswer = {
            idComentario: contentId,
            idUsuario: inputValueTextComment,
            texto: inputValueTextAnswer
        }
        axios.post("http://localhost:8080/api/respuesta/create", bodyCreateAnswer, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                if (aux) {
                    setAux(false)
                } else { setAux(true) }
                setInputValueTextAnswer("")
                showPopUpFunction(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleOnClickCancelAnswer = () => {
        setInputValueTextAnswer("")
    }

    const handleOnChangeFunctionAnswer = (e) => {
        setInputValueTextAnswer(e.target.value)
    }
    //------------------------------------------------------------------------------------------------------------------



    useEffect(() => {
        console.log(comments)
    }, [])
    const dateDate = date && date.slice(0, 10);
    const dateHour = date && date.slice(11, 16);
    const divStyle = {
        boxShadow: `0px 5px 8px ${color}`
    }
    const textStyle = {
        textShadow: `0px 0px 1px ${color}`
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/api/contenido/${contentId}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setComments(response.data.comentarios)
                setAnswers(response.data.comentarios.respuestas)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [aux])


    return (
        <div className="w-[1300px] rounded-lg bg-[#f3f2f2] p-6 shadow-md" style={divStyle}>
            <h1 className={`mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white bg-[${color}] rounded-[15px] p-2`}>{title}</h1>
            <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CalendarDays className="mr-2 h-4 w-4" />
                <time >{dateDate} | {dateHour}</time>
            </div>
            <p className="mb-6 text-base text-gray-700 dark:text-gray-300">
                {description}
            </p>
            <a
                href={`${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center rounded-lg bg-[${color}] px-4 py-2 text-center text-sm  text-[#000000c0] font-semibold hover:text-black`}
            >
                <FileText className="mr-2 h-5 w-5" />
                View Document
            </a>
            <button className=' block mt-4' onClick={() => {
                if (viewComments) {
                    setViewComments(false)
                } else { setViewComments(true) }
            }}>
                <h1 className={`text-[20px] text-[${color}] font-bold `}>
                    <span style={textStyle}> Comments </span>
                    <span className=' '>
                        <i className={`fa-solid fa-arrow-turn-down transition-all duration-700 transform ${viewComments ? "rotate-180" : "rotate-0"}`}></i>
                    </span>
                </h1>
            </button>
            <div className={` py-${viewComments ? "3" : "0"} mt-[15px] flex flex-col gap-12 transition-all duration-700 overflow-hidden overflow-y-auto ${viewComments ? "h-[400px]" : "h-0"} border border-green-600 `}>
                <div className={` ${comments.length <= 0 ? "show" : "hidden"} w-full p-4 bg-[#ffffff69] rounded-[15px] shadow-md border border-[#0000001c]`}>
                    <h1 className='font-medium text-[18px] text-[#0000009a] text-center'>THERE IS NO COMMENTS YET</h1>
                </div>
                <div className=' w-[1230px]'>
                    <InputAddComment color={color} onClickFunction={handleOnClickCreateComment} inputValue={inputValueTextComment} onChangeFunction={handleOnChangeFunctionComment} onClickFunctionCancel={handleOnClickCancelComment} />
                </div>
                {comments && comments.length > 0 && comments.map(comment => {
                    return (
                        <>
                            {/* <CommentUser fullName={comment.nombreUsuario} text={comment.texto} date={comment.fecha} color={color} commentId={comment.id} userIdFromComment={comment.userId} reRenderAux={reRenderAxiosGetComments}/> */}



                            {/* ---------------------------------------------------------------------------CARD COMENTARIO--------------------------------------------------------------------  */}
                            <div>
                                <div className='w-[1230px] p-4 bg-[#ffffff69] rounded-[30px] shadow-md'>
                                    <div className='  flex flex-row'>
                                        <div className=''>
                                            <div className='w-[60px] h-[60px] rounded-full border border-black'>
                                                <img src="" alt="" />
                                            </div>
                                        </div>
                                        <div className='pl-4 '>
                                            <h1 className='text-[25px] font-semibold text-gray-800'> {comment.nombreUsuario} </h1>
                                            {/* <small className='text-muted-foreground '>20-12-2024 | 13:31</small> */}
                                            <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <time > {comment.fecha.slice(0, 10)} | {comment.fecha.slice(11, 16)} </time>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h1> ID del comentario {comment.id} </h1>
                                    </div>
                                    <p className='text-[17px] font-light'> {comment.texto} </p>



                                    <button className={`block mt-4 `} onClick={() => {
                                        if (viewAnswers) {
                                            setViewAnswers(false)
                                        } else { setViewAnswers(true) }
                                    }}>
                                        <h1 className={`text-[16px] text-[${`color`}] font-bold `}>
                                            <span className=' font-semibold'> Answer </span>
                                            <span className=' '>
                                                <i className={`fa-solid fa-arrow-turn-down transition-all duration-700 transform ${viewAnswers ? "rotate-180" : "rotate-0"}`}></i>
                                            </span>
                                        </h1>
                                    </button>

                                    <div className={`${viewAnswers ? `h-[${answers && answers.length > 0 && answers.length * 400}px]` : "h-0 "} pl-4 py-${viewAnswers ? "3" : "0"} mt-2 flex flex-col gap-8 transition-all duration-700 overflow-hidden border border-black`}>
                                        <div className='w-[1100px]' id='textBoxMessage'>
                                            {/* <InputAddAnswer color={color} commentId={comment.id} userIdFromComment={comment.userId} userName={comment.nombreUsuario} onClickFunction={handleOnClickCreateAnswer} onChangeFunction={handleOnChangeFunctionAnswer}
                                                valueInput={inputValueTextAnswer} onClickCancelFunction={handleOnClickCancelAnswer} /> */}


                                            {/* ---------------------------------------------------------------------------INPUT ANSWER--------------------------------------------------------------------  */}
                                            <div>
                                                <div className=' rounded-[20px] shadow-md border border-[#00000025]'>
                                                    <div className='flex flex-row justify-between'>
                                                        <div className=' w-[8%] flex flex-row justify-center items-center '>
                                                            <div className='w-[72px] h-[72px] rounded-full border border-black'>
                                                                <img src="" alt="" />
                                                            </div>
                                                        </div>

                                                        <div className='w-[95%] flex flex-col items-center '>
                                                            <div className=' w-full flex flex-row p-2 justify-around '>
                                                                <div>

                                                                    <div className=' flex flex-row'>
                                                                        <label htmlFor="" className='flex flex-row justify-center items-center px-2  border-b border-[#00000071]'>
                                                                            <span className=' font-semibold text-[#0000ffc0]'> <i className="fa-brands fa-threads"></i>{comment.nombreUsuario} </span>
                                                                        </label>
                                                                        <input className={`h-[50px] w-[750px] text-pretty font-light pr-2 bg-transparent border-b border-[#00000071] focus:border-[${color}] focus:outline-none transition-colors peer`}
                                                                            type="text" placeholder='Add answer...' value={inputValueTextAnswer} onChange={(e) => {
                                                                                setInputValueTextAnswer(e.target.value)
                                                                            }} />
                                                                    </div>

                                                                    <div className='flex flex-row justify-end pr-3'>
                                                                        <button onClick={() => {
                                                                            setInputValueTextAnswer("")
                                                                        }}>
                                                                            <h1 className='text-[15px] font-bold text-[#ff0000af]'>CANCEL</h1>
                                                                        </button>
                                                                    </div>

                                                                </div>

                                                                <button onClick={() => {console.log("Id del comentario es: " + comment.id)}}>
                                                                    <div className={` rounded-full bg-[${color}] p-[1px]`}>
                                                                        <img src={SendButton} alt="" className='w-[50px] h-[50px] transition-all duration-300 hover:translate-x-1' />
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* ---------------------------------------------------------------------------INPUT ANSWER--------------------------------------------------------------------  */}



                                        </div>
                                        {comment.respuestas.map(answer => {
                                            return (<>
                                                {/* <AnswerCommentUser fullName={answer.nombreUsuario} date={answer.fecha} text={answer.texto} receptorFullName={answer.respuestaPara} /> */}


                                                <div>
                                                    <div>
                                                        <div className='w-[1100px] p-4 bg-[#ffffff69] rounded-[30px] shadow-md'>
                                                            <div className='  flex flex-row'>
                                                                <div className=''>
                                                                    <div className='w-[50px] h-[50px] rounded-full border border-black'>
                                                                        <img src="" alt="" />
                                                                    </div>
                                                                </div>
                                                                <div className='pl-4 '>
                                                                    <h1 className='text-[18px] font-semibold text-gray-800'> {answer.nombreUsuario} </h1>
                                                                    {/* <small className='text-muted-foreground '>20-12-2024 | 13:31</small> */}
                                                                    <div className="mb-4 flex items-center text-[14px] text-gray-500 dark:text-gray-400">
                                                                        <time > {answer.fecha.slice(0, 10)} | {answer.fecha.slice(11, 16)} </time>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className='text-[15px] font-light'> <span className=' font-semibold text-[#0000ffc0]'> <i className="fa-brands fa-threads"></i>{answer.respuestaPara} </span>
                                                                {answer.texto}
                                                            </p>
                                                            <div className='w-full flex flex-row justify-end'>
                                                                <button onClick={() => {
                                                                    if (showInputAnswer) {
                                                                        setShowInputAnswer(false)
                                                                    } else { setShowInputAnswer(true) }
                                                                }}>
                                                                    <h1 className='text-[14px] font-semibold'>REPLY</h1>
                                                                </button>
                                                            </div>
                                                            <div className={`border border-black transition-all transform duration-500 ${showInputAnswer ? "h-[100px]" : "h-[0px]"} overflow-auto`}>
                                                                <h1>Hola</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </>)
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* ---------------------------------------------------------------------------CARD COMENTARIO--------------------------------------------------------------------  */}








                        </>)
                })}
            </div>
        </div>
    )
}

export default CardPostsSubject