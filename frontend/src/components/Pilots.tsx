import Pilot from './Pilot'
import usePilotSocket from '../hooks/usePilotSocket'
import '../styles/pilot.css'

function Pilots() {
  
  const pilots = usePilotSocket()

  return (
    <main className="pilotContainer">
      {pilots.map((pilot) => {
        return <Pilot key={pilot.pilotId} pilot={pilot} />
      })}
    </main>
  )
}

export default Pilots
