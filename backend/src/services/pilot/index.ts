import { PilotDistance } from '../../types'
import handleDatabase, { getPilots } from './pilotController'
import getViolatorsData from './pilotFetcher'
import emitPilots from './socketEmitter'

async function pilotHandler(violators: PilotDistance[]) {
  const pilots = await getViolatorsData(violators)

  console.log("PILOTS, ", pilots)


  await handleDatabase(pilots)

  const pilotsFromDb = await getPilots()

  await emitPilots(pilotsFromDb)


  return pilots
}

export default pilotHandler