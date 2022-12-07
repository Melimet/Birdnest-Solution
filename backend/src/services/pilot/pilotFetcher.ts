import axios from 'axios'
import {  Pilot, PilotDistance, PilotZod } from '../../types'

const baseUrl = "https://assignments.reaktor.com/birdnest/pilots/"

async function getPilotData(serialNumber: string): Promise<Pilot | unknown> {
  try {

    const url = baseUrl + serialNumber
    const response = await axios.get(url)
    return response.data

  } catch (error: unknown) {
    console.error(error)
    return error
  }
}

async function getViolatorsData(violators: PilotDistance[]): Promise<Pilot[]> {
  const pilots = await Promise.all(violators.map((violator) => {
    return getPilotData(violator.serialNumber)
  }))

  const parsedPilots = pilots.flatMap((pilot) => {
    const parsedPilot = PilotZod.safeParse(pilot)
    return parsedPilot.success ? parsedPilot.data : []
  })

  return parsedPilots
}

export default getViolatorsData