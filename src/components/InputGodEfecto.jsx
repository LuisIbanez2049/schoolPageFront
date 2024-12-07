import React from 'react'

function InputGodEfecto({placeHolder, textColorLabelClicked, inputClickedColor, textColor, textColorPlaceHolder}) {
  return (
    <div>
        {/* Input god --------------------------------------------------- */}
        <div className="relative w-[500px]">
                <input
                  type="text"
                  className= {`${textColor} w-full py-2 bg-transparent text-[17px] border-b border-gray-300 focus:border-[${inputClickedColor}] focus:outline-none transition-colors peer relative z-10`}
                  placeholder=" "
                />
                <label
                  className= {`absolute z-0 left-0 -top-3.5 ${textColorPlaceHolder} text-sm transition-all 
                   peer-placeholder-shown:text-base peer-placeholder-shown:${textColorPlaceHolder} peer-placeholder-shown:top-2
                   peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[${textColorLabelClicked}]`}
                >
                  {placeHolder}
                </label>
              </div>
              {/* Input god --------------------------------------------------- */}
    </div>
  )
}

export default InputGodEfecto