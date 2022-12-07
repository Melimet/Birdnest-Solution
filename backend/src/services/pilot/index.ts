import { PilotDistance } from '../../types'
import handleDatabase from './pilotController'
import getViolatorsData from './pilotFetcher'

async function pilotHandler(violators: PilotDistance[]) {
  const pilots = await getViolatorsData(violators)

  console.log("PILOTS, ", pilots)


  handleDatabase(pilots)

  return pilots
}

export default pilotHandler