import Pilot from '../../models/pilot'
import { PilotToClient } from '../../types'

function convertBreachTimeToTimeString(pilots: Pilot[]): PilotToClient[] {
  const parsedPilots = pilots.map((pilot) => {
    return {
      pilotId: pilot.pilotId,
      firstName: pilot.firstName,
      lastName: pilot.lastName,
      email: pilot.email,
      phoneNumber: pilot.phoneNumber,
      distance: pilot.distance,
      latestNdzBreach: (new Date(pilot.latestNdzBreach)).toLocaleTimeString('en-GB'),
    }
  })

  return parsedPilots
}

export default convertBreachTimeToTimeString 
