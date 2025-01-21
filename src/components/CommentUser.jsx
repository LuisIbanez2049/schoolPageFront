import React, { useEffect, useState } from 'react'
import AnswerCommentUser from './AnswerUserCard'
import InputAddAnswer from './InputAddAnswer'
import axios from 'axios'
import PopUpMessage from './PopUpMessage'
import { useDispatch, useSelector } from 'react-redux'
import store from '../redux/store'
import InputAddComment from './InputAddComment'
import CommentUserCard from './CommentUserCard'
import LoadingView from './LoadingView'

function CommentUser({ date, text, fullName, color, contentId, userIdFromComment, reRenderAux }) {


    const [comments, setComments] = useState([])
    const [aux, setAux] = useState(false)
    const [inputValueTextComment, setInputValueTextComment] = useState("")

    const [viewLoadingComponent, setViewLoadingComponent] = useState(false)
    

    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');


    useEffect(() => {
        setViewLoadingComponent(true)
        axios.get(`http://localhost:8080/api/contenido/${contentId}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                setViewLoadingComponent(false)
                console.log(response.data)
                setComments(response.data.comentarios)
            })
            .catch((error) => {
                setViewLoadingComponent(false)
                console.log(error)
            })
    }, [aux])

    useEffect(() => {
        console.log(comments)
    }, [aux])

    const handleOnClick = async (event) => {
        event.preventDefault()
        setViewLoadingComponent(true)
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
            setViewLoadingComponent(false)
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
            setViewLoadingComponent(false)
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
        <div className='p-1 lg:p-2'>

            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <LoadingView show={viewLoadingComponent} />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}

            <div className='w-[290px] lg:w-[1220px] mb-[25px]'>
                <InputAddComment color={color} onClickFunction={handleOnClick} inputValue={inputValueTextComment} onChangeFunction={handleOnChange} onClickFunctionCancel={handleOnClickCancel} />
            </div>

            <div className='flex flex-col gap-4 lg:gap-10'>
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