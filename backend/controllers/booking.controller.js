import Booking from '../models/booking.model.js';

export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car user');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};