import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { nodeEnv } from '../env.js'

export const router = Router()

router.get('/node-env', (_req: Request, res: Response) => {
  try {
    res.json(nodeEnv)
  } catch (err) {
    console.error(err)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})
