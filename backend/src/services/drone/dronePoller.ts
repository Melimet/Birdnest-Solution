import axios from 'axios'

const url = 'https://assignments.reaktor.com/birdnest/drones'

async function pollDroneApi(): Promise<string> {
  const response = await axios.get(url)

  return response.data
}

export default pollDroneApi
