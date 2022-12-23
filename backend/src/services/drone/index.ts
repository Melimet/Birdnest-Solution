import {
  handleDroneLocations,
  checkForNDZViolations,
} from './droneLocationHandler'
import pollDroneApi from './dronePoller'
import parseDroneXml from './droneXmlParser'

async function droneHandler() {
  const droneData = await pollDroneApi()

  if (!droneData) return undefined

  const drones = parseDroneXml(droneData)

  if (!drones) return undefined

  const distances = handleDroneLocations(drones)
  const violators = checkForNDZViolations(distances, 100)

  if (violators?.length === 0 || !violators) return undefined

  return violators
}

export default droneHandler
