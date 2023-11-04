import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { generatorService } from '../services/generator.service.js'
import { BarcodeSchema } from '../interfaces/barcode.js'

export const router = Router()

router.post('', async (req: Request, res: Response) => {
  try {
    const body = BarcodeSchema.parse(req.body)
    const doc = await generatorService.generatePdf(body)
    res.contentType('pdf')
    doc.pipe(res)
  } catch (err) {
    console.error(err)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})
