import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DesignCreation = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Use 'vw' units to translate exactly 4 viewport widths (to show the 5th item)
    // 0vw = Item 1, -100vw = Item 2, ... -400vw = Item 5
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-400vw"]);

    const creationSteps = [
        {
            title: "Raw Origin",
            subtitle: "Sourced from the heart of the earth",
            image: "https://images.unsplash.com/photo-1618151313441-bc79b11e5090?q=80&w=2670&auto=format&fit=crop" // Raw diamond/stone texture
        },
        {
            title: "Vision & Sketch",
            subtitle: "Where imagination meets structure",
            image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=2676&auto=format&fit=crop" // Sketch/pencil/paper
        },
        {
            title: "Master Craft",
            subtitle: "Forged by hands of tradition",
            image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2639&auto=format&fit=crop" // Craftsman hands/tools
        },
        {
            title: "Final Polish",
            subtitle: "Perfection revealed",
            image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=2070&auto=format&fit=crop" // Shining ring macro
        },
        {
            title: "Worn Beauty",
            subtitle: "A story worn by you",
            image: "https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=2576&auto=format&fit=crop" // Woman wearing jewelry elegant
        }
    ];

    return (
        <section ref={targetRef} className="h-[700vh] relative bg-luxury-black text-white">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.div style={{ x }} className="flex">
                    {creationSteps.map((step, i) => (
                        <div key={i} className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative px-6 md:px-24">
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
                                <img src={step.image} alt={step.title} className="w-full h-full object-cover opacity-80" />
                            </div>

                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 w-full max-w-7xl items-center">
                                <div className="text-right border-r border-luxury-gold/30 pr-8 md:pr-12 py-8">
                                    <span className="block text-[8rem] md:text-[15rem] font-serif text-white/25 italic leading-none -mb-6 md:-mb-12 select-none absolute -top-24 -left-10 md:-left-24 drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">0{i + 1}</span>
                                    <motion.h3
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="text-4xl md:text-8xl font-heading font-medium tracking-tight text-white drop-shadow-lg relative z-10"
                                    >{step.title}</motion.h3>
                                </div>
                                <div className="pl-4 md:pl-0">
                                    <motion.p
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                        className="text-2xl md:text-3xl font-light text-luxury-gray italic font-serif max-w-md leading-relaxed"
                                    >"{step.subtitle}"</motion.p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Progress Bar */}
                <div className="absolute bottom-12 left-12 right-12 h-[1px] bg-white/10 z-20">
                    <motion.div
                        style={{ scaleX: scrollYProgress }}
                        className="h-full bg-luxury-gold origin-left w-full"
                    ></motion.div>
                </div>
            </div>
        </section>
    );
};

export default DesignCreation;
