import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const FeatureItem = ({ icon, title, text, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        className="flex flex-col items-start"
    >
        <div className="mb-4 text-luxury-gold">
            {icon}
        </div>
        <h3 className="text-xl font-heading text-luxury-ivory mb-2">{title}</h3>
        <p className="text-sm text-luxury-gray font-body leading-relaxed max-w-xs">{text}</p>
    </motion.div>
);

const Features = () => {
    return (
        <section className="relative min-h-screen flex flex-col md:flex-row bg-luxury-black overflow-hidden">
            {/* Left Content */}
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center order-2 md:order-1 relative z-10 bg-luxury-black/95">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <span className="text-luxury-gold uppercase tracking-widest text-xs font-medium mb-4 block">The Art of Perfection</span>
                    <h2 className="text-4xl md:text-5xl font-heading text-luxury-ivory leading-tight">Uncompromising <br /> <span className="italic text-luxury-gray">Standards</span></h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <FeatureItem
                        delay={0.2}
                        title="Ethically Sourced"
                        text="We trace every diamond to its origin, ensuring conflict-free and environmentally responsible sourcing."
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
                                <motion.path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
                            </svg>
                        }
                    />
                    <FeatureItem
                        delay={0.4}
                        title="Master Crafstmanship"
                        text="Each piece is hand-finished by master jewelers with decades of experience in high jewelry."
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
                                <motion.path d="M20.38 3.4a1.6 1.6 0 0 0-2.34 0l-9.9 9.92a2.82 2.82 0 0 0 0 4l6 5.92a2.82 2.82 0 0 0 3.99 0l9.91-9.92a1.6 1.6 0 0 0 0-2.33l-7.66-7.59z" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
                                <motion.path d="M10 14 3 21" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
                            </svg>
                        }
                    />
                    <FeatureItem
                        delay={0.6}
                        title="Authorized Authenticity"
                        text="Every item comes with a certificate of authenticity and independent grading reports."
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
                                <motion.rect x="3" y="4" width="18" height="18" rx="2" ry="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
                                <motion.line x1="16" y1="2" x2="16" y2="6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
                                <motion.line x1="8" y1="2" x2="8" y2="6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
                                <motion.line x1="3" y1="10" x2="21" y2="10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.8 }} />
                            </svg>
                        }
                    />
                    <FeatureItem
                        delay={0.8}
                        title="Lifetime Care"
                        text="We offer complimentary cleaning and inspection services for the lifetime of your jewelry."
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
                                <motion.path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
                            </svg>
                        }
                    />
                </div>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-auto order-1 md:order-2 overflow-hidden relative">
                <motion.div
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2670&auto=format&fit=crop')" }} // Macro Diamond or Craftsmanship
                >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-transparent to-transparent opacity-80 md:opacity-50"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
