import driver from '../models/driverModels.js';
import bcrypt from 'bcryptjs';

export const createDriver = async (req, res) => {
    try {
        const { fullname, password, busCode, busLine, phone } = req.body;
        if (!fullname || !password || !busCode || !busLine || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const driverExists = await driver.findOne({ phone });
        if (driverExists) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        const newDriver = new driver({
            fullname,
            password: hashedPassword,
            busCode,
            busLine,
            phone
        });

        await newDriver.save();

 return res.status(200).json({message:'Driver created successfully '})


    } catch (error) {
        console.error("Create Driver Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getDrivers = async (req, res) => {
    try {
        const drivers = await driver.find().select('-password');
        return res.status(200).json(drivers);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching drivers" });
    }
};


export const updateDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, busCode, busLine, phone, password } = req.body;
        

        let updateData = { fullname, busCode, busLine, phone };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedDriver = await driver.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }

        return res.status(200).json({
            message: "Driver updated successfully",
            driver: updatedDriver
        });
    } catch (error) {
        return res.status(500).json({ error: "Error updating driver" });
    }
};

export const deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedDriver = await driver.findByIdAndDelete(id);

        if (!deletedDriver) {
            return res.status(404).json({ message: "Driver not found" });
        }

        return res.status(200).json({ message: "Driver deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error deleting driver" });
    }
};