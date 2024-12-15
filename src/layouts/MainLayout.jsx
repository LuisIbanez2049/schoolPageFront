import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Nav from '../components/Nav'
import { useSelector } from 'react-redux'

function MainLayout() {

  const isLogged = localStorage.getItem("userToken")
  const isLoggedIn = useSelector(store => store.authenticationReducer.isLoggedIn)

  return (
    <div>
      <Header>
        <div className={`${isLoggedIn || isLogged ? "show" : "hidden"}`}>
         <Nav/>
        </div>
      </Header>
        <Outlet/>
    </div>
  )
}

export default MainLayout