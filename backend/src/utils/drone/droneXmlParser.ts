import { z } from 'zod'
import { Drone, DroneZod } from '../../types'
import handleDroneLocations from './droneLocationHandler'

function stringExtractor(input: string, value: string): string | undefined {
  const result = input.match(new RegExp(`<${value}>(.*)</${value}>`))

  return result?.[1]
}

function convertXmlToDrones(xml: string): Drone[] | undefined {
  const [, ...xmlInArray] = xml.split('<drone>')

  const droneData = xmlInArray.flatMap((droneInfo) => {
    const wantedValues = ['serialNumber', 'positionY', 'positionX'].map(
      (string) => stringExtractor(droneInfo, string)
    )

    const drone = {
      serialNumber: wantedValues[0],
      positionY: Number(wantedValues[1]),
      positionX: Number(wantedValues[2]),
    }
    const parsedDrone = DroneZod.safeParse(drone)
    return parsedDrone.success ? parsedDrone.data : []
  })

  console.log(droneData)

  return droneData
}

function parseDroneXml(xmlInput: unknown): Drone[] | undefined {
  const parsed = z.string().parse(xmlInput)
  const drones = convertXmlToDrones(parsed)

  return drones
}

export default parseDroneXml
