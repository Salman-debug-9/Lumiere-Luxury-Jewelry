import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const JewelryInMotion = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
    const lightX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <section ref={sectionRef} className="h-[150vh] relative bg-luxury-black flex items-center justify-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-20 mix-blend-difference">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-heading text-white tracking-widest uppercase mb-4"
                >
                    Brilliance
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    className="text-sm md:text-lg font-body text-luxury-gray uppercase tracking-[0.5em]"
                >
                    In Motion
                </motion.p>
            </div>

            <motion.div
                style={{ rotate, scale }}
                className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] z-10"
            >
                {/* Placeholder for the hero jewelry piece - reusing hero-seq-3 for high sparkle */}
                <img
                    src="/src/assets/images/hero-seq-3.png"
                    alt="Jewelry In Motion"
                    className="w-full h-full object-contain drop-shadow-2xl"
                />

                {/* Dynamic Light Sweep */}
                <motion.div
                    style={{ left: lightX }}
                    className="absolute top-0 bottom-0 w-24 bg-white/10 blur-xl transform -skew-x-12 pointer-events-none"
                ></motion.div>
            </motion.div>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-black/50 to-luxury-black pointer-events-none"></div>
        </section>
    );
};

export default JewelryInMotion;
