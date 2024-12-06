import React, { useState } from "react";

function Home() {
  const [buttonLogin, setButtonLogin] = useState(
    "h-[100px] top-[-20px] rounded-tr-[20px]"
  );
  const [buttonResgister, setButtonRegister] = useState(
    "h-[80px] rounded-bl-[20px]"
  );
  const [bgForm, setBgForm] = useState("bg-[#476C77]");
  const [placeHolder, setPlaceHolder] = useState("Ingresa tu mail");
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-[#1a3c7d]">
        <div className="w-full flex flex-row justify-center mt-[200px]">
          <div className="w-[800px] h-[500px] ">
            {/* CONTENEDOR DOS BOTONES */}
            <div className={`w-full h-[100px] flex flex-row ${bgForm}`}>
              <div
                className={`relative w-[50%] ${buttonLogin} flex flex-row justify-center items-center bg-[#476C77]`}
              >
                <button
                  className="w-full h-full"
                  onClick={() => {
                    setButtonLogin("h-[100px] top-[-20px] rounded-tr-[20px]");
                    setButtonRegister("h-[80px] rounded-bl-[20px]");
                    setBgForm("bg-[#476C77]");
                  }}
                >
                  <h1 className="text-[35px] text-[white] ">LOGIN</h1>
                </button>
              </div>

              <div
                className={`relative w-[50%] ${buttonResgister} flex flex-row justify-center items-center bg-[#EFB071] `}
              >
                <button
                  className="w-full h-full"
                  onClick={() => {
                    setButtonLogin("h-[80px] rounded-br-[20px]");
                    setButtonRegister(
                      "h-[100px] top-[-20px] rounded-tl-[20px]"
                    );
                    setBgForm("bg-[#EFB071]");
                  }}
                >
                  <h1 className="text-[35px] text-[white] ">REGISTER</h1>
                </button>
              </div>
            </div>

            {/* CONTENEDOR FORMULARIO */}
            <div className={`w-full h-[80%] ${bgForm}`}>
              <div>
                <h1 className="text-[white]">HOLA MUNGO</h1>
              </div>

              {/* Input god --------------------------------------------------- */}
              <div className="relative w-[60%]">
                <input
                  type="email"
                  className="text-white w-full py-2 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors peer relative z-10"
                  placeholder=" "
                  required
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
