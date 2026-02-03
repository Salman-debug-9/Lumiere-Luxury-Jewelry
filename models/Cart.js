import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    sessionId: { type: String, required: false }, // For guests
    items: [{
        productId: { type: String, required: true }, // Using String for ID if from a static list, or ObjectId if referencing a Product model
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        quantity: { type: Number, default: 1 },
        category: { type: String }
    }],
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Cart', cartSchema);
