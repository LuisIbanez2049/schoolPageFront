import React, { useEffect, useState } from 'react'
import InputAddAnswer from './InputAddAnswer'
import axios from 'axios'
import AnswerUserCard from './AnswerUserCard'

function AnswerUser({ color, commentId, userIdFromComment, fullName }) {


    const [valueInput, setValueInput] = useState("")
    const [aux, setAux] = useState(false)
    const [answers, setAnswers] = useState([])


    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');



    useEffect(() => {
        axios.get(`http://localhost:8080/api/respuesta/fromAcomment/${commentId}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setAnswers(response.data)
                console.log("USEEFFECT PARA HACER DE NUEVO LA PETICION")
            })
            .catch((error) => {
                console.log(error)
            })

    }, [aux])


    useEffect(() => {
        console.log(answers)
    }, [answers])


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
                if (aux) {
                    setAux(false)
                    console.log(" SE ACTUALIZO AUX A FALSE")
                } else {
                    setAux(true)
                    console.log(" SE ACTUALIZO AUX A TRUE")
                }
                setValueInput("")
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
        if (aux) {
            setAux(false)
            console.log(" SE ACTUALIZO AUX A FALSE")
        } else {
            setAux(true)
            console.log(" SE ACTUALIZO AUX A TRUE")
        }
    }


    return (
        <div>
            <div className='w-[1150px] mb-[20px]'>
                <InputAddAnswer color={color} commentId={commentId} userName={fullName} onClickFunction={handleAnswer} onChangeFunction={handleOnChange}
                    valueInput={valueInput} onClickCancelFunction={handleOnClickCancel} />
            </div>
            <div className='flex flex-col gap-6'>
                {answers && answers.length > 0 && answers.map(answer => {
                    return (<>
                      <AnswerUserCard answerId={answer.id} commentId={commentId}  answerUserId={answer.usuarioId} color={color} date={answer.fecha} fullName={answer.nombreUsuario} 
                      receptorFullName={answer.respuestaPara} text={answer.texto} key={answer.id} profileImgFromUserAnswer={answer.profileImgFromUserAnswer}/>
                    </>)
                })}
            </div>
        </div>
    )
}

export default AnswerUser