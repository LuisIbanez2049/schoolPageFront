import React, { useState } from 'react'

function Home() {
    const [buttonLogin, setButtonLogin] = useState("h-[100px] top-[-20px] rounded-tr-[20px]")
    const [buttonResgister, setButtonRegister] = useState("h-[80px] rounded-bl-[20px]")
    const [bgForm, setBgForm] = useState("bg-[#476C77]")
    return (
        <div>
            <div className='flex flex-col min-h-screen bg-[#1a3c7d]'>
                <div className='w-full flex flex-row justify-center mt-[200px]'>
                    <div className='w-[800px] h-[500px] '>
                        {/* CONTENEDOR DOS BOTONES */}
                        <div className={`w-full h-[100px] flex flex-row ${bgForm}`}>
                            <div className={`relative w-[50%] ${buttonLogin} flex flex-row justify-center items-center bg-[#476C77]`}>
                                <button className='w-full h-full' onClick={() => {
                                    setButtonLogin("h-[100px] top-[-20px] rounded-tr-[20px]")
                                    setButtonRegister("h-[80px] rounded-bl-[20px]")
                                    setBgForm("bg-[#476C77]")
                                }}>
                                    <h1 className='text-[35px] text-[white] '>LOGIN</h1>
                                </button>
                            </div>

                            <div className={`relative w-[50%] ${buttonResgister} flex flex-row justify-center items-center bg-[#EFB071] `}>
                                <button className='w-full h-full' onClick={() => {
                                    setButtonLogin("h-[80px] rounded-br-[20px]")
                                    setButtonRegister("h-[100px] top-[-20px] rounded-tl-[20px]")
                                    setBgForm("bg-[#EFB071]")
                                }}>
                                    <h1 className='text-[35px] text-[white] '>REGISTER</h1>
                                </button>
                            </div>
                        </div>

                        {/* CONTENEDOR FORMULARIO */}
                        <div className={`w-full h-[80%] ${bgForm}`}>
                            <div>
                                <h1 className='text-[white]'>HOLA MUNGO</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home