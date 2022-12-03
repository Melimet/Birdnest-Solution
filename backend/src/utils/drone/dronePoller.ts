import axios from 'axios'
import parseDroneXml from './droneXmlParser'

const url = 'https://assignments.reaktor.com/birdnest/drones'

async function pollDroneApi() {
  const response = await axios.get(url)
  return (response.data)
}


export default pollDroneApi
