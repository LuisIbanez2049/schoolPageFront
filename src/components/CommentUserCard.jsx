import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InputAddAnswer from './InputAddAnswer';
import AnswerUser from './AnswerUser';

function CommentUserCard({ date, text, fullName, color, commentId, userIdFromComment }) {

    const dateDate = date && date.slice(0, 10);
    const dateHour = date && date.slice(11, 16);

    const [viewAnswers, setViewAnswers] = useState(false)

    return (
        <div>
            <div className='w-[1220px] p-4 bg-[#ffffff69] rounded-[30px] shadow-md border border-[#0000001f]'>
                <div className='  flex flex-row'>
                    <div className=''>
                        <div className='w-[60px] h-[60px] rounded-full border border-black'>
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div className='pl-4 '>
                        <h1 className='text-[25px] font-semibold text-gray-800'> {fullName} </h1>
                        {/* <small className='text-muted-foreground '>20-12-2024 | 13:31</small> */}
                        <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <time > {dateDate} | {dateHour} </time>
                        </div>
                    </div>
                </div>
                <div>
                    <h1> ID del comentario {commentId} </h1>
                </div>
                <p className='text-[17px] font-light'> {text} </p>



                <button className={`block mt-4 `} onClick={() => {
                    if (viewAnswers) {
                        setViewAnswers(false)
                    } else { setViewAnswers(true) }
                }}>
                    <h1 className={`text-[16px] text-[${`color`}] font-bold `}>
                        <span className=' font-semibold'> Answers </span>
                        <span className=' '>
                            <i className={`fa-solid fa-arrow-turn-down transition-all duration-700 transform ${viewAnswers ? "rotate-180" : "rotate-0"}`}></i>
                        </span>
                    </h1>
                </button>

                <div className={`py-${viewAnswers ? "3" : "0"} mt-[15px] flex flex-col gap-12 transition-all duration-700 overflow-hidden overflow-y-auto ${viewAnswers ? "h-auto" : "h-0"}`}>

                    <AnswerUser color={color} commentId={commentId} userIdFromComment={userIdFromComment} fullName={fullName} />

                </div>
            </div>
        </div>
    )
}

export default CommentUserCard