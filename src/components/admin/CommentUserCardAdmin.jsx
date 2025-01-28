import axios from 'axios';
import { CalendarDays } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import ConfirmationPopUpAlert from '../ConfirmationPopUpAlert';
import LoadingView from '../LoadingView';
import AnswerUserCardAdmin from './AnswerUserCardAdmin';

function CommentUserCardAdmin({ commentId }) {

    const token = localStorage.getItem("userToken");
    let tokenSinComillas = token.replace(/"/g, "");

    const [comment, setComment] = useState({})
    const [answers, setAnswers] = useState([])

    const [dateDate, setDateDate] = useState("")
    const [dateHour, setDateHour] = useState("")

    const [viewConfirmationComponent, setViewConfirmationComponent] = useState(false);
    const [viewLoadingComponent, setViewLoadingComponent] = useState(false)

    const [selectValue, setselectValue] = useState("all")
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
                console.log(response.data);
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

                <h1>Hola</h1>

                <div className='flex flex-row justify-end'>
                    <div className='w-[98%] flex flex-col p-3 gap-8 border border-black'>
                        {answers && answers.length > 0 && answers.map(answer => {
                            return (<>
                                <AnswerUserCardAdmin answerId={answer.id} />
                            </>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentUserCardAdmin