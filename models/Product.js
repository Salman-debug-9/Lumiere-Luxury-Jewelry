import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    material: { type: String, required: true },
    stone: { type: String, required: true },
    occasion: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
