import axios from "axios"

async function pollDroneApi() {
  const response = await axios.get(
    "https://assignments.reaktor.com/birdnest/drones"
  )
  console.log(response.data)
}

setInterval(async () => {
  await pollDroneApi()
}, 2000)

export default pollDroneApi
