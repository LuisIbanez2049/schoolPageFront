import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SubjectCardAdmin from './SubjectCardAdmin';

function AdminViewSubjects() {

  const token = localStorage.getItem("userToken")
  let tokenSinComillas = token.replace(/"/g, '');

  const [isOnClickAvailableSubjects, setisOnClickAvailableSubjects] = useState(true)
  const [subjects, setSubjects] = useState([])
  const [subjectsAvailable, setSubjectsAvailable] = useState([])
  const [subjectsDisabled, setSubjectsDisabled] = useState([])


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




  return (
    <div className='flex flex-col min-h-screen'>

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