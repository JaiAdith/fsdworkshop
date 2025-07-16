import Booking from "../models/booking.model.js";
import Car from "../models/car.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const {
      car,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      additionalDrivers,
      specialRequests
    } = req.body;

    if (!car || !startDate || !endDate || !pickupLocation || !dropoffLocation) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    // Check if car exists and is available
    const carDoc = await Car.findById(car);
    if (!carDoc) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    if (!carDoc.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Car is not available"
      });
    }

    // Check for overlapping bookings
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    if (startDateTime >= endDateTime) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date"
      });
    }

    const overlappingBooking = await Booking.findOne({
      car: car,
      status: { $in: ['confirmed', 'active'] },
      $or: [
        {
          startDate: { $lte: endDateTime },
          endDate: { $gte: startDateTime }
        }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({
        success: false,
        message: "Car is already booked for the selected dates"
      });
    }

    // Calculate total days and amount
    const timeDiff = endDateTime.getTime() - startDateTime.getTime();
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const totalAmount = totalDays * carDoc.pricePerDay;

    // Create booking
    const booking = new Booking({
      user: req.user.id,
      car,
      startDate: startDateTime,
      endDate: endDateTime,
      totalDays,
      totalAmount,
      pickupLocation,
      dropoffLocation,
      additionalDrivers,
      specialRequests
    });

    await booking.save();

    // Populate the booking with car and user details
    const populatedBooking = await Booking.findById(booking._id)
      .populate('car', 'brand model year image pricePerDay')
      .populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      data: populatedBooking
    });
  } catch (error) {
    console.error("Error in createBooking:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('car', 'brand model year image pricePerDay licensePlate')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error("Error in getUserBookings:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all bookings (Admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('car', 'brand model year image pricePerDay licensePlate')
      .populate('user', 'name email phone licenseNumber')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error("Error in getAllBookings:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Booking ID" });
    }

    const booking = await Booking.findById(id)
      .populate('car')
      .populate('user', 'name email phone licenseNumber address');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // Check if user owns the booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this booking"
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error("Error in getBookingById:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, mileageBefore, mileageAfter, fuelLevelBefore, fuelLevelAfter, damage } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Booking ID" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // Update booking fields
    if (status) booking.status = status;
    if (mileageBefore !== undefined) booking.mileageBefore = mileageBefore;
    if (mileageAfter !== undefined) booking.mileageAfter = mileageAfter;
    if (fuelLevelBefore) booking.fuelLevelBefore = fuelLevelBefore;
    if (fuelLevelAfter) booking.fuelLevelAfter = fuelLevelAfter;
    if (damage) booking.damage = damage;

    await booking.save();

    const updatedBooking = await Booking.findById(id)
      .populate('car', 'brand model year image')
      .populate('user', 'name email phone');

    res.json({
      success: true,
      data: updatedBooking
    });
  } catch (error) {
    console.error("Error in updateBookingStatus:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Booking ID" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // Check if user owns the booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this booking"
      });
    }

    // Check if booking can be cancelled
    if (booking.status === 'active' || booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel an active or completed booking"
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully"
    });
  } catch (error) {
    console.error("Error in cancelBooking:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};