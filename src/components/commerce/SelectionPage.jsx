import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import imgFallback from '../../assets/images/hero-luxury.png';

import Footer from '../Footer';

const SelectionPage = ({ onConsultation }) => {
    const { selection, removeFromSelection, updateQuantity, setView } = useStore();
    const [pricesVisible, setPricesVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setPricesVisible(true), 1200);
        return () => clearTimeout(timer);
    }, [selection]);

    const calculateSubtotal = () => {
        return selection.reduce((acc, item) => {
            const price = parseInt(item.price.replace(/[^0-9]/g, ''));
            return acc + (price * (item.quantity || 1));
        }, 0);
    };

    if (selection.length === 0) {
        return (
            <>
                <section className="bg-black min-h-screen pt-40 flex flex-col items-center justify-center text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-12"
                    >
                        {/* Point 6: Rename Cart in header -> Selection */}
                        <h1 className="text-4xl md:text-5xl font-heading text-white/10 mb-6 italic select-none">Your Selection is empty</h1>
                        <button
                            onClick={() => setView('explore')}
                            className="text-luxury-gold text-[10px] uppercase tracking-[0.6em] border border-luxury-gold/20 px-12 py-6 hover:bg-luxury-gold hover:text-black transition-all duration-700 font-bold"
                        >
                            Return to Gallery
                        </button>
                        <div className="pt-20 grid grid-cols-3 gap-12 max-w-2xl mx-auto opacity-10 grayscale">
                            <div className="space-y-3">
                                <p className="text-[10px] uppercase tracking-[0.4em]">Insured Delivery</p>
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] uppercase tracking-[0.4em]">Discreet Packaging</p>
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] uppercase tracking-[0.4em]">Lifetime Care</p>
                            </div>
                        </div>
                    </motion.div>
                </section>
                <Footer onConsultation={onConsultation} />
            </>
        );
    }

    return (
        <>
            <section className="bg-black min-h-screen pt-48 pb-40 px-6 md:px-24 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh] bg-gradient-to-b from-luxury-gold/[0.03] to-transparent pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <header className="text-center mb-40 space-y-8">
                        <motion.p
                            initial={{ opacity: 0, letterSpacing: "1em" }}
                            animate={{ opacity: 0.6, letterSpacing: "0.6em" }}
                            className="text-luxury-gold text-[10px] uppercase"
                        >
                            Acquisition Curator
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-6xl md:text-8xl font-heading text-white"
                        >
                            Your Selection
                        </motion.h1>
                        <p className="text-luxury-gray italic font-serif text-2xl opacity-60">Prepare for the convergence of light and legacy.</p>
                    </header>

                    <div className="space-y-20">
                        {selection.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center border-b border-white/5 pb-20 group"
                            >
                                <div className="md:col-span-3 aspect-[4/5] overflow-hidden bg-zinc-950/40 shadow-2xl relative">
                                    <motion.img
                                        src={item.image || item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s] ease-out"
                                        onError={(e) => {
                                            e.target.src = imgFallback;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                                </div>

                                <div className="md:col-span-5 space-y-8">
                                    <div className="space-y-3">
                                        <p className="text-luxury-gold text-xs uppercase tracking-[0.5em] opacity-100 font-bold">Edition {index + 1}</p>
                                        <h3 className="text-3xl md:text-5xl font-heading text-white group-hover:text-luxury-gold transition-colors duration-1000 uppercase leading-none">{item.name}</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs text-white/90 uppercase tracking-[0.4em] leading-relaxed font-bold">
                                            {item.material}
                                        </p>
                                        <p className="text-[15px] text-white/70 italic font-serif">Handcrafted under LUMIÈRE protocols.</p>
                                    </div>

                                    <button
                                        onClick={() => removeFromSelection(item.id)}
                                        className="text-[11px] text-white/70 uppercase tracking-[0.4em] hover:text-red-500 hover:border-red-500/30 transition-all duration-700 flex items-center group/remove font-bold border-b border-white/5 pb-1"
                                    >
                                        <span className="mr-3 text-sm group-hover:rotate-90 transition-transform duration-500">✕</span> Remove Piece
                                    </button>
                                </div>

                                <div className="md:col-span-2 flex items-center border border-white/5 hover:border-white/20 transition-all duration-700 overflow-hidden">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="flex-1 py-5 text-white/20 hover:text-white hover:bg-white/5 transition-all text-2xl font-light"
                                    >
                                        -
                                    </button>
                                    <div className="px-6 py-5 border-x border-white/5 bg-zinc-950/20">
                                        <span className="text-2xl font-heading text-white">{item.quantity}</span>
                                    </div>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="flex-1 py-5 text-white/20 hover:text-white hover:bg-white/5 transition-all text-2xl font-light"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="md:col-span-2 text-right">
                                    <AnimatePresence>
                                        {pricesVisible && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-1"
                                            >
                                                <p className="text-[12px] text-white/60 uppercase tracking-[0.4em] font-bold">Value</p>
                                                <p className="text-4xl font-heading text-luxury-gold italic drop-shadow-lg">{item.price}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
                        {/* Point 6: Reassurance Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b border-white/5">
                            <div className="space-y-4">
                                <p className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-bold">Insured Delivery</p>
                                <p className="text-white/30 text-[9px] uppercase leading-relaxed tracking-widest">Global bonded courier services</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-bold">Discreet Packaging</p>
                                <p className="text-white/30 text-[9px] uppercase leading-relaxed tracking-widest">Minimalist, unbranded protection</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] font-bold">Lifetime Care</p>
                                <p className="text-white/30 text-[9px] uppercase leading-relaxed tracking-widest">Certified LUMIÈRE restoration</p>
                            </div>
                        </div>

                        <div className="space-y-16">
                            <div className="flex justify-between items-end">
                                <p className="text-[12px] text-white/60 uppercase tracking-[0.6em] font-bold">Consolidated Valuation</p>
                                <AnimatePresence>
                                    {pricesVisible && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-right"
                                        >
                                            <p className="text-5xl md:text-7xl font-heading text-white">${calculateSubtotal().toLocaleString()}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="space-y-8">
                                {/* Point 7: Quiet Checkout Entry Button */}
                                <button
                                    onClick={() => setView('checkout')}
                                    className="w-full bg-luxury-gold text-black py-8 text-xs uppercase tracking-[0.8em] font-bold hover:bg-white transition-all duration-1000 shadow-2xl relative overflow-hidden group"
                                >
                                    <span className="relative z-10">Proceed to Private Checkout</span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                                </button>

                                <p className="text-center text-[10px] text-white/30 uppercase tracking-[0.5em] leading-relaxed">
                                    Secure handling protocols initiated upon completion.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer onConsultation={onConsultation} />
        </>
    );
};

export default SelectionPage;
