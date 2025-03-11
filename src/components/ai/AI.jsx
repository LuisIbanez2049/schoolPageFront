import React, { useState } from 'react'
import LoadingAI from "../../assets/loadingAI.gif"
import AiButton from "../../assets/aiButtonPS.png"
import dotenv from "dotenv"
import OpenAI from 'openai'
import Robot from "../../assets/robot.png"
import RobotAnimated from "../../assets/robotAnimated.gif"
import LoaderStars from "../../assets/loaderGif.gif"



function AI() {
    // dotenv.config();
    const [viewChatAi, setViewChatAi] = useState(false)
    const [viewWelcomeMessage, setViewWelcomeMessage] = useState(true)
    const [valueInputAi, setValueInputAi] = useState("")
    const [responseAi, setResponseAi] = useState("");
    const [messages, setMessages] = useState([]); // Historial de mensajes
    const [isLoading, setIsLoading] = useState(false); // Estado de carga

    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY, // En Vite, usa import.meta.env
        baseURL: import.meta.env.VITE_OPENAI_BASE_URL, // Necesario para usar OpenAI en frontend
        dangerouslyAllowBrowser: true
    });


    async function askAi() {
        if (!valueInputAi.trim()) return; // No enviar mensajes vacíos
        //setIsLoading(true)
        try {
            setIsLoading(true); // Iniciar estado de carga

            const updatedMessages = [...messages, { role: "user", content: valueInputAi }];
            setMessages(updatedMessages); // Mostrar el mensaje antes de recibir respuesta

            const chat = await openai.chat.completions.create({
                model: "qwen/qwen2.5-vl-72b-instruct:free",
                messages: updatedMessages,
            });
            console.log(chat)
            const aiResponse = chat.choices[0].message.content;

            setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
            setValueInputAi(""); // Limpiar el input después de enviar
            setIsLoading(false)
        } catch (error) {
            console.error("Error al comunicarse con la IA: ", error);
            alert("Ocurrió un error. Intenta de nuevo.");
        } finally {
            setIsLoading(false); // Terminar estado de carga
        }
    }


    // async function askAi() {
    //     console.log(valueInputAi)
    //     try {
    //         const chat = await openai.chat.completions.create({
    //             model: "qwen/qwen2.5-vl-72b-instruct:free",//   deepseek/deepseek-r1:free    qwen/qwen2.5-vl-72b-instruct:free
    //             messages: [{ role: "user", content: valueInputAi }],
    //         });
    //         console.log(chat.choices[0].message)
    //         console.log(chat)
    //         setResponseAi(chat.choices?.[0]?.message?.content || "No response received");
    //     } catch (error) {
    //         console.error("Error: ", error);
    //         console.log(error)
    //         setResponseAi("Error while fetching AI response");
    //         // askAi()
    //     }
    // }

    const handleChange = (event) => {
        setText(event.target.value);
        autoResize(event.target);
    };

    const autoResize = (textarea) => {
        textarea.style.height = "auto"; // Reinicia la altura para evitar crecimiento infinito
        textarea.style.height = textarea.scrollHeight + "px"; // Ajusta la altura al contenido
    };

    return (
        <div className=' fixed right-6 bottom-6 z-20 p-2'>

            <button onClick={() => setViewChatAi(true)}>
                <div className=' w-[70px] h-[70px] rounded-[12px] bg-slate-150'
                    style={{
                        backgroundImage: `url('${AiButton}')`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.3)",
                    }}>
                </div>
            </button>

            {/* <div className=' absolute top-[-515px] left-[-315px] border border-green-500 w-[400px] h-[600px]'>
                <input type="text" value={valueInputAi} className='bg-slate-200 p-2 rounded-lg' onChange={(e) => setValueInputAi(e.target.value)} />
                <button className='bg-green-400 rounded-lg p-1' onClick={() => askAi()}>SEND</button>
                <textarea name="" id="" className='w-[340px]' value={responseAi}></textarea>
            </div> */}


            <div className={`absolute top-[-545px] ${viewChatAi ? "show" : "hidden"} left-[-360px] border border-slate-200 shadow-md rounded-[15px] w-[450px] h-[640px] p-4 bg-[white]`}>

                <div className='w-full flex flex-row justify-end'>
                    <button onClick={() => setViewChatAi(false)}>
                        <i className="fa-solid fa-xmark text-[25px] text-[#00000094]"></i>
                    </button>
                </div>

                <div className="overflow-y-auto h-[500px] p-2">

                    <div className={` ${messages.length <= 0 ? "show" : "hidden"} w-full h-full flex flex-col justify-center items-center`}>
                        <h1 className='font-thin text-center text-[19px]'>This is the new chat box implemented with artificial intelligence. </h1>
                        <h1 className='font-thin text-center text-[19px]'>It will help you with any doubt! </h1>
                        <div className=' w-[180px] h-[180px] mt-[40px] opacity-[90%]'
                            style={{
                                backgroundImage: `url('${RobotAnimated}')`,
                                backgroundSize: '160% 150%',
                                backgroundPosition: 'center',
                                //boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.3)",
                            }}></div>
                    </div>


                    {messages.map((msg, index) => (
                        <p key={index} className={msg.role === "user" ? "text-blue-500" : "text-green-500"}>
                            <strong>{msg.role === "user" ? <><i className="fa-solid fa-user"></i></> : <><i className="fa-solid fa-robot"></i></>}</strong>
                            {/* {msg.content} */}
                            <textarea disabled key={index} name="" id="" value={msg.content} className={`w-full h-[100px] ${msg.role === "user" ? "bg-slate-50" : "bg-slate-200"}  p-1 rounded-[5px]`}></textarea>
                        </p>
                        // <textarea name="" id=""></textarea>
                    ))}
                </div>
                <div className=' w-full rounded-[10px] flex flex-row justify-center items-center gap-4 bg-[#FCFCFB] p-2'>
                    <input
                        type="text"
                        value={valueInputAi}
                        className="bg-slate-200 p-2 rounded-lg w-full h-[40px] border-b focus:border-[#74C0FC] focus:outline-none transition-colors peer"
                        onChange={(e) => setValueInputAi(e.target.value)}
                        disabled={isLoading} // Deshabilitar input mientras carga
                    />
                    <button
                        className=""
                        onClick={askAi}
                        disabled={isLoading} // Deshabilitar botón mientras carga
                    >
                        {isLoading ?
                            <>
                               {/* ----------------------AI Loader---------------------- */}
                               <div className=' rounded-[5px] w-[55px] h-[55px] '
                                    style={{
                                        backgroundImage: `url('${LoaderStars}')`,
                                        backgroundSize: '220% 130%',
                                        backgroundPosition: 'center',
                                    }}>
                                </div>
                                {/* ----------------------AI Loader---------------------- */}
                            </> : <>
                                <span className=''><i className="fa-brands fa-vuejs fa-rotate-270 text-[#74C0FC] text-[45px] hidden"></i></span>
                                {/* ----------------------AI Loader---------------------- */}
                                <div className=' rounded-full w-[50px] h-[50px] hidden'
                                    style={{
                                        backgroundImage: `url('${LoadingAI}')`,
                                        backgroundSize: '280% 230%',
                                        backgroundPosition: 'center',
                                    }}>
                                </div>
                                {/* ----------------------AI Loader---------------------- */}

                                {/* ----------------------AI Loader---------------------- */}
                                <div className=' rounded-[5px] w-[55px] h-[55px] hidden'
                                    style={{
                                        backgroundImage: `url('${LoaderStars}')`,
                                        backgroundSize: '220% 130%',
                                        backgroundPosition: 'center',
                                    }}>
                                </div>
                                {/* ----------------------AI Loader---------------------- */}

                            </>}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AI