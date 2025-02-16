import axios from 'axios';
import { CalendarDays } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import ConfirmationPopUpAlert from '../ConfirmationPopUpAlert';
import LoadingView from '../LoadingView';
import AnswerUserCardAdmin from './AnswerUserCardAdmin';

function CommentUserCardAdmin({ commentId, viewMoreDetailsCommentBoolean }) {

    const token = localStorage.getItem("userToken");
    let tokenSinComillas = token.replace(/"/g, "");

    const [comment, setComment] = useState({})
    const [answers, setAnswers] = useState([])

    const [dateDate, setDateDate] = useState("")
    const [dateHour, setDateHour] = useState("")

    const [viewConfirmationComponent, setViewConfirmationComponent] = useState(false);
    const [viewLoadingComponent, setViewLoadingComponent] = useState(false)

    const [viewAnswers, setViewAnswers] = useState(false)

    const [availableAnswers, setAvailableAnswers] = useState([])
    const [disabledAnswers, setDisabledAnswers] = useState([])
    const [selectValue, setSelectValue] = useState("allAnswers")
    const [viewAllAnswers, setViewAllAnswers] = useState(true)
    const [viewAvailableAnswers, setViewAvailableAnswers] = useState(false)
    const [viewDisabledAnswers, setViewDisabledAnswers] = useState(false)



    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/comentario/admin/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${tokenSinComillas}`,
                },
            })
            .then((response) => {
                // console.log(response.data);
                setComment(response.data);

                const auxDateDate = response.data.fecha.slice(0, 10);
                setDateDate(auxDateDate)
                const auxDateHour = response.data.fecha.slice(11, 16);
                setDateHour(auxDateHour)

                setAnswers(response.data.respuestas)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    const handleOnConfirmFuntionPopUpComponent = () => {
        setViewConfirmationComponent(false)
        setViewLoadingComponent(true);
        if (comment && comment.asset) {
            axios
                .delete(`http://localhost:8080/api/comentario/adminDesactivar/${commentId}`, {
                    headers: {
                        Authorization: `Bearer ${tokenSinComillas}`,
                    },
                })
                .then((response) => {
                    setViewLoadingComponent(false);
                    console.log(response.data);
                    //------------------------------------------------
                    window.location.reload();
                    //------------------------------------------------
                })
                .catch((error) => {
                    setViewLoadingComponent(false);
                    console.log(error);
                });
        } else {
            axios
                .patch(
                    `http://localhost:8080/api/comentario/adminActivar/${commentId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${tokenSinComillas}`,
                        },
                    }
                )
                .then((response) => {
                    setViewLoadingComponent(false);
                    console.log(response.data);
                    //------------------------------------------------
                    window.location.reload();
                    //------------------------------------------------
                })
                .catch((error) => {
                    setViewLoadingComponent(false);
                    console.log(error);
                });
        }
    };

    const handleOnCancelFuntionPopUpComponent = () => {
        setViewConfirmationComponent(false);
    };

    useEffect(() => {
        let auxAvailbaleAnswers = answers && answers.filter(answer => answer.asset === true)
        setAvailableAnswers(auxAvailbaleAnswers)

        let auxDisableAnswers = answers && answers.filter(answer => answer.asset === false)
        setDisabledAnswers(auxDisableAnswers)
    }, [answers])

    useEffect(() => {
        if (selectValue == "allAnswers") {
            setViewAllAnswers(true)
            setViewAvailableAnswers(false)
            setViewDisabledAnswers(false)
        } else if (selectValue == "availableAnswers") {
            setViewAllAnswers(false)
            setViewAvailableAnswers(true)
            setViewDisabledAnswers(false)
        } else {
            setViewAllAnswers(false)
            setViewAvailableAnswers(false)
            setViewDisabledAnswers(true)
        }
    }, [selectValue, answers])




    return (
        <div>

            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <LoadingView show={viewLoadingComponent} />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}

            {/* ------------------------------------------------------------CONFIRMATION COMPONENT------------------------------------------------------------ */}
            <ConfirmationPopUpAlert
                isShow={viewConfirmationComponent}
                handleOnConfirmFunction={handleOnConfirmFuntionPopUpComponent}
                handleOnCancelFunction={handleOnCancelFuntionPopUpComponent}
                message={` ${comment && comment.asset
                    ? "Do you want to disable this comment?"
                    : "Do you want to enable this comment?"
                    } `}
            />
            {/* ------------------------------------------------------------CONFIRMATION COMPONENT------------------------------------------------------------ */}

            <div className=' relative bg-slate-100 p-1 rounded-[10px] border border-slate-300 shadow-md'>

                <div className=' relative flex flex-row gap-4'>
                    <div className='w-[45px] h-[45px] lg:w-[65px] lg:h-[65px] rounded-full overflow-hidden'>
                        <img src={comment.profileImgFromUserComment} alt="" />
                    </div>

                    <div>
                        <div>
                            <h1 className='text-[15px] lg:text-[20px] font-semibold'> {comment.nombreUsuario} </h1>
                        </div>
                        <div className="mb-4 flex items-center text-[12px] mt-[15px] lg:text-sm text-gray-500 dark:text-gray-400">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            <time >{dateDate} | {dateHour}</time>
                        </div>

                        <div className={`${viewMoreDetailsCommentBoolean ? "show" : "hidden"}`}>
                            <small>Subject: {comment.nombreDeMateria} || Content: {comment.nombreContenido}</small>
                        </div>
                    </div>

                    <div className=' absolute top-0 right-0 p-2'>
                        <div className={` ${comment.asset == true ? "show" : "hidden"} w-full flex flex-row justify-center`}>
                            <button onClick={() => setViewConfirmationComponent(true)}>
                                <i className="fa-solid fa-trash-can text-[20px] lg:text-[25px] text-[#ff0000c9] shadow-sm"></i>
                            </button>
                        </div>

                        <div className={`${comment.asset == false ? "show" : "hidden"} w-full flex flex-row justify-center`}>
                            <button onClick={() => setViewConfirmationComponent(true)}>
                                <i className="fa-solid fa-trash-can-arrow-up text-[25px] lg:text-[30px] text-[#008000e5] shadow-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <textarea name="" id="" className='w-full h-[70px] lg:h-[100px] bg-slate-200 p-1 rounded-[10px] text-[14px] lg:text-[16px] focus:outline-none focus:border-transparent' value={comment.texto}></textarea>



                <button className={`block mt-1 lg:mt-4 `} onClick={() => {
                    if (viewAnswers) {
                        setViewAnswers(false)
                    } else { setViewAnswers(true) }
                }}>
                    <h1 className={`text-[13px] lg:text-[16px] text-[${`color`}] font-bold `}>
                        <span className=' font-semibold'> Answers </span>
                        <span className=' '>
                            <i className={`fa-solid fa-arrow-turn-down transition-all duration-700 transform ${viewAnswers ? "rotate-180" : "rotate-0"}`}></i>
                        </span>
                    </h1>
                </button>


                <div className={` ${viewAnswers ? "show" : "hidden"} mt-[30px] pl-4 lg:pl-8`}>

                    <div className=' bg-slate-300 px-2 py-4 rounded-[10px]'>
                        <div className='mb-[30px]'>
                            <select name="opciones" className='bg-slate-100 p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] text-[14px] lg:text-[16px] shadow-sm' onChange={(e) => {
                                setSelectValue(e.target.value)
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
                                        <AnswerUserCardAdmin answerId={answer.id} />
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
                                        <AnswerUserCardAdmin answerId={answer.id} />
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
                                        <AnswerUserCardAdmin answerId={answer.id} />
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







            </div>
        </div>
    )
}

export default CommentUserCardAdmin