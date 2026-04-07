import express from "express";
const router =express.Router()
import { createDriver,getDrivers,updateDriver,deleteDriver } from "../controllers/CreateDriver.js";
import { login } from "../controllers/loginDriver.js";

router.post('/create',createDriver)
router.put('/put/:id',updateDriver)
router.delete('/delete/:id',deleteDriver)
router.get('/get',getDrivers)
router.post('/login',login)

export default router