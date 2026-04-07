import driverModel from '../models/driverModels.js';
import jwt from 'jsonwebtoken';

export const checkAuthToken = async (req, res, next) => {
    try {
       const token =req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const driver = await driverModel.findById(decoded.id).select('-password');

        if (!driver) {
            return res.status(404).json({ message: "Driver Not found" });
        }

        req.driver = driver;

        next(); 
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ message: "Token is not defind" });
    }
};