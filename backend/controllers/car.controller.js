import Car from "../models/car.model.js";
import mongoose from "mongoose";

// Get all cars with optional filtering
export const getCars = async (req, res) => {
  try {
    const {
      category,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
      location,
      available
    } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (available === 'true') filter.isAvailable = true;

    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    console.error("Error in getCars:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get single car by ID
export const getCarById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Car ID" });
  }

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    console.error("Error in getCarById:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create new car (Admin only)
export const createCar = async (req, res) => {
  const car = req.body;

  if (!car.brand || !car.model || !car.year || !car.pricePerDay || !car.licensePlate) {
    return res.status(400).json({ 
      success: false, 
      message: "Please provide all required fields" 
    });
  }

  try {
    const newCar = new Car(car);
    await newCar.save();
    res.status(201).json({ success: true, data: newCar });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "License plate already exists" 
      });
    }
    console.error("Error in createCar:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update car
export const updateCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Car ID" });
  }

  try {
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    res.status(200).json({ success: true, data: updatedCar });
  } catch (error) {
    console.error("Error in updateCar:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete car
export const deleteCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Car ID" });
  }

  try {
    await Car.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCar:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Search cars
export const searchCars = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: "Search query is required" 
      });
    }

    const cars = await Car.find({
      $or: [
        { brand: { $regex: query, $options: 'i' } },
        { model: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    console.error("Error in searchCars:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};