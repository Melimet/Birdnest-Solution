import { Op } from 'sequelize'
import Pilot from '../../models/pilot'
import { PilotType } from '../../types'

export async function getPilots() {
  return await Pilot.findAll()
}

async function getPilotByPilotId(pilotId: string) {
  return await Pilot.findOne({
    where: { pilotId },
  })
}

function createPilotObjects(pilots: PilotType[]) {
  return pilots.map((pilot) => {
    return {
      ...pilot, 
      latestNdzBreach: Date.now(),
    }
  })
}

async function pruneOldBreaches() {
  const tenMinutesInMilliseconds = 600000
  return await Pilot.destroy({
    where: {
      latestNdzBreach: {
        [Op.lt]: Date.now() - tenMinutesInMilliseconds, 
      },
    },
  })
}

function updateNdzBreachTime(pilot: PilotType) {
  return Pilot.update(
    {
      latestNdzBreach: Date.now(),
    },
    {
      where: { pilotId: pilot.pilotId },
    }
  )
}

function updateNdzBreachTimeAndDistance(pilot: PilotType) {
  return Pilot.update(
    {
      distance: pilot.distance,
      latestNdzBreach: Date.now(),
    },
    {
      where: { pilotId: pilot.pilotId },
    }
  )
}

async function updatePilot(pilot: PilotType) {
  const pilotInDb = await getPilotByPilotId(pilot.pilotId)
  if (!pilotInDb) return

   return pilot.distance > pilotInDb.distance ? 
    await updateNdzBreachTime(pilot) : 
    await updateNdzBreachTimeAndDistance(pilot)
}

async function handleDatabase(pilots: PilotType[]) {
  const pilotsFromDb = await getPilots()

  const [oldPilots, newPilots] = pilots.reduce(
    ([oldPilots, newPilots], pilot) => {
      return pilotsFromDb.some(
        (pilotInDb) => pilotInDb.pilotId === pilot.pilotId
      )
        ? [[...oldPilots, pilot], newPilots]
        : [oldPilots, [...newPilots, pilot]]
    },
    [[], []] as [PilotType[], PilotType[]]
  )

  oldPilots.forEach(async (pilot) => {
    await updatePilot(pilot)
  })

  const pilotObjects = createPilotObjects(newPilots)
  const createdPilots = await Pilot.bulkCreate(pilotObjects)
  await pruneOldBreaches()
  
  return [oldPilots, newPilots]
}

export default handleDatabase