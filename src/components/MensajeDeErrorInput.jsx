import React from 'react'

function MensajeDeErrorInput({texto}) {
  return (
    <div>
        <p className="text-red-600"> {texto} <span> <i className="fa-solid fa-triangle-exclamation"></i> </span></p>
    </div>
  )
}

export default MensajeDeErrorInput