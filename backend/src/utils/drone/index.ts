import handleDroneLocations from "./droneLocationHandler"
import pollDroneApi from "./dronePoller"
import parseDroneXml from "./droneXmlParser"

async function droneHandler() {
  const droneData = await pollDroneApi()
  const drones = parseDroneXml(droneData)

  if (!drones) return

  handleDroneLocations(drones)
}

setInterval(async () => {
  await droneHandler()
}, 2000)


export default droneHandler