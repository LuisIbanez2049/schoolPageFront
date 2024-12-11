import React, { useState } from 'react'

function MensajeDeErrorInput({texto, showInput}) {

  const [show, setShow] = useState({showInput})
  return (
    <div>
      <div className= {`${showInput ? "show" : "hidden"} w-[270px] lg:w-[500px]`}>
        <p className="text-red-600 text-wrap"> {texto} <span> <i className="fa-solid fa-triangle-exclamation"></i> </span></p>
      </div>
    </div>
  )
}

export default MensajeDeErrorInput