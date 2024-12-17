import express from 'express';
import paymentController from '../controllers/Payment.contorller.js';  // Import the payment controller
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { verifyAdminjwt } from '../middlewares/AdminAuth.middleware.js';

const router = express.Router();

router.post('/get-allPayments', verifyAdminjwt, paymentController.getAllPayments);
// Route to create an order
router.post('/create-order', verifyjwt, paymentController.createOrder);

// Route to verify the payment
router.post('/verify-payment', verifyjwt, paymentController.verifyPayment);

export default router;