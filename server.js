import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

// Models
import User from './models/User.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';
import Product from './models/Product.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jewelry-store';
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await seedProducts();
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Seeding function
async function seedProducts() {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log('🌱 Seeding products...');
            const initialProducts = [
                {
                    id: 1,
                    name: "The Eternity Ring",
                    category: "Rings",
                    material: "18K Gold",
                    stone: "Diamond",
                    occasion: "Engagement",
                    price: "$12,500",
                    img: "/images/hero-luxury-2.png",
                    description: "A timeless masterpiece, the Eternity Ring features 2ct of the world's finest diamonds set in recycled 18k Rose Gold. Designed to immortalize the most profound promises, its circular brilliance dances with every ray of light."
                },
                {
                    id: 2,
                    name: "Royal Sapphire",
                    category: "Necklaces",
                    material: "Platinum",
                    stone: "Sapphire",
                    occasion: "Gala",
                    price: "$28,000",
                    img: "/images/hero-luxury.png",
                    description: "The Royal Sapphire is a breath-taking expression of oceanic depth. A singular 5ct Ceylon Sapphire rests within a platinum lattice, surrounded by a constellation of micro-pavé diamonds for an aura of regal elegance."
                },
                {
                    id: 3,
                    name: "Golden Horizon",
                    category: "Bracelets",
                    material: "24K Gold",
                    stone: "Diamond",
                    occasion: "Anniversary",
                    price: "$18,200",
                    img: "/images/hero-luxury-3.png",
                    description: "Sculpted from pure 24k gold, the Golden Horizon bracelet captures the warmth of a setting sun. The faceted surface is punctuated by high-clarity diamonds, creating a piece that is as robust as it is radiant."
                },
                {
                    id: 4,
                    name: "Imperial Necklace",
                    category: "Necklaces",
                    material: "18K Gold",
                    stone: "Ruby",
                    occasion: "Gala",
                    price: "$45,000",
                    img: "/images/collection-ruby.png",
                    description: "Commanding and passionate, the Imperial Necklace showcases a 10ct pigeon-blood ruby. Suspended from a hand-woven 18k gold chain, it is the pinnacle of the LUMIÈRE signature collection, reserved for the most extraordinary occasions."
                },
                {
                    id: 5,
                    name: "Midnight Pearl",
                    category: "Earrings",
                    material: "Silver",
                    stone: "Pearl",
                    occasion: "Evening",
                    price: "$8,900",
                    img: "/images/collection-emerald.png",
                    description: "The Midnight Pearl earrings are a study in contrast. Rare Tahitian black pearls are cradled in oxidized sterling silver, offering a mysterious and contemporary alternative to traditional high-jewelry staples."
                },
                {
                    id: 6,
                    name: "Celestial Band",
                    category: "Rings",
                    material: "18K Gold",
                    stone: "Diamond",
                    occasion: "Wedding",
                    price: "$15,400",
                    img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1200",
                    description: "Inspired by the night sky, the Celestial Band features an irregular arrangement of brilliant-cut diamonds that mimic a starry nebula. A perfect choice for those who seek a wedding band with cosmic character."
                },
                {
                    id: 7,
                    name: "Nocturnal Emerald",
                    category: "Rings",
                    material: "18K Gold",
                    stone: "Emerald",
                    occasion: "Gala",
                    price: "$32,000",
                    img: "/images/collection-emerald.png",
                    description: "A deep, verdant 4ct Zambian Emerald takes center stage in this architectural gold ring. The Nocturnal Emerald represents the peak of sophistication, blending geometric strength with organic, vivid color."
                },
                {
                    id: 8,
                    name: "Arctic Mist",
                    category: "Earrings",
                    material: "Platinum",
                    stone: "Diamond",
                    occasion: "Wedding",
                    price: "$12,200",
                    img: "/images/hero-luxury-3.png",
                    description: "Delicate and ethereal, the Arctic Mist earrings feature cascading drops of pear-shaped diamonds. They evoke the transient beauty of mountain fog, shimmering with a cool, platinum glow."
                },
                {
                    id: 9,
                    name: "Lunar Bracelet",
                    category: "Bracelets",
                    material: "Silver",
                    stone: "Pearl",
                    occasion: "Evening",
                    price: "$10,500",
                    img: "https://images.unsplash.com/photo-1543810145-21d960714b2d?auto=format&fit=crop&q=80&w=1200",
                    description: "The Lunar Bracelet features hand-selected South Sea pearls that catch the moonlight. Each pearl is uniquely lustrous, threaded on a silk-wrapped silver cord for a piece that feels intimate and alive."
                }
            ];
            await Product.insertMany(initialProducts);
            console.log('✅ Products seeded successfully.');
        }
    } catch (error) {
        console.error('❌ Seeding error:', error);
    }
}

// --- Middleware ---

const sessionize = async (req, res, next) => {
    const token = req.cookies.token;
    let sessionId = req.cookies.sessionId;

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (user) {
                req.user = user;
                return next();
            } else {
                // If token exists but user is gone from DB, clear the invalid token
                res.clearCookie('token', { path: '/' });
            }
        } catch (e) {
            // Token invalid, clear it
            res.clearCookie('token', { path: '/' });
        }
    }

    if (!sessionId) {
        sessionId = uuidv4();
        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            maxAge: 365 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
            path: '/'
        });
    }
    req.sessionId = sessionId;
    next();
};

const authenticate = async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Please authenticate.' });
    next();
};

// --- Auth Routes ---

app.post('/api/auth/signup', sessionize, async (req, res) => {
    try {
        const { name, password } = req.body;
        const email = req.body.email.toLowerCase();
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'Email already in use.' });

        user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
            path: '/'
        });

        if (req.sessionId) {
            const guestCart = await Cart.findOne({ sessionId: req.sessionId });
            if (guestCart && guestCart.items.length > 0) {
                await Cart.findOneAndUpdate({ userId: user._id }, { items: guestCart.items }, { upsert: true });
                await Cart.deleteOne({ sessionId: req.sessionId });
            }
        }
        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user.' });
    }
});

app.post('/api/auth/login', sessionize, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) return res.status(400).json({ error: 'Invalid credentials.' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
            path: '/'
        });

        if (req.sessionId) {
            const guestCart = await Cart.findOne({ sessionId: req.sessionId });
            if (guestCart && guestCart.items.length > 0) {
                await Cart.findOneAndUpdate({ userId: user._id }, { items: guestCart.items }, { upsert: true });
                await Cart.deleteOne({ sessionId: req.sessionId });
            }
        }
        res.json({ user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
});

app.post('/api/auth/logout', sessionize, async (req, res) => {
    try {
        if (req.user) {
            // Clear the user's cart in the database upon logout as requested
            await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [], updatedAt: Date.now() });
            console.log(`[Logout] Cleared cart for ${req.user.email}`);
        }
        res.clearCookie('token', { path: '/' });
        res.json({ message: 'Logged out' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Logout failed.' });
    }
});

app.get('/api/auth/me', sessionize, (req, res) => {
    if (req.user) res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email } });
    else res.status(401).json({ error: 'Not logged in' });
});

// --- Product Routes ---
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ id: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products.' });
    }
});

// --- Cart Routes ---

app.get('/api/cart', sessionize, async (req, res) => {
    try {
        const query = req.user ? { userId: req.user._id } : { sessionId: req.sessionId };
        let cart = await Cart.findOne(query);
        if (!cart) {
            cart = new Cart({ ...query, items: [] });
            await cart.save();
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart.' });
    }
});

app.post('/api/cart/sync', sessionize, async (req, res) => {
    try {
        const { items } = req.body;

        // Clean items: Convert price strings (e.g., "$12,500") to actual numbers for the DB
        const cleanedItems = items.map(item => ({
            ...item,
            price: typeof item.price === 'string'
                ? Number(item.price.replace(/[^0-9.]/g, ''))
                : item.price
        }));

        const query = req.user ? { userId: req.user._id } : { sessionId: req.sessionId };

        console.log(`[Cart Sync] Syncing ${cleanedItems.length} items for ${req.user ? req.user.email : 'Guest ' + req.sessionId}`);

        await Cart.findOneAndUpdate(
            query,
            { items: cleanedItems, updatedAt: Date.now() },
            { upsert: true, new: true, runValidators: true }
        );

        res.json({ success: true });
    } catch (error) {
        console.error('❌ Cart Sync Error:', error.message);
        res.status(500).json({ error: 'Error syncing cart: ' + error.message });
    }
});

// --- Orders ---

app.post('/api/orders', sessionize, async (req, res) => {
    try {
        const { items, totalAmount, paymentDetails, customerDetails } = req.body;
        if (!customerDetails.email) return res.status(400).json({ error: 'Email required.' });

        const order = new Order({
            userId: req.user?._id,
            sessionId: req.sessionId,
            email: customerDetails.email,
            items,
            totalAmount,
            paymentDetails,
            customerDetails,
            paymentStatus: 'completed'
        });
        await order.save();
        const query = req.user ? { userId: req.user._id } : { sessionId: req.sessionId };
        await Cart.findOneAndUpdate(query, { items: [] });

        // Email logic...
        try {
            const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'your-email@gmail.com', pass: process.env.EMAIL_PASS } });
            const itemsHtml = items.map(item => `<tr><td>${item.name}</td><td style="text-align: right;">${item.quantity} x $${item.price.toLocaleString()}</td></tr>`).join('');
            const mailOptions = {
                from: '"LUMIÈRE" <your-email@gmail.com>',
                to: order.email,
                subject: `✨ Order Confirmed: #${order._id.toString().slice(-6).toUpperCase()}`,
                html: `<div style="background:#000;color:#fff;padding:40px;border:1px solid #d4af37;"><h1>LUMIÈRE</h1><p>Order Confirmed</p><hr><p>Dear ${customerDetails.firstName},</p><table>${itemsHtml}</table><p>Total: $${totalAmount.toLocaleString()}</p></div>`
            };
            await transporter.sendMail(mailOptions);
        } catch (e) { console.error('E-mail error:', e); }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Order error.' });
    }
});

app.get('/api/orders', sessionize, authenticate, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders.' });
    }
});

app.post('/api/consultation', async (req, res) => {
    const { name, email, preferences } = req.body;
    try {
        const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'your-email@gmail.com', pass: process.env.EMAIL_PASS } });
        const mailOptions = { from: '"LUMIÈRE" <your-email@gmail.com>', to: 'your-email@gmail.com', subject: `Inquiry: ${name}`, html: `<p>New request from ${name} (${email})</p><p>${preferences}</p>` };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Success' });
    } catch (e) { res.status(500).json({ error: 'Fail' }); }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
