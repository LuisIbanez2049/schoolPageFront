import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserCardAdmin from './UserCardAdmin';

function AdminViewUsers() {

  const token = localStorage.getItem("userToken")
  let tokenSinComillas = token.replace(/"/g, '');

  const [users, setUsers] = useState([])
  const [originalUsers, setOriginalUsers] = useState([]); // Mantiene los datos originales
  const [auxOriginalUsers, setAuxOriginalUsers] = useState([])
  const [aux2OriginalUsers, setAux2OriginalUsers] = useState([])
  const [valueInputSearch, setValueInputSearch] = useState("")
  const [valueInputSelectRol, setValueInputSelectRol] = useState("all")
  const [valueInputSelectSubject, setValueInputSelectSubject] = useState("all")


  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/api/usuarios/", {
      headers: {
        Authorization: `Bearer ${tokenSinComillas}`
      }
    })
      .then((response) => {
        console.log(response.data)
        setUsers(response.data)
        setOriginalUsers(response.data); // Guarda la copia original
        setAuxOriginalUsers(response.data)
        setAux2OriginalUsers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8080/api/materias/all", {
      headers: {
        Authorization: `Bearer ${tokenSinComillas}`
      }
    })
      .then((response) => {
        setSubjects(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // useEffect(() => {
  //   if (valueInputSearch.trim() === "") {
  //     setUsers(auxOriginalUsers); // Restaurar los datos originales si el input está vacío
  //   } else {
  //     let filteredUsers = auxOriginalUsers.filter(user =>
  //       (user.name + " " + user.lastName).toLowerCase().includes(valueInputSearch.toLowerCase()) || (user.dni).toLowerCase().includes(valueInputSearch.toLowerCase())) // Filtra por nombre y apellido;
  //     setUsers(filteredUsers);
  //   }
  // }, [valueInputSearch, originalUsers]);

  // useEffect(() => {
  //   if (valueInputSelectRol === "all") {
  //     setUsers(originalUsers); // Restaurar los datos originales si el input está vacío
  //     setAuxOriginalUsers(originalUsers)
  //   } else {
  //     let filteredUsersSelect = originalUsers.filter(user =>
  //       (user.rol).toLowerCase().includes(valueInputSelectRol.toLowerCase()) // Filtra por nombre y apellido
  //     );
  //     setUsers(filteredUsersSelect);
  //     setAuxOriginalUsers(filteredUsersSelect)
  //   }
  // }, [valueInputSelectRol, originalUsers]);


  useEffect(() => {
    if (valueInputSearch.trim() === "") {
      setUsers(auxOriginalUsers); // Restaurar los datos originales si el input está vacío
    } else {
      let filteredUsers = auxOriginalUsers.filter(user =>
        (user.name + " " + user.lastName).toLowerCase().includes(valueInputSearch.toLowerCase()) || (user.dni).toLowerCase().includes(valueInputSearch.toLowerCase())) // Filtra por nombre y apellido;
      setUsers(filteredUsers);
    }
  }, [valueInputSearch, originalUsers]);

  useEffect(() => {
    if (valueInputSelectRol === "all") {
      setUsers(aux2OriginalUsers); // Restaurar los datos originales si el input está vacío
      setAuxOriginalUsers(aux2OriginalUsers)
    } else {
      let filteredUsersSelect = aux2OriginalUsers.filter(user =>
        (user.rol).toLowerCase().includes(valueInputSelectRol.toLowerCase()) // Filtra por nombre y apellido
      );
      setUsers(filteredUsersSelect);
      setAuxOriginalUsers(filteredUsersSelect)
    }
  }, [valueInputSelectRol, originalUsers]);

  useEffect(() => {
    if (valueInputSelectSubject === "all") {
      setUsers(originalUsers); // Restaurar los datos originales si el input está vacío
      setAuxOriginalUsers(originalUsers)
    } else {
      let filteredUsersSelectSubject = originalUsers.filter((user) => 
        user.usuarioMaterias.some(
          (usuarioMateria) => 
            usuarioMateria.nombreMateria === valueInputSelectSubject
        ));
      setUsers(filteredUsersSelectSubject);
      setAux2OriginalUsers(filteredUsersSelectSubject)
    }
  }, [valueInputSelectSubject, originalUsers]);

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex flex-row justify-center'>
        <div className=' relative w-[95%] flex flex-col items-center border border-black'>


          <h1 className='font-bold text-[30px]'>USERS</h1>


          {/* ----------------------------------------------------FILTROS---------------------------------------------------- */}
          <div className='flex flex-row justify-center items-center gap-6 border border-black' >

            <input value={valueInputSearch} type="text" placeholder='Search by name or DNI...' className='bg-slate-200 p-2 rounded-md my-[20px]' onChange={(e) => setValueInputSearch(e.target.value)} />

            <select name="" id="" value={valueInputSelectRol} className='bg-slate-200 p-2 rounded-md' onChange={(e) => {
              setValueInputSelectRol(e.target.value)
              setValueInputSearch("")
            }}>
              <option value="all">ALL ROLS</option>
              <option value="estudiante">STUDENT</option>
              <option value="profesor">PROFESSOR</option>
              <option value="admin">ADMIN</option>
            </select>



            <select name="" id="" className='bg-slate-200 p-2 rounded-md' onChange={(e) => {
              setValueInputSelectSubject(e.target.value)
              setValueInputSelectRol("all")
              setValueInputSearch("")
              
            }}>
              <option value="all">ALL SUBJECTS</option>
              {subjects && subjects.length > 0 && subjects.map(subject => {
                return (<>
                 <option value={subject.nombre}> {(subject.nombre).toUpperCase()} </option>
                </>)
              })}
            </select>
          </div>
          {/* ----------------------------------------------------FILTROS---------------------------------------------------- */}


          <div className='flex flex-row gap-8'>
            {users && users.length > 0 && users.map(user => {
              return (<>
                <UserCardAdmin userId={user.id} nombre={user.name + " " + user.lastName} dni={user.dni} rol={user.rol} />
              </>)
            })}
          </div>


        </div>
      </div>
    </div>
  )
}

export default AdminViewUsers