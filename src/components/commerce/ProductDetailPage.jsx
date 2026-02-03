import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import imgFallback from '../../assets/images/hero-luxury.png';

const ProductDetailPage = ({ onConsultation }) => {
    const { selectedProduct, addToSelection, setView, isViewingMode } = useStore();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    if (!selectedProduct) return null;



    const handleAddToCart = () => {
        addToSelection(selectedProduct, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 3000);
    };

    const images = selectedProduct.images || [selectedProduct.img, selectedProduct.img, selectedProduct.img];

    return (
        <section className="bg-black min-h-screen text-white selection:bg-luxury-gold selection:text-black overflow-x-hidden relative">
            <div className="flex flex-col lg:flex-row">

                {/* LEFT SIDE: Fixed Image Showcase */}
                <div className="w-full lg:w-1/2 lg:h-screen lg:fixed lg:left-0 lg:top-0 flex flex-col bg-zinc-950/20 border-r border-white/5 overflow-hidden z-20">
                    <div className="w-full pt-32 px-8 md:px-16">
                        <button
                            onClick={() => setView('explore')}
                            className="px-10 py-5 bg-white text-black text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-luxury-gold transition-all duration-700 flex items-center group shadow-2xl w-fit"
                        >
                            <span className="mr-5 group-hover:-translate-x-2 transition-transform duration-500">←</span>
                            Return to Collection
                        </button>
                    </div>

                    <div className="flex-1 flex items-center justify-center px-8 md:px-16 py-12">
                        <div className="relative w-full max-w-2xl aspect-square">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    src={images[activeImage]}
                                    alt={selectedProduct.name}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_80px_rgba(215,185,115,0.05)]"
                                    onError={(e) => {
                                        e.target.src = imgFallback;
                                    }}
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-6 pb-12 px-8">
                        {images.map((img, i) => (
                            <motion.div
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`w-12 h-16 border transition-all duration-700 cursor-pointer overflow-hidden ${activeImage === i ? 'border-luxury-gold scale-110 shadow-lg shadow-luxury-gold/5' : 'border-white/5 opacity-20 hover:opacity-100 hover:border-white/20'}`}
                            >
                                <img
                                    src={img}
                                    className="w-full h-full object-cover"
                                    alt="Thumbnail"
                                    onError={(e) => {
                                        e.target.src = imgFallback;
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE: Details */}
                <div className="w-full lg:w-1/2 lg:ml-[50%] p-8 md:p-16 lg:px-24 flex flex-col justify-center bg-black min-h-screen">
                    <div className="max-w-xl py-40 space-y-16">

                        <motion.header
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-start">
                                <p className="text-luxury-gold text-xs uppercase tracking-[0.8em]">Masterpiece Edition</p>


                            </div>

                            <h1 className="text-5xl md:text-8xl font-heading leading-tight text-white uppercase">
                                {selectedProduct.name}
                            </h1>

                            {/* Point 3: Hide price in viewing mode */}
                            {!isViewingMode && (
                                <p className="text-4xl font-heading text-white opacity-80">{selectedProduct.price}</p>
                            )}
                        </motion.header>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-8"
                        >
                            <div className="h-[1px] w-12 bg-luxury-gold/30" />
                            <p className="text-luxury-gray text-xl leading-relaxed font-body font-light italic">
                                {selectedProduct.description || "Crafted to immortalize the ephemeral. This piece is a testament to the LUMIÈRE legacy of uncompromising brilliance and meticulous hand-craftsmanship."}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-12"
                        >
                            {!isViewingMode && (
                                <>
                                    <div className="flex flex-col md:flex-row gap-8">
                                        {/* Quantity */}
                                        <div className="flex items-center border border-white/5 hover:border-white/20 transition-all duration-700 min-w-[200px] overflow-hidden">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="flex-1 py-5 text-xl text-white/20 hover:text-white hover:bg-white/5 transition-all"
                                            >
                                                -
                                            </button>
                                            <div className="flex flex-col items-center px-8 py-5 border-x border-white/5 bg-zinc-950/20">
                                                <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold mb-1">Quantity</span>
                                                <span className="text-xl font-heading text-white leading-none">{quantity}</span>
                                            </div>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="flex-1 py-5 text-xl text-white/20 hover:text-white hover:bg-white/5 transition-all"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Point 6: Rename to Add to Selection */}
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-[2] py-5 bg-white text-black text-[11px] uppercase tracking-[0.5em] font-bold transition-all duration-700 hover:bg-luxury-gold shadow-2xl relative overflow-hidden"
                                        >
                                            <AnimatePresence mode="wait">
                                                {!isAdded ? (
                                                    <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="block w-full">
                                                        Add to Selection
                                                    </motion.span>
                                                ) : (
                                                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="block w-full italic">
                                                        Added to Selection
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </div>

                                    {/* Point 2: Private Consultation Entry Point */}
                                    <button
                                        onClick={onConsultation}
                                        className="w-full border border-white/5 py-5 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-luxury-gold hover:border-luxury-gold/30 transition-all duration-1000"
                                    >
                                        Request a Private Consultation
                                    </button>
                                </>
                            )}

                            {isViewingMode && (
                                <p className="text-white/20 text-xs uppercase tracking-[0.4em] italic text-center py-10 border-y border-white/5">
                                    Viewing Mode Active — Immersion Focused
                                </p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10 opacity-70">
                                <DetailItem label="Origin" value="Global Ethics Certified" />
                                <DetailItem label="Craftsmanship" value="Hand-Carved Mastery" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-luxury-gold">{label}</p>
        <p className="text-sm uppercase tracking-[0.2em] font-bold text-white">{value}</p>
    </div>
);

export default ProductDetailPage;
