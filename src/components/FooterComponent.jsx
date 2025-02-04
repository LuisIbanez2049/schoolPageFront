import React from 'react'
import { useSelector } from 'react-redux'
import store from '../redux/store'

function FooterComponent() {

    const user = useSelector(store => store.authenticationReducer)
    const userInformationLocalStorage = JSON.parse(localStorage.getItem("userInformation"))
    return (
        <div className={` ${user.isLoggedIn || userInformationLocalStorage ? "show" : "hidden"} w-full pt-[20px]`}>
            <div className=' flex flex-row justify-center'>
                <div className='border-t-2 border-slate-400 flex flex-col items-center pb-5 pt-2'>
                    <div className='flex flex-row text-[20px] gap-4'>
                        <a href="https://github.com/LuisIbanez2049" target="_blank" rel="noopener noreferrer">
                            <span className='hover:text-[#27abcc]'> 《<i className="fa-brands fa-github"></i>》 </span>
                        </a>
                        <a href="https://www.linkedin.com/in/luis-iba%C3%B1ez-c/" target="_blank" rel="noopener noreferrer">
                            <span className='hover:text-[#0000ffde]'> 《<i className="fa-brands fa-linkedin"></i>》 </span>
                        </a>
                    </div>
                    <small className='text-slate-500 text-[15px]'> © {new Date().getFullYear()} Luis Ibañez. All rights reserved. </small>
                </div>
            </div>
        </div>
    )
}

export default FooterComponent