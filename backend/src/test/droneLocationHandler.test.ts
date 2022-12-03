import handleDroneLocations from '../utils/drone/droneLocationHandler'

describe('droneLocationHandler', () => {
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
    const expectedResults = [{ serialNumber: 'SN-vMc3aUUffP', distance: 223741.62271544483 }]
    
    expect(results).toEqual(expectedResults)

  })
})
