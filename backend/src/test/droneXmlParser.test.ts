import parseDroneXml from '../services/drone/droneXmlParser'
import { invalidDroneXml, validDroneXml } from './test-resources/droneXmlData'

describe(`DroneXmlParser`, () => {
  test(`should parse a drone xml file with correct input`, () => {
    const expectedDrones = [
      {
        positionX: 248970.73496574067,
        positionY: 161438.6485809734,
        serialNumber: 'SN-IuvKRfoMZG',
      },
      {
        positionX: 377374.26768386713,
        positionY: 171826.60599272174,
        serialNumber: 'SN-MWS_f87vLJ',
      },
      {
        positionX: 45918.87233451607,
        positionY: 305787.4839306696,
        serialNumber: 'SN-BiaStV1AF0',
      },
    ]

    const drones = parseDroneXml(validDroneXml)

    expect(drones).toEqual(expectedDrones)
  }),
    test('should return nothing if xml is invalid', () => {
      const drones = parseDroneXml(invalidDroneXml)

      expect(drones).toEqual([])
    }),
    test(`should return an empty array if no input is given`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const expectedDrones: any[] = []

      const drones = parseDroneXml('')

      expect(drones).toEqual(expectedDrones)
    })
})
