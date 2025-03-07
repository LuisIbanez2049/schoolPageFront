import React, { useEffect, useState } from "react";
import InputGodEfecto from "../components/InputGodEfecto";
import BotonElegante from "../components/BotonElegante";
import InputContrasena from "../components/InputContrasena";
import MensajeDeErrorInput from "../components/MensajeDeErrorInput";
import axios from "axios";
import PopUpMessage from "../components/PopUpMessage";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logOutAction } from "../redux/actions/authenticationAction";
import store from "../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUserAction } from "../redux/actions/authenticatedUserInformationAction";
import LoadingView from "../components/LoadingView";
import LoginFondo from "../assets/fondoLogin.jpg"
import InputGodEfecto2 from "../components/InputGodEfecto2";

function Home() {
  const [buttonLogin, setButtonLogin] = useState("h-[80px] lg:h-[100px] top-[-15px] lg:top-[-20px] rounded-tr-[20px]");
  const [buttonResgister, setButtonRegister] = useState("h-[67px] lg:h-[80px] rounded-bl-[20px]");
  const [bgForm, setBgForm] = useState("bg-[#476C77]");
  const [logginIsClicked, setLogginIsClicked] = useState(true)

  // FORMULARIO DE LOGGIN
  const [email, setEmail] = useState("")
  const [contraseña, setContraseña] = useState("")

  const [mesaggeErrorEmail, setMesaggeErrorEmail] = useState("")
  const [mesaggeErrorContraseña, setMesaggeErrorContraseña] = useState("")
  // ----------------------------------



  const [showErroeMessageInputEmail, setShowErroeMessageInputEmail] = useState(false)
  const [showErroeMessageInputContraseña, setShowErroeMessageInputContraseña] = useState(false)

  const dispatch = useDispatch()
  const dispatchUserInformation = useDispatch()
  const user = useSelector(store => store.authenticationReducer)

  const navigate = useNavigate()




  const handleLogin = async (event) => {
    setViewLoadingComponent(true)
    event.preventDefault()
    const bodyLogin = {
      email: email,
      password: contraseña,
    }

    console.log(bodyLogin)

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", bodyLogin)
      setViewLoadingComponent(false)
      console.log(response)
      dispatch(loginAction(response.data))
      navigate("/materias")
      const token = localStorage.getItem("userToken")
      let tokenSinComillas = token.replace(/"/g, '');
      axios.get("http://localhost:8080/api/auth/current", {
        headers: {
          Authorization: `Bearer ${tokenSinComillas}`
        }
      })
        .then((response) => {
          console.log(response.data)
          dispatchUserInformation(loginUserAction(response.data))
          if (response.data.rol === "ADMIN") {
            navigate("/adminViewSubjects")
          }
        })
        .catch((error) => {
          console.log(error)
        });




    } catch (error) {
      setViewLoadingComponent(false)
      console.error(error.response ? error.response.data : error.message)
      let errorMesagge = error.response ? error.response.data : error.message
      if (errorMesagge.includes("email") || errorMesagge.includes("Email")) {
        setMesaggeErrorEmail(errorMesagge)
        setShowErroeMessageInputEmail(true)
      }
      if (errorMesagge.includes("password")) {
        setMesaggeErrorContraseña(errorMesagge)
        setShowErroeMessageInputContraseña(true)
      }
    }
  }



  //---------------------------------------------------------------------------------------------------------------------------------

  // FORMULARIO DE REGISTER
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [dni, setDni] = useState("")
  const [emailR, setEmailR] = useState("")
  const [contraseñaR, setContraseñaR] = useState("")

  const [mesaggeErrorName, setMesaggeErrorName] = useState("")
  const [mesaggeErrorLastName, setMesaggeErrorLastName] = useState("")
  const [mesaggeErrorDni, setMesaggeErrorDni] = useState("")
  const [mesaggeErrorEmailR, setMesaggeErrorEmailR] = useState("")
  const [mesaggeErrorPasswordR, setMesaggeErrorPasswordR] = useState("")


  const [showErroeMessageInputNameR, setShowErroeMessageInputNameR] = useState(false)
  const [showErroeMessageInputLastNameR, setShowErroeMessageInputLastNameR] = useState(false)
  const [showErroeMessageInputDniR, setShowErroeMessageInputDniR] = useState(false)
  const [showErroeMessageInputEmailR, setShowErroeMessageInputEmailR] = useState(false)
  const [showErroeMessageInputContraseñaR, setShowErroeMessageInputContraseñaR] = useState(false)
  // ----------------------------------

  const [viewLoadingComponent, setViewLoadingComponent] = useState(false)



  //-----------------------------------------------VENTANA EMERGENTE--------------------------------------------

  const [showPopUp, setShowPopUp] = useState(false)
  const [messagePopUp, setMessagePopUp] = useState("")

  function showPopUpFunction() {
    setShowPopUp(true)
    setTimeout(() => {
      setShowPopUp(false)
    }, 3000) // 3 segundos
  }
  //------------------------------------------------------------------------------------------------------------


  const handleRegister = async (event) => {
    setViewLoadingComponent(true)
    event.preventDefault()
    const bodyRegister = {
      name: name,
      lastName: lastname,
      email: emailR,
      dni: dni,
      password: contraseñaR
    }

    console.log(bodyRegister)

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", bodyRegister)
      setViewLoadingComponent(false)
      console.log(response.data)
      setMessagePopUp(response.data)
      showPopUpFunction()

      setButtonLogin("h-[80px] lg:h-[100px] top-[-15px] lg:top-[-20px] rounded-tr-[20px]");
      setButtonRegister("h-[67px] lg:h-[80px] rounded-bl-[20px]");
      setBgForm("bg-[#476C77]");
      setLogginIsClicked(true)


    } catch (error) {
      setViewLoadingComponent(false)
      console.error(error.response ? error.response.data : error.message)
      let errorMesagge = error.response ? error.response.data : error.message
      if (errorMesagge.includes("first name") || errorMesagge.includes("First name")) {
        setMesaggeErrorName(errorMesagge)
        setShowErroeMessageInputNameR(true)
      }
      if (errorMesagge.includes("last name") || errorMesagge.includes("Last name")) {
        setMesaggeErrorLastName(errorMesagge)
        setShowErroeMessageInputLastNameR(true)
      }

      if (errorMesagge.includes("DNI")) {
        setMesaggeErrorDni(errorMesagge)
        setShowErroeMessageInputDniR(true)
      }

      if (errorMesagge.includes("email") || errorMesagge.includes("Email")) {
        setMesaggeErrorEmailR(errorMesagge)
        setShowErroeMessageInputEmailR(true)
      }
      if (errorMesagge.includes("Password")) {
        setMesaggeErrorPasswordR(errorMesagge)
        setShowErroeMessageInputContraseñaR(true)
      }
    }
  }

  const verLocalStorage = () => {
    let variable = localStorage.getItem("userToken")
    console.log(variable)
  }



  const [activeCard, setActiveCard] = useState(1)


  return (
    <div>
      <div className="flex flex-col min-h-screen"
        style={{
          backgroundImage: `url('${LoginFondo}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>


        <PopUpMessage show={showPopUp} message={messagePopUp} />

        {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}
        <LoadingView show={viewLoadingComponent} />
        {/* ------------------------------------------------------------LOADING VIEW------------------------------------------------------------ */}

        <div className="w-full min-h-screen flex flex-row justify-center items-center">


          <div className="w-[95%] lg:w-[800px] h-[560px] hidden">

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
                    }} />
                  <MensajeDeErrorInput texto={mesaggeErrorEmail} showInput={showErroeMessageInputEmail} />
                </div>

                <div>
                  <InputContrasena placeHolder={"Ingrese contraseña"} textColor={"text-[#dcdcdc]"} textColorLabelClicked={"#EFB071"} inputClickedColor={"#EFB071"}
                    textColorPlaceHolder={"text-[#dcdcdc]"} borderBottomInput={`${showErroeMessageInputContraseña ? "border-[red]" : "border-gray-300"}`}
                    onChange={(e) => {
                      setContraseña(e.target.value)
                      setShowErroeMessageInputContraseña(false)
                    }} />
                  <MensajeDeErrorInput texto={mesaggeErrorContraseña} showInput={showErroeMessageInputContraseña} />
                </div>
                <BotonElegante text={"LOGIN"} backGroundIsHovered={"bg-[#EFB071]"} textColor={"text-black"} />
              </form>

            </div>
            {/* CONTENEDOR FORMULARIO LOGGIN*/}





            {/* CONTENEDOR FORMULARIO REGISTER*/}
            <div className={`w-full h-[90%] ${bgForm} flex felx-col items-center justify-center ${logginIsClicked ? "hidden" : "show"}`}>

              <form className="flex flex-col items-center justify-between gap-5" action="" onSubmit={handleRegister}>

                <div className="">
                  <InputGodEfecto placeHolder={"Name"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"}
                    textColorPlaceHolder={"text-[#535b61]"} borderBottomInput={`${showErroeMessageInputNameR ? "border-[red]" : "border-gray-300"}`}
                    onChange={(e) => {
                      setName(e.target.value)
                      setShowErroeMessageInputNameR(false)
                    }} />
                  <MensajeDeErrorInput texto={mesaggeErrorName} showInput={showErroeMessageInputNameR} />
                </div>

                <div className="">
                  <InputGodEfecto placeHolder={"Last name"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"}
                    textColorPlaceHolder={"text-[#535b61]"} borderBottomInput={`${showErroeMessageInputLastNameR ? "border-[red]" : "border-gray-300"}`}
                    onChange={(e) => {
                      setLastname(e.target.value)
                      setShowErroeMessageInputLastNameR(false)
                    }} />
                  <MensajeDeErrorInput texto={mesaggeErrorLastName} showInput={showErroeMessageInputLastNameR} />
                </div>

                <div className="">
                  <InputGodEfecto placeHolder={"DNI"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"}
                    textColorPlaceHolder={"text-[#535b61]"} borderBottomInput={`${showErroeMessageInputDniR ? "border-[red]" : "border-gray-300"}`}
                    onChange={(e) => {
                      setDni(e.target.value)
                      setShowErroeMessageInputDniR(false)
                    }} />
                  <MensajeDeErrorInput texto={mesaggeErrorDni} showInput={showErroeMessageInputDniR} />
                </div>

                <div className="">
                  <InputGodEfecto placeHolder={"Email"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"}
                    textColorPlaceHolder={"text-[#535b61]"} borderBottomInput={`${showErroeMessageInputEmailR ? "border-[red]" : "border-gray-300"}`}
                    onChange={(e) => {
                      setEmailR(e.target.value)
                      setShowErroeMessageInputEmailR(false)
                    }} />
                  <MensajeDeErrorInput texto={mesaggeErrorEmailR} showInput={showErroeMessageInputEmailR} />
                </div>

                <div>
                  <InputContrasena placeHolder={"Password"} textColor={"text-[#476C77]"} textColorLabelClicked={"#476C77"} inputClickedColor={"#476C77"}
                    textColorPlaceHolder={"text-[#535b61]"} borderBottomInput={`${showErroeMessageInputContraseñaR ? "border-[red]" : "border-gray-300"}`}
                    onChange={(e) => {
                      setContraseñaR(e.target.value)
                      setShowErroeMessageInputContraseñaR(false)
                    }} />
                  <MensajeDeErrorInput texto={mesaggeErrorPasswordR} showInput={showErroeMessageInputContraseñaR} />
                </div>

                <BotonElegante text={"REGISTER"} backGroundIsHovered={"bg-[#476C77]"} textColor={"text-white"} />
              </form>

            </div>
            {/* CONTENEDOR FORMULARIO REGISTER*/}
            {/* rgb(224, 226, 237)  --  rgb(239, 176, 113)  --  rgb(71, 108, 119) */}


          </div>




          <div className="relative w-full max-w-[700px] h-[500px] ">

            {/* ------------------------------------------------------------------------CARD 1 CARD 1 CARD 1 CARD 1------------------------------------------------------------------------ */}
            <div id="card1"
              className={`absolute w-[700px] h-[500px] bg-[green] inset-0 p-6 transition-all duration-500 ease-in-out shadow-lg ${activeCard === 1
                ? "z-10 opacity-100 "
                : "z-0 opacity-0 scale-105"
                }`}
            >
              <div className="p-4 flex flex-col justify-between border border-black">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Tarjeta 1</h2>
                  <p className="text-muted-foreground">
                    Esta es la primera tarjeta. Puedes ver los bordes de la otra tarjeta detrás.
                  </p>
                </div>
              </div>


              <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-white">Login</h1>
                <p className="text-sm text-white/80">Please enter your Login and your Password</p>
              </div>

              <form className="space-y-4">
                <div className="relative">
                  <i className="fa-solid fa-user absolute top-2 left-2 text-[30px] text-[#ffffffd7]"></i>
                  <input
                    type="text"
                    placeholder="Username or E-mail"
                    className="w-full rounded-md border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder-white/60 focus:border-white/40 focus:outline-none"
                  />
                </div>

                {/* Input god --------------------------------------------------- */}
                <div className={`relative w-[270px] lg:w-[500px]`}>
                  <input
                    type="text"
                    value={""}
                    
                    className={` w-full rounded-md border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder-white/60 focus:border-white/40 focus:outline-none transition-colors peer relative z-10`}
                    placeholder=" "
                  />
                  <label
                    className={`absolute z-0 left-10 -top-3.5  text-sm transition-all 
                   peer-placeholder-shown:text-base  peer-placeholder-shown:top-2 
                   peer-focus:-top-3.5 peer-focus:text-sm text-white/60`}
                  >
                    {"Username or E-mail"}
                  </label>
                </div>
                {/* Input god --------------------------------------------------- */}

                <InputGodEfecto2 placeHolder={"hola"}/>


                <button
                  type="button"
                  className="w-full rounded-md border border-green-400 bg-green-400/20 py-3 text-center text-white hover:bg-green-400/30 focus:outline-none"
                >
                  Login
                </button>

              </form>




              <div>
                <button onClick={() => setActiveCard(2)} className="w-full text-white">
                  Ver Tarjeta 2
                </button>
              </div>
            </div>
            {/* ------------------------------------------------------------------------CARD 1 CARD 1 CARD 1 CARD 1------------------------------------------------------------------------ */}





            {/* ------------------------------------------------------------------------CARD 2 CARD 2 CARD 2 CARD 2------------------------------------------------------------------------ */}
            <div id="card2"
              className={`absolute inset-0 p-6 bg-blue-600 transition-all duration-500 ease-in-out shadow-lg ${activeCard === 2
                ? "z-10 opacity-100 scale-105"
                : "z-0 opacity-0"
                }`}

              style={{ boxShadow: "0px 0px 0px white" }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Tarjeta 2</h2>
                  <p className="text-muted-foreground">
                    Esta es la segunda tarjeta. Puedes ver los bordes de la otra tarjeta detrás.
                  </p>
                </div>
              </div>
              <div>
                <button onClick={() => setActiveCard(1)} className="w-full">
                  Ver Tarjeta 1
                </button>
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------------------------CARD 2 CARD 2 CARD 2 CARD 2------------------------------------------------------------------------ */}




        </div>
      </div>
    </div>
  );
}

export default Home;
