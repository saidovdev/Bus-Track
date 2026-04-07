import express from 'express'
const router =express.Router()
import { checkAuthToken } from '../midleware/checkAuthification.js'
import { getDriverData } from '../controllers/getDriver.js'

router.use(checkAuthToken)
router.get('/me',getDriverData)
export default router