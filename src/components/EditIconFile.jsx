import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';

function EditIconFile({ fileId }) {

    const token = localStorage.getItem("userToken");
    let tokenSinComillas = token.replace(/"/g, "");
    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))
    const [file, setFile] = useState({})

    const [nameFile, setNameFile] = useState("")
    const [nameFileInputDisabled, setNameFileInputDisabled] = useState(true)

    const [linkFile, setLinkFile] = useState("")
    const [linkFileInputDisabled, setLinkFileInputDisabled] = useState(true)

    const [iconFile, setIconFile] = useState("")
    const[editIconFile, setEditIconFile] = useState(false)


    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/archivo/${fileId}`, {
                headers: {
                    Authorization: `Bearer ${tokenSinComillas}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setFile(response.data)
                setNameFile(response.data.name)
                setIconFile(response.data.tipoArchivo)
                setLinkFile(response.data.link)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function editFile() {
        let body = { id: fileId, name: nameFile, tipoArchivo: iconFile, link: linkFile }
        console.log(body)
        axios.patch(`http://localhost:8080/api/archivo/editFile`, body, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                console.log(error);
            });
    }

    let color;
    if (iconFile == "fa-brands fa-youtube") {
        color = "text-red-500"
    } else if (iconFile == "fa-solid fa-image") {
        color = "text-blue-500"
    } else {
        color = "text-red-800"
    }



    return (
        <div>

            <div className=' relative flex flex-col gap-4 bg-slate-200 p-3 border border-slate-300 rounded-xl'>

                <div className=' absolute top-0 right-0 border border-black p-3'>
                    <button className={`${file.asset ? "show" : "hidden"}`}>
                      <i className="fa-solid fa-trash-can text-[22px] text-red-600"></i>
                    </button>

                    <button className={`${file.asset ? "hidden" : "show"}`}>
                      <i className="fa-solid fa-trash-can text-[22px] text-red-600"></i>
                    </button>
                </div>

                {/* --------------------------------------------------------TITLE TITLE TITLE-------------------------------------------------------- */}
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row gap-4'>
                        <input type="text" name="" id="" disabled={nameFileInputDisabled} value={nameFile}
                            className='bg-gray-300 p-2 rounded-[8px] text-[16px] w-[50%]'
                            onChange={(e) => setNameFile(e.target.value)} />

                        <button className={`${nameFileInputDisabled ? "show" : "hidden"}`} onClick={() => {
                            setNameFileInputDisabled(false)
                        }}>
                            <i className="fa-solid fa-pen text-[20px]"></i>
                        </button>
                    </div>
                    <div className={`${nameFileInputDisabled ? "hidden" : "show"} w-[50%] flex flex-row justify-end gap-3`}>
                        <button onClick={() => {
                            editFile()
                        }}>
                            <i className="fa-solid fa-circle-check text-[22px] text-green-500"></i>
                        </button>

                        <button onClick={() => {
                            setNameFile(file.name)
                            setNameFileInputDisabled(true)

                        }}>
                            <i className="fa-solid fa-circle-xmark text-[22px] text-red-500"></i>
                        </button>
                    </div>
                </div>
                {/* --------------------------------------------------------TITLE TITLE TITLE-------------------------------------------------------- */}



                {/* --------------------------------------------------------LINK LINK LINK-------------------------------------------------------- */}
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row gap-4'>
                        <input type="text" name="" id="" disabled={linkFileInputDisabled} value={linkFile}
                            className='bg-gray-300 p-2 rounded-[8px] text-[16px] w-[50%]'
                            onChange={(e) => setLinkFile(e.target.value)} />

                        <button className={`${linkFileInputDisabled ? "show" : "hidden"}`} onClick={() => {
                            setLinkFileInputDisabled(false)
                        }}>
                            <i className="fa-solid fa-pen text-[20px]"></i>
                        </button>
                    </div>
                    <div className={`${linkFileInputDisabled ? "hidden" : "show"} w-[50%] flex flex-row justify-end gap-3`}>
                        <button onClick={() => {
                            editFile()
                        }}>
                            <i className="fa-solid fa-circle-check text-[22px] text-green-500"></i>
                        </button>

                        <button onClick={() => {
                            setLinkFile(file.link)
                            setLinkFileInputDisabled(true)

                        }}>
                            <i className="fa-solid fa-circle-xmark text-[22px] text-red-500"></i>
                        </button>
                    </div>
                </div>
                {/* --------------------------------------------------------LINK LINK LINK-------------------------------------------------------- */}



                {/* --------------------------------------------------------ICON ICON ICON-------------------------------------------------------- */}
                <div className=''>

                    <div className=' flex flex-row gap-4'>
                        <div className='w-[50%] flex flex-row gap-8'>
                            <div className='flex flex-col justify-center items-center w-[90px] h-[65px] lg:h-[75px]'>
                                <a href={file.link} target="_blank" rel="noopener noreferrer">
                                    <i className={`${iconFile} ${color} text-[30px] lg:text-[45px]`}></i>
                                </a>
                            </div>

                            <div className={`${editIconFile ? "show" : "hidden"} h-full flex flex-row justify-center items-center`}>
                                <select name="" id="" className='p-2 rounded-[8px] font-bold bg-slate-50 border border-slate-400' onChange={(e) => {
                                    setIconFile(e.target.value)
                                }}>
                                    <option value={file.tipoArchivo}>Select icon</option>
                                    <option value="fa-solid fa-file-pdf">PDF</option>
                                    <option value="fa-solid fa-image">IMG</option>
                                    <option value="fa-brands fa-youtube">VIDEO</option>
                                </select>
                            </div>
                        </div>

                        <button className={`${editIconFile ? "hidden" : "show"}`} onClick={() => {
                            setEditIconFile(true)
                        }}>
                            <i className="fa-solid fa-pen text-[20px]"></i>
                        </button>
                    </div>


                    <div className='flex flex-row gap-3'>

                        <div className={`${editIconFile ? "show" : "hidden"} w-[50%] flex flex-row justify-end gap-3`}>
                            <button onClick={() => {
                                editFile()
                            }}>
                                <i className="fa-solid fa-circle-check text-[22px] text-green-500"></i>
                            </button>

                            <button onClick={() => {
                                setIconFile(file.tipoArchivo)
                                setEditIconFile(false)

                            }}>
                                <i className="fa-solid fa-circle-xmark text-[22px] text-red-500"></i>
                            </button>
                        </div>
                    </div>


                </div>
                {/* --------------------------------------------------------ICON ICON ICON-------------------------------------------------------- */}

            </div>

        </div>
    )
}

export default EditIconFile