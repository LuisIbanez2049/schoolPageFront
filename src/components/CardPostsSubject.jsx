import { Archive, CalendarDays, FileText } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CommentUser from './CommentUser';
import InputAddComment from './InputAddComment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { hiddenPopUpAction, showPopUpAction } from '../redux/actions/popUpMessageAction';
import store from '../redux/store';
import { falseAuxAction, truAuxAction } from '../redux/actions/auxAction';

function CardPostsSubject({ color, title, description, date, file, contentId }) {


    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');

    
    const [viewComments, setViewComments] = useState(false)

    const dispatch = useDispatch()

    function showPopUpFunction(data) {
        dispatch(showPopUpAction(data))
        setTimeout(() => {
            dispatch(hiddenPopUpAction())
        }, 3000) // 3 segundos
      }

    

    const dateDate = date && date.slice(0, 10);
    const dateHour = date && date.slice(11, 16);
    const divStyle = {
        boxShadow: `0px 5px 8px ${color}`
    }
    const textStyle = {
        textShadow: `0px 0px 1px ${color}`
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/api/contenido/${contentId}`, {
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
    }, [])


    return (
        <div className="w-[1300px] rounded-lg bg-[#f3f2f2] p-6 shadow-md" style={divStyle}>
            <h1 className={`mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white bg-[${color}] rounded-[15px] p-2`}>{title}</h1>
            <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CalendarDays className="mr-2 h-4 w-4" />
                <time >{dateDate} | {dateHour}</time>
            </div>
            <p className="mb-6 text-base text-gray-700 dark:text-gray-300">
                {description}
            </p>
            <a
                href={`${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center rounded-lg bg-[${color}] px-4 py-2 text-center text-sm  text-[#000000c0] font-semibold hover:text-black`}
            >
                <FileText className="mr-2 h-5 w-5" />
                View Document
            </a>
            <button className=' block mt-4' onClick={() => {
                if (viewComments) {
                    setViewComments(false)
                } else { setViewComments(true) }
            }}>
                <h1 className={`text-[20px] text-[${color}] font-bold `}>
                    <span style={textStyle}> Comments </span>
                    <span className=' '>
                        <i className={`fa-solid fa-arrow-turn-down transition-all duration-700 transform ${viewComments ? "rotate-180" : "rotate-0"}`}></i>
                    </span>
                </h1>
            </button>
            <div className={` py-${viewComments ? "3" : "0"} mt-[15px] flex flex-col gap-12 transition-all duration-700 overflow-hidden overflow-y-auto ${viewComments ? "h-[400px]" : "h-0"} `}>

                <CommentUser color={color} contentId={contentId}/>

            </div>
        </div>
    )
}

export default CardPostsSubject
