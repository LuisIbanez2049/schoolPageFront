import React, { useState } from 'react'
import LoadingAI from "../../assets/loadingAI.gif"
import AiButton from "../../assets/aiButtonPS.png"
import dotenv from "dotenv"
import OpenAI from 'openai'



function AI() {
    // dotenv.config();
    const [viewChatAi, setViewChatAi] = useState(false)
    const [valueInputAi, setValueInputAi] = useState("")
    const [responseAi, setResponseAi] = useState("");

    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY, // En Vite, usa import.meta.env
        baseURL: import.meta.env.VITE_OPENAI_BASE_URL, // Necesario para usar OpenAI en frontend
        dangerouslyAllowBrowser: true
    });


    async function askAi() {
        console.log(valueInputAi)
        try {
            const chat = await openai.chat.completions.create({
                model: "deepseek/deepseek-r1:free",
                messages: [{ role: "user", content: valueInputAi }],
            });
            console.log(chat.choices[0].message)
            setResponseAi(chat.choices?.[0]?.message?.content || "No response received");
        } catch (error) {
            console.error("Error: ", error);
            setResponseAi("Error while fetching AI response");
        }
    }

    return (
        <div className=' fixed right-6 bottom-6 z-10 p-2 border-2 border-red-700'>

            {/* ----------------------AI Loader---------------------- */}
            <div className=' rounded-full w-[80px] h-[80px] hidden'
                style={{
                    backgroundImage: `url('${LoadingAI}')`,
                    backgroundSize: '280% 230%',
                    backgroundPosition: 'center',
                }}>
            </div>
            {/* ----------------------AI Loader---------------------- */}

            <button>
                <div className=' w-[70px] h-[70px] rounded-[12px] bg-slate-150'
                    style={{
                        backgroundImage: `url('${AiButton}')`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.3)",
                    }}>
                </div>
            </button>

            <div className=' absolute top-[-515px] left-[-315px] border border-green-500 w-[400px] h-[600px]'>
                <input type="text" value={valueInputAi} className='bg-slate-200 p-2 rounded-lg' onChange={(e) => setValueInputAi(e.target.value)} />
                <button className='bg-green-400 rounded-lg p-1' onClick={() => askAi()}>SEND</button>
                <textarea name="" id="" className='w-[340px]' value={responseAi}></textarea>
            </div>

        </div>
    )
}

export default AI