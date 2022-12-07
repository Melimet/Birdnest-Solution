import { z } from 'zod'

export const DroneZod = z.object({
  serialNumber: z.string(),
  positionY: z.number().positive(),
  positionX: z.number().positive(),
})

export interface Distances{
  serialNumber: string
  distance: number
}

export const PilotZod = z.object({
  pilotId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  createdDt: z.string(),
})


export type Pilot = z.infer<typeof PilotZod>
export type Drone = z.infer<typeof DroneZod>