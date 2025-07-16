const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    status: { type: String, enum: ['available', 'rented', 'maintenance'], default: 'available' },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);