import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String },
  available: { type: Boolean, default: true },
});

export default mongoose.model('Car', carSchema);