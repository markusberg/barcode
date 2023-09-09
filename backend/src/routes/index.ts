import { Router } from 'express'

export const router = Router()

import { router as barcodes } from './barcodes'

router.use('/barcodes', barcodes)
