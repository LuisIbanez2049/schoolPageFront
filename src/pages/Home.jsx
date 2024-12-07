import React, { useState } from "react";
import InputGodEfecto from "../components/InputGodEfecto";
import BotonElegante from "../components/BotonElegante";
import InputContrasena from "../components/InputContrasena";

function Home() {
  const [buttonLogin, setButtonLogin] = useState("h-[100px] top-[-20px] rounded-tr-[20px]");
  const [buttonResgister, setButtonRegister] = useState("h-[80px] rounded-bl-[20px]");
  const [bgForm, setBgForm] = useState("bg-[#476C77]");
  const [logginIsClicked, setLogginIsClicked] = useState(true)
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
                    setLogginIsClicked(true)
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
                    setLogginIsClicked(false)
                  }}
                >
                  <h1 className="text-[35px] text-[white] ">REGISTER</h1>
                </button>
              </div>
            </div>

            {/* CONTENEDOR FORMULARIO LOGGIN*/}
            <div className={`w-full h-[80%] ${bgForm} flex felx-col items-center justify-center ${logginIsClicked ? "show" : "hidden"}`}>
              
              <form className="flex flex-col items-center  h-[180px] justify-between" action="">
                <InputGodEfecto placeHolder={"Ingrese email"} textColor={"text-[#dcdcdc]"} textColorLabelClicked={"#EFB071"} inputClickedColor={"#EFB071"} textColorPlaceHolder={"text-[#dcdcdc]"}/>
                <InputContrasena placeHolder={"Ingrese contraseña"} textColor={"text-[#dcdcdc]"} textColorLabelClicked={"#EFB071"} inputClickedColor={"#EFB071"} textColorPlaceHolder={"text-[#dcdcdc]"}/>
                <BotonElegante text={"LOGIN"} backGroundIsHovered={"bg-[#EFB071]"} textColor={"text-black"}/>
              </form>

            </div>



            {/* CONTENEDOR FORMULARIO REGISTER*/}
            <div className={`w-full h-[80%] ${bgForm} flex felx-col items-center justify-center ${logginIsClicked ? "hidden" : "show"}`}>
              
              <form className="flex flex-col items-center  h-[350px] justify-between " action="">
                <InputGodEfecto placeHolder={"Nombre"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"} textColorPlaceHolder={"text-[#535b61]"}/> 
                <InputGodEfecto placeHolder={"Apellido"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"} textColorPlaceHolder={"text-[#535b61]"}/> 
                <InputGodEfecto placeHolder={"Email"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"} textColorPlaceHolder={"text-[#535b61]"}/> 
                <InputGodEfecto placeHolder={"DNI"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"} textColorPlaceHolder={"text-[#535b61]"}/> 
                <InputContrasena placeHolder={"Contrsaeña"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"} textColorPlaceHolder={"text-[#535b61]"}/>
                <BotonElegante text={"REGISTER"} backGroundIsHovered={"bg-[#476C77]"} textColor={"text-white"}/>
              </form>

            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
