import Pilot from '../../models/pilot'
import { PilotType } from '../../types'

function convertPilotsToClientFormat(pilots: Pilot[]): PilotType[] {
  const parsedPilots = pilots.map((pilot) => {
    return {
      pilotId: pilot.pilotId,
      firstName: pilot.firstName,
      lastName: pilot.lastName,
      email: pilot.email,
      phoneNumber: pilot.phoneNumber,
      distance: pilot.distance,
      latestNdzBreach: String(pilot.latestNdzBreach),
    }
  })

  return parsedPilots
}

export default convertPilotsToClientFormat
