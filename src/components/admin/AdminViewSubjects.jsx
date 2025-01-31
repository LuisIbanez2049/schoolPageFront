import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SubjectCardAdmin from './SubjectCardAdmin';
import LoadingView from '../LoadingView';

function AdminViewSubjects() {

  const token = localStorage.getItem("userToken")
  let tokenSinComillas = token.replace(/"/g, '');

  const [isOnClickAvailableSubjects, setisOnClickAvailableSubjects] = useState(true)
  const [subjects, setSubjects] = useState([])
  const [subjectsAvailable, setSubjectsAvailable] = useState([])
  const [subjectsDisabled, setSubjectsDisabled] = useState([])

  const [viewLoadingComponent, setViewLoadingComponent] = useState(false)


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [bannerURL, setBannerURL] = useState("")
  const [accessCode, setAccessCode] = useState("")


  useEffect(() => {
    axios.get("http://localhost:8080/api/materias/all", {
      headers: {
        Authorization: `Bearer ${tokenSinComillas}`
      }
    })
      .then((response) => {
        console.log(response.data)
        setSubjects(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    let auxAvailableSubjects = subjects && subjects.filter(subject => subject.asset === true)
    setSubjectsAvailable(auxAvailableSubjects)

    let auxDisabledSubjects = subjects && subjects.filter(subject => subject.asset === false)
    setSubjectsDisabled(auxDisabledSubjects)
  }, [subjects])



  const handleCreateSubject = async (event) => {
    setViewLoadingComponent(true)
    event.preventDefault()
    let bodyCreateSubject = {
      nombre: title,
      descripcion: description,
      portada: bannerURL,
      accessCode: accessCode
    }
    console.log(bodyCreateSubject)
    axios.post("http://localhost:8080/api/materias/create", bodyCreateSubject, {
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
    <div className='flex flex-col min-h-screen'>

      {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
      <LoadingView show={viewLoadingComponent} />
      {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}

      <div className=' flex flex-row justify-center'>
        <div className=' w-[95%] mt-[50px]'>

          {/* -------------------------------------------------BUTTONS "AVAILABLE" AND "DISABLED" SUBJECTS----------------------------------- */}
          <div className=' relative flex flex-row justify-center gap-10 mb-[50px]'>
            <button onClick={() => { setisOnClickAvailableSubjects(true) }}>
              {/* color button is selected: #db9854 */}
              <h1 className={` w-[135px] text-[22px] lg:w-[145px] lg:text-[25px] font-bold ${isOnClickAvailableSubjects ? "bg-[#db9854]" : "bg-[#efb071]"}  py-1 px-2 rounded-[10px] text-[#000000af]`}>AVAILABLE</h1>
            </button>

            <button onClick={() => { setisOnClickAvailableSubjects(false) }}>
              <h1 className={`w-[135px] text-[22px] lg:w-[145px] lg:text-[25px] font-bold ${isOnClickAvailableSubjects ? "bg-[#efb071]" : "bg-[#db9854]"} py-1 px-2 rounded-[10px] text-[#000000af]`}>DISABLED</h1>
            </button>
          </div>
          {/* -------------------------------------------------BUTTONS "AVAILABLE" AND "DISABLED" SUBJECTS----------------------------------- */}



          {/* -----------------------------------------------------------------------------------------------------------FORMULARIO PARA CREAR CONTENIDO---------------------------------------------- */}
          <div className="flex flex-row justify-center">
            <div className={` w-[95%] lg:w-[1300px] border-2 border-[#00000060] p-3 rounded-[15px] bg-[#f3f2f2] mb-[30px]`}>
              <form action="" onSubmit={handleCreateSubject}>
                <h1 className={`text-[16px] lg:text-[25px] font-bold bg-[#008000a4] p-2 rounded-[8px] text-center`}>CREATE SUBJECT</h1>

                <div className='flex flex-col gap-4'>
                  <input type="text"
                    className={`h-[40px] lg:h-[50px] text-[15px] lg:text-[20px] w-full text-pretty font-light px-2 bg-transparent border-b border-[#00000071] focus:border-[green] focus:outline-none transition-colors peer`}
                    placeholder='Title'
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }} />

                  <textarea rows="4" cols="90" placeholder="Description..."
                    className={`w-full text-pretty text-[15px] lg:text-[20px] font-light px-2 bg-transparent border border-[#00000071] rounded-md focus:border-[green] focus:outline-none transition-colors peer`}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }} ></textarea>

                  <input type="text"
                    className={`h-[40px] lg:h-[50px] w-full text-[15px] lg:text-[20px] text-pretty font-light px-2 bg-transparent border-b border-[#00000071] focus:border-[green] focus:outline-none transition-colors peer`}
                    placeholder='Banner URL'
                    value={bannerURL}
                    onChange={(e) => {
                      setBannerURL(e.target.value)
                    }} />

                  <input type="text"
                    className={`h-[40px] lg:h-[50px] w-full text-[15px] lg:text-[20px] text-pretty font-light px-2 bg-transparent border-b border-[#00000071] focus:border-[green] focus:outline-none transition-colors peer`}
                    placeholder='Access code'
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value)
                    }} />

                  <div className='w-full flex flex-row justify-end'>
                    <div className='p-3 flex flex-row gap-8 '>
                      <button onClick={() => {
                        setTitle("")
                        setDescription("")
                        setFileURL("")
                        setAccessCode("")
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



          {/* -------------------------------------------------AVAILABLE SUBJECTS----------------------------------- */}
          <div className={`${isOnClickAvailableSubjects ? "show" : "hidden"} flex flex-col gap-8`}>
            {subjectsAvailable && subjectsAvailable.length > 0 && subjectsAvailable.map(subject => {
              return <>
                <SubjectCardAdmin key={subject.id} idSubject={subject.id} nombre={subject.nombre} color={subject.color} />
              </>
            })}


            <div className={`${subjectsAvailable && subjectsAvailable.length == 0 ? "show" : "hidden"} `}>
              <h1 className='font-extrabold text-[40px] text-[#00000075] text-center'>NO RESULTS</h1>
            </div>

          </div>
          {/* -------------------------------------------------AVAILABLE SUBJECTS----------------------------------- */}





          {/* -------------------------------------------------DISABLED SUBJECTS----------------------------------- */}
          <div className={`${isOnClickAvailableSubjects ? "hidden" : "show"} flex flex-col gap-8`}>
            {subjectsDisabled && subjectsDisabled.length > 0 && subjectsDisabled.map(subject => {
              return <>
                <SubjectCardAdmin key={subject.id} idSubject={subject.id} nombre={subject.nombre} color={subject.color} />
              </>
            })}

            <div className={`${subjectsDisabled && subjectsDisabled.length == 0 ? "show" : "hidden"} `}>
              <h1 className='font-extrabold text-[40px] text-[#00000075] text-center'>NO RESULTS</h1>
            </div>
          </div>
          {/* -------------------------------------------------DISABLED SUBJECTS----------------------------------- */}



        </div>
      </div>
    </div>
  )
}

export default AdminViewSubjects