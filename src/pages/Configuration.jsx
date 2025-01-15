import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Configuration() {

    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))

    const [viewNamePen, setViewNamePen] = useState(true)
    const [viewInputEditName, setViewInputEditName] = useState(false)
    const [inputValueName, setInputValueName] = useState(userInformationLocalStorage.name)
    const [isDisabledInputName, setIsDisabledInputName] = useState(true)

    const token = localStorage.getItem("userToken")
    let tokenSinComillas = token.replace(/"/g, '');


    function updateLocalStorage(){

        axios.get("http://localhost:8080/api/auth/current", {
            headers: {
              Authorization: `Bearer ${tokenSinComillas}`
            }
          })
            .then((response) => {
              let objectAux = response.data;
              let user = JSON.parse(localStorage.getItem("userInformation"));
              user = objectAux;
              localStorage.setItem("userInformation", JSON.stringify(user));
              //------------------------------------------------
            window.location.reload()
            //------------------------------------------------
            })
            .catch((error) => {
              console.log(error)
            });
        
    }

    function editUserParemeters (body){
        console.log(body)
        axios.patch(`http://localhost:8080/api/usuarios/configuration`, body, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        } )
        .then((response) => {
            console.log(response.data)
            updateLocalStorage()
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return (
        <div className='flex flex-col min-h-screen'>
            <div className='w-full min-h-screen flex flex-col items-center border-2 border-red-600'>

                <div className='w-[65%] flex flex-row border border-black mt-[12%]'>

                    <div className='w-[40%] flex flex-row justify-center items-center'>
                        <div className='w-[300px] h-[300px] rounded-full border border-black'>

                        </div>
                    </div>

                    <div className='w-[60%] flex flex-col justify-around border border-red-600 font-extrabold text-gray-800'>

                        <div className='border border-black flex flex-row justify-center'>

                            {/* ----------------------------------------------------------------------------------------------------NAME NAME NAME-------------------------------------------------- */}
                            <div className='flex flex-row border border-red-600'>
                                <input className='text-[45px] text-center focus:outline-none focus:border-none border border-black w-[270px]' type="text" value={inputValueName} disabled={isDisabledInputName}
                                onChange={(e) => {setInputValueName(e.target.value)}} />

                                <div className=' relative border border-green-600'>
                                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                                    <span className={``}>
                                        <button className={`${viewNamePen ? "show" : "hidden"}`} onClick={() => {
                                            setViewInputEditName(true)
                                            setIsDisabledInputName(false)
                                        }}>
                                            <i class="fa-solid fa-pen text-[30px]"></i>
                                        </button>
                                    </span>
                                    {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                                    <div className={` ${viewInputEditName ? "show" : "hidden"} absolute top-0 w-full h-full flex flex-col items-center justify-center gap-1 bg-white`}>
                                        <button onClick={() => {
                                            setInputValueName(userInformationLocalStorage.name)
                                            setViewInputEditName(false)
                                        }}>
                                            <i class="fa-solid fa-circle-xmark text-[30px] text-red-500"></i>
                                        </button>
                                        <button onClick={() => {
                                            const upDateBody = { name: inputValueName }
                                            editUserParemeters(upDateBody)
                                        }}>
                                            <i class="fa-solid fa-circle-check text-[30px] text-green-500"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* ----------------------------------------------------------------------------------------------------NAME NAME NAME-------------------------------------------------- */}




                            <input className='text-[45px] text-center focus:outline-none focus:border-none border border-black w-[270px]' type="text" value={"Ibañez"} />

                            {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}
                            <span className={``}>
                                <button className={`${viewNamePen ? "show" : "hidden"}`} onClick={() => {
                                    setViewInputEditTitle(true)
                                }}>
                                    <i class="fa-solid fa-pen text-[30px]"></i>
                                </button>
                            </span>
                            {/* ----------------------------------------------------------------PEN BUTTON TITLE-------------------------------------------------- */}

                        </div>
                        
                        <input className='text-[45px] focus:outline-none focus:border-none' type="text" value={"94706333"} />
                        <input className='text-[45px] focus:outline-none focus:border-none' type="text" value={"luis@gmail.com"} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Configuration