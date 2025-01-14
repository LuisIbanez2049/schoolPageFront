import React, { useEffect, useState } from 'react'
import AnswerCommentUser from './AnswerUserCard'
import InputAddAnswer from './InputAddAnswer'
import axios from 'axios'
import PopUpMessage from './PopUpMessage'
import { useDispatch, useSelector } from 'react-redux'
import store from '../redux/store'
import InputAddComment from './InputAddComment'
import CommentUserCard from './CommentUserCard'

function CommentUser({ date, text, fullName, color, contentId, userIdFromComment, reRenderAux }) {


    const [comments, setComments] = useState([])
    const [aux, setAux] = useState(false)
    const [inputValueTextComment, setInputValueTextComment] = useState("")

    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');


    useEffect(() => {
        axios.get(`http://localhost:8080/api/contenido/${contentId}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setComments(response.data.comentarios)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [aux])

    useEffect(() => {
        console.log(comments)
    }, [aux])

    const handleOnClick = async (event) => {
        event.preventDefault()

        let bodyCreateComment = {
            idContenido: contentId,
            texto: inputValueTextComment,
        }
        axios.post("http://localhost:8080/api/comentario/create", bodyCreateComment, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
        .then((response) => {
            console.log(response.data)
            if (aux) {
                setAux(false)
            } else { setAux(true) }
            setInputValueTextComment("")

            //------------------------------------------------
            window.location.reload()
            //------------------------------------------------
            
        })
        .catch((error) => {
            console.log(error)
        })

    }


    const handleOnChange = (e) => {
        setInputValueTextComment(e.target.value)
    }
    const handleOnClickCancel = () => {
        setInputValueTextComment("")
    }


    return (
        <div className='p-2'>
            <div className='w-[1220px] mb-[25px]'>
                <InputAddComment color={color} onClickFunction={handleOnClick} inputValue={inputValueTextComment} onChangeFunction={handleOnChange} onClickFunctionCancel={handleOnClickCancel} />
            </div>

            <div className='flex flex-col gap-10'>
                {comments && comments.length > 0 && comments.map(comment => {
                    return (<>
                        <CommentUserCard fullName={comment.nombreUsuario} text={comment.texto} date={comment.fecha} color={color} commentId={comment.id} userIdFromComment={comment.userId} profileImgFromUserComment={comment.profileImgFromUserComment}/>
                    </>)
                })}
            </div>
        </div>
    )
}

export default CommentUser