import React, { useState } from 'react'
import InputAddAnswer from './InputAddAnswer';
import axios from 'axios';

function AnswerUserCard({ date, text, fullName, receptorFullName, answerUserId, color, commentId, profileImgFromUserAnswer }) {

    const dateDate = date && date.slice(0, 10);
    const dateHour = date && date.slice(11, 16);

    const [showInputAnswer, setShowInputAnswer] = useState(false)

    const [valueInput, setValueInput] = useState("")

    const handleAnswer = () => {
        const token = localStorage.getItem("userToken")
        let tokenSinComillas = token.replace(/"/g, '');
        console.log(tokenSinComillas)

        const bodyAnswer = {
            idComentario: commentId,
            idUsuario: answerUserId,
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
                setValueInput("")
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
                setShowInputAnswer(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleOnChange = (e) => {
        setValueInput(e.target.value)
    }
    const handleOnClickCancel = () => {
        setValueInput("")
        setShowInputAnswer(false)
    }

    return (
        <div>
            <div>
                <div className='w-[1150px] p-4 bg-[#ffffff69] rounded-[30px] shadow-md border border-[#00000015]'>
                    <div className='  flex flex-row'>
                        <div className=''>
                            <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                <img src={profileImgFromUserAnswer} alt="" />
                            </div>
                        </div>
                        <div className='pl-4 '>
                            <h1 className='text-[18px] font-semibold text-gray-800'> {fullName} </h1>
                            {/* <small className='text-muted-foreground '>20-12-2024 | 13:31</small> */}
                            <div className="mb-4 flex items-center text-[14px] text-gray-500 dark:text-gray-400">
                                <time > {dateDate} | {dateHour} </time>
                            </div>
                        </div>
                    </div>
                    <p className='text-[15px] font-light'> <span className=' font-semibold text-[#0000ffc0]'> <i className="fa-brands fa-threads"></i>{receptorFullName} </span>
                        {text}
                    </p>
                    <div className='w-full flex flex-row justify-end'>
                        <button onClick={() => {
                            if (showInputAnswer) {
                                setShowInputAnswer(false)
                            } else { setShowInputAnswer(true) }
                        }}>
                            <h1 className='text-[14px] font-semibold'>REPLY</h1>
                        </button>
                    </div>
                    <div className={` transition-all transform duration-500 ${showInputAnswer ? "h-[100px]" : "h-[0px]"} overflow-hidden`}>
                        <InputAddAnswer color={color} commentId={commentId} userName={fullName} onClickFunction={handleAnswer} onChangeFunction={handleOnChange}
                            valueInput={valueInput} onClickCancelFunction={handleOnClickCancel} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnswerUserCard
