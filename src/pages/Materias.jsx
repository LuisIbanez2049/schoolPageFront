import React from 'react'
import TarjetaMateria from '../components/TarjetaMateria'

function Materias() {
    return (
        <div className='bg-[#e0e2ed]'>
            <div className='w-full flex flex-row justify-around'>
                <TarjetaMateria titulo={"Matematica"} imagen={"https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6"}
                    descripcion={"Estudio del razonamiento lógico y analítico, abordando números, álgebra, geometría y más, para resolver problemas cotidianos y científicos."} />
                <TarjetaMateria titulo={"Matematica"} imagen={"https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6"}
                    descripcion={"Estudio del razonamiento lógico y analítico, abordando números, álgebra, geometría y más, para resolver problemas cotidianos y científicos."} />
                <TarjetaMateria titulo={"Matematica"} imagen={"https://www.gndiario.com/sites/default/files/styles/noticia_detalle_noticia_2_1/public/noticias/matematicas-dia-disciplina-DiMa.jpg?itok=q7DpqUV6"}
                    descripcion={"Estudio del razonamiento lógico y analítico, abordando números, álgebra, geometría y más, para resolver problemas cotidianos y científicos."} />
            </div>
        </div>
    )
}

export default Materias