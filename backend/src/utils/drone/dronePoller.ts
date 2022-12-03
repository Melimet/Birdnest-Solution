import axios from 'axios'
import parseDroneXml from './droneXmlParser'

const url = 'https://assignments.reaktor.com/birdnest/drones'

async function pollDroneApi() {
  const response = await axios.get(url)
  parseDroneXml(response.data)
}

setInterval(async () => {
  await pollDroneApi()
}, 2000)

export default pollDroneApi
