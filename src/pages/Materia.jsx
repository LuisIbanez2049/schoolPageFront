import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

    const bodyPopUpMessage = useSelector(store => store.popUpMessageReducer)
    const bodyAux = useSelector(store => store.auxReducer)
    

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
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <div>
            <div className='flex flex-col min-h-screen'>
            <PopUpMessage message={bodyPopUpMessage.message} show={bodyPopUpMessage.isShow}/>
                <div>
                    <div className={`w-full h-[80px] bg-[${subject && subject.color}] flex flex-row justify-center items-center `}>
                        <h1 className='text-[45px] font-thin'> {subject && subject.nombre} </h1>
                    </div>
                    <div className={`relative z-10 w-[450px] h-[41px] rounded-br-[100px] bg-[${subject && subject.color}] `}></div>
                    <div className=' relative w-full flex flex-col justify-center '>
                        <div className=' relative z-0 top-[-41px]  w-full h-[600px]'
                            style={{
                                backgroundImage: `url('${subject && subject.portada}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}>

                        </div>
                        <div className='w-full flex flex-col justify-center items-center '>
                            <div className='w-[95%] flex flex-row border border-red-600'>
                                <div className=' w-[12%] h-[300px] border border-black'>
                                    <h1 className='font-bold'>STUDENTS</h1>
                                    <ul className=' pl-1 '>
                                        {subject && subject.alumnos && subject.alumnos.map(alumno => {
                                            return (
                                                <> <li> {alumno.name} </li> </>
                                            )
                                        })}
                                    </ul>
                                    <h1 className='font-bold'>PROFESSOR</h1>
                                    <ul className='pl-1'>
                                        {subject && subject.profesores && subject.profesores.map(professor => {
                                            return (<> <li> {professor.name + " " + professor.lastName} </li> </>)
                                        })}
                                    </ul>
                                </div>
                                <div className='w-[88%] flex flex-col items-center gap-12 border border-green-600'>

                                    <div className='w-[1300px] border-2 border-[#00000060] p-3 rounded-[15px] bg-[#f3f2f2]'>
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

                                                <input type="url"
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
                                                file={contenido.archivo} contentId={contenido.id}/>
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