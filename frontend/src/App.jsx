import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ServiceProvider } from './assets/componentes/ServiceProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='App'>
      <ServiceProvider userName="kikobeats" name="Marcos Santillan" service="Paseo" location="Belgrano" rating= "5" price="20"/>
      <ServiceProvider userName="juanperez" name="Lucia Di Napoli" service="Paseo" location="Recoleta" rating= "5" price="20"/>
      <ServiceProvider userName="sat" name="Facundo Russo" service="Paseo" location="Palermo" rating= "5" price="20"/>
      <ServiceProvider userName="asdasd" name="Valeria Ocampo" service="Paseo" location="Colegiales" rating= "5" price="20"/>
      <ServiceProvider userName="pedro" name="Mateo Salazar" service="Paseo" location="Recoleta" rating= "5" price="20"/>
      </div>
    </>
  )
}

export default App
