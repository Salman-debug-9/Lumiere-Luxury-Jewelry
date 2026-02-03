import { useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";

import imgLuxury1 from '../assets/images/hero-luxury.png';

const CollectionSlider = () => {
    const scrollContainerRef = useRef(null);
    const { products, setView, addToSelection, viewProductDetail } = useStore();

    const scroll = (direction) => {
        const { current } = scrollContainerRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -450 : 450;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-luxury-black border-t border-white/5 relative z-10">
            <div className="container mx-auto px-6 mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-heading text-luxury-ivory mb-2"
                >
                    Signature Collection
                </motion.h2>
                <div className="h-[1px] w-24 bg-luxury-gold"></div>
            </div>

            <div className="relative group px-4 md:px-12">
                {/* Left Floating Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-8 top-[40%] -translate-y-1/2 z-30 w-14 h-14 border border-luxury-gold/30 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-all duration-500 rounded-full bg-black/40 backdrop-blur-xl opacity-0 group-hover:opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                    <span className="text-2xl">←</span>
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto space-x-8 px-6 pb-20 scrollbar-none snap-x scroll-smooth"
                >
                    {products.map((p, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            key={p.id}
                            className="min-w-[300px] md:min-w-[420px] snap-center group/card cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-gray-900 shadow-2xl">
                                <img
                                    src={p.img}
                                    alt={p.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-110"
                                    onError={(e) => {
                                        e.target.src = imgLuxury1;
                                    }}
                                />
                                <div className="absolute inset-0 border border-luxury-gold/0 group-hover/card:border-luxury-gold/40 transition-all duration-500 z-10 m-4"></div>
                                <div className="absolute inset-0 bg-black/20 group-hover/card:bg-transparent transition-colors duration-500"></div>
                                <div className="absolute bottom-8 left-0 right-0 text-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 delay-[300ms] transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-[1200ms] z-20 flex flex-col items-center space-y-2 px-4">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); viewProductDetail(p); }}
                                        className="w-full bg-luxury-ivory text-luxury-black py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-luxury-gold transition-colors duration-700"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                            <div className="text-center md:text-left transition-all duration-500 transform group-hover/card:-translate-y-1">
                                <h3 className="text-2xl font-heading text-white group-hover/card:text-luxury-gold transition-colors duration-300">{p.name}</h3>
                                <p className="text-sm text-white/60 font-body mt-2 uppercase tracking-wide">{p.material}</p>
                                <p className="text-luxury-ivory font-medium mt-1 font-heading italic">{p.price}</p>
                            </div>
                        </motion.div>
                    ))}
                    <div className="min-w-[10vh] md:min-w-[30vh] flex-shrink-0"></div>
                </div>

                {/* Right Floating Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-8 top-[40%] -translate-y-1/2 z-30 w-14 h-14 border border-luxury-gold/30 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-all duration-500 rounded-full bg-black/40 backdrop-blur-xl opacity-0 group-hover:opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                    <span className="text-2xl">→</span>
                </button>
            </div>
        </section>
    );
};
export default CollectionSlider;
