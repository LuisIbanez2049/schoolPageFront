import React, { useState } from 'react';
import { use } from 'react';
import { Link } from 'react-router-dom';

function TarjetaMateria({ titulo, imagen, descripcion, bg, id }) {
  const [mouseIn, setMouseIn] = useState(false)
  return (
    <div>
      <Link to={`/materia/${id}`}>
        <div className=' relative w-[330px] lg:w-[450px] h-[380px] rounded-br-[30px] mt-[10%] ' onMouseEnter={() => {
          setMouseIn(true)
        }} onMouseLeave={() => {
          setMouseIn(false)
        }}>
          {/* Título */}
          {/* #a1d9d9 azul marino --  #a2b38b  verde  --  #c8677f rojo*/}
          <div className={` absolute w-[200px] h-[45px]  flex flex-row justify-center pt-[4px] rounded-t-[15px] bg-[${bg}] transition-all
        duration-300 transform ${mouseIn ? "top-[-40px]" : "top-[-34px]"} z-0`}>
            <h1 className=' '>{titulo}</h1>
          </div>
          {/* Contenedor de la imagen */}
          <div className=''>
            <div className=' relative w-full h-[180px] lg:h-[230px]  rounded-tr-[30px] z-10 '>
              <div
                className='w-full h-full  rounded-tr-[30px] '
                style={{
                  backgroundImage: `url('${imagen}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
            <div className={`p-3 lg:p-2 w-full h-[140px] lg:h-[149px] rounded-br-[30px] overflow-hidden bg-[${bg}]`}>
              <textarea name="" id="" className={`text-justify font-light text-[16px] lg:text-[18px] w-full h-full overflow-hidden bg-transparent cursor-pointer focus:outline-none transition-colors peer`}
               value={descripcion}></textarea>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TarjetaMateria;
