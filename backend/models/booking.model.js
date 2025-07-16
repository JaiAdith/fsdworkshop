import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
    default: 'pending',
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropoffLocation: {
    type: String,
    required: true,
  },
  additionalDrivers: [{
    name: String,
    licenseNumber: String,
  }],
  specialRequests: {
    type: String,
    maxlength: 500,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'cash'],
  },
  damage: {
    reported: {
      type: Boolean,
      default: false,
    },
    description: String,
    images: [String],
    cost: {
      type: Number,
      default: 0,
    },
  },
  mileageBefore: Number,
  mileageAfter: Number,
  fuelLevelBefore: {
    type: String,
    enum: ['Empty', 'Quarter', 'Half', 'Three-Quarter', 'Full'],
  },
  fuelLevelAfter: {
    type: String,
    enum: ['Empty', 'Quarter', 'Half', 'Three-Quarter', 'Full'],
  },
}, {
  timestamps: true,
});

// Calculate total days automatically
bookingSchema.pre('save', function(next) {
  if (this.startDate && this.endDate) {
    const timeDiff = this.endDate.getTime() - this.startDate.getTime();
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;