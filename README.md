# LUMIÈRE – High-End Jewelry E-Commerce Platform 💍

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](#)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-MIT-gold)](#)

**LUMIÈRE** is a premium, cinematic e-commerce destination designed for the world's most exquisite jewelry. This platform goes beyond simple shopping; it is a digital experience crafted with luxury aesthetics, smooth-as-silk animations, and a high-performance architecture.

---

## ✨ Features

### 💎 The Experience (Frontend)
- **Cinematic UI:** A bespoke dark-themed interface utilizing a sophisticated gold and ivory color palette.
- **Micro-Interactions:** Leverages **GSAP** and **Framer Motion** for fluid, physics-based animations.
- **Adaptive Navigation:** A smart navigation system that tracks user state (Guest vs. Member).
- **Smooth Scrolling:** Integrated with **Lenis** for a refined, premium feel across all devices.
- **Dynamic Collection Gallery:** Real-time filtering and sorting of high-jewelry pieces.
- **Product Storytelling:** Detailed product pages with rich descriptions and material insights.

### 🛡️ The Core (Backend & Security)
- **Unified Auth System:** Secure registration and login using **JWT** (JSON Web Tokens) stored in HTTP-only cookies.
- **Hybrid Cart Logic:** Advanced session management that merges Guest carts into User accounts after login.
- **Order Pipeline:** Robust order processing with unique transaction IDs and status tracking.
- **Email Automation:** Integrated **Nodemailer** for instant order confirmations and private consultation requests.
- **PDF Generation:** Automated invoice generation for every completed order using **jsPDF**.
- **Secure Data Handling:** Password hashing with **Bcrypt.js** and filtered database queries.

---

## 🚀 Technical Stack

### **Frontend Infrastructure**
*   **React 19 (Vite):** Next-generation performance and HMR.
*   **Tailwind CSS 4 & SCSS:** Modern, utility-first styling with advanced pre-processing.
*   **Framer Motion:** Declarative animations for UI state transitions.
*   **GSAP:** High-performance scroll-driven animations and complex sequences.
*   **React Icons:** Comprehensive, customizable icon sets.

### **Backend Infrastructure**
*   **Node.js & Express.js:** Scalable, lightweight runtime and framework.
*   **MongoDB & Mongoose:** NoSQL database with flexible schema modeling.
*   **JSON Web Tokens (JWT):** Secure, stateless authentication.
*   **Cookie-Parser:** Efficient handling of secure session cookies.
*   **Nodemailer:** Professional SMTP integration for email communication.

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **MongoDB:** A local instance (Community Server) or a MongoDB Atlas URI
- **NPM/Yarn:** Package manager installed

### Step-by-Step Guide

1. **Clone the Masterpiece**
   ```bash
   git clone https://github.com/your-username/lumiere-jewelry.git
   cd lumiere-jewelry
   ```

2. **Synchronize Dependencies**
   ```bash
   npm install
   ```

3. **Configure the Environment**
   Create a `.env` file in the root directory and populate it with your credentials:
   ```env
   # Server Configuration
   PORT=5000
   
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Security
   JWT_SECRET=your_generate_a_strong_secret_key
   
   # Email Services (Gmail)
   EMAIL_PASS=your_gmail_app_password
   ```

4. **Launch the Ecosystem**
   
   Execute the **Backend** (Server):
   ```bash
   npm run server
   ```
   
   In a separate terminal, execute the **Frontend** (Vite):
   ```bash
   npm run dev
   ```

---

## 📂 Project Architecture

```text
├── models/             # Mongoose schemas (User, Product, Cart, Order)
├── public/             # Static assets and high-res images
├── src/
│   ├── components/     # UI Atoms, Molecules, and Organisms
│   │   ├── advanced/   # Special interaction components (Auth, Consult)
│   │   ├── commerce/   # Shopping logic components (Checkout, Orders)
│   ├── context/        # Global State (AuthContext, StoreContext)
│   ├── styles/         # Global CSS and SCSS variables
│   ├── App.jsx         # Main orchestration layer
│   └── main.jsx        # Entry point
├── server.js           # API Gateway and Backend orchestrator
└── .env                # Private configuration (Excluded from Git)
```

---

## 🔌 API Documentation (V1)

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/products` | `GET` | Fetch all luxury products | No |
| `/api/auth/signup` | `POST` | Create a new diamond membership | No |
| `/api/auth/login` | `POST` | Authenticate an existing member | No |
| `/api/cart` | `GET` | Retrieve the active shopping session | No |
| `/api/cart/sync` | `POST` | Sync local cart state with Database | No |
| `/api/orders` | `POST` | Process a new masterpiece order | No |
| `/api/orders` | `GET` | View member's order history | **Yes** |
| `/api/consultation`| `POST` | Request a private specialist inquiry| No |

---

## 🎨 UI Design System

*   **Primary Palette:** `Luxury Black (#050505)`, `Gold (#D4AF37)`, `Ivory (#F5F5F0)`
*   **Typography:** 
    *   *Headings:* Cinzel / Playfair Display (Serif)
    *   *Body:* Inter / Montserrat (Sans-Serif)
*   **Philosophy:** Minimalist luxury, high-contrast, and meaningful negative space.

---

## 🔮 Future Roadmap

- [ ] **Admin Dashboard:** Full product and order management interface.
- [ ] **Wishlist:** Personal "Dream Collection" for registered users.
- [ ] **Multi-Currency:** Dynamic pricing based on global exchange rates.
- [ ] **Reviews:** Authenticated member reviews with photo uploads.
- [ ] **AR Try-On:** Augmented Reality to visualize rings on your hand.

---

*Handcrafted with passion for the world of luxury. 
Designed by **LUMIÈRE MAISON**.*
