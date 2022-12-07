import Header from './components/Header'
import Pilot from './components/Pilot'
import Pilots from './components/Pilots'
import './styles/pilot.css'

function App() {
  return (
    <div>
      <Pilots />
      <Header />
    <main className="pilotContainer">
      <Pilot />

        <Pilot />
        <Pilot />
        
        <Pilot />

        <Pilot />
      </main>
    </div>
  )
}

export default App
