import express from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking
} from "../controllers/booking.controller.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Protected routes - user bookings
router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getUserBookings);
router.get("/:id", protect, getBookingById);
router.put("/:id/cancel", protect, cancelBooking);

// Admin routes
router.get("/", protect, admin, getAllBookings);
router.put("/:id/status", protect, admin, updateBookingStatus);

export default router;