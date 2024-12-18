import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Materia() {

    const { id } = useParams()
    useEffect(() => {
        const token = localStorage.getItem("userToken")
        let tokenSinComillas = token.replace(/"/g, '');
        console.log(tokenSinComillas)
        console.log(id)
        axios.get(`http://localhost:8080/api/materias/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenSinComillas}`
            }
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
  return (
    <div>
        <h1></h1>
    </div>
  )
}

export default Materia