import React from 'react'
import { Link } from 'react-router-dom'

function ContentCardAdmin({ idContent, color, nombre }) {
    return (
        <Link to={`/contentAdmin/${idContent}`}>
            <div className={`w-full bg-[${color}] rounded-[10px] lg:rounded-[12px] text-[#000000af]`}>
                <h1 className='font-extrabold text-[26px] lg:text-[30px] text-center px-1 py-2 lg:py-3'>{nombre}</h1>
            </div>
        </Link>
    )
}

export default ContentCardAdmin