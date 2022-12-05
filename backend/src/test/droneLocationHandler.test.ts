import {
  handleDroneLocations,
  checkForNDZViolations,
} from '../services/drone/droneLocationHandler'

describe('handleDroneLocations', () => {
  test('should return an empty array if no input is given', () => {
    const results = handleDroneLocations([])

    expect(results).toEqual([])
  })
  test('should return a correct array of distances', () => {
    const drones = [
      {
        serialNumber: 'SN-vMc3aUUffP',
        positionY: 128919.37283294523,
        positionX: 438148.3336630254,
      },
    ]

    const results = handleDroneLocations(drones)
    const expectedResults = [
      { serialNumber: 'SN-vMc3aUUffP', distance: 223741.62271544483 },
    ]

    expect(results).toEqual(expectedResults)
  })
})

describe('checkForNDZViolations', () => {
  test('should return an empty array if no input is given', () => {
    const results = checkForNDZViolations([])

    expect(results).toEqual([])
  })
  test('should return a correct array of distances', () => {
    const distances = [
      { serialNumber: 'SN-7IBnsWgTBI', distance: 100876.0167995431 },
      { serialNumber: 'SN-ugj-fRr0Qm', distance: 99099.62832485135 },
      { serialNumber: 'SN-BEcekTwQ9S', distance: 197900.95946953492 },
      { serialNumber: 'SN-o6rP7EYERf', distance: 221864.59440413464 },
    ]

    const results = checkForNDZViolations(distances)
    const expectedResults = [
      { serialNumber: 'SN-ugj-fRr0Qm', distance: 99099.62832485135 },
    ]

    expect(results).toEqual(expectedResults)
  })
})
