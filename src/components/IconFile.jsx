import axios from 'axios';
import React, { useEffect, useState } from 'react'

function IconFile({ id }) {

  const token = localStorage.getItem("userToken");
  let tokenSinComillas = token.replace(/"/g, "");
  const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))

  const [files, setFiles] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/contenido/admin/${id}`, {
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
      <div>
        <button className='my-[15px]'>
          <h1 className='font-bold text-gray-600 bg-slate-300 p-1 rounded-md'>EDIT FILES</h1>
        </button>
      </div>


      {/* ----------------------------------------------------FILES FILES FILES---------------------------------------------------- */}
      <div className='flex flex-row flex-wrap'>
        {files && files.length > 0 && files.map(file => {
          let color;
          if (file.tipoArchivo == "fa-brands fa-youtube") {
            color = "text-red-500"
          } else if (file.tipoArchivo == "fa-solid fa-image") {
            color = "text-blue-500"
          } else {
            color = "text-red-500"
          }

          return (<>
            <div className='flex flex-col items-center w-[90px] h-[65px] lg:h-[75px] overflow-hidden'>
              <a href={file.link} target="_blank" rel="noopener noreferrer">
                <i className={`${file.tipoArchivo} ${color} text-[30px] lg:text-[35px]`}></i>
              </a>
              <small className=' text-center text-[11px] lg:text-[13px]'>{file.name}</small>
            </div>
          </>)
        })}

      </div>
      {/* ----------------------------------------------------FILES FILES FILES---------------------------------------------------- */}

      <div>
        {files && files.length > 0 && files.map(file => {
          return (<>
           <div>
            <input type="text" />
           </div>
          </>)
        })}
      </div>


    </div>
  )
}

export default IconFile