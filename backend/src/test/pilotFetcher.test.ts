import getViolatorsData from '../services/pilot/pilotFetcher'
import {
  validDroneDistanceData,
  invalidDroneDistanceData,
} from '../test/test-resources/droneDistanceData'

import axios from 'axios'
jest.mock('axios')

describe(`PilotFetcher`, () => {
  const mockAxiosGet = jest.mocked(axios.get)

  test(`should fetch and parse data from the API`, async () => {
    const mockResponse = {
      data: {
        pilotId: 'P-fapcUUImSx',
        firstName: 'Summer',
        lastName: 'Hermann',
        phoneNumber: '+210356885358',
        createdDt: '2022-04-11T20:51:51.464Z',
        email: 'summer.hermann@example.com',
      },
    }

    mockAxiosGet.mockResolvedValueOnce(mockResponse)

    const pilots = await getViolatorsData(validDroneDistanceData)

    expect(pilots.length).toBe(1)
    expect(pilots[0].firstName).toBe(`Summer`)
  }),
    describe('invalid data', () => {
      const mockResponse = {
        status: 404,
        statusText: 'Not Found',
      }

      mockAxiosGet.mockResolvedValue(mockResponse)

      test(`should return an empty array if no valid data is given`, async () => {
        const pilots = await getViolatorsData(invalidDroneDistanceData)

        expect(pilots.length).toBe(0)
      }),
        test('should return an empty array if an empty array is given', async () => {
          const pilots = await getViolatorsData([])

          expect(pilots.length).toBe(0)
        })
    })
})
