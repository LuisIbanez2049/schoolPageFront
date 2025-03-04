import React, { useState } from 'react'
import LoadingView from './LoadingView'
import axios from 'axios'


function NotificationCard({ name, message, timePassed, isSeen, userImg, subject, content, notificationId }) {

    const [seen, setSeen] = useState(isSeen)
    const [viewLoadingComponent, setViewLoadingComponent] = useState(false)
    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token && token.replace(/"/g, '');

    const handleOnMarkAnotificationAsViewed = () => {
        setViewLoadingComponent(true)
        axios.patch(`http://localhost:8080/api/notificacion/markAsViewed/${notificationId}`, {}, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setViewLoadingComponent(false)
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                console.log(error)
                setViewLoadingComponent(false)
            });
    }

    return (
        <div className={`relative w-full bg-slate-200 rounded-[10px] border border-slate-300 shadow-sm`}>

            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <LoadingView show={viewLoadingComponent} />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}

            <div className='flex flex-row '>
                <div className=' flex flex-row justify-center items-center border-l-4  border-black rounded-l-[10px] p-1'>
                    {/* <div className='border border-black w-[70px] h-[70px] rounded-full'></div> */}
                    <div className={`w-[70px] h-[70px] border border-slate-400  rounded-full`} style={{
                        // backgroundImage: `url('${userInformationLocalStorage && userInformationLocalStorage.userProfileImg}')`,
                        backgroundImage: `url('${userImg}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}></div>
                </div>
                <div className='p-2 w-full'>
                    <div className='flex flex-row justify-between gap-14'>
                        <h1 className=' font-semibold text-[17px]'>{name}</h1>
                        <div className='flex flex-row gap-2'>
                            <h1 className='text-[12px] pt-[5px] font-semibold text-slate-500 '>{timePassed}</h1>
                            <span className={`${isSeen ? "hidden" : "show"}`}><i className={`fa-solid fa-circle text-[11px] `}></i></span>
                        </div>
                    </div>

                    <div className='w-full flex flex-col'>
                        <textarea disabled={true} name="" id="" className='w-full bg-transparent text-slate-600 my-[10px] h-[80px]' value={message}></textarea>
                        <h1 className='text-[12px] pt-[5px] font-semibold text-slate-500 my-[3px]'>{subject + " - " + content}</h1>
                        <button className={`${isSeen ? "hidden" : "show"} w-full bg-black rounded-[8px]`} onClick={() => handleOnMarkAnotificationAsViewed()}>
                            <h1 className=' text-slate-200 p-2 text-[14px] font-bold'>MARK AS VIEWED</h1>
                        </button>

                        <h1 className={`${isSeen ? "show" : "hidden"} text-center p-2 border-2 border-slate-300 rounded-[8px] text-[14px] font-bold text-slate-500`}> NOTIFICATION ALREADY SEEN </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationCard