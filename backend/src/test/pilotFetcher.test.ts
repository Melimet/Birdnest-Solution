// These tests MIGHT be flaky since it is dependant on the data from the API
import getViolatorsData from '../services/pilot/pilotFetcher'
import { validDroneDistanceData, invalidDroneDistanceData } from '../test/test-resources/droneDistanceData'

describe(`PilotFetcher`, () => {
  test(`should fetch pilot data from the API`, async () => {
    const pilots = await getViolatorsData(validDroneDistanceData)

    expect(pilots.length).toBe(2)
    expect(pilots[0].firstName).toBe(`Felipa`)
  }),
    test(`should return an empty array if no valid data is given`, async () => {
      const pilots = await getViolatorsData(invalidDroneDistanceData)

      expect(pilots.length).toBe(0)
    }),
    test('should return an empty array if an empty array is given', async () => {
      const pilots = await getViolatorsData([])

      expect(pilots.length).toBe(0)
    })
})