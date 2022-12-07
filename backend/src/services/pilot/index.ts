import { Distances } from '../../types'
import getViolatorsData from './pilotFetcher'

async function pilotHandler(violators: Distances[]) {
  const pilots = await getViolatorsData(violators)

  console.log("PILOTS, ", pilots)


  return pilots
}

export default pilotHandler