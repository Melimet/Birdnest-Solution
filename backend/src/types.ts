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

export type Drone = z.infer<typeof DroneZod>