import driverModel from '../models/driverModels.js';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const driver = await driverModel.findOne({ phone });
        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }

        const isMatch = await bcrypt.compare(password, driver.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: driver._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '365d' }
        );

    
        res.cookie("token", token, {
            httpOnly: true,       
            secure: false,       
            sameSite: "lax",      
            maxAge: 365 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            message: "Logged in successfully",
            driver: {
                id: driver._id,
                fullname: driver.fullname,
                busLine: driver.busLine,
                busCode: driver.busCode
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};