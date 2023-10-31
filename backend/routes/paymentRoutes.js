// routes/paymentRoutes.js

import express from 'express';
const router = express.Router();
import { processPayment } from '../controllers/paymentController.js';

// Route for processing payment
router.post('/process', processPayment);

export default router;
