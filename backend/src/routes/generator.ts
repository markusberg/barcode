import { Router } from 'express'
import type { Request, Response } from 'express'

import { generatorService } from '../services/generator.service.js'
import { BarcodeSchema } from '../interfaces/barcode.js'

export const router = Router()

router.post('', async (req: Request, res: Response) => {
  const body = BarcodeSchema.parse(req.body)
  const doc = await generatorService.generatePdf(body)
  res.contentType('pdf')
  doc.pipe(res)
})
