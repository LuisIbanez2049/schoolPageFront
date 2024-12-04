import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import TarjetaMateria from './components/TarjetaMateria'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TarjetaMateria/>
    </>
  )
}

export default App
