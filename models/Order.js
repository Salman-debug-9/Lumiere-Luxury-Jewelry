import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    sessionId: { type: String, required: false }, // For guests
    email: { type: String, required: true },
    items: [{
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentDetails: {
        method: { type: String },
        transactionId: { type: String }
    },
    customerDetails: {
        firstName: String,
        lastName: String,
        phone: String,
        address: String,
        city: String,
        country: String,
        zipCode: String
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
