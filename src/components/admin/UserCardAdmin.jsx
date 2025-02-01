import React from 'react'
import { Link } from 'react-router-dom'

function UserCardAdmin(userId) {
    return (
        <div>
            <Link to={`/subjectAdmin/${idSubject}`}>
                <div className={`w-full bg-slate-200 rounded-[12px] text-[#000000af]`}>
                    <h1 className='font-extrabold text-[30px] text-center px-1 py-3'>{nombre}</h1>
                </div>
            </Link>
        </div>
    )
}

export default UserCardAdmin