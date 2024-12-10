import React, { useState } from 'react'

function MensajeDeErrorInput({texto, showInput}) {

  const [show, setShow] = useState({showInput})
  return (
    <div>
      <div className= {`${showInput ? "show" : "hidden"}`}>
        <p className="text-red-600"> {texto} <span> <i className="fa-solid fa-triangle-exclamation"></i> </span></p>
      </div>
    </div>
  )
}

export default MensajeDeErrorInput