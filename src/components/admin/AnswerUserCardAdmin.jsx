import React, { useEffect, useState } from 'react'
import LoadingView from '../LoadingView';
import ConfirmationPopUpAlert from '../ConfirmationPopUpAlert';
import axios from 'axios';
import { CalendarDays } from 'lucide-react';

function AnswerUserCardAdmin({ answerId }) {


    const token = localStorage.getItem("userToken");
    let tokenSinComillas = token.replace(/"/g, "");

    const [answer, setAnswer] = useState({})

    const [dateDate, setDateDate] = useState("")
    const [dateHour, setDateHour] = useState("")

    const [viewConfirmationComponent, setViewConfirmationComponent] = useState(false);
    const [viewLoadingComponent, setViewLoadingComponent] = useState(false)

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/respuesta/admin/${answerId}`, {
                headers: {
                    Authorization: `Bearer ${tokenSinComillas}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setAnswer(response.data);

                const auxDateDate = response.data.fecha.slice(0, 10);
                setDateDate(auxDateDate)
                const auxDateHour = response.data.fecha.slice(11, 16);
                setDateHour(auxDateHour)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    const handleOnConfirmFuntionPopUpComponent = () => {
        setViewConfirmationComponent(false)
        setViewLoadingComponent(true);
        if (answer && answer.asset) {
            axios
                .delete(`http://localhost:8080/api/respuesta/adminDesactivar/${answerId}`, {
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
                    `http://localhost:8080/api/respuesta/adminActivar/${answerId}`,
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
                message={` ${answer && answer.asset
                    ? "Do you want to disable this answer?"
                    : "Do you want to enable this answer?"
                    } `}
            />
            {/* ------------------------------------------------------------CONFIRMATION COMPONENT------------------------------------------------------------ */}

            <div className=' relative bg-slate-100 p-1 rounded-[10px] border border-slate-300 shadow-md'>

                <div className=' relative flex flex-row gap-4'>
                    <div className='w-[45px] h-[45px] lg:w-[65px] lg:h-[65px] rounded-full overflow-hidden'>
                        <img src={answer.profileImgFromUserAnswer} alt="" />
                    </div>

                    <div>
                        <div>
                            <h1 className='text-[15px] lg:text-[20px] font-semibold'> {answer.nombreUsuario} </h1>
                        </div>
                        <div className="mb-4 flex items-center text-[12px] mt-[15px] lg:text-sm text-gray-500 dark:text-gray-400">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            <time >{dateDate} | {dateHour}</time>
                        </div>
                    </div>

                    <div className=' absolute top-0 right-0 p-2'>
                        <div className={` ${answer.asset == true ? "show" : "hidden"} w-full flex flex-row justify-center`}>
                            <button onClick={() => setViewConfirmationComponent(true)}>
                                <i className="fa-solid fa-trash-can text-[20px] lg:text-[25px] text-[#ff0000c9] shadow-sm"></i>
                            </button>
                        </div>

                        <div className={`${answer.asset == false ? "show" : "hidden"} w-full flex flex-row justify-center`}>
                            <button onClick={() => setViewConfirmationComponent(true)}>
                                <i className="fa-solid fa-trash-can-arrow-up text-[25px] lg:text-[30px] text-[#008000e5] shadow-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <textarea name="" id="" className='w-full h-[70px] lg:h-[100px] bg-slate-200 p-1 rounded-[10px] text-[14px] lg:text-[16px] focus:outline-none focus:border-transparent' value={answer.texto}></textarea>

            </div>
        </div>
    )
}

export default AnswerUserCardAdmin