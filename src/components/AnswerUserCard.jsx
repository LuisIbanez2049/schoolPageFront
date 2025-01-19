import React, { useState } from 'react'
import InputAddAnswer from './InputAddAnswer';
import axios from 'axios';

function AnswerUserCard({ answerId, date, text, fullName, receptorFullName, answerUserId, color, commentId, profileImgFromUserAnswer }) {

    const dateDate = date && date.slice(0, 10);
    const dateHour = date && date.slice(11, 16);

    const [showInputAnswer, setShowInputAnswer] = useState(false)

    const [valueInput, setValueInput] = useState("")
    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');
    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))


    const [valueInputText, setValueInputText] = useState(text)
    const [showEditInputText, setShowEditInputText] = useState(false) //----------false
    const [isDisabledTextArea, setIsDisabledTextArea] = useState(true)

    const [popUpEditComment, setPopUpEditComment] = useState(false)
    const [isDisabledButtons, setIsDisabledButtons] = useState(true)

    const [errorMesagge, setErrorMesagge] = useState("")
    const [showErrorMesaggePopUp, setShowErrorMesaggePopUp] = useState(false)

    const handleAnswer = () => {

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




    function editAnswer(body) {
        console.log(body)
        axios.patch(`http://localhost:8080/api/respuesta/modificar`, body, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setShowEditInputText(false)
                setIsDisabledTextArea(true)
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response.data)
                setErrorMesagge(error.response.data)
                showPopUpFunction()
            })
    }

    function showPopUpFunction() {
        setShowErrorMesaggePopUp(true)
        setTimeout(() => {
            setShowErrorMesaggePopUp(false)
            setErrorMesagge("")
        }, 2000) // 2 segundos
    }


    function deleteAnswer() {
        axios.delete(`http://localhost:8080/api/respuesta/authenticatedUserDesactivar/${answerId}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response.data)
            })
    }

    return (
        <div>
            <div>
                <div className='w-[1150px] p-4 bg-[#ffffff69] rounded-[30px] shadow-md border border-[#00000015]'>
                    <div className=' relative flex flex-row '>


                        {/* ----------------------------------------------------------- TRES PUNTITOS VERTICAL MAS EL CUADRO POPUP CON LOS BOTONES DELETE Y EDIT-------------------------------------- */}
                        <div className={` ${userInformationLocalStorage.id == answerUserId ? "show" : "hidden"} absolute top-0 right-0`}>
                            <button onClick={() => {
                                setPopUpEditComment(true)
                                setIsDisabledButtons(false)
                                if (popUpEditComment) {
                                    setPopUpEditComment(false)
                                    setIsDisabledButtons(true)
                                }
                            }}>
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

                                <button disabled={isDisabledButtons} className=' w-full text-start p-2 rounded-b-[15px] hover:bg-gray-300' onClick={() => { deleteAnswer() }}>
                                    <h1 className=' font-semibold text-[20px]'> <i className="fa-solid fa-trash-can"></i> Delete </h1>
                                </button>
                            </div>
                        </div>
                        {/* ----------------------------------------------------------- TRES PUNTITOS VERTICAL MAS EL CUADRO POPUP CON LOS BOTONES DELETE Y EDIT-------------------------------------- */}



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



                    {/* -----------------------------------------------------------------------CONTENEDOR MENSAJE POPUP ERROR, IMPUT TEXTAREA Y BOTONES PARA CONFIRMAR LA EDICION DE TEXTO------------------ */}
                    <div className=' relative'>

                        {/* --------------------------------------------POPUP ERROR MESAGGE-------------------------------------------- */}
                        <div className={`absolute w-full flex flex-row justify-center items-center transition-all duration-500 transform 
                            ${showErrorMesaggePopUp ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"}`}>

                            <h1 className='p-2 bg-yellow-300 font-semibold text-gray-800 rounded-[8px] shadow-md mt-[8px]'> <i className="fa-solid fa-triangle-exclamation"></i> {errorMesagge} </h1>
                        </div>
                        {/* --------------------------------------------POPUP ERROR MESAGGE-------------------------------------------- */}

                        <div className='text-[15px] flex flex-row font-light'>
                            <div className=' inline-block py-2 '>
                                <span className=' font-semibold text-[#0000ffc0] '> <i className="fa-brands fa-threads"></i>{receptorFullName} </span>
                            </div>

                            <textarea disabled={isDisabledTextArea} className={` relative w-[85%] ${showEditInputText ? "border border-gray-400 bg-gray-300 rounded-[5px]" : "bg-transparent"} p-2 focus:outline-none focus:border-gray-400`}
                                name="" id="" value={valueInputText} onChange={(e) => { setValueInputText(e.target.value) }}> </textarea>

                        </div>

                        <div className={` ${showEditInputText ? "show" : "hidden"} ml-2 flex flex-row gap-3 justify-end text-3xl pr-[80px]`}>
                            <button onClick={() => {
                                setValueInputText(text)
                                setShowEditInputText(false)
                                setIsDisabledTextArea(true)
                            }}>
                                <i class="fa-solid fa-circle-xmark text-red-500"></i>
                            </button>
                            <button onClick={() => {
                                const upDateBody = {
                                    idRespuesta: answerId,
                                    texto: valueInputText
                                }
                                editAnswer(upDateBody)
                            }}>
                                <i class="fa-solid fa-circle-check text-green-500"></i>
                            </button>
                        </div>
                    </div>
                    {/* -----------------------------------------------------------------------CONTENEDOR MENSAJE POPUP ERROR, IMPUT TEXTAREA Y BOTONES PARA CONFIRMAR LA EDICION DE TEXTO------------------ */}




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
