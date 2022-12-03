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

export const DroneZodArray = z.array(DroneZod)

export type Drone = z.infer<typeof DroneZod>