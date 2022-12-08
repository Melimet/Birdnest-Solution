import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Pilot from './Pilot'
import { PilotType } from '../types'
function Pilots() {
  const socket = io('http://localhost:3001/')

  const [pilots, setPilots] = useState<PilotType[]>([])

  useEffect(() => {
    console.log("RECEIVING PILOT DATA")
    socket.on('pilots', (pilotData) => {
      console.log('PILOT DATA ', pilotData)
      setPilots(pilotData)
    })

    return () => socket.disconnect()
  })

  return (
    <div>
      {pilots.map((pilot) => {
        return <Pilot key={pilot.id} pilot={pilot} />
      })}
    </div>
  )
}

export default Pilots
