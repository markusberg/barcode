import { Router } from 'express'
import type { Request, Response } from 'express'

import { nodeEnv } from '../env.js'

export const router = Router()

router.get('/node-env', (_req: Request, res: Response) => {
  res.json(nodeEnv)
})
