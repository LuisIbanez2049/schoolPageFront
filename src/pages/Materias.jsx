import React, { useEffect, useState } from 'react'
import TarjetaMateria from '../components/TarjetaMateria'
import axios from 'axios';
import { useSelector } from 'react-redux';
import MySubjects from '../components/MySubjects';
import TarjetaMateriaWithAccessCode from '../components/TarjetaMateriaWithAccessCode';
import LoadingView from '../components/LoadingView';
import store from '../redux/store';
import ConfirmationPopUpAlert from '../components/ConfirmationPopUpAlert';

function Materias() {
    const user = useSelector((store) => store.authenticationReducer)
    const [subjects, setSubjects] = useState([])
    const [viewMySubjects, setViewMySubjects] = useState(true)


    const [viewLoadingComponent, setViewLoadingComponent] = useState(false)



    useEffect(() => {
        setViewLoadingComponent(true)
        const token = localStorage.getItem("userToken")
        let tokenSinComillas = token.replace(/"/g, '');
        console.log(tokenSinComillas)
        axios.get("http://localhost:8080/api/materias/availablesubjects", {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                setViewLoadingComponent(false)
                console.log(response.data)
                setSubjects(response.data)
            })
            .catch((error) => {
                setViewLoadingComponent(false)
                console.log(error)
            });
    }, [])
    return (
        <div className='flex flex-col min-h-screen bg-[#e0e2ed]'>

            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <LoadingView show={viewLoadingComponent} />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}



            {/* ------------------------------------------------------------------------------BOTONES "MY SUBJECT" y "ALL SUBJECTS"------------------------------------------------------------------------------ */}
            <div className={` relative w-full flex flex-row justify-center gap-4 lg:gap-40 flex-wrap pt-[40px]`}>

                <button onClick={() => {
                    setViewMySubjects(true)
                }}>
                    <h1 className={`text-[18px] lg:text-[27px] text-[#000000a8] font-bold ${viewMySubjects ? "bg-[#ac7033a6]" : " bg-[#efb071a6]"} p-2 border border-[#0000001f] rounded-[10px] lg:rounded-[15px]`}>MY SUBJECTS</h1>
                </button>

                <button onClick={() => {
                    setViewMySubjects(false)
                }}>
                    <h1 className={`text-[18px] lg:text-[27px] text-[#000000a8] font-bold ${viewMySubjects ? "bg-[#efb071a6]" : " bg-[#ac7033a6]"} p-2 border border-[#0000001f] rounded-[10px] lg:rounded-[15px]`}>ALL SUBJECTS</h1>
                </button>

            </div>
            {/* ------------------------------------------------------------------------------BOTONES "MY SUBJECT" y "ALL SUBJECTS"------------------------------------------------------------------------------ */}


            <div className={`${viewMySubjects ? "show" : "hidden"}`}>
                <MySubjects />
            </div>


            <div className={`w-full flex flex-row justify-center gap-0 lg:gap-16 flex-wrap pt-[40px] ${viewMySubjects ? "hidden" : "show"}`}>
                {subjects && subjects.length > 0 && subjects.map((subject) => {
                    return (
                        <TarjetaMateriaWithAccessCode key={subject.id} id={subject.id} titulo={subject.nombre} imagen={subject.portada} descripcion={subject.descripcion} bg={subject.color} />
                    )
                })}
                <div className={`${subjects && subjects.length == 0 ? "show" : "hidden"}`}>
                    <h1 className='text-[25px] lg:text-[45px] font-extrabold text-[#00000059]'>NO SUBJECTS AVAILABLE</h1>
                </div>
                {/* #a1d9d9 azul marino --  #a2b38b  verde  --  #c8677f rojo*/}
            </div>

        </div>
    )
}

export default Materias