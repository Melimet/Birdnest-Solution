import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { PilotType } from '../types'

const socket = io('http://localhost:3001/')

function usePilotSocket() {
  const [pilots, setPilots] = useState<PilotType[]>([])

  socket.on('pilots', (pilotData) => {
    console.log('PILOT DATA ', pilotData)
    setPilots(pilotData.pilots)
  })
  return pilots
}

export default usePilotSocket
