import express from 'express';
import Order from '../models/Order.model.js';

// Controller for handling order operations
const OrderController = {
    /** 
     * @desc    Create a new order
     * @route   POST /api/orders
     * @access  Public
     */
    createOrder: async (req, res) => {
        try {
            const { products, totalPrice, shippingAddress, paymentMethod } = req.body;

            if (!user || !products || !totalPrice || !shippingAddress || !paymentMethod) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            const newOrder = new Order({ user: req.user._id, products, totalPrice, shippingAddress, paymentMethod });
            const savedOrder = await newOrder.save();

            res.status(201).json({ success: true, data: savedOrder });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Get order status by ID
     * @route   GET /api/orders/:id/status
     * @access  Public
     */
    checkOrderStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findById(id);

            if (!order) {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            res.status(200).json({ success: true, status: order.status });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Get order by ID
     * @route   GET /api/orders/:id
     * @access  Public
     */
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findById(id).populate('user').populate('products.product');

            if (!order) {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            res.status(200).json({ success: true, data: order });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Get all orders by user
     * @route   GET /api/orders/user/:userId
     * @access  Public
     */
    getAllOrdersByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const orders = await Order.find({ user: userId }).populate('products.product');

            res.status(200).json({ success: true, data: orders });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Update an order
     * @route   PUT /api/orders/:id
     * @access  Private (User must be the owner)
     */
    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const { products, totalPrice, shippingAddress, status } = req.body;

            const order = await Order.findById(id);

            if (!order) {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            // Check if the logged-in user is the owner of the order
            if (order.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ success: false, message: 'You are not authorized to update this order' });
            }

            if (order.status !== 'pending') {
                return res.status(403).json({ success: false, message: `Cannot update. Your order is currently ${order.status}. Please contact admin for more info.` });
            }

            order.products = products || order.products;
            order.totalPrice = totalPrice || order.totalPrice;
            order.shippingAddress = shippingAddress || order.shippingAddress;
            if (status) order.status = status;

            const updatedOrder = await order.save();

            res.status(200).json({ success: true, data: updatedOrder });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },

    /** 
     * @desc    Delete an order by ID
     * @route   DELETE /api/orders/:id
     * @access  Private (User must be the owner)
     */
    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params;

            const order = await Order.findById(id);

            if (!order) {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            // Check if the logged-in user is the owner of the order
            if (order.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ success: false, message: 'You are not authorized to delete this order' });
            }

            if (order.status !== 'pending') {
                return res.status(403).json({ success: false, message: `Cannot delete. Your order is currently ${order.status}. Please contact admin for more info.` });
            }

            await Order.findByIdAndDelete(id);

            res.status(200).json({ success: true, message: 'Order deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }
    },
};

export default OrderController;