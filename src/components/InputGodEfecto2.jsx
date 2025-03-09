import React from 'react'

function InputGodEfecto2({ placeHolder, showErrorInputBorder, value, onChange, icon }) {
  return (
    <div>
      {/* Input god --------------------------------------------------- [270px] lg:w-[500px] */}
      <div className={`relative w-full`}>
        <i className={`${icon} absolute top-3 lg:top-2 left-2 text-[20px] lg:text-[30px] text-[#ffffffd7]`}></i>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={`w-full rounded-md border ${showErrorInputBorder ? "border-[red]" : "border-white/20"} bg-white/10 py-2 lg:py-3 pl-12 pr-4 text-white placeholder-white/60 focus:border-white/40 focus:outline-none transition-colors peer relative z-10`}
          placeholder=" "
        />
        {/* border-white/20 */}
        <label
          className={`absolute z-0 left-12 -top-[18px]  text-sm transition-all 
                   peer-placeholder-shown:text-base  peer-placeholder-shown:top-3
                   peer-focus:-top-[19px] peer-focus:text-sm text-white/60`}
        >
          {placeHolder}
        </label>
      </div>
      {/* Input god --------------------------------------------------- */}
    </div>
  )
}

export default InputGodEfecto2