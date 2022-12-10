import { z } from 'zod'

export const PilotZod = z.object({
  pilotId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  distance: z.number().positive(),
  latestNdzBreach: z.string(),
})

export type PilotType = z.infer<typeof PilotZod>
