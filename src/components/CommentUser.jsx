import React, { useEffect, useState } from 'react'
import AnswerCommentUser from './AnswerCommentUser'
import InputAddAnswer from './InputAddAnswer'
import axios from 'axios'

function CommentUser({ date, text, fullName, arrayAnswers, color, commentId, userIdFromComment}) {

    const [answers, setAnswers] = useState(arrayAnswers && arrayAnswers)

    useEffect(() => {
        console.log(answers)
    }, [])

    const dateDate = date && date.slice(0, 10);
    const dateHour = date && date.slice(11, 16);

    const [viewAnswers, setViewAnswers] = useState(false)

    const [valueInput, setValueInput] = useState("")

    const handleAnswer = () => {
        const token = localStorage.getItem("userToken")
        let tokenSinComillas = token.replace(/"/g, '');
        console.log(tokenSinComillas)

        const bodyAnswer = {
            idComentario: commentId,
            idUsuario: userIdFromComment,
            texto: valueInput,
        }
        console.log(bodyAnswer)
        axios.post("http://localhost:8080/api/respuesta/create", bodyAnswer, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleOnChange = (e) => {
    setValueInput(e.target.value)
    }


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

                <div className={`pl-4 mt-2 flex flex-col gap-8 transition-all duration-700 overflow-hidden  ${viewAnswers ? `h-[${answers && answers.length > 0 && answers.length * 230}px]` : "h-0 "} border border-black`}>
                    <div className='w-[1100px]'>
                     <InputAddAnswer color={color} commentId={commentId} userIdFromComment={userIdFromComment} userName={fullName} onClickFunction={handleAnswer} onChangeFunction={handleOnChange} valueInput={valueInput}/>
                    </div>
                    {answers && answers.length > 0 && answers.map(answer => {
                        return (<>
                            <AnswerCommentUser fullName={answer.nombreUsuario} date={answer.fecha} text={answer.texto} receptorFullName={answer.respuestaPara}/>
                        </>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommentUser