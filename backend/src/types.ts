import { z } from 'zod'

export const DroneZod = z.object({
  serialNumber: z.string(),
  positionY: z.number(),
  positionX: z.number(),
})

export const DroneZodArray = z.array(DroneZod)

export type Drone = z.infer<typeof DroneZod>