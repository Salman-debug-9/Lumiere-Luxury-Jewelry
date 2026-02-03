import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MaterialDetails = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={sectionRef} className="py-32 bg-luxury-black relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-24">
                <div className="mb-24 text-center">
                    <span className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-medium block mb-4">Material Intelligence</span>
                    <h2 className="text-4xl md:text-6xl font-heading text-white">The Science of <span className="italic font-serif text-luxury-gray">Beauty</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    {/* Item 1: Diamond Clarity */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1 }}
                        className="group relative aspect-[4/5] overflow-hidden bg-gray-900"
                    >
                        <motion.img
                            style={{ y }}
                            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop"
                            alt="Diamond Clarity"
                            className="w-full h-[120%] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-2xl font-heading text-white mb-2">Internal Flawless</h3>
                            <p className="text-sm text-luxury-gray font-light leading-relaxed">Microscopically verified clarity ensuring maximizing light refraction and brilliance.</p>
                        </div>
                    </motion.div>

                    {/* Item 2: Gold Purity */}
                    <div className="space-y-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="h-[1px] w-full bg-luxury-gold/30"></div>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-3xl font-heading text-white">24k Gold Purity</h3>
                                <span className="text-luxury-gold font-serif italic text-xl">99.9%</span>
                            </div>
                            <p className="text-luxury-gray font-light leading-7">Sourced from responsible mines, our gold is refined to its purest state before being alloyed for durability and color precision.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="h-[1px] w-full bg-luxury-gold/30"></div>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-3xl font-heading text-white">Precision Setting</h3>
                                <span className="text-luxury-gold font-serif italic text-xl">0.01mm</span>
                            </div>
                            <p className="text-luxury-gray font-light leading-7">Each stone is set by hand under 10x magnification, ensuring security and perfect alignment for light performance.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MaterialDetails;
