import { motion } from 'framer-motion';

const CTASection = ({ onConsultation }) => {
    return (
        <section className="relative py-40 md:py-60 flex items-center justify-center overflow-hidden bg-luxury-black text-center">
            {/* Subtle Video or animated background - Simulated with gradient for now */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-luxury-black via-black to-black z-0"></div>
            <motion.div
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15), transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(183, 110, 121, 0.15), transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15), transparent 50%)"
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-0 opacity-50"
            ></motion.div>

            <div className="relative z-10 px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-7xl font-heading text-white mb-16 tracking-tight"
                >
                    Your Moment Deserves <br /> <span className="italic text-luxury-gold font-serif">Perfection</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    <button
                        onClick={onConsultation}
                        className="relative px-12 py-5 bg-transparent border border-luxury-gold text-luxury-gold font-medium uppercase tracking-[0.25em] transition-all duration-700 hover:bg-luxury-gold hover:text-luxury-black group overflow-hidden"
                    >
                        <span className="relative z-10">Schedule a Consultation</span>
                        <div className="absolute inset-0 bg-luxury-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                        {/* Glow effect */}
                        <div className="absolute -inset-2 bg-luxury-gold/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
export default CTASection;
