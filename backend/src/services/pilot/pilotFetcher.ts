import axios from 'axios'
import { Pilot, PilotDistance, PilotZod } from '../../types'

const baseUrl = 'https://assignments.reaktor.com/birdnest/pilots/'

async function getPilotData(violator: PilotDistance): Promise<Pilot | string> {
  try {
    const url = baseUrl + violator.serialNumber
    const response = await axios.get(url)
    
    return { ...response.data, distance: violator.distance }

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
      return error.message
    }
    return String(error)
  }
}

async function getViolatorsData(violators: PilotDistance[]): Promise<Pilot[]> {
  const pilots = await Promise.all(
    violators.map(async (violator) => {
      return getPilotData(violator)
    })
  )

  const parsedPilots = pilots.flatMap((pilot) => {
    console.log('PILOT', pilot)
    const parsedPilot = PilotZod.safeParse(pilot)
    console.log('PARSED PILOT', parsedPilot)
    return parsedPilot.success ? parsedPilot.data : []
  })

  return parsedPilots
}

export default getViolatorsData
