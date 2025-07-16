import express from 'express';
import { getCars, addCar, updateCar, deleteCar } from '../controllers/car.controller.js';

const router = express.Router();

router.get('/', getCars);
router.post('/', addCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;