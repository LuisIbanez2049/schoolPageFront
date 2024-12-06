import React from 'react'

function InputGodEfecto({placeHolder}) {
  return (
    <div>
        {/* Input god --------------------------------------------------- */}
        <div className="relative w-[500px]">
                <input
                  type="text"
                  className="text-white w-full py-2 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors peer relative z-10"
                  placeholder=" "
                />
                <label
                  className="absolute z-0 left-0 -top-3.5 text-gray-600 text-sm transition-all 
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
                   peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
                >
                  {placeHolder}
                </label>
              </div>
              {/* Input god --------------------------------------------------- */}
    </div>
  )
}

export default InputGodEfecto