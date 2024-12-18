import React, { useState } from 'react';
import { use } from 'react';
import { Link } from 'react-router-dom';

function TarjetaMateria({ titulo, imagen, descripcion, bg, id }) {
  const [mouseIn, setMouseIn] = useState(false)
  return (
    <div>
      <Link to={`/materia/${id}`}>
        <div className=' relative w-[450px] h-[400px] rounded-br-[30px] mt-[10%]' onMouseEnter={() => {
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
          <div className=' relative w-full h-[54%]  rounded-tr-[30px] z-10'>
            <div
              className='w-full h-full  rounded-tr-[30px] '
              style={{
                backgroundImage: `url('${imagen}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
          <div className={`p-4 w-full h-[148px] rounded-br-[30px] bg-[${bg}]`}>
            <p className='text-justify font-light text-[18px]'> {descripcion} </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TarjetaMateria;
