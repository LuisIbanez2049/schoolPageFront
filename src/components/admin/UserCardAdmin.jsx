import React from 'react'
import { Link, useActionData } from 'react-router-dom'

function UserCardAdmin({ userId, nombre, dni, rol }) {
    return (
        <div>
            <Link to={`/userInformation/${userId}`}>
                <div className={`w-full bg-slate-200 rounded-[12px] text-[#000000af] px-3`}>
                    <h1 className='font-extrabold text-[30px] text-center py-3'>{nombre}</h1>
                    <h1 className='font-extrabold text-[24px] py-3'> DNI: {dni}</h1>
                    <h1 className='font-extrabold text-[24px] py-3'>ROL: {rol}</h1>
                </div>
            </Link>
        </div>
    )
}

export default UserCardAdmin