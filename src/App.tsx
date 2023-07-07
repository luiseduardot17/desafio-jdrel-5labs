import { useState } from 'react'
import vehicleLogo from './assets/millennium-falcon.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a>
        </a>
        <a href="#">
          <img src={vehicleLogo} className="logo" alt="icone da millennium falcon" />
        </a>
      </div>
      <h1>Veículos de Star Wars</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        
      </div>
    </>
  )
}

export default App
