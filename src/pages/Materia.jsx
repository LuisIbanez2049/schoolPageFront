import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Materia() {
    const [subject, setSubject] = useState({})

    const { id } = useParams()
    useEffect(() => {
        const token = localStorage.getItem("userToken")
        let tokenSinComillas = token.replace(/"/g, '');
        console.log(tokenSinComillas)
        console.log(id)
        axios.get(`http://localhost:8080/api/materias/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setSubject(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <div>
            <div className='flex flex-col min-h-screen'>
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
                                        {subject && subject.profesores && subject.profesores.map(professor =>{
                                        return (<> <li> {professor.name + " " + professor.lastName} </li> </>)
                                    })} 
                                    </ul>
                                </div>
                                <div className='w-[88%] flex flex-col border border-green-600'>
                                    
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