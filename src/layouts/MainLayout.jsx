import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Nav from '../components/Nav'
import { useSelector } from 'react-redux'
import FooterComponent from '../components/FooterComponent'

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

      <footer>
        <FooterComponent/>
      </footer>

    </div>
  )
}

export default MainLayout