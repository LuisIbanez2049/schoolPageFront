import { useState } from 'react'
import Materias from './pages/Materias'
import Home from './pages/Home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { useSelector } from 'react-redux'

function App() {
  const isLogged = localStorage.getItem("userToken")
  const isLoggedIn = useSelector(store => store.authenticationReducer.isLoggedIn)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            {/* {isLoggedIn ? <>
              <Route path='/materias' element={<Materias />}></Route>
            </> : isLogged ? <>

              <Route path='/materias' element={<Materias />}></Route>
              <Route path='*' element={<Navigate to={"/materias"} />}></Route>

            </> : <>
              <Route index element={<Home />}></Route>
            </>}
            <Route path='*' element={<Navigate to={"/"} />}></Route> */}

            {isLoggedIn || isLogged ? (
              <>
                {/* Si está logueado, redirigir a <Materias /> */}
                <Route path='/materias' element={<Materias />}></Route>
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
