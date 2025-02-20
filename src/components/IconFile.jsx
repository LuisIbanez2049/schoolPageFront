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


  function addFilesToAContent() {
    handleSubmit()
    let bodyAddFilesToAContent = {
      contentId: id,
      fileObjectList: data
    }
    axios.patch(`http://localhost:8080/api/contenido/addFiles`, bodyAddFilesToAContent, {
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




  const [openAddFilesForm, setOpenAddFilesForm] = useState(false)
  //----------------------------------------------------------------------------FORM ADD FILES//----------------------------------------------------------------------------

  const [forms, setForms] = useState([
    { id: Date.now(), values: { title: "", link: "", typeFile: "pdf", fileLogo: "fa-solid fa-file-pdf" } }
  ]);

  const [data, setData] = useState([]);

  const handleChange = (id, event) => {
    // setData(forms.map((form) => form.values));
    const { name, value } = event.target;
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, values: { ...form.values, [name]: value } } : form
      )
    );
  };

  const handleChangeIcon = (id, iconType, iconClass) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id
          ? { ...form, values: { ...form.values, typeFile: iconType, fileLogo: iconClass } }
          : form
      )
    );
  };

  const addForm = () => {
    setForms([
      ...forms,
      { id: Date.now(), values: { title: "", link: "", typeFile: "pdf", fileLogo: "fa-solid fa-file-pdf" } }
    ]);
  };

  const removeForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  const handleSubmit = (event) => {
    //  event.preventDefault();
    setData(forms.map((form) => form.values));
    console.log("Array de objetos:", data);
  };
  useEffect(() => {
    // console.log("Array de objetos:", data);
    setData(forms.map((form) => form.values));
  }, [forms])


  return (
    <div className='border border-black w-full'>
      <div className={`${userInformationLocalStorage.rol == "ADMIN" ? "SHOW" : `${userInformationLocalStorage.rol == "PROFESOR" ? "SHOW" : "hidden"}`}`}>
        <button className={`${files.length > 0 ? "show" : "hidden"} my-[15px]`} onClick={() => {
          setOpenEditFiles(true)
        }}>
          <h1 className='font-bold text-gray-600 bg-slate-300 p-1 rounded-md'>{`EDIT FILES`}</h1>
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


      <button className={`${userInformationLocalStorage.rol == "ADMIN" ? "SHOW" : `${userInformationLocalStorage.rol == "PROFESOR" ? "SHOW" : "hidden"}`}  my-[15px]`} onClick={() => {
        setOpenAddFilesForm(true)
      }}>
        <h1 className='font-bold text-gray-600 bg-slate-300 p-1 rounded-md'>{`ADD FILES`}</h1>
      </button>




      {/* -----------------------------------------------------------------------------------------------------------FORMULARIO ADD FILES---------------------------------------------- */}
      <div className={` ${openAddFilesForm ? "show" : "hidden"} p-4`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {forms.map((form) => (
            <div key={form.id} className="border p-4 rounded-lg relative">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.values.field1}
                onChange={(e) => handleChange(form.id, e)}
                className="block p-2 border rounded mb-2 w-full text-[13px] lg:text-[16px]"
              />
              <input
                type="text"
                name="link"
                placeholder="Link"
                value={form.values.field2}
                onChange={(e) => handleChange(form.id, e)}
                className="block p-2 border rounded mb-2 w-full text-[13px] lg:text-[16px]"
              />

              {/* Selector de íconos */}
              <div name="field3" className="ml-[15px] flex flex-row gap-2">
                <button
                  type="button"
                  onClick={() => handleChangeIcon(form.id, "pdf", "fa-solid fa-file-pdf")}
                >
                  <i className={`fa-solid fa-file-pdf p-2 text-[24px] rounded-md ${form.values.typeFile === "pdf" ? "text-[#ff0000d3] bg-gray-200" : "text-black"} hover:text-[#ff0000d3] hover:bg-gray-200`}></i>
                </button>

                <button
                  type="button"
                  onClick={() => handleChangeIcon(form.id, "img", "fa-solid fa-image")}
                >
                  <i className={`fa-solid fa-image p-2 text-[24px] rounded-md ${form.values.typeFile === "img" ? "text-[#0000ffd7] bg-gray-200" : "text-black"} hover:text-[#0000ffd7] hover:bg-gray-200`}></i>
                </button>

                <button
                  type="button"
                  onClick={() => handleChangeIcon(form.id, "video", "fa-brands fa-youtube")}
                >
                  <i className={`fa-brands fa-youtube p-2 text-[24px] rounded-md ${form.values.typeFile === "video" ? "text-[#ff0000d3] bg-gray-200" : "text-black"} hover:text-[#ff0000d3] hover:bg-gray-200`}></i>
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeForm(form.id)}
                className="rounded mt-2"
              >
                <i className="fa-solid fa-circle-xmark text-red-500 text-[30px] lg:text-[40px]"></i>
              </button>

            </div>
          ))}

          <button
            type="button"
            onClick={addForm}
            className={`relative ${forms.length == 0 ? "" : "right-[-120px] top-[-65px] lg:top-[-72px]"}  rounded`}
          >
            <i className={`fa-solid fa-circle-plus clas text-green-500 text-[30px] lg:text-[40px]`}></i>
          </button>

        </form>


        <div className='w-full flex flex-row justify-end'>
          <div className='p-3 flex flex-row gap-8 '>
            <button onClick={() => {
              setForms([
                { id: Date.now(), values: { title: "", link: "", typeFile: "pdf", fileLogo: "fa-solid fa-file-pdf" } }
              ])
              setOpenAddFilesForm(false)
            }}>
              <h1 className='rounded-[5px] p-1 lg:p-2 text-[16px] lg:text-[20px] bg-[#ff00007a] font-semibold'>CANCEL</h1>
            </button>
            <button onClick={() => addFilesToAContent()}> <h1 className='rounded-[5px] p-1 lg:p-2 text-[16px] lg:text-[20px] bg-[#00800094] font-semibold'>SUBMIT</h1> </button>
          </div>
        </div>

      </div>
      {/* -----------------------------------------------------------------------------------------------------------FORMULARIO ADD FILES---------------------------------------------- */}

      <div className={`${openEditFiles ? "show" : "hidden"} border border-slate-300 bg-slate-100 p-2 rounded-[15px]`}>
        <div className='w-full flex flex-row justify-end mb-[20px]'>
          <button onClick={() => setOpenEditFiles(false)}>
            <i className="fa-solid fa-circle-xmark text-red-500 text-[35px]"></i>
          </button>
        </div>

        <div className='flex flex-col gap-6 '>
          {files && files.length > 0 && files.map(file => {
            return (<>
              <EditIconFile fileId={file.id} />
            </>)
          })}
        </div>


      </div>


    </div>
  )
}

export default IconFile