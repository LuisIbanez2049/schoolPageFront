import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingView from "../LoadingView";
import ConfirmationPopUpAlert from "../ConfirmationPopUpAlert";
import ContentCardAdmin from "./ContentCardAdmin";

function SubjectAdmin() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    let tokenSinComillas = token.replace(/"/g, "");
    const [viewLoadingComponent, setViewLoadingComponent] = useState(false);
    const [viewConfirmationComponent, setViewConfirmationComponent] = useState(false);

    const [subject, setSubject] = useState({});
    const [contents, setContents] = useState([]);

    const [titleSubject, setTitleSubject] = useState("");
    const [descriptionSubject, setDescriptionSubject] = useState("");
    const [portadaSubject, setPortadaSubject] = useState("");
    const [accessCodeSubject, setAccessCodeSubject] = useState("")

    const [showInputTitle, setShowInputTitle] = useState(false);
    const [isDisabledInputTitle, setIsDisabledInputTitle] = useState(true);

    const [showInputDescription, setShowInputDescription] = useState(false);
    const [isDisabledInputDescription, setIsDisabledInputDescription] = useState(true);

    const [showInputPortada, setShowInputPortada] = useState(false);
    const [isDisabledInputPortada, setIsDisabledInputPortada] = useState(true);

    const [showInputAccessCode, setShowInputAccessCode] = useState(false);
    const [isDisabledInputAccessCode, setIsDisabledInputAccessCode] = useState(true);

    const [isOnClickAvailableContent, setIsOnClickAvailableContent] = useState(true);
    const [contentAvailable, setContentAvailable] = useState([]);
    const [contentDisabled, setContentDisabled] = useState([]);


    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [fileURL, setFileURL] = useState("")

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/materias/admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenSinComillas}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setSubject(response.data);
                setContents(response.data.contenidos);
                setTitleSubject(response.data.nombre);
                setPortadaSubject(response.data.portada);
                setDescriptionSubject(response.data.descripcion);
                setAccessCodeSubject(response.data.accessCode)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function editSubject(body) {
        setViewLoadingComponent(true);
        console.log(body);
        axios
            .patch(`http://localhost:8080/api/materias/modificarMateriaAdmin`, body, {
                headers: {
                    Authorization: `Bearer ${tokenSinComillas}`,
                },
            })
            .then((response) => {
                setViewLoadingComponent(false);
                console.log(response.data);
                //------------------------------------------------
                window.location.reload();
                //------------------------------------------------
            })
            .catch((error) => {
                setViewLoadingComponent(false);
                console.log(error);
            });
    }

    const handleOnConfirmFuntionPopUpComponent = () => {
        setViewLoadingComponent(true);
        if (subject && subject.asset) {
            axios
                .delete(`http://localhost:8080/api/materias/desactivar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${tokenSinComillas}`,
                    },
                })
                .then((response) => {
                    setViewLoadingComponent(false);
                    console.log(response.data);
                    navigate("/adminViewSubjects");
                })
                .catch((error) => {
                    setViewLoadingComponent(false);
                    console.log(error);
                });
        } else {
            axios
                .patch(
                    `http://localhost:8080/api/materias/activar/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${tokenSinComillas}`,
                        },
                    }
                )
                .then((response) => {
                    setViewLoadingComponent(false);
                    console.log(response.data);
                    navigate("/adminViewSubjects");
                })
                .catch((error) => {
                    setViewLoadingComponent(false);
                    console.log(error);
                });
        }
    };

    const handleOnCancelFuntionPopUpComponent = () => {
        setViewConfirmationComponent(false);
    };

    useEffect(() => {
        let auxAvailableContent =
            contents && contents.filter((content) => content.asset === true);
        setContentAvailable(auxAvailableContent);

        let auxDisableContent =
            contents && contents.filter((content) => content.asset === false);
        setContentDisabled(auxDisableContent);
    }, [subject]);




    const handleCreateAContent = async (event) => {
        setViewLoadingComponent(true)
        event.preventDefault()
        let bodyCreateContent = {
            idMateria: id,
            titulo: title,
            detalleContenido: description,
            archivo: fileURL,
        }
        console.log(bodyCreateContent)
        axios.post("http://localhost:8080/api/contenido/create", bodyCreateContent, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
            .then((response) => {
                setViewLoadingComponent(false)
                console.log(response.data)
                //------------------------------------------------
                window.location.reload()
                //------------------------------------------------
            })
            .catch((error) => {
                setViewLoadingComponent(false)
                console.log(error)
            })
    }



    return (
        <div className=" relative flex flex-col min-h-screen">
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <LoadingView show={viewLoadingComponent} />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}

            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
            <ConfirmationPopUpAlert isShow={viewConfirmationComponent} handleOnConfirmFunction={handleOnConfirmFuntionPopUpComponent} handleOnCancelFunction={handleOnCancelFuntionPopUpComponent}
                message={` ${subject && subject.asset ? "Do you want to disable this subject?" : "Do you want to enable this subject?"} `}
            />
            {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}


            <div className="w-full flex flex-row justify-center">
                <div className="w-[95%] mb-[80px]">
                    <div className="h-[200px] lg:h-[400px]"
                        style={{
                            backgroundImage: `url('${portadaSubject}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>


                    {/* -----------------------------------------------------------------------------------------------EDIT SUBJECT------------------------------------------------------------------------------------------ */}
                    <div>
                        {/* --------------------------------------------------------------------------------------------------------------EDIT TITLE SUBJECT--------------------------------------------------------------------  */}
                        <div className="mt-[20px]">
                            <div className="flex flex-row">
                                <input
                                    disabled={isDisabledInputTitle}
                                    type="text"
                                    value={titleSubject}
                                    className="w-[95%] text-[16px] lg:text-[20px] bg-slate-200 p-1 lg:p-2 rounded-[10px] font-bold text-[#000000cc]"
                                    onChange={(e) => setTitleSubject(e.target.value)}
                                />

                                <button className="ml-[10px]" onClick={() => {
                                    setShowInputTitle(true);
                                    setIsDisabledInputTitle(false);
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
                                        portada: "",
                                        accessCode: ""
                                    };
                                    editSubject(upDateBody);
                                }}>
                                    <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                                </button>

                                <button onClick={() => {
                                    setShowInputTitle(false);
                                    setTitleSubject(subject && subject.nombre);
                                    setIsDisabledInputTitle(true);
                                }}>
                                    <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                                </button>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------------------------------------------------------EDIT TITLE SUBJECT--------------------------------------------------------------------  */}

                        {/* --------------------------------------------------------------------------------------------------------------EDIT PORTADA SUBJECT--------------------------------------------------------------------  */}
                        <div className="mt-[20px]">
                            <div className="flex flex-row">
                                <input
                                    disabled={isDisabledInputPortada}
                                    type="text"
                                    value={portadaSubject}
                                    className="w-[95%] text-[14px] lg:text-[18px] bg-slate-200 p-1 lg:p-2 rounded-[10px] text-[#000000cc]"
                                    onChange={(e) => setPortadaSubject(e.target.value)}
                                />

                                <button className="ml-[10px]" onClick={() => {
                                    setShowInputPortada(true);
                                    setIsDisabledInputPortada(false);
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
                                        portada: portadaSubject,
                                        accessCode: ""
                                    };
                                    editSubject(upDateBody);
                                }}>
                                    <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                                </button>

                                <button onClick={() => {
                                    setShowInputPortada(false);
                                    setPortadaSubject(subject && subject.portada);
                                    setIsDisabledInputPortada(true);
                                }}>
                                    <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                                </button>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------------------------------------------------------EDIT PORTADA SUBJECT--------------------------------------------------------------------  */}

                        {/* --------------------------------------------------------------------------------------------------------------EDIT DESCRIPTION SUBJECT--------------------------------------------------------------------  */}
                        <div className="mt-[20px]">
                            <div className="flex flex-row">
                                <textarea
                                    disabled={isDisabledInputDescription}
                                    type="text"
                                    value={descriptionSubject}
                                    className="w-[95%] h-[150px] text-[14px] lg:text-[18px] bg-slate-200 p-1 lg:p-2 rounded-[10px] text-[#000000cc]"
                                    onChange={(e) => setDescriptionSubject(e.target.value)}
                                />

                                <button
                                    className="ml-[10px]"
                                    onClick={() => {
                                        setShowInputDescription(true);
                                        setIsDisabledInputDescription(false);
                                    }}
                                >
                                    <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                                </button>
                            </div>

                            <div
                                className={`${showInputDescription ? "show" : "hidden"
                                    } flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}
                            >
                                <button
                                    onClick={() => {
                                        const upDateBody = {
                                            idMateria: id,
                                            nombre: "",
                                            descripcion: descriptionSubject,
                                            portada: "",
                                            accessCode: ""
                                        };
                                        editSubject(upDateBody);
                                    }}
                                >
                                    <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                                </button>

                                <button
                                    onClick={() => {
                                        setShowInputDescription(false);
                                        setDescriptionSubject(subject && subject.descripcion);
                                        setIsDisabledInputDescription(true);
                                    }}
                                >
                                    <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                                </button>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------------------------------------------------------EDIT DESCRIPTION SUBJECT--------------------------------------------------------------------  */}

                        {/* --------------------------------------------------------------------------------------------------------------EDIT ACCESS CODE SUBJECT--------------------------------------------------------------------  */}
                        <div className="mt-[20px]">
                            <div className="flex flex-row">
                                <input
                                    disabled={isDisabledInputAccessCode}
                                    type="text"
                                    value={accessCodeSubject}
                                    className="w-[95%] text-[14px] lg:text-[18px] bg-slate-200 p-1 lg:p-2 rounded-[10px] text-[#000000cc]"
                                    onChange={(e) => setAccessCodeSubject(e.target.value)}
                                />

                                <button className="ml-[10px]" onClick={() => {
                                    setShowInputAccessCode(true);
                                    setIsDisabledInputAccessCode(false);
                                }}>
                                    <i className="fa-solid fa-pen text-[22px] lg:text-[25px]"></i>
                                </button>
                            </div>

                            <div className={`${showInputAccessCode ? "show" : "hidden"} flex flex-row justify-end gap-4 mr-[40px] lg:mr-[70px] py-1 lg:py-2`}>
                                <button onClick={() => {
                                    const upDateBody = {
                                        idMateria: id,
                                        nombre: "",
                                        descripcion: "",
                                        portada: "",
                                        accessCode: accessCodeSubject
                                    };
                                    editSubject(upDateBody);
                                }}>
                                    <i className="fa-solid fa-circle-check text-[green] text-[26px]"></i>
                                </button>

                                <button onClick={() => {
                                    setShowInputAccessCode(false);
                                    setAccessCodeSubject(subject && subject.accessCode);
                                    setIsDisabledInputAccessCode(true);
                                }}>
                                    <i className="fa-solid fa-circle-xmark text-[red] text-[26px]"></i>
                                </button>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------------------------------------------------------EDIT ACCESS CODE SUBJECT--------------------------------------------------------------------  */}

                    </div>
                    {/* -----------------------------------------------------------------------------------------------EDIT SUBJECT------------------------------------------------------------------------------------------ */}



                    {/* ---------------------------------------------------------------------------------BUTTON ENABLE OR DISABLE--------------------------------------------------------------------------------- */}
                    <div className="mb-[30px]">
                        <div className={` ${subject && subject.asset === true ? "show" : "hidden"} flex flex-row justify-center mt-[20px]`}>
                            <button onClick={() => setViewConfirmationComponent(true)}>
                                <h1 className="font-bold bg-[#ff0000af] p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] text-[13px] lg:text-[16px] shadow-md">
                                    DESIBLE SUBJECT
                                </h1>
                            </button>
                        </div>

                        <div className={`${subject && subject.asset === false ? "show" : "hidden"} flex flex-row justify-center mt-[20px]`}>
                            <button onClick={() => setViewConfirmationComponent(true)}>
                                <h1 className="font-bold bg-[#29e929c5] p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] text-[13px] lg:text-[16px] text-[#000000c2] shadow-md">
                                    ENABLE SUBJECT
                                </h1>
                            </button>
                        </div>
                    </div>
                    {/* ---------------------------------------------------------------------------------BUTTON ENABLE OR DISABLE--------------------------------------------------------------------------------- */}


                    {/* -----------------------------------------------------------------------------------------------------------FORMULARIO PARA CREAR CONTENIDO---------------------------------------------- */}
                    <div className="flex flex-row justify-center">
                        <div className={` w-[95%] lg:w-[1300px] border-2 border-[#00000060] p-3 rounded-[15px] bg-[#f3f2f2] mb-[30px]`}>
                            <form action="" onSubmit={handleCreateAContent}>
                                <h1 className={`text-[16px] lg:text-[25px] font-bold bg-[${subject && subject.color}] p-2 rounded-[8px] text-center`}>CREATE CONTENT</h1>

                                <div className='flex flex-col gap-4'>
                                    <input type="text"
                                        className={`h-[40px] lg:h-[50px] text-[15px] lg:text-[20px] w-full text-pretty font-light px-2 bg-transparent border-b border-[#00000071] focus:border-[${subject && subject.color}] focus:outline-none transition-colors peer`}
                                        placeholder='Title'
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value)
                                        }} />

                                    <textarea rows="4" cols="90" placeholder="Description..."
                                        className={`w-full text-pretty text-[15px] lg:text-[20px] font-light px-2 bg-transparent border border-[#00000071] rounded-md focus:border-[${subject && subject.color}] focus:outline-none transition-colors peer`}
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                        }} ></textarea>

                                    <input type="text"
                                        className={`h-[40px] lg:h-[50px] w-full text-[15px] lg:text-[20px] text-pretty font-light px-2 bg-transparent border-b border-[#00000071] focus:border-[${subject && subject.color}] focus:outline-none transition-colors peer`}
                                        placeholder='File URL'
                                        value={fileURL}
                                        onChange={(e) => {
                                            setFileURL(e.target.value)
                                        }} />

                                    <div className='w-full flex flex-row justify-end'>
                                        <div className='p-3 flex flex-row gap-8 '>
                                            <button onClick={() => {
                                                setTitle("")
                                                setDescription("")
                                                setFileURL("")
                                            }}>
                                                <h1 className='rounded-[5px] p-1 lg:p-2 text-[16px] lg:text-[20px] bg-[#ff00007a] font-semibold'>CANCEL</h1>
                                            </button>
                                            <button> <h1 className='rounded-[5px] p-1 lg:p-2 text-[16px] lg:text-[20px] bg-[#00800094] font-semibold'>SUBMIT</h1> </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* -----------------------------------------------------------------------------------------------------------FORMULARIO PARA CREAR CONTENIDO---------------------------------------------- */}



                    {/* ---------------------------------------------------------------------------CONTENT CARDS--------------------------------------------------------------------------- */}
                    <div>
                        {/* -------------------------------------------------BUTTONS "AVAILABLE" AND "DISABLED" SUBJECTS----------------------------------- */}
                        <div className=" relative flex flex-row justify-center gap-10 mb-[50px]">
                            <button
                                onClick={() => {
                                    setIsOnClickAvailableContent(true);
                                }}
                            >
                                {/* color button is selected: #db9854 */}
                                <h1 className={` w-[135px] text-[22px] lg:w-[145px] lg:text-[25px] font-bold ${isOnClickAvailableContent ? "bg-[#db9854]" : "bg-[#efb071]"}  py-1 px-2 rounded-[10px] text-[#000000af]`}>
                                    AVAILABLE
                                </h1>
                            </button>

                            <button onClick={() => { setIsOnClickAvailableContent(false) }}>
                                <h1 className={`w-[135px] text-[22px] lg:w-[145px] lg:text-[25px] font-bold ${isOnClickAvailableContent ? "bg-[#efb071]" : "bg-[#db9854]"} py-1 px-2 rounded-[10px] text-[#000000af]`}>
                                    DISABLED
                                </h1>
                            </button>
                        </div>
                        {/* -------------------------------------------------BUTTONS "AVAILABLE" AND "DISABLED" SUBJECTS----------------------------------- */}



                        <div className={`${isOnClickAvailableContent ? "show" : "hidden"}`}>
                            <div className="flex flex-col gap-8">
                                {contentAvailable && contentAvailable.length > 0 && contentAvailable.map((contenido) => {
                                    return (
                                        <>
                                            <ContentCardAdmin key={contenido.id} idContent={contenido.id} nombre={contenido.titulo} color={subject.color} />
                                        </>
                                    );
                                })}
                            </div>

                            <div className={`${contentAvailable && contentAvailable.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>

                        <div className={`${isOnClickAvailableContent ? "hidden" : "show"}`}>
                            <div className="flex flex-col gap-8">
                                {contentDisabled && contentDisabled.length > 0 && contentDisabled.map((contenido) => {
                                    return (
                                        <>
                                            <ContentCardAdmin key={contenido.id} idContent={contenido.id} nombre={contenido.titulo} color={subject.color} />
                                        </>
                                    );
                                })}
                            </div>

                            <div className={`${contentDisabled && contentDisabled.length == 0 ? "show" : "hidden"} `}>
                                <h1 className="font-extrabold text-[40px] text-[#00000075] text-center">
                                    NO RESULTS
                                </h1>
                            </div>
                        </div>
                    </div>
                    {/* ---------------------------------------------------------------------------CONTENT CARDS--------------------------------------------------------------------------- */}

                </div>
            </div>
        </div>
    );
}

export default SubjectAdmin;
