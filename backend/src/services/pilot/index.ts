import { PilotDistance } from '../../types'
import handleDatabase from './pilotController'
import getViolatorsData from './pilotFetcher'

async function pilotHandler(violators: PilotDistance[]) {
  const pilots = await getViolatorsData(violators)

  console.log('PILOTS, ', pilots)

  const changesToDb = await handleDatabase(pilots)

  return changesToDb
}

export default pilotHandler
