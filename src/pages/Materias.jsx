import React, { useEffect, useState } from 'react'
import TarjetaMateria from '../components/TarjetaMateria'
import axios from 'axios';
import { useSelector } from 'react-redux';

function Materias() {
    const user = useSelector((store) => store.authenticationReducer)
    const [subjects, setSubjects] = useState([]) 


    useEffect(() => {
        const token = localStorage.getItem("userToken")
        let tokenSinComillas = token.replace(/"/g, '');
        console.log(tokenSinComillas)
        axios.get("http://localhost:8080/api/materias/", {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setSubjects(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])
    return (
        <div className='flex flex-col min-h-screen bg-[#e0e2ed]'>
            <div className='w-full flex flex-row justify-around flex-wrap'>
                {subjects && subjects.length > 0 && subjects.map((subject) => {
                    return (
                        <TarjetaMateria key={subject.id} titulo={subject.nombre} imagen={subject.portada} descripcion={subject.descripcion}/>
                    )
                })}
                <TarjetaMateria titulo={"Matematica"} imagen={"https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6"}
                    descripcion={"Estudio del razonamiento lógico y analítico, abordando números, álgebra, geometría y más, para resolver problemas cotidianos y científicos."} />
                <TarjetaMateria titulo={"Matematica"} imagen={"https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6"}
                    descripcion={"Estudio del razonamiento lógico y analítico, abordando números, álgebra, geometría y más, para resolver problemas cotidianos y científicos."} />
                <TarjetaMateria titulo={"Matematica"} imagen={"https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6"}
                    descripcion={"Estudio del razonamiento lógico y analítico, abordando números, álgebra, geometría y más, para resolver problemas cotidianos y científicos."} />
            </div>
        </div>
    )
}

export default Materias