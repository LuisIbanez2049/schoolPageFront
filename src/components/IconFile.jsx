import React from 'react'

function IconFile({ logo, link, title }) {

    let color;
    if (logo == "fa-brands fa-youtube") {
        color = "text-red-500"
    } else if (logo == "fa-solid fa-image") {
        color = "text-blue-500"
    } else {
        color = "text-red-500"
    }
  return (
    <div>
        <div className='flex flex-col items-center w-[90px] h-[65px] lg:h-[75px] overflow-hidden'>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <i className={`${logo} ${color} text-[30px] lg:text-[35px]`}></i>
            </a>
          <small className=' text-center text-[11px] lg:text-[13px]'>{title}</small>
        </div>
    </div>
  )
}

export default IconFile