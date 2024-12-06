import React from 'react';

function TarjetaMateria({titulo, imagen, descripcion}) {
  return (
    <div>
      <div className='w-[25vw] h-[400px] rounded-br-[30px] mt-[10%]'>
        {/* Título */}
        <div className='w-[25vh] h-[35px] flex flex-row justify-center items-center rounded-t-[15px] bg-[#a1d9d9]'>
          <h1 className=''>{titulo}</h1>
        </div>
        {/* Contenedor de la imagen */}
        <div className='w-full h-[54%]  rounded-tr-[30px]'>
          <div
            className='w-full h-full  rounded-tr-[30px]'
            style={{
              backgroundImage: `url('${imagen}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            //https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6
          ></div>
        </div>
        <div className='p-4 w-full h-[148px] rounded-br-[30px] bg-[#a1d9d9]'>
            <p className='text-justify font-light text-[18px]'> {descripcion} </p>
        </div>
      </div>
    </div>
  );
}

export default TarjetaMateria;
