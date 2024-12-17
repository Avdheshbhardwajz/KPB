import express from 'express';
import OrderController from '../controllers/Order.controller.js';
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { verifyAdminjwt } from '../middlewares/AdminAuth.middleware.js';

const router = express.Router();

// Route to create a new order
router.post('/', verifyjwt, OrderController.createOrder);

// Route to get order status by ID
router.get('/:id/status', verifyjwt, OrderController.checkOrderStatus);

// Route to get order details by ID
router.get('/:id', verifyjwt, OrderController.getOrderById);

// Route to get all orders by user
router.get('/user/:userId', verifyjwt, OrderController.getAllOrdersByUser);

// Route to update an order
router.put('/:id', verifyjwt, OrderController.updateOrder);

// Route to delete an order by ID
router.delete('/:id', verifyjwt, OrderController.deleteOrder);

// Route to getAllOrders AdminupdateOrder
router.get('/admin/getallorders', verifyAdminjwt, OrderController.getAllOrders);

// Route to getAllOrders AdminupdateOrder
router.put('/admin/:id', verifyAdminjwt, OrderController.AdminupdateOrder);

export default router;