import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditIconFile from './EditIconFile';

function IconFile({ id }) {

  const token = localStorage.getItem("userToken");
  let tokenSinComillas = token.replace(/"/g, "");
  const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))

  const [files, setFiles] = useState([])
  const [openEditFiles, setOpenEditFiles] = useState(false)

  useEffect(() => {

    let aux;
    if (userInformationLocalStorage.rol == "ADMIN") {
      aux = "/admin/"
    } else { aux = "/" }
    axios
      .get(`http://localhost:8080/api/contenido${aux}${id}`, {
        headers: {
          Authorization: `Bearer ${tokenSinComillas}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setFiles(response.data.archivoDTOS)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(files)
  }, [files])


  return (
    <div className='border border-black w-full'>
      <div className={`${userInformationLocalStorage.rol == "ADMIN" ? "SHOW" : `${userInformationLocalStorage.rol == "PROFESOR" ? "SHOW" : "hidden"}`}`}>
        <button className='my-[15px]' onClick={() => {
          setOpenEditFiles(true)
        }}>
          <h1 className='font-bold text-gray-600 bg-slate-300 p-1 rounded-md'>{`${files.length > 0 ? "EDIT FILES" : "ADD FILES"}`}</h1>
        </button>
      </div>


      {/* ----------------------------------------------------FILES FILES FILES---------------------------------------------------- */}
      <div className={`${openEditFiles ? "hidden" : "show"} flex flex-row flex-wrap`}>
        {files && files.length > 0 && files.map(file => {
          let color;
          if (file.tipoArchivo == "fa-brands fa-youtube") {
            color = "text-red-500"
          } else if (file.tipoArchivo == "fa-solid fa-image") {
            color = "text-blue-500"
          } else {
            color = "text-red-800"
          }

          return (<>
            <div className='flex flex-col items-center w-[90px] h-[65px] lg:h-[75px]'>
              <a href={file.link} target="_blank" rel="noopener noreferrer">
                <i className={`${file.tipoArchivo} ${color} text-[30px] lg:text-[35px]`}></i>
              </a>
              <small className=' text-center text-[11px] lg:text-[13px] w-[90px] h-[40px] overflow-hidden'>{file.name}</small>
            </div>
          </>)
        })}

      </div>
      {/* ----------------------------------------------------FILES FILES FILES---------------------------------------------------- */}

      <div className={`${openEditFiles ? "show" : "hidden"} border border-slate-300 bg-slate-100 p-2 rounded-[15px]`}>
        <div className='w-full flex flex-row justify-end mb-[20px]'>
          <button onClick={() => setOpenEditFiles(false)}>
            <i className="fa-solid fa-circle-xmark text-red-500 text-[35px]"></i>
          </button>
        </div>

        <div className='flex flex-col gap-6 '>
          {files && files.length > 0 && files.map(file => {
            return (<>
             <EditIconFile fileId={file.id}/> 
            </>)
          })}
        </div>

      </div>


    </div>
  )
}

export default IconFile