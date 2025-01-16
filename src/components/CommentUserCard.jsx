import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InputAddAnswer from './InputAddAnswer';
import AnswerUser from './AnswerUser';

function CommentUserCard({ date, text, fullName, color, commentId, userIdFromComment, profileImgFromUserComment }) {

    const dateDate = date && date.slice(0, 10);
    const dateHour = date && date.slice(11, 16);

    const [viewAnswers, setViewAnswers] = useState(false)

    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))

    const [valueInputText, setValueInputText] = useState(text)
    const [showEditInputText, setShowEditInputText] = useState(false)
    const [isDisabledTextArea, setIsDisabledTextArea] = useState(true)

    const [popUpEditComment, setPopUpEditComment] = useState(false)
    const [isDisabledButtons, setIsDisabledButtons] = useState(true)


    return (
        <div>
            <div className='w-[1220px] p-4 bg-[#ffffff69] rounded-[30px] shadow-md border border-[#0000001f]'>
                <div className=' relative  flex flex-row border border-black'>

                    <div className={` ${userInformationLocalStorage.id == userIdFromComment ? "show" : "hidden"} absolute top-0 right-0`}>
                        <button onClick={() => {
                            setPopUpEditComment(true)
                            setIsDisabledButtons(false)
                            if (popUpEditComment) {
                                setPopUpEditComment(false)
                                setIsDisabledButtons(true)
                            }}}>
                          <i className="fa-solid fa-ellipsis-vertical text-[35px] p-2"></i>
                        </button>

                        <div className={`absolute left-[-90px] top-[45px] flex flex-col items-start gap-2 rounded-[15px] bg-gray-200 border border-gray-300 shadow-md 
                        transition-all duration-500 transform ${popUpEditComment ? "opacity-100 scale-100 z-20" : "opacity-0 scale-90 z-0"}`}>

                            <button disabled={isDisabledButtons} className=' w-full text-start p-2 rounded-t-[15px] hover:bg-gray-300 ' onClick={() => {
                                setIsDisabledButtons(true)
                                setPopUpEditComment(false)
                                setShowEditInputText(true)
                                setIsDisabledTextArea(false)
                            }}>
                                <h1 className=' font-semibold text-[20px]'> <i className="fa-solid fa-pen"></i> Edit </h1>
                            </button>

                            <button disabled={isDisabledButtons} className=' w-full text-start p-2 rounded-b-[15px] hover:bg-gray-300 '>
                                <h1 className=' font-semibold text-[20px]'> <i className="fa-solid fa-trash-can"></i> Delete </h1>
                            </button>
                        </div>
                        

                    </div>

                    <div className=''>
                        <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
                            <img src={profileImgFromUserComment} alt="" />
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
                {/* <p className='text-[17px] font-light'> {text} </p> */}

                <div>
                    <textarea disabled={isDisabledTextArea} className={`w-full ${showEditInputText ? "border border-black bg-gray-300 rounded-[5px]" : "bg-transparent"} p-2 focus:outline-none focus:border-none`} 
                    name="" id="" value={valueInputText} onChange={(e) => {setValueInputText(e.target.value)}}></textarea>

                    <div className={` ${showEditInputText ? "show" : "hidden"} ml-2 flex flex-row gap-3 justify-end text-3xl`}>
                        <button onClick={() => {
                            setValueInputText(text)
                            setShowEditInputText(false)
                            setIsDisabledTextArea(true)
                        }}>
                            <i class="fa-solid fa-circle-xmark text-red-500"></i>
                        </button>
                        <button onClick={() => {
                            const upDateBody = {
                                idMateria: id,
                                nombre: "",
                                descripcion: "",
                                portada: valueUrl
                            }
                            editSubjectBanner(upDateBody)
                        }}>
                            <i class="fa-solid fa-circle-check text-green-500"></i>
                        </button>
                    </div>

                </div>



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