import { z } from 'zod'

const Drone = z.object({
  serialNumber: z.string(),
  positionY: z.number(),
  positionX: z.number(),
})

export type Drone = z.infer<typeof Drone>