import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import imgFallback from '../../assets/images/hero-luxury.png';

const OrdersPage = ({ setView }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders', {
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok) {
                    setOrders(data);
                } else {
                    setError(data.error || 'Failed to fetch orders');
                }
            } catch (err) {
                setError('A connection error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const simulateDownloadInvoice = (order) => {
        const doc = new jsPDF();
        const gold = "#d4af37";

        // --- Header ---
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, 210, 40, 'F');

        doc.setTextColor(212, 175, 55); // Gold
        doc.setFont("times", "bold");
        doc.setFontSize(28);
        doc.text("LUMIÈRE", 105, 20, { align: "center" });

        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text("THE ART OF PRECISION", 105, 30, { align: "center" });

        // --- Order Info ---
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text("OFFICIAL ACQUISITION RECORD", 20, 60);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Reference: #${order._id.toUpperCase()}`, 20, 70);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 75);

        // --- Table Header ---
        doc.setDrawColor(212, 175, 55);
        doc.setLineWidth(0.5);
        doc.line(20, 85, 190, 85);

        doc.setFont("helvetica", "bold");
        doc.text("Piece Name", 25, 95);
        doc.text("Qty", 130, 95);
        doc.text("Investment", 160, 95);

        doc.line(20, 100, 190, 100);

        // --- Table Items ---
        doc.setFont("helvetica", "normal");
        let y = 110;
        order.items.forEach(item => {
            doc.text(item.name, 25, y);
            doc.text(item.quantity.toString(), 132, y);
            doc.text(`$${(item.price * item.quantity).toLocaleString()}`, 160, y);
            y += 10;
        });

        // --- Total ---
        doc.setLineWidth(0.5);
        doc.line(130, y, 190, y);
        y += 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(212, 175, 55);
        doc.text("TOTAL INVESTMENT:", 130, y);
        doc.text(`$${order.totalAmount.toLocaleString()}`, 190, y, { align: "right" });

        // --- Footer ---
        doc.setFont("times", "italic");
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text("Thank you for choosing LUMIÈRE. Your legacy begins here.", 105, 280, { align: "center" });

        // --- Download ---
        doc.save(`LUMIERE_Invoice_${order._id.slice(-6).toUpperCase()}.pdf`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Header */}
                <div className="space-y-4">
                    <p className="text-luxury-gold text-[10px] uppercase tracking-[0.5em]">Lifetime Legacy</p>
                    <h1 className="text-5xl font-heading text-white">Your Orders</h1>
                </div>

                {error ? (
                    <div className="text-center py-20 border border-white/5 bg-zinc-950/20">
                        <p className="text-white/40 uppercase tracking-widest text-xs">{error}</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-32 space-y-8 border border-white/5 bg-zinc-950/20">
                        <p className="text-white/40 uppercase tracking-widest text-xs">No acquisitions found in your record</p>
                        <button
                            onClick={() => setView('explore')}
                            className="text-luxury-gold text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors border-b border-luxury-gold/30 pb-2"
                        >
                            Start Your Collection
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-zinc-950 border border-white/5 overflow-hidden"
                            >
                                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12">
                                    {/* Order Info */}
                                    <div className="md:w-1/3 space-y-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest">Order Reference</p>
                                            <p className="text-white font-mono text-lg font-bold tracking-tighter">
                                                #{order._id.toString().slice(-12).toUpperCase()}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest">Date of Acquisition</p>
                                            <p className="text-white/80 text-sm">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    month: 'long', day: 'numeric', year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest">Total Investment</p>
                                            <p className="text-luxury-gold text-2xl font-heading">
                                                ${order.totalAmount.toLocaleString()}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => simulateDownloadInvoice(order)}
                                            className="mt-4 flex items-center space-x-2 text-[9px] uppercase tracking-[0.3em] text-white/60 hover:text-luxury-gold transition-colors font-bold"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                            <span>Download Invoice</span>
                                        </button>
                                    </div>

                                    {/* Order Items */}
                                    <div className="flex-1 space-y-4">
                                        <p className="text-[10px] text-white/30 uppercase tracking-widest">Curated Pieces</p>
                                        <div className="grid grid-cols-1 gap-4">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="flex items-center space-x-6 p-4 bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                                                    <div className="w-16 h-20 overflow-hidden bg-black flex-shrink-0">
                                                        <img
                                                            src={item.image || item.img || imgFallback}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover opacity-80"
                                                            onError={(e) => { e.target.src = imgFallback; }}
                                                        />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <p className="text-xs uppercase tracking-widest text-white font-bold">{item.name}</p>
                                                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-luxury-gold text-xs font-bold tracking-widest">
                                                        ${(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Status Decoration */}
                                <div className="absolute top-0 right-0 p-8">
                                    <span className="text-[8px] uppercase tracking-[0.5em] text-green-500/60 border border-green-500/20 px-3 py-1 rounded-full">
                                        Delivered
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
