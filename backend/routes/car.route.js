import express from "express";
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  searchCars
} from "../controllers/car.controller.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getCars);
router.get("/search", searchCars);
router.get("/:id", getCarById);

// Protected routes (Admin only)
router.post("/", protect, admin, createCar);
router.put("/:id", protect, admin, updateCar);
router.delete("/:id", protect, admin, deleteCar);

export default router;