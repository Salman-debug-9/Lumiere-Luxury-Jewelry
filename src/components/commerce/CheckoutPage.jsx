import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import imgFallback from '../../assets/images/hero-luxury.png';

const CheckoutPage = () => {
    const { selection, setView, clearSelection } = useStore();
    const [confirmed, setConfirmed] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [useShippingForBilling, setUseShippingForBilling] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: ''
    });

    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardName: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleCardInputChange = (field, value) => {
        setCardData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Contact details validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.country.trim()) newErrors.country = 'Please select a country';
        if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
        if (!formData.address.trim()) newErrors.address = 'Address required';
        if (!formData.city.trim()) newErrors.city = 'City required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone required';

        // Payment validation
        if (!paymentMethod) {
            newErrors.paymentMethod = 'Please select a payment method';
        } else if (paymentMethod === 'credit-card') {
            if (!cardData.cardNumber.trim()) newErrors.cardNumber = 'Card number required';
            if (!cardData.expiry.trim()) newErrors.expiry = 'Expiration date required';
            if (!cardData.cvv.trim()) newErrors.cvv = 'Security code required';
            if (!cardData.cardName.trim()) newErrors.cardName = 'Name on card required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateTotal = () => {
        return selection.reduce((acc, item) => {
            // Flexible price parsing for strings or numbers
            const priceVal = typeof item.price === 'string'
                ? parseInt(item.price.replace(/[^0-9]/g, ''))
                : item.price;
            return acc + (priceVal * (item.quantity || 1));
        }, 0);
    };

    const handleConfirm = async () => {
        if (!validateForm()) return;

        setSubmitting(true);
        try {
            const orderPayload = {
                email: formData.email,
                items: selection.map(item => ({
                    productId: item.productId || item.id,
                    name: item.name,
                    price: typeof item.price === 'string' ? parseInt(item.price.replace(/[^0-9]/g, '')) : item.price,
                    quantity: item.quantity || 1
                })),
                totalAmount: calculateTotal(),
                customerDetails: formData,
                paymentDetails: paymentMethod === 'credit-card' ? {
                    method: 'card',
                    transactionId: 'SIM-TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase()
                } : {
                    method: 'cod'
                }
            };

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(orderPayload)
            });

            if (response.ok) {
                setConfirmed(true);
                clearSelection();
                // Persist the confirmation for a few seconds then return home
                setTimeout(() => setView('landing'), 8000);
            } else {
                const errData = await response.json();
                setErrors({ general: errData.error || 'Failed to process order.' });
            }
        } catch (err) {
            setErrors({ general: 'Network error. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    if (confirmed) {
        return (
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black fixed inset-0 z-[100] flex flex-col items-center justify-center text-center p-6"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, filter: 'blur(20px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 2 }}
                    className="space-y-8"
                >
                    <p className="text-luxury-gold text-xs uppercase tracking-[0.6em]">Order Confirmed</p>
                    <h1 className="text-5xl md:text-7xl font-heading text-white">Your LUMIÈRE piece <br /> is being prepared.</h1>
                    <p className="text-luxury-gray italic font-serif text-xl">An acquisition confirmation has been sent to your email.</p>
                </motion.div>
            </motion.section>
        );
    }

    return (
        <section className="bg-black min-h-screen pt-40 pb-40 px-6 font-body text-white overflow-x-hidden">
            <div className="max-w-4xl mx-auto space-y-20">
                <header className="text-center space-y-6">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        className="text-luxury-gold text-xs uppercase tracking-[0.8em]"
                    >
                        Secure Acquisition
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading"
                    >
                        Checkout
                    </motion.h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <div className="space-y-24">
                        {/* 01. Contact Details */}
                        <section className="space-y-10">
                            <h2 className="text-xs uppercase tracking-[0.4em] text-white/30 flex items-center">
                                01. Contact Details
                                <span className="h-[1px] bg-white/10 flex-1 ml-6"></span>
                            </h2>
                            <div className="space-y-8">
                                <FloatingInput
                                    label="Email Address (Required)"
                                    value={formData.email}
                                    onChange={(v) => handleInputChange('email', v)}
                                    error={errors.email}
                                    type="email"
                                />

                                <div className="space-y-3 group">
                                    <label className="text-[10px] uppercase tracking-[0.4em] text-white/20 group-focus-within:text-luxury-gold transition-colors block">
                                        Country/Region
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.country}
                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                            className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-luxury-gold transition-all duration-500 text-lg font-light text-white appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="" className="bg-black">Select Country</option>
                                            <option value="Pakistan" className="bg-black">Pakistan</option>
                                            <option value="United States" className="bg-black">United States</option>
                                            <option value="United Kingdom" className="bg-black">United Kingdom</option>
                                            <option value="UAE" className="bg-black">UAE</option>
                                        </select>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 group-focus-within:text-luxury-gold transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </div>
                                    </div>
                                    {errors.country && <p className="text-red-400 text-[10px] uppercase tracking-wider">{errors.country}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <FloatingInput label="First Name" value={formData.firstName} onChange={(v) => handleInputChange('firstName', v)} error={errors.firstName} />
                                    <FloatingInput label="Last Name" value={formData.lastName} onChange={(v) => handleInputChange('lastName', v)} error={errors.lastName} />
                                </div>

                                <FloatingInput label="Address" value={formData.address} onChange={(v) => handleInputChange('address', v)} error={errors.address} />

                                <div className="grid grid-cols-2 gap-8">
                                    <FloatingInput label="City" value={formData.city} onChange={(v) => handleInputChange('city', v)} error={errors.city} />
                                    <FloatingInput label="Postal Code (Optional)" value={formData.postalCode} onChange={(v) => handleInputChange('postalCode', v)} error={errors.postalCode} />
                                </div>

                                <FloatingInput label="Phone" value={formData.phone} onChange={(v) => handleInputChange('phone', v)} error={errors.phone} type="tel" />
                            </div>
                        </section>

                        {/* 02. Payment Method */}
                        <section className="space-y-10">
                            <h2 className="text-xs uppercase tracking-[0.4em] text-white/30 flex items-center">
                                02. Payment Method
                                <span className="h-[1px] bg-white/10 flex-1 ml-6"></span>
                            </h2>

                            <div className="space-y-4">
                                <p className="text-[11px] text-white/70 italic">All transactions are secure and encrypted.</p>

                                <div className={`border transition-all duration-500 overflow-hidden ${paymentMethod === 'credit-card' ? 'border-luxury-gold bg-white/5' : 'border-white/10'}`}>
                                    <label className="flex items-center justify-between p-6 cursor-pointer group">
                                        <div className="flex items-center space-x-4">
                                            <div onClick={() => setPaymentMethod('credit-card')} className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paymentMethod === 'credit-card' ? 'border-luxury-gold' : 'border-white/30'}`}>
                                                {paymentMethod === 'credit-card' && <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold" />}
                                            </div>
                                            <span className="text-xs uppercase tracking-[0.2em] font-medium">Credit card</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-70 grayscale hover:grayscale-0 transition-all" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-70 grayscale hover:grayscale-0 transition-all" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-4 opacity-70 grayscale hover:grayscale-0 transition-all" />
                                        </div>
                                    </label>

                                    <AnimatePresence>
                                        {paymentMethod === 'credit-card' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-6 pb-6 space-y-6 pt-2"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Card number"
                                                        value={cardData.cardNumber}
                                                        onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 p-4 text-sm focus:outline-none focus:border-luxury-gold transition-all placeholder:text-white/20"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Expiration date (MM / YY)"
                                                        value={cardData.expiry}
                                                        onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 p-4 text-sm focus:outline-none focus:border-luxury-gold transition-all placeholder:text-white/20"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Security code"
                                                        value={cardData.cvv}
                                                        onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 p-4 text-sm focus:outline-none focus:border-luxury-gold transition-all placeholder:text-white/20"
                                                    />
                                                </div>

                                                <input
                                                    type="text"
                                                    placeholder="Name on card"
                                                    value={cardData.cardName}
                                                    onChange={(e) => handleCardInputChange('cardName', e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 p-4 text-sm focus:outline-none focus:border-luxury-gold transition-all placeholder:text-white/20"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className={`border transition-all duration-500 ${paymentMethod === 'cod' ? 'border-luxury-gold bg-white/5' : 'border-white/10'}`}>
                                    <label className="flex items-center justify-between p-6 cursor-pointer group">
                                        <div className="flex items-center space-x-4">
                                            <div onClick={() => setPaymentMethod('cod')} className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paymentMethod === 'cod' ? 'border-luxury-gold' : 'border-white/30'}`}>
                                                {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold" />}
                                            </div>
                                            <span className="text-xs uppercase tracking-[0.2em] font-medium">Cash on Delivery (COD)</span>
                                        </div>
                                    </label>
                                </div>

                                <div className="pt-8 space-y-6">
                                    <button
                                        onClick={handleConfirm}
                                        disabled={submitting}
                                        className="w-full bg-luxury-gold text-black py-6 text-xs uppercase tracking-[0.6em] font-bold hover:bg-white transition-all duration-700 shadow-[0_20px_50px_rgba(212,175,55,0.15)] active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {submitting ? 'Processing Acquisition...' : 'Complete Order'}
                                    </button>

                                    {errors.general && (
                                        <p className="text-red-400 text-center text-[10px] uppercase tracking-wider">{errors.general}</p>
                                    )}

                                    <p className="text-[9px] text-center text-white/30 uppercase tracking-[0.4em] leading-relaxed">
                                        By confirming, you agree to our terms of acquisition and secure handling protocols.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:sticky lg:top-40 bg-zinc-950 p-12 border border-white/5 space-y-12">
                        <h2 className="text-xs uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-6 font-bold">Acquisition Summary</h2>

                        <div className="space-y-8">
                            {selection.map(item => (
                                <div key={item.id || item.productId} className="flex space-x-6 items-center">
                                    <div className="w-16 h-20 bg-black overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image || item.img || imgFallback}
                                            alt={item.name}
                                            className="w-full h-full object-cover opacity-70"
                                            onError={(e) => { e.target.src = imgFallback; }}
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-[11px] uppercase tracking-widest text-white font-bold">{item.name}</p>
                                        <p className="text-[10px] text-white/40 uppercase">Qty: {item.quantity || 1} • {item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <div className="text-right space-y-2">
                                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">Total Investment</p>
                                <p className="text-4xl font-heading text-luxury-gold">${calculateTotal().toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FloatingInput = ({ label, value, onChange, error, type = "text" }) => (
    <div className="space-y-3 group">
        <label className="text-[10px] uppercase tracking-[0.4em] text-white/20 group-focus-within:text-luxury-gold transition-colors block">
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-luxury-gold transition-all duration-500 text-lg font-light text-white"
        />
        {error && <p className="text-red-400 text-[10px] uppercase tracking-wider">{error}</p>}
    </div>
);

export default CheckoutPage;
