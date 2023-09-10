import { Router } from 'express'

export const router = Router()

import { router as appSettings } from './app-settings'
import { router as generator } from './generator'

router.use('/app-settings', appSettings)
router.use('/generator', generator)
