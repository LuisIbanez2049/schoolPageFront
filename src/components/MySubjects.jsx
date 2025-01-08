import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TarjetaMateria from './TarjetaMateria'


function MySubjects({useStateP}) {

    const user = useSelector((store) => store.authenticationReducer)
    const [mySubjects, setMySubjects] = useState([]) 


    useEffect(() => {
        const token = localStorage.getItem("userToken")
        let tokenSinComillas = token.replace(/"/g, '');
        console.log(tokenSinComillas)
        axios.get("http://localhost:8080/api/materias/mysubjects", {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setMySubjects(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])


  return (
    <div>
        <div className='w-full flex flex-row justify-center gap-16 flex-wrap pt-[40px]'>
        {mySubjects && mySubjects.length > 0 && mySubjects.map((subject) => { 
                    return (
                        <TarjetaMateria key={subject.id} id={subject.id} titulo={subject.nombre} imagen={subject.portada} descripcion={subject.descripcion} bg={subject.color}/>
                    )
                })}
        </div>
    </div>
  )
}

export default MySubjects