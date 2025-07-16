const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rental', rentalSchema);