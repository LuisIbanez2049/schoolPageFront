import React, { useEffect, useState } from 'react'
import AnswerCommentUser from './AnswerCommentUser'

function CommentUser({ date, text, fullName, arrayAnswers }) {

    const [answers, setAnswers] = useState(arrayAnswers && arrayAnswers)

    useEffect(() => {
        console.log(answers)
    }, [])

    const dateDate = date && date.slice(0, 10);
    const dateHour = date && date.slice(11, 16);

    const [viewAnswers, setViewAnswers] = useState(false)
    return (
        <div>
            <div className='w-[1000px] p-4 bg-[#ffffff69] rounded-[30px] shadow-md'>
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
                <p className='text-[17px] font-light'> {text} </p>

                <button className={`block mt-4 ${answers.length<=0 ? "hidden" : "show"}`} onClick={() => {
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

                <div className={`pl-4 mt-2 flex flex-col gap-12 transition-all duration-700 overflow-hidden overflow-y-auto ${viewAnswers ? "h-[400px]" : "h-0 "} `}>
                    {answers && answers.length > 0 && answers.map(answer => {
                        return (<>
                            <AnswerCommentUser fullName={answer.nombreUsuario} date={answer.fecha} text={answer.texto} />
                        </>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommentUser