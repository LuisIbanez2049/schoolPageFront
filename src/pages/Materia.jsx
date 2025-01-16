import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommentUser from '../components/CommentUser'
import CardPostsSubject from '../components/CardPostsSubject'
import PopUpMessage from '../components/PopUpMessage'
import { useSelector } from 'react-redux'

function Materia() {

    const [subject, setSubject] = useState({})
    const [aux, setAux] = useState(false)

    const { id } = useParams()

    const [idSubject, setIdSubject] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [fileURL, setFileURL] = useState("")
    const [popUpH1, setPopUpH1] = useState(false)
    const [viewBannerMateriaImgPen, setViewBannerMateriaImgPen] = useState(false)
    const [viewInputEditUrlBanner, setViewInputEditUrlBanner] = useState(false)
    const [valueUrl, setValueUrl] = useState("")


    const bodyPopUpMessage = useSelector(store => store.popUpMessageReducer)
    const bodyAux = useSelector(store => store.auxReducer)
    const navigate = useNavigate();

    //--------------------------------------------------------------------------------------------
    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))
    //--------------------------------------------------------------------------------------------


    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');
    useEffect(() => {

        console.log(tokenSinComillas)
        console.log(id)
        axios.get(`http://localhost:8080/api/materias/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                console.log(response.data.contenidos)
                setSubject(response.data)
                setIdSubject(response.data.id)
                setValueUrl(response.data.portada)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [aux, bodyAux.isAux])

    const handleCreateAContent = async (event) => {
        event.preventDefault()
        let bodyCreateContent = {
            idMateria: idSubject,
            titulo: title,
            detalleContenido: description,
            archivo: fileURL,
        }
        console.log(bodyCreateContent)
        axios.post("http://localhost:8080/api/contenido/create", bodyCreateContent, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                if (aux) {
                    setAux(false)
                } else { setAux(true) }
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const handleLeaveSubject = () => {

        let bodyCreateContent = {
            idMateria: id,
            idUsuario: userInformationLocalStorage.id
        }
        console.log(bodyCreateContent)
        axios.patch("http://localhost:8080/api/usuarios/leaveSubject", bodyCreateContent, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                navigate("/materias")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function editSubjectBanner (body){
        console.log(body)
        axios.patch(`http://localhost:8080/api/materias/modificarMateria`, body, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        } )
        .then((response) => {
            console.log(response.data)
            setViewInputEditUrlBanner(false)
            //------------------------------------------------
            window.location.reload()
            //------------------------------------------------
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className='flex flex-col min-h-screen'>
                <PopUpMessage message={bodyPopUpMessage.message} show={bodyPopUpMessage.isShow} />
                <div className=' relative border border-black'>

                    <div className=' absolute p-5'>
                        <button onClick={() => { navigate("/materias") }}>
                            <h1> <i className="fa-solid fa-share fa-flip-horizontal text-[40px] hover:text-[#f3a04d]"></i> </h1>
                        </button>
                    </div>
                    
                    <div className={`w-full h-[80px] bg-[${subject && subject.color}] flex flex-row justify-center items-center `}>
                        <h1 className='text-[45px] font-bold text-gray-600'> {subject && subject.nombre} </h1>
                    </div>
                    <div className={`relative z-10 w-[450px] h-[41px] rounded-br-[100px] bg-[${subject && subject.color}] `}></div>
                    <div className=' relative w-full flex flex-col justify-center '>

                        <div className=' relative z-0 top-[-41px]  w-full h-[600px]' onMouseEnter={() => { setViewBannerMateriaImgPen(true) }} onMouseLeave={() => { setViewBannerMateriaImgPen(false) }}
                            style={{
                                backgroundImage: `url('${subject && subject.portada}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}>


                            <div className=' absolute top-0 right-0 p-4'>
                                {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                                <span className={` ${userInformationLocalStorage.rol == "PROFESOR" ? "show" : "hidden"} ml-[20px]`}>
                                    <button className={`${viewBannerMateriaImgPen ? "show" : "hidden"}`} onClick={() => {
                                        setViewInputEditUrlBanner(true)
                                    }}>
                                        <i class="fa-solid fa-pen text-[35px] bg-white p-4 rounded-[20px] shadow-xl"></i>
                                    </button>
                                </span>
                                {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                            </div>

                            <div className={`${viewInputEditUrlBanner ? "show" : "hidden"} absolute w-full h-full bg-[#0000009c] flex flex-row justify-center items-center`}>
                                {/* ----------------------------------------------------------------INPUT TITLE MAS DOS BOTONES -------------------------------------------------- */}
                                <div className={` ${viewInputEditUrlBanner ? "show" : "hidden"}  bg-[#f3f2f2] flex flex-row justify-center items-center p-6 rounded-[20px]`}>
                                    <input type="text" value={valueUrl} className='bg-gray-300 p-2 w-[900px] rounded-[5px]' onChange={(e) => { setValueUrl(e.target.value) }} />

                                    <div className=' ml-2 flex flex-row gap-3 text-3xl'>
                                        <button onClick={() => {
                                            setValueUrl(subject && subject.portada)
                                            setViewInputEditUrlBanner(false)
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
                                {/* ----------------------------------------------------------------INPUT TITLE MAS DOS BOTONES -------------------------------------------------- */}
                            </div>

                        </div>

                        <div className='w-full flex flex-col justify-center items-center '>
                            <div className='w-[95%] flex flex-row border border-red-600'>

                                <div className={`w-[12%] h-auto `}>
                                    <div className={` p-2 border-4 border-[${subject && subject.color}] rounded-[15px] bg-gray-100`}>
                                        <h1 className={`font-bold text-[24px] text-[#2c2c2c]`}>STUDENTS</h1>
                                        <ul className=' pl-1 '>
                                            {subject && subject.alumnos && subject.alumnos.map(alumno => {
                                                return (
                                                    <> <li className='text-[19px]'> {alumno.name} </li> </>
                                                )
                                            })}
                                        </ul>
                                        <h1 className='font-bold text-[24px] text-[#2c2c2c]'>PROFESSOR</h1>
                                        <ul className='pl-1'>
                                            {subject && subject.profesores && subject.profesores.map(professor => {
                                                return (<> <li className='text-[19px]'> {professor.name + " " + professor.lastName} </li> </>)
                                            })}
                                        </ul>
                                    </div>

                                    <div className=' relative w-full flex flex-row justify-center items-center  py-6'>
                                        <button onClick={() => {
                                            handleLeaveSubject()
                                        }}>
                                            <div onMouseEnter={() => { setPopUpH1(true) }} onMouseLeave={() => { setPopUpH1(false) }}>
                                                <h1 className='rounded-[5px] py-2 px-6 bg-[#ff00007a] font-semibold' > <i className="fa-solid fa-right-from-bracket text-[40px]"></i> </h1>
                                            </div>
                                        </button>
                                        <div className='absolute top-[38px] right-[-60px]'>
                                            <h1 className={` bg-gray-100  font-thin border border-[#00000065] rounded-[6px] p-[2px] shadow-md transition-all duration-500 transform
                                         ${popUpH1 ? "opacity-100 scale-100 z-30" : "opacity-0 scale-90 z-0"}`}>LEAVE SUBJECT</h1>
                                        </div>
                                    </div>

                                </div>

                                <div className='w-[88%] flex flex-col items-center gap-12 border border-green-600'>

                                    {/* userInformationLocalStorage */}
                                    <div className={` ${userInformationLocalStorage.rol == "PROFESOR" ? "show" : "hidden"} w-[1300px] border-2 border-[#00000060] p-3 rounded-[15px] bg-[#f3f2f2]`}>
                                        <form action="" onSubmit={handleCreateAContent}>
                                            <h1 className={`text-[20px] font-bold bg-[${subject && subject.color}] p-2 rounded-[8px] text-center`}>CREATE CONTENT</h1>

                                            <div className='flex flex-col gap-4'>
                                                <input type="text"
                                                    className={`h-[50px] w-full text-pretty font-light px-2 bg-transparent border-b border-[#00000071] focus:border-[${subject && subject.color}] focus:outline-none transition-colors peer`}
                                                    placeholder='Title'
                                                    value={title}
                                                    onChange={(e) => {
                                                        setTitle(e.target.value)
                                                    }} />

                                                <textarea rows="4" cols="90" placeholder="Description..."
                                                    className={`w-full text-pretty font-light px-2 bg-transparent border border-[#00000071] rounded-md focus:border-[${subject && subject.color}] focus:outline-none transition-colors peer`}
                                                    value={description}
                                                    onChange={(e) => {
                                                        setDescription(e.target.value)
                                                    }} ></textarea>

                                                <input type="text"
                                                    className={`h-[50px] w-full text-pretty font-light px-2 bg-transparent border-b border-[#00000071] focus:border-[${subject && subject.color}] focus:outline-none transition-colors peer`}
                                                    placeholder='File URL'
                                                    value={fileURL}
                                                    onChange={(e) => {
                                                        setFileURL(e.target.value)
                                                    }} />

                                                <div className='w-full flex flex-row justify-end'>
                                                    <div className='p-3 flex flex-row gap-8 '>
                                                        <button onClick={() => {
                                                            setTitle("")
                                                            setDescription("")
                                                            setFileURL("")
                                                        }}>
                                                            <h1 className='rounded-[5px] p-2 bg-[#ff00007a] font-semibold'>CANCEL</h1>
                                                        </button>
                                                        <button> <h1 className='rounded-[5px] p-2 bg-[#00800094] font-semibold'>SUBMIT</h1> </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div>

                                    {/* <CommentUser/> */}
                                    {subject && subject.contenidos && subject.contenidos.map(contenido => {
                                        return (<>
                                            <CardPostsSubject color={subject && subject.color} title={contenido.titulo} date={contenido.fechaDePublicacion} description={contenido.detalleDelContenido}
                                                file={contenido.archivo} contentId={contenido.id} />
                                        </>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Materia