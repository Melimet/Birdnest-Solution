import Pilot from './Pilot'
import usePilotSocket from '../hooks/usePilotSocket'
import '../styles/pilot.css'

function Pilots() {
  
  const pilots = usePilotSocket()
  const sortedByTime = pilots.sort((a, b) => {
    return b.latestNdzBreach.localeCompare(a.latestNdzBreach)
  }) 


  return (
    <main className="pilotContainer">
      {sortedByTime.map((pilot) => {
        return <Pilot key={pilot.pilotId} pilot={pilot} />
      })}
    </main>
  )
}

export default Pilots
