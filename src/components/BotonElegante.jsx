import React, { useState } from 'react'

function BotonElegante({backGroundIsHovered, textColor, text, onClick}) {
    const [isHovered, setIsHovered] = useState(false)
  return (
    // bg-[#EFB071]: claro  -- bg-[#2e464e] : obscuro
    <button
    onClick={onClick && onClick}
    className={` z-10
        px-6 py-3 rounded-full font-semibold text-white
        transition-all duration-300 ease-in-out
        ${isHovered 
          ? `${backGroundIsHovered} ${textColor} shadow-lg transform -translate-y-1` // claro
          : 'bg-[#2e464e]'  // obscuro
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     {text}   
    </button>
  )
}

export default BotonElegante