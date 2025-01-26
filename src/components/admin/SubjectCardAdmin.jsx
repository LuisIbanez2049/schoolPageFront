import React from 'react'

function SubjectCardAdmin({nombre, color}) {
    return (
        <div className={`w-full bg-[${color}] rounded-[12px] text-[#000000af]`}>
            <h1 className='font-extrabold text-[30px] text-center px-1 py-3'>{nombre}</h1>
        </div>
    )
}

export default SubjectCardAdmin