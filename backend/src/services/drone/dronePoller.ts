import axios from 'axios'

const url = 'https://assignments.reaktor.com/birdnest/drones'

async function pollDroneApi(): Promise<string | undefined> {
  try {
    const response = await axios.get(url)

    return response.data
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default pollDroneApi
