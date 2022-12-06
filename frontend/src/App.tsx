import Header from './components/Header'
import Pilot from './components/Pilot'
import './styles/pilot.css'

function App() {
  return (
    <div>
      <Header />
    <main className="pilotContainer">
      <Pilot />

        <Pilot />
        
        <Pilot />

        <Pilot />
      </main>
    </div>
  )
}

export default App
