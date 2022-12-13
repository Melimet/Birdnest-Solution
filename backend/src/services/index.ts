import droneHandler from './drone'
import pilotHandler from './pilot'
import { getPilotsFromDb, pruneOldBreaches } from './pilot/pilotController'
import convertPilotsToClientFormat from './pilot/pilotParser'
import emitPilots from './pilot/socketEmitter'

async function handleChangesInDb(previousChanges: number) {
  console.log('HANDLE CHANGES IN DB')

  const deletedDbEntries = await pruneOldBreaches()

  if (deletedDbEntries === 0 && previousChanges === 0) return

  const pilotsInDb = await getPilotsFromDb()
  const parsedPilots = convertPilotsToClientFormat(pilotsInDb)
  emitPilots(parsedPilots)
  return parsedPilots
}

async function serviceHandler() {
  const violators = await droneHandler()

  if (!violators) {
    return handleChangesInDb(0)
  }

  const pilotChanges = await pilotHandler(violators)

  const sentPilots = await handleChangesInDb(pilotChanges)

  return sentPilots 
}

setInterval(async () => {
  await serviceHandler()
}, 2000)

export default serviceHandler
