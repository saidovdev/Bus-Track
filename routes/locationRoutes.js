import express from 'express'
const router =express.Router()
import { createLocation ,updateLocation,deleteLocation, getLocations} from '../controllers/addLocation.js'

router.post('/create', createLocation)
router.put('/put/:id',updateLocation)
router.delete('/delete/:id',deleteLocation)
router.get('/get',getLocations)
export default router

