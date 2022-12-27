import { z } from 'zod'
import { Drone, DroneZod } from '../../types'

function stringExtractor(input: string, value: string): string | undefined {
  const result = input.match(new RegExp(`<${value}>(.*)</${value}>`))

  return result?.[1]
}

function extractTimeStamp(input: string): string | undefined {
  const result = input.match(new RegExp(`<capture snapshotTimestamp="(.*)">`))

  if (!result) return undefined

  const timestamp = new Date(result?.[1])

  return timestamp.getTime().toString()
}

function convertXmlToDrones(xml: string): Drone[] | undefined {
  const [deviceInfo, ...droneXmlInArray] = xml.split('<drone>')
  
  const latestNdzBreach = extractTimeStamp(deviceInfo) 

  const valuesToSearch = ['serialNumber', 'positionX', 'positionY']

  const droneData = droneXmlInArray.flatMap((droneInfo) => {
    const wantedValues = valuesToSearch.map((wordToSearch) =>
      stringExtractor(droneInfo, wordToSearch)
    )

    const drone = {
      latestNdzBreach,
      serialNumber: wantedValues[0],
      positionX: Number(wantedValues[1]),
      positionY: Number(wantedValues[2]),
    }

    const parsedDrone = DroneZod.safeParse(drone)
    return parsedDrone.success ? parsedDrone.data : []
  })

  return droneData
}

function parseDroneXml(xmlInput: unknown): Drone[] | undefined {
  const parsed = z.string().safeParse(xmlInput)

  if (!parsed.success) return undefined

  const drones = convertXmlToDrones(parsed.data)

  return drones
}

export default parseDroneXml
