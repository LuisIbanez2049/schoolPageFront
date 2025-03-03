import React, { useState } from 'react'


function NotificationCard({ name, message, timePassed, isSeen, userImg, subject, content }) {

    const [seen, setSeen] = useState(isSeen)

    return (
        <div className={`relative w-full bg-slate-200 rounded-[10px] border border-slate-300 shadow-sm`}>
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
                            <span><i className={`fa-solid fa-circle text-[11px] ${isSeen ? "hidden" : "show"}`}></i></span>
                        </div>
                    </div>

                    <div className='w-full flex flex-col'>
                        <textarea disabled={true} name="" id="" className='w-full bg-transparent text-slate-600 my-[10px] h-[80px]' value={message}></textarea>
                        <h1 className='text-[12px] pt-[5px] font-semibold text-slate-500 my-[3px]'>{subject + " - " + content}</h1>
                        <button className={`${isSeen ? "hidden" : "show"} w-full bg-black rounded-[8px]`}>
                            <h1 className=' text-slate-100 p-1 '>Mark as viewed</h1>
                        </button>

                        <h1 className={`${isSeen ? "show" : "hidden"} text-center p-1 border border-slate-300 rounded-[8px] text-slate-500`}> Notification already seen </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationCard