// import React, { useState } from 'react'
// import LoadingAI from "../../assets/loadingAI.gif"
// import AiButton from "../../assets/aiButtonPS.png"
// import dotenv from "dotenv"
// import OpenAI from 'openai'
// import Robot from "../../assets/robot.png"
// import RobotAnimated from "../../assets/robotAnimated.gif"
// import LoaderStars from "../../assets/loaderGif.gif"





import React, { useState, useEffect, useRef } from 'react';
import LoadingAI from "../../assets/loadingAI.gif";
import AiButton from "../../assets/aiButtonPS.png";
import RobotAnimated from "../../assets/robotAnimated.gif";
import LoaderStars from "../../assets/loaderGif.gif";
import OpenAI from 'openai';
import { SyncLoader } from 'react-spinners';

function AI() {
    const [viewChatAi, setViewChatAi] = useState(false);
    const [valueInputAi, setValueInputAi] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        baseURL: import.meta.env.VITE_OPENAI_BASE_URL,
        dangerouslyAllowBrowser: true
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    async function askAi() {
        if (!valueInputAi.trim()) return; // No enviar mensajes vacíos
        setIsLoading(true);
    
        try {
            // Mensaje para mostrar en el chat (sin el texto adicional)
            const userMessageForChat = { role: "user", content: valueInputAi };
    
            // Mensaje para enviar a la IA (con el texto adicional)
            const userMessageForAI = { role: "user", content: valueInputAi + 
                "(In your answer, use HTML tags to create line breaks, lists, etc. because I'm using your API on my website. And in your answer, you don't mention anything inside these parentheses. Just focus on the text outside of these parentheses.)" };
    
            // Actualizar el estado del chat con el mensaje del usuario (sin el texto adicional)
            setMessages(prev => [...prev, userMessageForChat]);
    
            // Enviar el mensaje con el texto adicional a la IA
            const chat = await openai.chat.completions.create({
                model: "deepseek-reasoner",
                messages: [...messages, userMessageForAI], // Incluye el historial + el mensaje con el texto adicional
            });
            console.log(chat)
    
            // Obtener la respuesta de la IA
            const aiResponse = chat.choices[0].message.content;
    
            // Actualizar el estado del chat con la respuesta de la IA
            setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    
            // Limpiar el input después de enviar
            setValueInputAi("");
        } catch (error) {
            console.error("Error al comunicarse con la IA: ", error);
            alert("Ocurrió un error. Intenta de nuevo.");
        } finally {
            setIsLoading(false); // Terminar estado de carga
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            askAi();
        }
    };

    return (
        <div className='fixed right-1 lg:right-6 bottom-6 z-50 p-2'>
            <button onClick={() => setViewChatAi(true)}>
                <div className='w-[55px] lg:w-[70px] h-[55px] lg:h-[70px] rounded-[12px] bg-slate-150'
                    style={{
                        backgroundImage: `url('${AiButton}')`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.3)",
                    }}>
                </div>
            </button>

            <div className={`absolute top-[-545px] ${viewChatAi ? "show" : "hidden"} left-[-260px] lg:left-[-360px] border border-slate-200 shadow-md rounded-[15px] w-[320px] lg:w-[450px] h-[640px] p-4 bg-[white]`}>
                <div className='w-full flex flex-row justify-end'>
                    <button onClick={() => setViewChatAi(false)}>
                        <i className="fa-solid fa-xmark text-[25px] text-[#00000094]"></i>
                    </button>
                </div>

                <div className="overflow-y-auto h-[500px] p-2">
                    {messages.length <= 0 ? (
                        <div className='w-full h-full flex flex-col justify-center items-center'>
                            <h1 className='font-thin text-center text-[16px] lg:text-[19px]'>This is the new chat box implemented with artificial intelligence.</h1>
                            <h1 className='font-thin text-center text-[16px] lg:text-[19px]'>It will help you with any doubt!</h1>
                            <div className='w-[180px] h-[180px] mt-[40px] opacity-[90%]'
                                style={{
                                    backgroundImage: `url('${RobotAnimated}')`,
                                    backgroundSize: '160% 150%',
                                    backgroundPosition: 'center',
                                }}></div>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} my-2`}>
                                <div className={`max-w-[90%] p-2 rounded-lg ${msg.role === "user" ? "bg-[#74C0FC] text-white" : "bg-slate-200 text-black"}`}>
                                    {msg.role === "user" ? (
                                        <div>{msg.content}</div>
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/"/g, '') }} />
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex justify-start my-2">
                            <div className="bg-slate-200 p-3 rounded-lg">
                                {/* <i className="fa-solid fa-robot"></i> */}
                                <SyncLoader size={6}/>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className='w-full rounded-[10px] flex flex-row justify-center items-center gap-4 bg-[#FCFCFB] p-2'>
                    <input
                        type="text"
                        value={valueInputAi}
                        className="bg-slate-200 p-2 rounded-lg w-full h-[40px] border-b focus:border-[#74C0FC] focus:outline-none transition-colors peer"
                        onChange={(e) => setValueInputAi(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                    />
                    <button onClick={askAi} disabled={isLoading}>
                        {isLoading ? (
                            <div className='rounded-full w-[50px] h-[50px]'
                                style={{
                                    backgroundImage: `url('${LoadingAI}')`,
                                    backgroundSize: '280% 230%',
                                    backgroundPosition: 'center',
                                }}>
                            </div>
                        ) : (
                            <i className="fa-brands fa-vuejs fa-rotate-270 text-[#74C0FC] text-[45px]"></i>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AI;



