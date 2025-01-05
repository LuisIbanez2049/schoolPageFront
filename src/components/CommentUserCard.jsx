import React, { useState } from 'react'

function CommentUserCard({ date, text, fullName, color, commentId }) {

    const dateDate = date && date.slice(0, 10);
    const dateHour = date && date.slice(11, 16);

    const [viewAnswers, setViewAnswers] = useState(false)

    return (
        <div>
            <div className='w-[1230px] p-4 bg-[#ffffff69] rounded-[30px] shadow-md'>
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
                        <span className=' font-semibold'> Answer </span>
                        <span className=' '>
                            <i className={`fa-solid fa-arrow-turn-down transition-all duration-700 transform ${viewAnswers ? "rotate-180" : "rotate-0"}`}></i>
                        </span>
                    </h1>
                </button>

                {/* <div className={`${viewAnswers ? `h-[${answers && answers.length > 0 && answers.length * 400}px]` : "h-0 "} pl-4 py-${viewAnswers ? "3" : "0"} mt-2 flex flex-col gap-8 transition-all duration-700 overflow-hidden border border-black`}>
                    <div className='w-[1100px]' id='textBoxMessage'>
                        <InputAddAnswer color={color} commentId={commentId} userIdFromComment={userIdFromComment} userName={fullName} onClickFunction={handleAnswer} onChangeFunction={handleOnChange}
                            valueInput={valueInput} onClickCancelFunction={handleOnClickCancel} />
                    </div>
                    {answers && answers.length > 0 && answers.map(answer => {
                        return (<>
                            <AnswerCommentUser fullName={answer.nombreUsuario} date={answer.fecha} text={answer.texto} receptorFullName={answer.respuestaPara} />
                        </>)
                    })}
                </div> */}
            </div>
        </div>
    )
}

export default CommentUserCard