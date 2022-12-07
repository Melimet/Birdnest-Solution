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

async function createPilot(pilot: PilotType) {
  return await Pilot.create({
    pilotId: pilot.pilotId,
    firstName: pilot.firstName,
    lastName: pilot.lastName,
    email: pilot.email,
    phoneNumber: pilot.phoneNumber,
    distance: pilot.distance,
    latestNdzBreach: Date.now(),
  })
}

async function pruneOldBreaches() {
  return await Pilot.destroy({
    where: {
      latestNdzBreach: {
        [Op.lt]: Date.now() - 600000, // 10 minutes in milliseconds
      },
    },
  })
}

async function updatePilot(pilot: PilotType) {
  const pilotInDb = await getPilotByPilotId(pilot.pilotId)
  if (!pilotInDb) return

  if (pilot.distance < pilotInDb.distance) {
    return await Pilot.update(
      {
        latestNdzBreach: Date.now(),
      },
      {
        where: { pilotId: pilot.pilotId },
      }
    )
  }

  return await Pilot.update(
    {
      distance: pilot.distance,
      latestNdzBreach: Date.now(),
    },
    {
      where: { pilotId: pilot.pilotId },
    }
  )
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

  const createdPilots = await Promise.all(
    newPilots.map(async (pilot) => {
      return await createPilot(pilot)
    })
  )

  await pruneOldBreaches()
  
  return [oldPilots, newPilots]
}

export default handleDatabase