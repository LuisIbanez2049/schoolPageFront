import React from 'react'

function ContentCardAdmin({contentId}) {


    const [titleContent, setTitleContent] = useState("")
    const [descriptionSubject, setDescriptionSubject] = useState("")
    const [fileContent, setFileContent] = useState("")

    const [showInputTitle, setShowInputTitle] = useState(false)
    const [isDisabledInputTitle, setIsDisabledInputTitle] = useState(true)

    const [showInputDescription, setShowInputDescription] = useState(false)
    const [isDisabledInputDescription, setIsDisabledInputDescription] = useState(true)

    const [showInputFile, setShowInputFile] = useState(false)
    const [isDisabledInputFile, setIsDisabledInputFile] = useState(true)

    return (
        <div>
            {/* --------------------------------------------------------------------------------------------------------------EDIT TITLE SUBJECT--------------------------------------------------------------------  */}
            <div className='mt-[20px]'>
                <div className='flex flex-row'>

                    <input disabled={isDisabledInputTitle} type="text" value={titleContent} className='w-[95%] text-[16px] lg:text-[20px] bg-slate-200 p-1 lg:p-2 rounded-[10px] font-bold text-[#000000cc]'
                        onChange={(e) => setTitleContent(e.target.value)} />

                    <button className='ml-[10px]' onClick={() => {
                        setShowInputTitle(true)
                        setIsDisabledInputTitle(false)
                    }}>
                        <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                    </button>
                </div>

                <div className={`${showInputTitle ? "show" : "hidden"} flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}>
                    <button onClick={() => {
                        const upDateBody = {
                            idMateria: id,
                            nombre: titleSubject,
                            descripcion: "",
                            portada: ""
                        }
                        editSubject(upDateBody)
                    }}>
                        <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                    </button>

                    <button onClick={() => {
                        setShowInputTitle(false)
                        setTitleSubject(subject && subject.nombre)
                        setIsDisabledInputTitle(true)
                    }}>
                        <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                    </button>
                </div>
            </div>
            {/* --------------------------------------------------------------------------------------------------------------EDIT TITLE SUBJECT--------------------------------------------------------------------  */}




            {/* --------------------------------------------------------------------------------------------------------------EDIT PORTADA SUBJECT--------------------------------------------------------------------  */}
            <div className='mt-[20px]'>
                <div className='flex flex-row'>

                    <input disabled={isDisabledInputPortada} type="text" value={portadaSubject} className='w-[95%] text-[14px] lg:text-[18px] bg-slate-200 p-1 lg:p-2 rounded-[10px] text-[#000000cc]'
                        onChange={(e) => setPortadaSubject(e.target.value)} />

                    <button className='ml-[10px]' onClick={() => {
                        setShowInputPortada(true)
                        setIsDisabledInputPortada(false)
                    }}>
                        <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                    </button>
                </div>

                <div className={`${showInputPortada ? "show" : "hidden"} flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}>
                    <button onClick={() => {
                        const upDateBody = {
                            idMateria: id,
                            nombre: "",
                            descripcion: "",
                            portada: portadaSubject
                        }
                        editSubject(upDateBody)
                    }}>
                        <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                    </button>

                    <button onClick={() => {
                        setShowInputPortada(false)
                        setPortadaSubject(subject && subject.portada)
                        setIsDisabledInputPortada(true)
                    }}>
                        <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                    </button>
                </div>
            </div>
            {/* --------------------------------------------------------------------------------------------------------------EDIT PORTADA SUBJECT--------------------------------------------------------------------  */}




            {/* --------------------------------------------------------------------------------------------------------------EDIT DESCRIPTION SUBJECT--------------------------------------------------------------------  */}
            <div className='mt-[20px]'>
                <div className='flex flex-row'>

                    <textarea disabled={isDisabledInputDescription} type="text" value={descriptionSubject} className='w-[95%] h-[150px] text-[14px] lg:text-[18px] bg-slate-200 p-1 lg:p-2 rounded-[10px] text-[#000000cc]'
                        onChange={(e) => setDescriptionSubject(e.target.value)} />

                    <button className='ml-[10px]' onClick={() => {
                        setShowInputDescription(true)
                        setIsDisabledInputDescription(false)
                    }}>
                        <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                    </button>
                </div>

                <div className={`${showInputDescription ? "show" : "hidden"} flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}>
                    <button onClick={() => {
                        const upDateBody = {
                            idMateria: id,
                            nombre: "",
                            descripcion: descriptionSubject,
                            portada: ""
                        }
                        editSubject(upDateBody)
                    }}>
                        <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                    </button>

                    <button onClick={() => {
                        setShowInputDescription(false)
                        setDescriptionSubject(subject && subject.descripcion)
                        setIsDisabledInputDescription(true)
                    }}>
                        <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                    </button>
                </div>
            </div>
            {/* --------------------------------------------------------------------------------------------------------------EDIT DESCRIPTION SUBJECT--------------------------------------------------------------------  */}
        </div>
    )
}

export default ContentCardAdmin