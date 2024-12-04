import React from 'react';

function TarjetaMateria() {
  return (
    <div>
      <div className='w-[25vw] h-[400px] rounded-br-[30px] m-auto mt-[10%]'>
        {/* Título */}
        <div className='w-[25vh] h-[35px] flex flex-row justify-center items-center rounded-t-[15px] bg-[#a1d9d9]'>
          <h1 className=''>MATEMATICA</h1>
        </div>
        {/* Contenedor de la imagen */}
        <div className='w-full h-[54%]  rounded-tr-[30px]'>
          <div
            className='w-full h-full  rounded-tr-[30px]'
            style={{
              backgroundImage: "url('https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        <div className='p-4 w-full h-[148px] rounded-br-[30px] bg-[#a1d9d9]'>
            <p className='text-justify font-light text-[18px]'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem recusandae, natus explicabo cum corporis impedit eligendi totam consequatur aperiam eius sed!. </p>
        </div>
      </div>
    </div>
  );
}

export default TarjetaMateria;

// import React from 'react';

// function TarjetaMateria() {
//   return (
//     <div>
//       <div className='w-[25vw] h-[400px] border border-blue-500 rounded-br-[30px] m-auto'>
//         {/* Título */}
//         <div className='w-[25vh] h-[35px] flex flex-row justify-center items-center border border-black rounded-t-[15px] bg-[#a1d9d9]'>
//           <h1 className=''>MATEMATICA</h1>
//         </div>
//         {/* Contenedor de la imagen */}
//         <div className='w-full h-[54%] border border-red-600 rounded-tr-[30px]'>
//           <div
//             className='w-full h-full border border-black rounded-tr-[30px]'
//             style={{
//               backgroundImage: "url('https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6')",
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           ></div>
//         </div>
//         <div className='p-4 w-full h-[148px] border border-black rounded-br-[30px] bg-[#a1d9d9]'>
//             <p className='text-justify font-light text-[18px]'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem recusandae, natus explicabo cum corporis impedit eligendi totam consequatur aperiam eius sed!. </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TarjetaMateria;
