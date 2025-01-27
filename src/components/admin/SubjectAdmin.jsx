import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingView from '../LoadingView'
import ConfirmationPopUpAlert from '../ConfirmationPopUpAlert'

function SubjectAdmin() {

    const { id } = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');
    const [viewLoadingComponent, setViewLoadingComponent] = useState(false)
    const [viewConfirmationComponent, setViewConfirmationComponent] = useState(false)

    const [subject, setSubject] = useState({})
    const [contents, setContents] = useState([])

    const [titleSubject, setTitleSubject] = useState("")
    const [descriptionSubject, setDescriptionSubject] = useState("")
    const [portadaSubject, setPortadaSubject] = useState("")

    const [showInputTitle, setShowInputTitle] = useState(false)
    const [isDisabledInputTitle, setIsDisabledInputTitle] = useState(true)

    const [showInputDescription, setShowInputDescription] = useState(false)
    const [isDisabledInputDescription, setIsDisabledInputDescription] = useState(true)

    const [showInputPortada, setShowInputPortada] = useState(false)
    const [isDisabledInputPortada, setIsDisabledInputPortada] = useState(true) 





    useEffect(() => {
        axios.get(`http://localhost:8080/api/materias/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setSubject(response.data)
                setContents(response.data.contenidos)
                setTitleSubject(response.data.nombre)
                setPortadaSubject(response.data.portada)
                setDescriptionSubject(response.data.descripcion)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    function editSubject(body) {
        setViewLoadingComponent(true)
        console.log(body)
        axios.patch(`http://localhost:8080/api/materias/modificarMateria`, body, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                setViewLoadingComponent(false)
                console.log(response.data)
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                setViewLoadingComponent(false)
                console.log(error)
            })
    }


    const handleOnConfirmFuntionPopUpComponent = () => {
        setViewLoadingComponent(true)
        if (subject && subject.asset) {
            axios.delete(`http://localhost:8080/api/materias/desactivar/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenSinComillas}`
                }
            })
                .then((response) => {
                    setViewLoadingComponent(false)
                    console.log(response.data)
                    navigate("/adminViewSubjects")
                })
                .catch((error) => {
                    setViewLoadingComponent(false)
                    console.log(error)
                })
        } else {
            axios.patch(`http://localhost:8080/api/materias/activar/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${tokenSinComillas}`
                }
            })
                .then((response) => {
                    setViewLoadingComponent(false)
                    console.log(response.data)
                    navigate("/adminViewSubjects")
                })
                .catch((error) => {
                    setViewLoadingComponent(false)
                    console.log(error)
                })
        }
    }

    const handleOnCancelFuntionPopUpComponent = () => {
        setViewConfirmationComponent(false)
    }



    return (
        <div className=' relative flex flex-col min-h-screen'>

            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <LoadingView show={viewLoadingComponent} />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}

            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <ConfirmationPopUpAlert isShow={viewConfirmationComponent} handleOnConfirmFunction={handleOnConfirmFuntionPopUpComponent} handleOnCancelFunction={handleOnCancelFuntionPopUpComponent}
                message={` ${subject && subject.asset ? "Do you want to disable this subject?" : "Do you want to enable this subject?"} `} />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}

            <div className='w-full flex flex-row justify-center'>
                <div className='w-[95%] border border-black'>

                    <div className='h-[200px] lg:h-[400px]' style={{
                        backgroundImage: `url('${portadaSubject}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    </div>


                    {/* --------------------------------------------------------------------------------------------------------------EDIT TITLE SUBJECT--------------------------------------------------------------------  */}
                    <div className='mt-[20px]'>
                        <div className='flex flex-row'>

                            <input disabled={isDisabledInputTitle} type="text" value={titleSubject} className='w-[95%] text-[16px] lg:text-[20px] bg-slate-200 p-1 lg:p-2 rounded-[10px] font-bold text-[#000000cc]'
                                onChange={(e) => setTitleSubject(e.target.value)} />

                            <button className='ml-[10px]' onClick={() => {
                                setShowInputTitle(true)
                                setIsDisabledInputTitle(false)
                            }}>
                                <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                            </button>
                        </div>

                        <div className={`${showInputTitle ? "show" : "hidden"} flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}>
                            <button onClick={() => {
                                const upDateBody = {
                                    idMateria: id,
                                    nombre: titleSubject,
                                    descripcion: "",
                                    portada: ""
                                }
                                editSubject(upDateBody)
                            }}>
                                <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                            </button>

                            <button onClick={() => {
                                setShowInputTitle(false)
                                setTitleSubject(subject && subject.nombre)
                                setIsDisabledInputTitle(true)
                            }}>
                                <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                            </button>
                        </div>
                    </div>
                    {/* --------------------------------------------------------------------------------------------------------------EDIT TITLE SUBJECT--------------------------------------------------------------------  */}




                    {/* --------------------------------------------------------------------------------------------------------------EDIT PORTADA SUBJECT--------------------------------------------------------------------  */}
                    <div className='mt-[20px]'>
                        <div className='flex flex-row'>

                            <input disabled={isDisabledInputPortada} type="text" value={portadaSubject} className='w-[95%] text-[14px] lg:text-[18px] bg-slate-200 p-1 lg:p-2 rounded-[10px] text-[#000000cc]'
                                onChange={(e) => setPortadaSubject(e.target.value)} />

                            <button className='ml-[10px]' onClick={() => {
                                setShowInputPortada(true)
                                setIsDisabledInputPortada(false)
                            }}>
                                <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                            </button>
                        </div>

                        <div className={`${showInputPortada ? "show" : "hidden"} flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}>
                            <button onClick={() => {
                                const upDateBody = {
                                    idMateria: id,
                                    nombre: "",
                                    descripcion: "",
                                    portada: portadaSubject
                                }
                                editSubject(upDateBody)
                            }}>
                                <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                            </button>

                            <button onClick={() => {
                                setShowInputPortada(false)
                                setPortadaSubject(subject && subject.portada)
                                setIsDisabledInputPortada(true)
                            }}>
                                <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                            </button>
                        </div>
                    </div>
                    {/* --------------------------------------------------------------------------------------------------------------EDIT PORTADA SUBJECT--------------------------------------------------------------------  */}




                    {/* --------------------------------------------------------------------------------------------------------------EDIT DESCRIPTION SUBJECT--------------------------------------------------------------------  */}
                    <div className='mt-[20px]'>
                        <div className='flex flex-row'>

                            <textarea disabled={isDisabledInputDescription} type="text" value={descriptionSubject} className='w-[95%] h-[150px] text-[14px] lg:text-[18px] bg-slate-200 p-1 lg:p-2 rounded-[10px] text-[#000000cc]'
                                onChange={(e) => setDescriptionSubject(e.target.value)} />

                            <button className='ml-[10px]' onClick={() => {
                                setShowInputDescription(true)
                                setIsDisabledInputDescription(false)
                            }}>
                                <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                            </button>
                        </div>

                        <div className={`${showInputDescription ? "show" : "hidden"} flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}>
                            <button onClick={() => {
                                const upDateBody = {
                                    idMateria: id,
                                    nombre: "",
                                    descripcion: descriptionSubject,
                                    portada: ""
                                }
                                editSubject(upDateBody)
                            }}>
                                <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                            </button>

                            <button onClick={() => {
                                setShowInputDescription(false)
                                setDescriptionSubject(subject && subject.descripcion)
                                setIsDisabledInputDescription(true)
                            }}>
                                <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                            </button>
                        </div>
                    </div>
                    {/* --------------------------------------------------------------------------------------------------------------EDIT DESCRIPTION SUBJECT--------------------------------------------------------------------  */}

                    <div className={` ${subject && subject.asset === true ? "show" : "hidden"} flex flex-row justify-center mt-[20px]`}>
                        <button onClick={() => setViewConfirmationComponent(true)}>
                            <h1 className='font-bold bg-[#ff0000af] p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] text-[13px] lg:text-[16px]'>DESIBLE SUBJECT</h1>
                        </button>
                    </div>

                    <div className={`${subject && subject.asset === false ? "show" : "hidden"} flex flex-row justify-center mt-[20px]`}>
                        <button onClick={() => setViewConfirmationComponent(true)}>
                            <h1 className='font-bold bg-[#29e929c5] p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] text-[13px] lg:text-[16px] text-[#000000c2]'>ENABLE SUBJECT</h1>
                        </button>
                    </div>

                    <div>
                        <h1>HOLA</h1>
                        {contents && contents.length > 0 && contents.map(contenido => {
                            return (<>
                            <h1>{contenido.titulo}</h1>
                            <h1> {contenido.asset ? "true" : "false"} </h1>
                            </>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubjectAdmin