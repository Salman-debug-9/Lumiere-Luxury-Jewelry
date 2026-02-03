import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RealMoments = () => {
    return (
        <section className="bg-luxury-black text-white py-40 px-6">
            <div className="container mx-auto max-w-6xl text-center mb-24">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-3xl md:text-5xl font-heading mb-4"
                >
                    Worn in Real Moments
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-luxury-gray italic font-serif"
                >
                    Jewelry becoming memory.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 px-6 md:px-12">
                {[
                    { img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2670&auto=format&fit=crop", label: "The Proposal" },
                    { img: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=2670&auto=format&fit=crop", label: "Anniversary" },
                    { img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2670&auto=format&fit=crop", label: "Gala Night" }
                ].map((moment, i) => (
                    <motion.div
                        key={i}
                        className={`relative aspect-[3/4] overflow-hidden group ${i === 1 ? 'md:-mt-12' : ''}`}
                    >
                        <motion.img
                            initial={{ scale: 1.1 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.5 }}
                            src={moment.img}
                            alt={moment.label}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-8 left-0 right-0 text-center">
                            <h3 className="text-xl font-serif italic text-white group-hover:text-luxury-gold transition-colors">{moment.label}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default RealMoments;
