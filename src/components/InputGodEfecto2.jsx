import React from 'react'

function InputGodEfecto2({ placeHolder, textColorLabelClicked, inputClickedColor, textColor, textColorPlaceHolder, borderBottomInput, value, onChange }) {
  return (
    <div>
      {/* Input god --------------------------------------------------- */}
      <div className={`relative w-[270px] lg:w-[500px]`}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={`w-full rounded-md border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder-white/60 focus:border-white/40 focus:outline-none transition-colors peer relative z-10`}
          placeholder=" "
        />
        <label
          className={`absolute z-0 left-10 -top-3.5  text-sm transition-all 
                   peer-placeholder-shown:text-base  peer-placeholder-shown:top-2 
                   peer-focus:-top-3.5 peer-focus:text-sm text-white/60`}
        >
          {placeHolder}
        </label>
      </div>
      {/* Input god --------------------------------------------------- */}
    </div>
  )
}

export default InputGodEfecto2