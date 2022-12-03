import { z } from 'zod'
import { DroneZodArray } from '../types'

function stringExtractor(input: string, value: string) {
  const result = input.match(new RegExp(`<${value}>(.*)</${value}>`))

  return result?.[1]
}

function convertXmlToDrones(xml: string): DroneXmlInput {
  const [, ...xmlInArray] = xml.split('<drone>')

  const droneData = xmlInArray.map((droneInfo) => {
    const wantedValues = ['serialNumber', 'positionY', 'positionX']
      .map((string) => stringExtractor(droneInfo, string))
    
    return {
      serialNumber: wantedValues[0],
      positionY: Number(wantedValues[1]),
      positionX: Number(wantedValues[2]),
    }
  })


  return DroneZodArray.parse(droneData)
}

function parseDroneXml(xmlInput: unknown) {
  const parsed = z.string().parse(xmlInput)
  const drones = convertXmlToDrones(parsed)

  
}

export default parseDroneXml
