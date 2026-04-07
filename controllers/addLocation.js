import locationsModel from "../models/locationsModel.js";

export const createLocation = async (req, res) => {
    try {
        const { name, longitude, latitude, phone, busLine, description, images } = req.body;

        if (!name || !longitude || !latitude || !phone || !busLine) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const newLocation = new locationsModel({
            name,
            longitude,
            latitude,
            phone,
            busLine,
            description,
            images
        });

        await newLocation.save();
        return res.status(201).json({
            message: "Location created successfully",
            location: newLocation
        });
    } catch (error) {
        console.error("Create Location Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedLocation = await locationsModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        return res.status(200).json({
            message: "Location updated successfully",
            location: updatedLocation
        });
    } catch (error) {
        console.error("Update Location Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLocation = await locationsModel.findByIdAndDelete(id);

        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        return res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        console.error("Delete Location Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getLocations = async (req, res) => {
    try {
        const locations = await locationsModel.find();
        return res.status(200).json(locations);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching locations" });
    }
};