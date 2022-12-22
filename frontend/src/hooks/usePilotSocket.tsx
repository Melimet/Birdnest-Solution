import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { PilotType, PilotZod } from '../types'

const socket = io('/')

function usePilotSocket() {
  const [pilots, setPilots] = useState<PilotType[]>([])

  function validatePilots(pilots: PilotType[]) {
    return pilots.flatMap((pilot) => {
      const parsedPilot = PilotZod.safeParse(pilot)
      return parsedPilot.success ? parsedPilot.data : []
    })
  }

  useEffect(() => {
    socket.on('pilots', (pilotData) => {
      console.log('PILOT DATA ', pilotData)
      const validatedPilots = validatePilots(pilotData.pilots)
      setPilots(validatedPilots)
    })
  }, [])

  return pilots
}

export default usePilotSocket
