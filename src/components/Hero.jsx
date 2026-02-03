import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage1 from '../assets/images/hero-seq-1.png';
import heroImage2 from '../assets/images/hero-seq-2.png';
import heroImage3 from '../assets/images/hero-seq-3.png';
import heroImage4 from '../assets/images/hero-seq-4.png';
import heroImage5 from '../assets/images/hero-seq-5.png';
import heroImage6 from '../assets/images/hero-seq-6.png';
import { useStore } from '../context/StoreContext';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5, heroImage6];

const Hero = ({ onConsultation }) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(0);

    const { setView } = useStore();

    // Image Cycle Effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 300); // Faster 300ms interval for smooth video-like shimmer
        return () => clearInterval(timer);
        return () => clearInterval(timer);
    }, []);

    // Parallax Effect
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(imageRef.current, {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen min-h-[800px] flex flex-col md:flex-row items-center overflow-hidden bg-black text-luxury-ivory px-6 md:px-24">
            <div className="w-full md:w-1/2 z-20 flex flex-col justify-center space-y-10 pt-20 md:pt-0 pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl font-heading tracking-tight leading-[1.1] drop-shadow-lg"
                >
                    Crafted to <br /> Be <span className="text-luxury-gold font-serif italic pr-2">Remembered</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="text-lg md:text-xl text-luxury-gray max-w-md font-light leading-relaxed font-body drop-shadow-md"
                >
                    Exquisite fine jewelry designed for moments that last forever.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 pointer-events-auto"
                >
                    <button
                        onClick={() => setView('explore')}
                        className="group relative px-10 py-4 border border-luxury-gold text-luxury-gold overflow-hidden transition-all duration-500 uppercase tracking-[0.2em] text-xs font-medium cursor-pointer bg-black/20 backdrop-blur-sm hover:bg-black/40"
                    >
                        <span className="relative z-10 group-hover:text-luxury-black transition-colors duration-500">Explore Collection</span>
                        <div className="absolute inset-0 bg-luxury-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                    <button
                        onClick={onConsultation}
                        className="px-8 py-4 text-luxury-ivory hover:text-luxury-gold transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-medium flex items-center cursor-pointer"
                    >
                        <span>Request a Private Consultation</span>
                        <span className="ml-2">→</span>
                    </button>
                </motion.div>
            </div>

            <div className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0">
                <div className="relative w-full h-full overflow-hidden">
                    <div ref={imageRef} className="w-full h-[120%] absolute top-[-10%] flex items-center justify-center">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={currentImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "linear" }}
                                className="absolute inset-0 bg-contain bg-center bg-no-repeat w-full h-full"
                                style={{
                                    backgroundImage: `url(${heroImages[currentImage]})`,
                                    filter: "contrast(1.15) brightness(1.05) saturate(0.85)",
                                    WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 85%)",
                                    maskImage: "radial-gradient(circle, black 40%, transparent 85%)"
                                }}
                            />
                        </AnimatePresence>
                        {/* Final Seamless Integration Lighting */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-40 pointer-events-none"></div>
                        {/* Crisp Sparkles */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-white rounded-full blur-[0.5px] shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                initial={{ x: "50%", y: "50%", opacity: 0, scale: 0 }}
                                animate={{
                                    x: `${50 + (Math.random() - 0.5) * 60}%`,
                                    y: `${50 + (Math.random() - 0.5) * 60}%`,
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0]
                                }}
                                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
                            />
                        ))}
                    </div>

                    {/* Gradient Overlays - Minimal obstruction for maximum visibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-20 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
