import { Drone } from '../../types'

function calculateDistance(x: number, y: number): number {
  const result = Math.sqrt(Math.pow(250000 - x, 2) + Math.pow(250000 - y, 2))
  return result
}

function handleDroneLocations(drones: Drone[]): void {
  const distances = drones.map((drone) => {
    return {
      serialNumber: drone.serialNumber,
      distance: calculateDistance(drone.positionX, drone.positionY),
    }
  })

  console.log('DISTANCES ', distances)
}

export default handleDroneLocations
