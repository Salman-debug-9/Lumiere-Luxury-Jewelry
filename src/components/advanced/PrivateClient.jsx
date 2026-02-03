import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PrivateClient = () => {
    return (
        <section className="bg-gradient-to-br from-luxury-black via-[#0e0e0e] to-black py-40 px-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.05),transparent_60%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-24 flex flex-col md:flex-row items-center gap-24">
                <div className="w-full md:w-1/2 relative z-10">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-luxury-gray text-xs uppercase tracking-[0.4em] mb-8 block"
                    >
                        An Invitation
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-heading text-white mb-12"
                    >
                        A Private <br /> <span className="font-serif italic text-luxury-gold">Experience</span>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                            className="h-[1px] bg-luxury-gold mt-6 origin-left w-24"
                        ></motion.div>
                    </motion.h2>

                    <ul className="space-y-8">
                        {["Private Consultations", "Bespoke Design", "White-glove Delivery", "Lifetime Servicing"].map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 * i, duration: 0.8 }}
                                className="flex items-center text-xl md:text-2xl font-light text-luxury-gray hover:text-white transition-colors cursor-pointer group"
                            >
                                <span className="w-2 h-2 rounded-full bg-luxury-gold opacity-0 group-hover:opacity-100 mr-4 transition-opacity duration-300"></span>
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Minimal Abstract visual or "invite" card */}
                <div className="w-full md:w-1/2 flex justify-center relative">
                    <motion.div
                        initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
                        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-[300px] md:w-[400px] h-[500px] bg-[#111] border border-luxury-gold/20 p-8 flex flex-col justify-between shadow-2xl relative"
                    >
                        <div className="text-right">
                            <div className="text-luxury-gold font-heading tracking-widest text-lg">LUMIÈRE</div>
                            <div className="text-xs text-luxury-gray uppercase tracking-widest mt-1">Private Client</div>
                        </div>
                        <div className="text-center font-serif text-3xl text-white/50 italic">
                            Exclusively Yours
                        </div>
                        <div className="flex justify-between items-end border-t border-white/5 pt-8">
                            <div className="text-xs text-luxury-gray">
                                Membership ID <br />
                                <span className="text-white font-mono">000000</span>
                            </div>
                            <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center">
                                <span className="text-luxury-gold text-xl">→</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PrivateClient;
