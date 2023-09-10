import { z } from 'zod'

export const NodeEnvSchema = z
  .enum(['production', 'testing', 'development'])
  .default('development')

export type NodeEnv = z.infer<typeof NodeEnvSchema>
