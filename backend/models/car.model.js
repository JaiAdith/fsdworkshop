import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Economy', 'Compact', 'Mid-size', 'Full-size', 'SUV', 'Luxury', 'Sports'],
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Manual', 'Automatic'],
  },
  seats: {
    type: Number,
    required: true,
  },
  features: [{
    type: String,
  }],
  image: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
}, {
  timestamps: true,
});

const Car = mongoose.model("Car", carSchema);

export default Car;