import { z } from 'zod'

export const DroneZod = z.object({
  serialNumber: z.string(),
  positionY: z.number().positive(),
  positionX: z.number().positive(),
})

export interface PilotDistance {
  serialNumber: string
  distance: number
}

export const PilotZod = z.object({
  pilotId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  distance: z.number().positive(),
})

export interface PilotToClient extends PilotType{
  latestNdzBreach: string
  
}

export type PilotType = z.infer<typeof PilotZod>
export type Drone = z.infer<typeof DroneZod>
