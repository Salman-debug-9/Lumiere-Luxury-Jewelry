import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SilenceMoment = () => {
    return (
        <section className="h-screen bg-luxury-black flex items-center justify-center text-center relative z-20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-20%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
            >
                <h2 className="text-3xl md:text-5xl font-serif italic text-luxury-ivory/80 tracking-widest font-light">
                    "True luxury speaks quietly."
                </h2>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="h-[1px] w-24 bg-luxury-gold mx-auto mt-8 origin-center"
                ></motion.div>
            </motion.div>
        </section>
    );
};

export default SilenceMoment;
