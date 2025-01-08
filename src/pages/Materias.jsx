import React, { useEffect, useState } from 'react'
import TarjetaMateria from '../components/TarjetaMateria'
import axios from 'axios';
import { useSelector } from 'react-redux';
import MySubjects from '../components/MySubjects';
import TarjetaMateriaWithAccessCode from '../components/TarjetaMateriaWithAccessCode';

function Materias() {
    const user = useSelector((store) => store.authenticationReducer)
    const [subjects, setSubjects] = useState([])
    const [viewMySubjects, setViewMySubjects] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem("userToken")
        let tokenSinComillas = token.replace(/"/g, '');
        console.log(tokenSinComillas)
        axios.get("http://localhost:8080/api/materias/availablesubjects", {
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
            <div className='w-full flex flex-row justify-center gap-40 flex-wrap pt-[40px] '>
                <button onClick={() => {
                    setViewMySubjects(false)
                }}>
                    <h1 className='text-[25px] text-[#000000a8] font-bold bg-[#efb071a6] p-2 border border-[#0000001f] rounded-[15px]'>ALL SUBJECTS</h1>
                </button>

                <button onClick={() => {
                    setViewMySubjects(true)
                }}>
                    <h1 className='text-[25px] text-[#000000a8] font-bold bg-[#efb071a6] p-2 border border-[#0000001f] rounded-[15px]'>MY SUBJECTS</h1>
                </button>
            </div>
            <div className={`w-full flex flex-row justify-center gap-16 flex-wrap pt-[40px] ${viewMySubjects ? "hidden" : "show"}`}>
                {subjects && subjects.length > 0 && subjects.map((subject) => {
                    return (
                        <TarjetaMateriaWithAccessCode key={subject.id} id={subject.id} titulo={subject.nombre} imagen={subject.portada} descripcion={subject.descripcion} bg={subject.color} />
                    )
                })}
                <div className={`${subjects && subjects.length == 0 ? "show" : "hidden"}`}>
                    <h1 className='text-[45px] font-extrabold text-[#00000059]'>NO SUBJECTS AVAILABLE</h1>
                </div>
                {/* #a1d9d9 azul marino --  #a2b38b  verde  --  #c8677f rojo*/}
                {/* <TarjetaMateria titulo={"Matematica"} imagen={"https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6"}
                    descripcion={"Estudio del razonamiento lógico y analítico, abordando números, álgebra, geometría y más, para resolver problemas cotidianos y científicos."} bg={"#a1d9d9"}/>
                <TarjetaMateria titulo={"Matematica"} imagen={"https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6"}
                    descripcion={"Estudio del razonamiento lógico y analítico, abordando números, álgebra, geometría y más, para resolver problemas cotidianos y científicos."} bg={"#a2b38b"}/>
                <TarjetaMateria titulo={"Matematica"} imagen={"https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6"}
                    descripcion={"Estudio del razonamiento lógico y analítico, abordando números, álgebra, geometría y más, para resolver problemas cotidianos y científicos."} bg={"#c8677f"}/> */}
            </div>

            <div className={`${viewMySubjects ? "show" : "hidden"}`}>
                <MySubjects />
            </div>
        </div>
    )
}

export default Materias