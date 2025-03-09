import React, { useState } from 'react'

function InputContrasena2({ placeHolder, showErrorInputBorder, icon, value, onChange }) {


    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div>
            {/* Input con funcionalidad para mostrar/ocultar contraseña */}
            <div className="relative w-full">
                <i className={`${icon} absolute top-3 lg:top-2 left-2 text-[20px] lg:text-[30px] text-[#ffffffd7]`}></i>
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    className={`w-full rounded-md border ${showErrorInputBorder ? "border-[red]" : "border-white/20"} bg-white/10 py-2 lg:py-3 pl-12 pr-4 text-white placeholder-white/60 focus:border-white/40 focus:outline-none transition-colors peer relative z-10`}
                    placeholder=" "
                />
                <label
                    className={`absolute z-0 left-12 -top-[18px]  text-sm transition-all 
                   peer-placeholder-shown:text-base  peer-placeholder-shown:top-3
                   peer-focus:-top-[19px] peer-focus:text-sm text-white/60`}
                >
                    {placeHolder}
                </label>
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute z-10 right-3 top-2 lg:top-3 text-white/50 hover:text-white/70 focus:outline-none"
                >
                    {isPasswordVisible ? <> <i className={`fa-regular fa-eye text-[16px] lg:text-[20px]`}></i> </> : <> <i className={`fa-regular fa-eye-slash text-[16px] lg:text-[20px]`}></i> </>}
                </button>
            </div>
        </div>
    )
}

export default InputContrasena2