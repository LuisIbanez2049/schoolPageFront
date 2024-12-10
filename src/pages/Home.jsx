import React, { useState } from "react";
import InputGodEfecto from "../components/InputGodEfecto";
import BotonElegante from "../components/BotonElegante";
import InputContrasena from "../components/InputContrasena";
import MensajeDeErrorInput from "../components/MensajeDeErrorInput";
import axios from "axios";

function Home() {
  const [buttonLogin, setButtonLogin] = useState("h-[80px] lg:h-[100px] top-[-15px] lg:top-[-20px] rounded-tr-[20px]");
  const [buttonResgister, setButtonRegister] = useState("h-[67px] lg:h-[80px] rounded-bl-[20px]");
  const [bgForm, setBgForm] = useState("bg-[#476C77]");
  const [logginIsClicked, setLogginIsClicked] = useState(true)

  const [email, setEmail] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [mesaggeErrorEmail, setMesaggeErrorEmail] = useState("")
  const [mesaggeErrorContraseña, setMesaggeErrorContraseña] = useState("")


  const [emailR, setEmailR] = useState("")
  const [contraseñaR, setContraseñaR] = useState("")

  const [showErroeMessageInputEmail, setShowErroeMessageInputEmail] = useState(false)
  const [showErroeMessageInputContraseña, setShowErroeMessageInputContraseña] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    const bodyLogin = {
      email: email, 
      password: contraseña,
    }

    console.log(bodyLogin)

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", bodyLogin)
      console.log(response)
    } catch (error) {
      console.error(error.response ? error.response.data : error.message)
      let errorMesagge = error.response ? error.response.data : error.message
      if (errorMesagge.includes("email")) {
        setMesaggeErrorEmail(errorMesagge)
        setShowErroeMessageInputEmail(true)
      }
      if (errorMesagge.includes("password")) {
        setMesaggeErrorContraseña(errorMesagge)
        setShowErroeMessageInputContraseña(true)
      }
    }
  }
  



  return (
    <div>
      <div className="flex flex-col min-h-screen bg-[#1a3c7d]">
        <div className="w-full min-h-screen flex flex-row justify-center items-center">
          <div className="w-[95%] lg:w-[800px] h-[560px] ">

            {/* CONTENEDOR DOS BOTONES */}
            <div className={`w-full h-[80px] lg:h-[100px] flex flex-row ${bgForm} `}>

              {/* BOTON LOGIN */}
              <div
                className={`relative w-[50%] ${buttonLogin} flex flex-row justify-center items-center bg-[#476C77]`}
              >
                <button
                  className="w-full h-full"
                  onClick={() => {
                    setButtonLogin("h-[80px] lg:h-[100px] top-[-15px] lg:top-[-20px] rounded-tr-[20px]");
                    setButtonRegister("h-[67px] lg:h-[80px] rounded-bl-[20px]");
                    setBgForm("bg-[#476C77]");
                    setLogginIsClicked(true)
                  }}
                >
                  <h1 className="text-[25px] lg:text-[35px] text-[white] ">LOGIN</h1>
                </button>
              </div>

              {/* BOTON REGISTER */}
              <div
                className={`relative w-[50%] ${buttonResgister} flex flex-row justify-center items-center bg-[#EFB071] `}
              >
                <button
                  className="w-full h-full"
                  onClick={() => {
                    setButtonLogin("h-[67px] lg:h-[80px] rounded-br-[20px]");
                    setButtonRegister(
                      "h-[80px] lg:h-[100px] top-[-15px] lg:top-[-20px] rounded-tl-[20px]"
                    );
                    setBgForm("bg-[#EFB071]");
                    setLogginIsClicked(false)
                  }}
                >
                  <h1 className="text-[25px] lg:text-[35px] text-[white] ">REGISTER</h1>
                </button>
              </div>
            </div>

            {/* CONTENEDOR FORMULARIO LOGGIN*/}
            <div className={`w-full h-[90%] ${bgForm} flex felx-col items-center justify-center ${logginIsClicked ? "show" : "hidden"} `}>
              
              <form className="flex flex-col items-center justify-between gap-5" action="" onSubmit={handleLogin}>
                {/* #EFB071 */}
                <div className="">
                <InputGodEfecto placeHolder={"Ingrese email"} textColor={"text-[#dcdcdc]"} textColorLabelClicked={"#EFB071"} inputClickedColor={"#EFB071"} 
                textColorPlaceHolder={"text-[#dcdcdc]"} borderBottomInput={`${showErroeMessageInputEmail ? "border-[red]" : "border-gray-300"}`}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setShowErroeMessageInputEmail(false)
                }}/>
                <MensajeDeErrorInput texto={mesaggeErrorEmail} showInput={showErroeMessageInputEmail}/>
                </div>
                
                <div>
                <InputContrasena placeHolder={"Ingrese contraseña"} textColor={"text-[#dcdcdc]"} textColorLabelClicked={"#EFB071"} inputClickedColor={"#EFB071"} 
                textColorPlaceHolder={"text-[#dcdcdc]"} borderBottomInput={`${showErroeMessageInputContraseña ? "border-[red]" : "border-gray-300"}`}
                onChange={(e) => {
                  setContraseña(e.target.value)
                  setShowErroeMessageInputContraseña(false)
                }}/>
                <MensajeDeErrorInput texto={mesaggeErrorContraseña} showInput={showErroeMessageInputContraseña}/>
                </div>
                <BotonElegante text={"LOGIN"} backGroundIsHovered={"bg-[#EFB071]"} textColor={"text-black"}/>
              </form>

            </div>



            {/* CONTENEDOR FORMULARIO REGISTER*/}
            <div className={`w-full h-[90%] ${bgForm} flex felx-col items-center justify-center ${logginIsClicked ? "hidden" : "show"}`}>
              
              <form className="flex flex-col items-center justify-between gap-5" action="">
                <div>
                  <InputGodEfecto placeHolder={"Nombre"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"} 
                  textColorPlaceHolder={"text-[#535b61]"} borderBottomInput={"border-gray-300"}/> 
                  <MensajeDeErrorInput texto={"Hola"}/>
                </div>
                
                <div>
                  <InputGodEfecto placeHolder={"Apellido"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"}
                   textColorPlaceHolder={"text-[#535b61]"} borderBottomInput={"border-gray-300"}/> 
                   <MensajeDeErrorInput texto={"Hola"}/>
                </div>
                
                <div>
                  <InputGodEfecto placeHolder={"Email"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"} 
                  textColorPlaceHolder={"text-[#535b61]"} borderBottomInput={"border-gray-300"}/> 
                  <MensajeDeErrorInput texto={"Hola"}/>
                </div>
                
                <div>
                  <InputGodEfecto placeHolder={"DNI"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"} 
                  textColorPlaceHolder={"text-[#535b61]"} borderBottomInput={"border-gray-300"}/> 
                  <MensajeDeErrorInput texto={"Hola"}/>
                </div>
                
                <div>
                  <InputContrasena placeHolder={"Contrseña"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"} 
                  textColorPlaceHolder={"text-[#535b61]"} borderBottomInput={"border-gray-300"}/>
                  <MensajeDeErrorInput texto={"Hola"}/>
                </div>

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
