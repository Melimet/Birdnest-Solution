import axios from 'axios'
import { PilotType, PilotDistance, PilotZod } from '../../types'

const baseUrl = 'https://assignments.reaktor.com/birdnest/pilots/'

async function getPilotData(
  violator: PilotDistance
): Promise<PilotType | string> {
  try {
    const url = baseUrl + violator.serialNumber
    const response = await axios.get(url)

    return {
      ...response.data,
      distance: violator.distance,
      latestNdzBreach: violator.latestNdzBreach,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return error.message
    }
    console.log(String(error))
    return String(error)
  }
}

function validatePilots(pilots: unknown[]): PilotType[] {
  return pilots.flatMap((pilot) => {
    const parsedPilot = PilotZod.safeParse(pilot)
    return parsedPilot.success ? parsedPilot.data : []
  })
}

async function getViolatorsData(
  violators: PilotDistance[]
): Promise<PilotType[]> {
  const pilots = await Promise.all(
    violators.map((violator) => {
      return getPilotData(violator)
    })
  )

  const parsedPilots = validatePilots(pilots)

  return parsedPilots
}

export default getViolatorsData
