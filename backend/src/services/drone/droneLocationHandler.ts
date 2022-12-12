import { PilotDistance, Drone } from '../../types'

function calculateDistance(x: number, y: number): number {
  const result = Math.sqrt(Math.pow(250000 - x, 2) + Math.pow(250000 - y, 2))
  return result
}

function roundResult(result: number): number {
  return Math.round((result / 1000) * 100) / 100
}

export function handleDroneLocations(drones: Drone[]): PilotDistance[] {
  const distances = drones.map((drone) => {
    return {
      serialNumber: drone.serialNumber,
      distance: roundResult(
        calculateDistance(drone.positionX, drone.positionY)
      ),
    }
  })

  return distances
}

export function checkForNDZViolations(
  distances: PilotDistance[],
  maxDistance: number
): PilotDistance[] | undefined {
  console.log(distances)
  const violators = distances.filter((drone) => drone.distance < maxDistance)
  return violators
}
