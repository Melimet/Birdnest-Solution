import { pilotSocket } from '../..'
import { PilotDistance } from '../../types'
import handleDatabase, { getPilots } from './pilotController'
import getViolatorsData from './pilotFetcher'

async function pilotHandler(violators: PilotDistance[]) {
  const pilots = await getViolatorsData(violators)

  console.log("PILOTS, ", pilots)


  await handleDatabase(pilots)

  const pilotsFromDb = await getPilots()

  pilotSocket.emit('pilots', pilotsFromDb)


  return pilots
}

export default pilotHandler