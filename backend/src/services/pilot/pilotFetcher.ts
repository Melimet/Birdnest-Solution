import axios from 'axios'
import { Distances } from '../../types'

const baseUrl = "https://assignments.reaktor.com/birdnest/pilots/"

async function getPilotData(serialNumber: string) {
  
  const url = baseUrl + serialNumber
  const response = await axios.get(url)
  return response.data
}

async function getViolatorsData(violators: Distances[]) {
  const pilots = violators.map(async (violator) => {
    return await getPilotData(violator.serialNumber)
  })
  await Promise.all(pilots)
  return pilots
}

export default getViolatorsData