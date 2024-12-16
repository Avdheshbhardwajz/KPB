import mongoose, { Schema } from 'mongoose';

const paymentSchema = new Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'cash_on_delivery'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
