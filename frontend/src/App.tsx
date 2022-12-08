import Header from './components/Header'
import Pilots from './components/Pilots'
import './styles/pilot.css'

function App() {
  return (
    <div>
      <Header />
      <main className="pilotContainer">
        <Pilots />
      </main>
    </div>
  )
}

export default App