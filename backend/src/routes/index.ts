import { Router } from 'express'

import { router as appSettings } from './app-settings.js'
import { router as generator } from './generator.js'

export const router = Router()

router.use('/app-settings', appSettings)
router.use('/generator', generator)
