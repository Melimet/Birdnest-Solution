import Pilot from '../../models/pilot'
import { PilotToClient } from '../../types'

function convertPilotsToClientFormat(pilots: Pilot[]): PilotToClient[] {
  const parsedPilots = pilots.map((pilot) => {
    const date = new Date(+pilot.latestNdzBreach)
    return {
      pilotId: pilot.pilotId,
      firstName: pilot.firstName,
      lastName: pilot.lastName,
      email: pilot.email,
      phoneNumber: pilot.phoneNumber,
      distance: pilot.distance,
      latestNdzBreach: date.toLocaleTimeString('en-GB'),
    }
  })

  return parsedPilots
}

export default convertPilotsToClientFormat
