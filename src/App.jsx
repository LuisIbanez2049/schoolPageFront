import { useState } from 'react'
import Materias from './pages/Materias'
import Home from './pages/Home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { useSelector } from 'react-redux'
import Materia from './pages/Materia'
import Configuration from './pages/Configuration'
import AdminViewSubjects from './components/admin/AdminViewSubjects'
import SubjectAdmin from './components/admin/SubjectAdmin'

function App() {
  const isLogged = localStorage.getItem("userToken")
  const isLoggedIn = useSelector(store => store.authenticationReducer.isLoggedIn)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
           
            {isLoggedIn || isLogged ? (
              <>
                {/* Si está logueado, redirigir a <Materias /> */}
                <Route path='/materias' element={<Materias />}></Route>
                <Route path='/materia/:id' element={<Materia/>}></Route>
                <Route path='/configuration' element={<Configuration/>}></Route>
                <Route path='/adminViewSubjects' element={<AdminViewSubjects/>}/>
                <Route path='/subjectAdmin/:id' element={<SubjectAdmin/>}></Route>
                <Route path='*' element={<Navigate to="/materias" replace />} />
              </>
            ) : (
              <>
                {/* Si no está logueado, mostrar <Home /> */}
                <Route index element={<Home />} />
                <Route path='*' element={<Navigate to="/" replace />} />
              </>
            )}


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
