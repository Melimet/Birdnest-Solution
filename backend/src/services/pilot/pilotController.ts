import { Op } from 'sequelize'
import Pilot from '../../models/pilot'
import { PilotType } from '../../types'

export async function getPilotsFromDb() {
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
      latestNdzBreach: Number(pilot.latestNdzBreach),
    }
  })
}

export async function pruneOldBreaches() {
  const tenMinutesInMilliseconds = 600000
  return await Pilot.destroy({
    where: {
      latestNdzBreach: {
        [Op.lte]: Date.now() - tenMinutesInMilliseconds,
      },
    },
  })
}

function updateNdzBreachTime(pilot: PilotType) {
  return Pilot.update(
    {
      latestNdzBreach: pilot.latestNdzBreach,
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
      latestNdzBreach: pilot.latestNdzBreach,
    },
    {
      where: { pilotId: pilot.pilotId },
    }
  )
}

async function updatePilot(pilot: PilotType) {
  const pilotInDb = await getPilotByPilotId(pilot.pilotId)
  if (!pilotInDb) return

  return pilot.distance > pilotInDb.distance
    ? await updateNdzBreachTime(pilot)
    : await updateNdzBreachTimeAndDistance(pilot)
}

function sortPilots(
  pilots: PilotType[],
  pilotsFromDb: Pilot[]
): [PilotType[], PilotType[]] {

  return pilots.reduce(
    ([oldPilots, newPilots], pilot) => {
      return pilotsFromDb.some(
        (pilotInDb) => pilotInDb.pilotId === pilot.pilotId
      )
        ? [[...oldPilots, pilot], newPilots]
        : [oldPilots, [...newPilots, pilot]]
    },
    [[], []] as [PilotType[], PilotType[]]
  )
}

async function handleDatabase(pilots: PilotType[]): Promise<number> {
  const pilotsFromDb = await getPilotsFromDb()

  const [oldPilots, newPilots] = sortPilots(pilots, pilotsFromDb)

  const updatedOldPilots = await Promise.all(
    oldPilots.map(async (pilot) => {
      return await updatePilot(pilot)
    })
  )

  const pilotObjects = createPilotObjects(newPilots)
  const createdPilots = await Pilot.bulkCreate(pilotObjects, {
    returning: true,
    ignoreDuplicates: true,
  })

  return updatedOldPilots.length + createdPilots.length
}

export default handleDatabase
