import { z } from 'zod'

export const DroneZod = z.object({
  latestNdzBreach: z.string(),
  serialNumber: z.string(),
  positionY: z.number().positive(),
  positionX: z.number().positive(),
})

export interface PilotDistance {
  latestNdzBreach: string
  serialNumber: string
  distance: number
}

export const PilotZod = z.object({
  latestNdzBreach: z.string(),
  pilotId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  distance: z.number().positive(),
})

export const DB_INFO_ZOD = z.object({
  HOST: z.string(),
  USERNAME: z.string(),
  PASSWORD: z.string(),
  PORT: z.string(),
  DBNAME: z.string(),
  dialect: z.string(),
})

export type PilotType = z.infer<typeof PilotZod>
export type Drone = z.infer<typeof DroneZod>
