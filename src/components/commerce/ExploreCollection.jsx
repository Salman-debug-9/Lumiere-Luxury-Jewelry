import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreContext';

import imgLuxury1 from '../../assets/images/hero-luxury.png';
import imgLuxury3 from '../../assets/images/hero-luxury-3.png';

const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];
const materialFilters = ["All", "18K Gold", "Platinum", "24K Gold", "Silver"];
const stoneFilters = ["All", "Diamond", "Sapphire", "Ruby", "Emerald", "Pearl"];
const occasionFilters = ["All", "Engagement", "Wedding", "Gala", "Anniversary"];

const ProductCard = ({ product }) => {
    const { viewProductDetail, isViewingMode } = useStore();



    return (
        <motion.div
            className="relative group/card cursor-pointer mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div
                onClick={() => viewProductDetail(product)}
                className="relative aspect-[4/5] overflow-hidden mb-8 bg-zinc-950 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-1000 group-hover/card:shadow-luxury-gold/5"
            >


                <div className="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors duration-1000 z-10" />

                <motion.img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale-[0.2] transition-all duration-[2.5s] ease-out group-hover/card:grayscale-0 group-hover/card:scale-105"
                    onError={(e) => {
                        e.target.src = imgLuxury1; // Bulletproof local fallback
                    }}
                />

                <div className="absolute inset-0 z-20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 delay-[120ms] flex flex-col items-center justify-center space-y-4 px-6 text-center transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-[1200ms]">
                    <button className="w-full max-w-[180px] bg-white text-black py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold transition-all duration-700 shadow-2xl">
                        View Details
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center md:items-start space-y-4 px-2">
                <div className="flex items-center space-x-4">
                    <h3 className="text-2xl font-heading text-white group-hover/card:text-luxury-gold transition-colors duration-700 uppercase tracking-wider">{product.name}</h3>
                    <div className="h-[1px] w-8 bg-luxury-gold/20 group-hover/card:w-12 transition-all duration-1000"></div>
                </div>
                <div className="flex items-center space-x-4 opacity-100">
                    <span className="text-[11px] uppercase tracking-[0.3em] font-medium">{product.material}</span>
                    <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full opacity-60"></span>
                    <span className="text-[11px] uppercase tracking-[0.3em] font-medium">{product.stone}</span>
                </div>

                {!isViewingMode && (
                    <p className="text-luxury-gold font-heading italic text-lg opacity-80">{product.price}</p>
                )}
            </div>
        </motion.div>
    );
};

const EditorialBlock = ({ title, img, quote }) => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="col-span-full h-[70vh] relative overflow-hidden my-32 group"
    >
        {/* Restore Background Image using high-quality local asset */}
        <img
            src={imgLuxury1}
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[12s] group-hover:scale-110"
            alt="Editorial"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 space-y-8 z-20">
            <p className="text-luxury-gold text-[10px] uppercase tracking-[0.8em] font-medium opacity-60">The Narrative</p>
            <h2 className="text-6xl md:text-8xl font-heading text-white max-w-4xl uppercase tracking-tighter drop-shadow-2xl">{title}</h2>
            <p className="text-white/80 italic font-serif text-2xl max-w-2xl leading-relaxed drop-shadow-xl">{quote}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black z-10" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-20 w-[1px] bg-gradient-to-b from-luxury-gold to-transparent opacity-30 z-20" />
    </motion.div>
);

import Footer from '../Footer';

const ExploreCollection = ({ onConsultation }) => {
    const { products: allProducts, isViewingMode } = useStore();
    const [activeFilters, setActiveFilters] = useState({
        category: "All",
        material: "All",
        stone: "All",
        occasion: "All"
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const setFilter = (key, val) => {
        setActiveFilters(prev => ({ ...prev, [key]: val }));
    };

    const filteredProducts = allProducts.filter(p => {
        return (activeFilters.category === "All" || p.category === activeFilters.category) &&
            (activeFilters.material === "All" || p.material === activeFilters.material) &&
            (activeFilters.stone === "All" || p.stone === activeFilters.stone) &&
            (activeFilters.occasion === "All" || p.occasion === activeFilters.occasion);
    });

    return (
        <>
            <section className="bg-black pt-48 pb-32 min-h-screen px-6 md:px-24">
                {/* Header Background Image (Restored with local asset) */}
                <div className="absolute top-0 left-0 w-full h-[60vh] opacity-10 pointer-events-none overflow-hidden">
                    <img src={imgLuxury3} className="w-full h-full object-cover scale-125" alt="Background Heritage" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                </div>

                <div className="container mx-auto relative z-10">
                    <header className="mb-32 text-center space-y-16">
                        <div className="space-y-4">
                            <motion.p
                                initial={{ opacity: 0, letterSpacing: "1em" }}
                                animate={{ opacity: 0.8, letterSpacing: "0.5em" }}
                                transition={{ duration: 2 }}
                                className="text-luxury-gold text-[11px] uppercase font-medium"
                            >
                                The Exhibition
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2 }}
                                className="text-6xl md:text-8xl font-heading text-white uppercase tracking-tight"
                            >
                                Masterpiece Collection
                            </motion.h1>
                            <p className="text-luxury-gray italic font-serif text-2xl opacity-60 max-w-2xl mx-auto leading-relaxed">A curation of singular brilliance, where light meets the pinnacle of artisanal mastery.</p>
                        </div>

                        <div className="flex flex-col items-center pt-16 mt-8">
                            <div className="group relative">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className={`text-[11px] uppercase tracking-[0.5em] transition-all duration-700 flex items-center space-x-8 py-4 px-12 border border-white/10 hover:border-luxury-gold/50 rounded-full group ${isFilterOpen ? 'bg-white text-black border-white' : 'text-luxury-gold'}`}
                                >
                                    <motion.span
                                        animate={{ rotate: isFilterOpen ? 45 : 0 }}
                                        className="text-lg font-light"
                                    >
                                        +
                                    </motion.span>
                                    <span className="font-bold">{isFilterOpen ? "Close Filter" : "Apply Filter"}</span>
                                    <motion.span
                                        animate={{ rotate: isFilterOpen ? 45 : 0 }}
                                        className="text-lg font-light"
                                    >
                                        +
                                    </motion.span>
                                </button>
                            </div>

                            <AnimatePresence>
                                {isFilterOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                        animate={{ height: "auto", opacity: 1, marginTop: 64 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        className="overflow-hidden w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24 text-left border-t border-white/5 pt-16"
                                    >
                                        <FilterGroup label="Category" options={categories} active={activeFilters.category} onSelect={(v) => setFilter('category', v)} />
                                        <FilterGroup label="Gold / Metal" options={materialFilters} active={activeFilters.material} onSelect={(v) => setFilter('material', v)} />
                                        <FilterGroup label="Gemstone" options={stoneFilters} active={activeFilters.stone} onSelect={(v) => setFilter('stone', v)} />
                                        <FilterGroup label="Occasion" options={occasionFilters} active={activeFilters.occasion} onSelect={(v) => setFilter('occasion', v)} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.slice(0, 6).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}

                            {filteredProducts.length >= 6 && activeFilters.category === "All" && (
                                <EditorialBlock
                                    title="Light, Captured."
                                    quote="“The beauty of a diamond is not in its size, but in the way it dances with the dark.”"
                                />
                            )}

                            {filteredProducts.slice(6).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-60 text-center space-y-8">
                            <p className="text-white/20 uppercase tracking-[0.6em] text-sm">No pieces match your current curation.</p>
                            <button
                                onClick={() => setActiveFilters({ category: "All", material: "All", stone: "All", occasion: "All" })}
                                className="text-luxury-gold text-[11px] uppercase tracking-[0.4em] font-bold border border-luxury-gold/30 px-12 py-5 hover:bg-luxury-gold hover:text-black transition-all duration-700"
                            >
                                Reset Selection
                            </button>
                        </div>
                    )}
                </div>
            </section>
            <Footer onConsultation={onConsultation} />
        </>
    );
};

const FilterGroup = ({ label, options, active, onSelect }) => (
    <div className="space-y-8">
        <label className="text-[10px] uppercase tracking-[0.6em] text-white/20 block font-bold border-b border-white/5 pb-4">{label}</label>
        <div className="flex flex-col space-y-4">
            {options.map(opt => (
                <button
                    key={opt}
                    onClick={() => onSelect(opt)}
                    className={`text-left text-[12px] uppercase tracking-[0.3em] transition-all duration-500 hover:text-luxury-gold flex items-center space-x-3 group/opt ${active === opt ? 'text-luxury-gold' : 'text-white/40'}`}
                >
                    <span className={`w-1 h-1 rounded-full transition-all duration-500 ${active === opt ? 'bg-luxury-gold scale-150' : 'bg-white/10 group-hover/opt:bg-luxury-gold/50'}`}></span>
                    <span>{opt}</span>
                </button>
            ))}
        </div>
    </div>
);

export default ExploreCollection;
