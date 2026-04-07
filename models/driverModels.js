import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  busLine: { type: String, required: true },
  busCode: { type: String, required: true },
  role: { type: String, default: 'driver' },

  location: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  }

}, { timestamps: true });

export default mongoose.model('Driver', DriverSchema);