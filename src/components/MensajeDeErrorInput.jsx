import React, { useState } from 'react'

function MensajeDeErrorInput({texto, showInput}) {

  const [show, setShow] = useState({showInput})
  return (
    <div>
      <div className= {`${showInput ? "show" : "hidden"} w-[270px] lg:w-[500px] `}>
        <p className="text-red-600 text-wrap bg-[#ffffff9d] inline-block  mt-[5px] p-1 rounded-[8px]"> {texto} <span> <i className="fa-solid fa-triangle-exclamation"></i> </span></p>
      </div>
    </div>
  )
}

export default MensajeDeErrorInput