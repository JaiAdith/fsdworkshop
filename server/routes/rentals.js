const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');
const Car = require('../models/Car');
const auth = require('../middleware/auth');

// Create rental (authenticated users)
router.post('/', auth, async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;

    const car = await Car.findById(carId);
    if (!car || car.status !== 'available') {
      return res.status(400).json({ message: 'Car not available' });
    }

    const days = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = days * car.pricePerDay;

    const rental = new Rental({
      car: carId,
      user: req.user._id,
      startDate,
      endDate,
      totalPrice,
    });
    await rental.save();

    car.status = 'rented';
    await car.save();

    res.status(201).json(rental);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get rentals for current user
router.get('/me', auth, async (req, res) => {
  try {
    const rentals = await Rental.find({ user: req.user._id }).populate('car');
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all rentals (admin)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  try {
    const rentals = await Rental.find().populate('car user');
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete rental (admin)
router.put('/:id/complete', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: 'Rental not found' });

    rental.status = 'completed';
    await rental.save();

    const car = await Car.findById(rental.car);
    if (car) {
      car.status = 'available';
      await car.save();
    }

    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;