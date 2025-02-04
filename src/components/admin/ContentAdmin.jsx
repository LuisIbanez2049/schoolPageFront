import React, { useEffect, useState } from 'react'
import LoadingView from '../LoadingView'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import CommentUserCardAdmin from './CommentUserCardAdmin';
import { CalendarDays } from 'lucide-react';
import ConfirmationPopUpAlert from '../ConfirmationPopUpAlert';

function ContentAdmin() {

    const token = localStorage.getItem("userToken");
    let tokenSinComillas = token.replace(/"/g, "");

    const { id } = useParams()

    const [content, setContent] = useState({})
    const [comments, setComments] = useState([])

    const [availableComments, setAvailableComments] = useState([])
    const [disableComments, setDisableComments] = useState([])


    const [titleContent, setTitleContent] = useState("")
    const [descriptionContent, setDescriptionContent] = useState("")
    const [fileContent, setFileContent] = useState("")

    const [showInputTitle, setShowInputTitle] = useState(false)
    const [isDisabledInputTitle, setIsDisabledInputTitle] = useState(true)

    const [showInputDescription, setShowInputDescription] = useState(false)
    const [isDisabledInputDescription, setIsDisabledInputDescription] = useState(true)

    const [showInputFile, setShowInputFile] = useState(false)
    const [isDisabledInputFile, setIsDisabledInputFile] = useState(true)

    const [viewConfirmationComponent, setViewConfirmationComponent] = useState(false);
    const [viewLoadingComponent, setViewLoadingComponent] = useState(false)



    const [selectValue, setselectValue] = useState("all")
    const [viewAllComments, setViewAllComments] = useState(true)
    const [viewAvailableComments, setViewAvailableComments] = useState(false)
    const [viewDisabledComments, setViewDisabledComments] = useState(false)

    const [dateDate, setDateDate] = useState("")
    const [dateHour, setDateHour] = useState("")




    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/contenido/admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenSinComillas}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setContent(response.data);
                setComments(response.data.comentarios)
                setTitleContent(response.data.titulo);
                setFileContent(response.data.archivo);
                setDescriptionContent(response.data.detalleDelContenido);

                const auxDateDate = response.data.fechaDePublicacion.slice(0, 10);
                setDateDate(auxDateDate)
                const auxDateHour = response.data.fechaDePublicacion.slice(11, 16);
                setDateHour(auxDateHour)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function editContent(body) {
        setViewLoadingComponent(true);
        console.log(body);
        axios
            .patch(`http://localhost:8080/api/contenido/modificar`, body, {
                headers: {
                    Authorization: `Bearer ${tokenSinComillas}`,
                },
            })
            .then((response) => {
                setViewLoadingComponent(false);
                console.log(response.data);
                //------------------------------------------------
                window.location.reload();
                //------------------------------------------------
            })
            .catch((error) => {
                setViewLoadingComponent(false);
                console.log(error);
            });
    }

    useEffect(() => {
        let auxAvailbaleComments = comments && comments.filter(comment => comment.asset === true)
        setAvailableComments(auxAvailbaleComments)

        let auxDisableComments = comments && comments.filter(comment => comment.asset === false)
        setDisableComments(auxDisableComments)
    }, [content])

    useEffect(() => {
        if (selectValue == "all") {
            setViewAllComments(true)
            setViewAvailableComments(false)
            setViewDisabledComments(false)
        } else if (selectValue == "available") {
            setViewAllComments(false)
            setViewAvailableComments(true)
            setViewDisabledComments(false)
        } else {
            setViewAllComments(false)
            setViewAvailableComments(false)
            setViewDisabledComments(true)
        }
    }, [selectValue])



    const handleOnConfirmFuntionPopUpComponent = () => {
        setViewConfirmationComponent(false)
        setViewLoadingComponent(true);
        if (content && content.asset) {
            axios
                .delete(`http://localhost:8080/api/contenido/desactivar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${tokenSinComillas}`,
                    },
                })
                .then((response) => {
                    setViewLoadingComponent(false);
                    console.log(response.data);
                    //------------------------------------------------
                    window.location.reload();
                    //------------------------------------------------
                })
                .catch((error) => {
                    setViewLoadingComponent(false);
                    console.log(error);
                });
        } else {
            axios
                .patch(
                    `http://localhost:8080/api/contenido/activar/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${tokenSinComillas}`,
                        },
                    }
                )
                .then((response) => {
                    setViewLoadingComponent(false);
                    console.log(response.data);
                    //------------------------------------------------
                    window.location.reload();
                    //------------------------------------------------
                })
                .catch((error) => {
                    setViewLoadingComponent(false);
                    console.log(error);
                });
        }
    };

    const handleOnCancelFuntionPopUpComponent = () => {
        setViewConfirmationComponent(false);
    };




    return (
        <div>
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <LoadingView show={viewLoadingComponent} />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}


            {/* ------------------------------------------------------------CONFIRMATION COMPONENT------------------------------------------------------------ */}
            <ConfirmationPopUpAlert
                isShow={viewConfirmationComponent}
                handleOnConfirmFunction={handleOnConfirmFuntionPopUpComponent}
                handleOnCancelFunction={handleOnCancelFuntionPopUpComponent}
                message={` ${content && content.asset
                    ? "Do you want to disable this content?"
                    : "Do you want to enable this content?"
                    } `}
            />
            {/* ------------------------------------------------------------CONFIRMATION COMPONENT------------------------------------------------------------ */}


            <div className=' relative flex flex-row justify-center'>
                <div className='w-[95%] mb-[80px]'>
 
                    {/* ------------------------------------------------------------------------------------EDIT CONTENT------------------------------------------------------------------------------------ */}
                    <div>
                        {/* --------------------------------------------------------------------------------------------------------------EDIT TITLE CONTENT--------------------------------------------------------------------  */}
                        <div className='mt-[20px]'>
                            <div className='flex flex-row'>

                                <input disabled={isDisabledInputTitle} type="text" value={titleContent} className='w-[95%] text-[16px] lg:text-[20px] bg-slate-200 p-1 lg:p-2 rounded-[10px] font-bold text-[#000000cc]'
                                    onChange={(e) => setTitleContent(e.target.value)} />

                                <button className='ml-[10px]' onClick={() => {
                                    setShowInputTitle(true)
                                    setIsDisabledInputTitle(false)
                                }}>
                                    <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                                </button>
                            </div>

                            <div className={`${showInputTitle ? "show" : "hidden"} flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}>
                                <button onClick={() => {
                                    const upDateBody = { idContenido: id, titulo: titleContent, detalleContenido: "", archivo: "" }
                                    editContent(upDateBody)
                                }}>
                                    <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                                </button>

                                <button onClick={() => {
                                    setShowInputTitle(false)
                                    setTitleContent(content && content.titulo)
                                    setIsDisabledInputTitle(true)
                                }}>
                                    <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                                </button>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------------------------------------------------------EDIT TITLE CONTENT--------------------------------------------------------------------  */}




                        {/* --------------------------------------------------------------------------------------------------------------EDIT FILE CONTENT--------------------------------------------------------------------  */}
                        <div className='mt-[20px]'>
                            <div className='flex flex-row'>

                                <input disabled={isDisabledInputFile} type="text" value={fileContent} className='w-[95%] text-[14px] lg:text-[18px] bg-slate-200 p-1 lg:p-2 rounded-[10px] text-[#000000cc]'
                                    onChange={(e) => setFileContent(e.target.value)} />

                                <button className='ml-[10px]' onClick={() => {
                                    setShowInputFile(true)
                                    setIsDisabledInputFile(false)
                                }}>
                                    <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                                </button>
                            </div>

                            <div className={`${showInputFile ? "show" : "hidden"} flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}>
                                <button onClick={() => {
                                    const upDateBody = { idContenido: id, titulo: "", detalleContenido: "", archivo: fileContent }
                                    editContent(upDateBody)
                                }}>
                                    <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                                </button>

                                <button onClick={() => {
                                    setShowInputFile(false)
                                    setFileContent(content && content.archivo)
                                    setIsDisabledInputFile(true)
                                }}>
                                    <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                                </button>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------------------------------------------------------EDIT FILE CONTENT--------------------------------------------------------------------  */}




                        {/* --------------------------------------------------------------------------------------------------------------EDIT DESCRIPTION CONTENT--------------------------------------------------------------------  */}
                        <div className='mt-[20px]'>
                            <div className='flex flex-row'>

                                <textarea disabled={isDisabledInputDescription} type="text" value={descriptionContent} className='w-[95%] h-[150px] text-[14px] lg:text-[18px] bg-slate-200 p-1 lg:p-2 rounded-[10px] text-[#000000cc]'
                                    onChange={(e) => setDescriptionContent(e.target.value)} />

                                <button className='ml-[10px]' onClick={() => {
                                    setShowInputDescription(true)
                                    setIsDisabledInputDescription(false)
                                }}>
                                    <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                                </button>
                            </div>

                            <div className={`${showInputDescription ? "show" : "hidden"} flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}>
                                <button onClick={() => {
                                    const upDateBody = { idContenido: id, titulo: "", detalleContenido: descriptionContent, archivo: "" }
                                    editContent(upDateBody)
                                }}>
                                    <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                                </button>

                                <button onClick={() => {
                                    setShowInputDescription(false)
                                    setDescriptionContent(content && content.detalleDelContenido)
                                    setIsDisabledInputDescription(true)
                                }}>
                                    <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                                </button>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------------------------------------------------------EDIT DESCRIPTION CONTENT--------------------------------------------------------------------  */}
                    </div>
                    {/* ------------------------------------------------------------------------------------EDIT CONTENT------------------------------------------------------------------------------------ */}
                    

                    <div className="mb-4 flex items-center text-[12px] mt-[15px] lg:text-sm text-gray-500 dark:text-gray-400">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        <time >{dateDate} | {dateHour}</time>
                    </div>


                    {/* ---------------------------------------------------------------------------------BUTTON TO ENABLE OR DISABLE CONTENT---------------------------------------------------------------------------- */}
                    <div>
                        <div className={` ${content && content.asset === true ? "show" : "hidden"} flex flex-row justify-center mt-[20px]`}>
                            <button onClick={() => setViewConfirmationComponent(true)}>
                                <h1 className="font-bold bg-[#ff0000af] p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] text-[13px] lg:text-[16px] shadow-md">
                                    DESIBLE CONTENT
                                </h1>
                            </button>
                        </div>

                        <div className={`${content && content.asset === false ? "show" : "hidden"} flex flex-row justify-center mt-[20px]`}>
                            <button onClick={() => setViewConfirmationComponent(true)}>
                                <h1 className="font-bold bg-[#29e929c5] p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] text-[13px] lg:text-[16px] text-[#000000c2] shadow-md">
                                    ENABLE CONTENT
                                </h1>
                            </button>
                        </div>
                    </div>
                    {/* ---------------------------------------------------------------------------------BUTTON TO ENABLE OR DISABLE CONTENT---------------------------------------------------------------------------- */}



                    {/* ----------------------------------------------------------------------------COMMENT CARDS---------------------------------------------------------------------------- */}
                    <div className='mt-[30px]'>

                        <div className='mb-[30px]'>
                            <select name="opciones" className='bg-slate-200 p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] text-[14px] lg:text-[16px] shadow-sm' onChange={(e) => {
                                setselectValue(e.target.value)
                            }}>
                                <option value="all">All comments</option>
                                <option value="available">Available comments</option>
                                <option value="disabled">Disabled comments</option>
                            </select>
                        </div>


                        <div className={`${viewAllComments ? "show" : "hidden"}`}>
                            <div className="flex flex-col gap-8">
                                {comments && comments.length > 0 && comments.map(comment => {
                                    return (<>
                                        <CommentUserCardAdmin commentId={comment && comment.id} />
                                    </>)
                                })}
                            </div>

                            <div className={`${comments && comments.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>

                        <div className={`${viewAvailableComments ? "show" : "hidden"}`}>
                            <div className="flex flex-col gap-8">
                                {availableComments && availableComments.length > 0 && availableComments.map(comment => {
                                    return (<>
                                        <CommentUserCardAdmin commentId={comment && comment.id} />
                                    </>)
                                })}
                            </div>

                            <div className={`${availableComments && availableComments.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>

                        <div className={`${viewDisabledComments ? "show" : "hidden"}`}>

                            <div className="flex flex-col gap-8">
                                {disableComments && disableComments.length > 0 && disableComments.map(comment => {
                                    return (<>
                                        <CommentUserCardAdmin commentId={comment && comment.id} />
                                    </>)
                                })}
                            </div>

                            <div className={`${disableComments && disableComments.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>


                    </div>
                    {/* ----------------------------------------------------------------------------COMMENT CARDS---------------------------------------------------------------------------- */}



                </div>
            </div>
        </div>
    )
}

export default ContentAdmin