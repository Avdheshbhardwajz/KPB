import Razorpay from "razorpay";
import dotenv from "dotenv";
import Payment from "../models/payment.js";
import crypto from "crypto";

dotenv.config();

const key_id = process.env.RAZORPAY_KEY;
const key_secret = process.env.RAZORPAY_SECRET;
var razorpay = new Razorpay({
    key_id,
    key_secret,
});

const createOrder = async (req, res) => {
    var { amount, currency, receipt, ven_id } = req.body;
    amount = parseInt(amount);
    receipt = receipt.toString();
    console.log(amount, currency, receipt);

    try {
        // Create the Razorpay order
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency,
            receipt: receipt,
        });

        // Create a new payment record in the database
        const newPayment = await Payment.create({
            order: order.id,
            paymentMethod: 'razorpay',
            paymentStatus: 'pending', // Set as pending initially
            paymentDate: new Date(),
        });

        return res.json({ order, payment: newPayment });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllPayments = async () => {
    try {
        const payments = await razorpay.payments.all();
        return console.log(payments.items[0]);
    } catch (error) {
        return console.log(error);
    }
};

const verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature, ven_id } = req.body;
    try {
        const key_secret = process.env.RAZORPAY_SECRET;

        const generatedSignature = crypto
            .createHmac("sha256", key_secret)
            .update(order_id + "|" + payment_id)
            .digest("hex");

        if (generatedSignature === signature) {
            const paymentDetails = await razorpay.payments.fetch(payment_id);
            const formattedDetails = {
                invoiceNumber: `${paymentDetails.id}`,
                invoiceDate: new Date().toLocaleDateString(),
                amount: paymentDetails.amount / 100,
                method: paymentDetails.method,
                created_at: new Date(
                    paymentDetails.created_at * 1000,
                ).toLocaleDateString(),
                id: paymentDetails.id,
            };

            // Find the payment record in DB and update it
            const payment = await Payment.findOneAndUpdate(
                { order: order_id },
                {
                    paymentStatus: 'completed',  // Update payment status to completed
                    paymentDate: new Date(),
                    paymentMethod: paymentDetails.method,
                },
                { new: true }  // Return the updated document
            );


            return res.json({ message: "Payment verified", payment });
        } else {
            return res.status(400).json({ error: "Invalid payment" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
};

export default {
    createOrder,
    getAllPayments,
    verifyPayment,
};