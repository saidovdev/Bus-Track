import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  longitude: { type: Number, required: true }, 
  latitude: { type: Number, required: true },
  
  phone: { type: String, required: true, unique: true },
  description: { type: String },
  busLine: { type: String, required: true },
  role: { type: String, default: 'driver' },
  
  images: [{
    image: { type: String },
    description: { type: String }
  }]
}, {
  timestamps: true
});
export default mongoose.model('Location', LocationSchema);