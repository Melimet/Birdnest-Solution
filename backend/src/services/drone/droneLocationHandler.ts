import { Distances, Drone } from '../../types'

function calculateDistance(x: number, y: number): number {
  const result = Math.sqrt(Math.pow(250000 - x, 2) + Math.pow(250000 - y, 2))
  return result
}

export function handleDroneLocations(drones: Drone[]): Distances[] {
  const distances = drones.map((drone) => {
    return {
      serialNumber: drone.serialNumber,
      distance: calculateDistance(drone.positionX, drone.positionY),
    }
  })

  return distances
}

export function checkForNDZViolations(distances: Distances[]): Distances[] | undefined {
  const violators = distances.filter((drone) => drone.distance < 100000)
  return violators
}
