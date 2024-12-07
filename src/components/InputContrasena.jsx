import React, { useState } from 'react'

function InputContrasena({ placeHolder, textColorLabelClicked, inputClickedColor, textColor, textColorPlaceHolder }) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
      };

  return (
    <div>
      {/* Input con funcionalidad para mostrar/ocultar contraseña */}
      <div className="relative w-[500px]">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          className={`${textColor} w-full py-2 bg-transparent border-b text-[17px] border-gray-300 focus:border-[${inputClickedColor}] focus:outline-none transition-colors peer relative z-10`}
          placeholder=" "
        />
        <label
          className={`absolute z-0 left-0 -top-3.5 ${textColorPlaceHolder} text-sm transition-all 
           peer-placeholder-shown:text-base peer-placeholder-shown:${textColorPlaceHolder} peer-placeholder-shown:top-2
           peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[${textColorLabelClicked}]`}
        >
          {placeHolder}
        </label>
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute z-10 right-0 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {isPasswordVisible ? <> <i className= {`fa-regular fa-eye ${textColorPlaceHolder}`}></i> </> : <> <i className= {`fa-regular fa-eye-slash ${textColorPlaceHolder}`}></i> </>}
        </button>
      </div>
    </div>
  )
}

export default InputContrasena