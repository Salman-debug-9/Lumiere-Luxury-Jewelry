import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        quote: "The attention to detail is simply unmatched. It wasn't just a purchase; it was an experience I'll never forget.",
        name: "Eleanor Vance",
        occasion: "Engagement"
    },
    {
        id: 2,
        quote: "LUMIÈRE created a piece that perfectly captured our story. Timeless, elegant, and breathtaking.",
        name: "Julian & Sarah",
        occasion: "Wedding Anniversary"
    },
    {
        id: 3,
        quote: "I have never seen diamonds sparkle with such fire. A truly masterpiece collection.",
        name: "Victoria H.",
        occasion: "Collection Addition"
    }
];

const Testimonials = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-luxury-ivory py-32 px-6 overflow-hidden">
            <div className="container mx-auto max-w-4xl text-center">
                <div className="mb-12">
                    <span className="text-luxury-gray uppercase tracking-[0.3em] text-xs font-medium">Testimonials</span>
                </div>

                <div className="relative h-[300px] flex items-center justify-center">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="absolute inset-0 flex flex-col items-center justify-center px-4"
                        >
                            <div className="flex text-luxury-gold gap-1 mb-8 text-2xl">
                                {[...Array(5)].map((_, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.1 + 0.5 }}
                                    >★</motion.span>
                                ))}
                            </div>
                            <h3 className="text-3xl md:text-5xl font-heading text-luxury-black mb-10 leading-snug italic">"{testimonials[current].quote}"</h3>
                            <div className="flex flex-col items-center">
                                <cite className="not-italic font-heading text-xl text-luxury-black font-semibold">{testimonials[current].name}</cite>
                                <span className="text-luxury-gray text-sm mt-2 uppercase tracking-widest">{testimonials[current].occasion}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center mt-12 gap-4">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-1 transition-all duration-500 rounded-full ${index === current ? "w-12 bg-luxury-black" : "w-4 bg-luxury-gray/40 hover:bg-luxury-gray"}`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
