import {
  handleDroneLocations,
  checkForNDZViolations,
} from './droneLocationHandler'
import pollDroneApi from './dronePoller'
import parseDroneXml from './droneXmlParser'

async function droneHandler() {
  const droneData = await pollDroneApi()
  const drones = parseDroneXml(droneData)

  if (!drones) return

  const distances = handleDroneLocations(drones)
  const violators = checkForNDZViolations(distances)
}

setInterval(async () => {
  await droneHandler()
}, 2000)

export default droneHandler
