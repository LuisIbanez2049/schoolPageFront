import React, { useState } from 'react'
import SendButton from "../assets/sendButton.png"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function TarjetaMateriaWithAccessCode({ titulo, imagen, descripcion, bg, id }) {

    const [mouseIn, setMouseIn] = useState(false)
    const [valueInput, setValueInput] = useState("")
    const [viewErrorMesagge, setViewErrorMesagge] = useState(false)
    const [viewErrorMesagge2, setViewErrorMesagge2] = useState(false)
    const [errorMesagge, setErrorMesagge] = useState("")
    const [viewInputAccessCode, setViewInputAccessCode] = useState(false)
    const [clickedButton1, setClickedButton1] = useState(false)
    const [clickedButton2, setClickedButton2] = useState(false)
    const [clickedButton3, setClickedButton3] = useState(false)
    const [valueShift, setValueShift] = useState("")
    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');

    const onClickFunction = () => {
        const bodyLoginSubject = {
            idMateria: id,
            turno: valueShift,
            accessCode: valueInput
        }
        console.log(bodyLoginSubject)
        axios.post("http://localhost:8080/api/usuarios/loginMateria", bodyLoginSubject, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setViewInputAccessCode(false)
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                console.log(error)
                setErrorMesagge(error.response.data)
                if (error.response.data.includes("Invalid")) {
                    setViewErrorMesagge(true)
                    setViewErrorMesagge2(false)
                }
                if (error.response.data.includes("Please")) {
                    setViewErrorMesagge2(true)
                    setViewErrorMesagge(false)
                }
            });
    }

    const onClickFunctionCancel = () => {
        setValueInput("")
        setErrorMesagge("")
        setViewInputAccessCode(false)
        setViewErrorMesagge(false)
    }

    return (
        <div className='relative'>
            {/* <Link to={`/materia/${id}`}>
        
      </Link> */}
            <div className={` ${viewInputAccessCode ? "show" : "hidden"} absolute z-20 w-full h-[89%] bottom-0 flex flex-row justify-center gap-6 items-center bg-[#0000008a] rounded-r-[30px]`}>

                <div className=' absolute top-2 right-2 w-[35px] h-[35px] flex flex-row justify-center items-center rounded-full bg-white'>
                    <button onClick={onClickFunctionCancel}>
                        {/* <h1 className='text-[30px] font-bold text-[#ff0000af] bg-white rounded-full p-2 border border-black'>  </h1> */}
                        <div className=''>
                            <i className="fa-solid fa-xmark rounded-full text-[30px] text-red-600"></i>
                        </div>
                    </button>
                </div>

                <div>
                    <div className='flex flex-col'>
                        <input type="text"
                            className={`h-[50px] w-[250px] text-pretty font-light px-2 bg-white rounded-[15px] border-b-2 border-[#00000071] focus:border-[${bg}] focus:outline-none transition-colors peer`}
                            placeholder='Access code'
                            value={valueInput}
                            onChange={(e) => {
                                setValueInput(e.target.value)
                                setErrorMesagge("")
                                setViewErrorMesagge(false)
                            }} />
                        <h1 className={` ${viewErrorMesagge ? "show" : "hidden"}  px-2 rounded-[5px] bg-white text-[15px] mt-[5px] text-red-600`}> {errorMesagge} </h1>
                    </div>
                    <div className=' flex flex-row justify-between mt-[10px]'>
                        <button onClick={() => {
                            setClickedButton1(true)
                            setClickedButton2(false)
                            setClickedButton3(false)
                            setValueShift("mornig")
                            setViewErrorMesagge2(false)
                        }}><h1 className={`w-[70px] p-1 ${clickedButton1 ? `bg-[${bg}]` : "bg-white"} rounded-[5px] font-normal text-[15px]`}>MORING</h1></button>
                        <button onClick={() => {
                            setClickedButton1(false)
                            setClickedButton2(true)
                            setClickedButton3(false)
                            setValueShift("evening")
                            setViewErrorMesagge2(false)
                        }}><h1 className={`w-[70px] p-1 ${clickedButton2 ? `bg-[${bg}]` : "bg-white"} rounded-[5px] font-normal text-[15px]`}>EVENIG</h1></button>
                        <button onClick={() => {
                            setClickedButton1(false)
                            setClickedButton2(false)
                            setClickedButton3(true)
                            setValueShift("night")
                            setViewErrorMesagge2(false)
                        }}><h1 className={`w-[70px] p-1 ${clickedButton3 ? `bg-[${bg}]` : "bg-white"} rounded-[5px] font-normal text-[15px]`}>NIGHT</h1></button>
                    </div>
                    <h1 className={` ${viewErrorMesagge2 ? "show" : "hidden"}  px-2 rounded-[5px] bg-white text-[15px] mt-[5px] text-red-600`}> {errorMesagge} </h1>
                </div>


                <button onClick={onClickFunction}>
                    <div className={` rounded-full bg-[${bg}] p-[1px]`}>
                        <img src={SendButton} alt="" className='w-[50px] h-[50px] transition-all duration-300 hover:translate-x-1' />
                    </div>
                </button>

            </div>


            <button className=' mt-[10%]' onClick={() => {
                setViewInputAccessCode(true)
            }}>
                <div className=' relative w-[330px] lg:w-[450px] h-[380px] rounded-br-[30px] ' onMouseEnter={() => {
                    setMouseIn(true)
                }} onMouseLeave={() => {
                    setMouseIn(false)
                }}>
                    {/* Título */}
                    {/* #a1d9d9 azul marino --  #a2b38b  verde  --  #c8677f rojo*/}
                    <div className={` absolute w-[200px] h-[45px]  flex flex-row justify-center pt-[4px] rounded-t-[15px] bg-[${bg}] transition-all
        duration-300 transform ${mouseIn ? "top-[-40px]" : "top-[-34px]"} z-0`}>
                        <h1 className=' '>{titulo}</h1>
                    </div>
                    {/* Contenedor de la imagen */}
                    <div className=' relative w-full h-[180px] lg:h-[230px]  rounded-tr-[30px] z-10'>
                        <div
                            className='w-full h-full  rounded-tr-[30px] '
                            style={{
                                backgroundImage: `url('${imagen}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                    </div>
                    <div className={`p-4 w-full h-[130px] lg:h-[148px] rounded-br-[30px] bg-[${bg}]`}>
                        <p className='text-justify font-light text-[16px] lg:text-[18px]'> {descripcion} </p>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default TarjetaMateriaWithAccessCode