import { useState } from 'react'
import Materias from './pages/Materias'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Materias/> */}
      <Home/>
    </>
  )
}

export default App
