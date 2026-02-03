import { motion } from 'framer-motion';

const BrandStory = () => {
    return (
        <section className="py-32 px-6 md:px-24 bg-luxury-black text-center relative overflow-hidden">
            {/* Background Element - Faint Glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none opacity-50"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="inline-block"
                >
                    <h2 className="text-4xl md:text-6xl font-heading text-luxury-ivory mb-2 relative">
                        A Legacy of Elegance
                    </h2>
                    <div className="w-full flex justify-center mt-6">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                            className="h-[2px] bg-luxury-gold"
                        ></motion.div>
                    </div>
                </motion.div>

                <div className="mt-16 space-y-8 text-lg md:text-2xl text-luxury-gray font-light leading-relaxed font-heading">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 1.5 }}
                    >
                        Founded on the belief that jewelry is more than an accessory, <span className="text-luxury-ivory">LUMIÈRE</span> represents the culmination of centuries of artisanal tradition.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 1.5 }}
                    >
                        We do not just create objects of beauty; we forge the vessels for your most cherished memories.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2, duration: 1.5 }}
                        className="text-luxury-rose font-serif italic text-3xl md:text-4xl pt-8"
                    >
                        "True luxury whispers."
                    </motion.p>
                </div>
            </div>
        </section>
    );
};
export default BrandStory;
