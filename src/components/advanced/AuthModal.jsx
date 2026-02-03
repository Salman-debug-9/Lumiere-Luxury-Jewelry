import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login, signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let result;
            if (isLogin) {
                result = await login(formData.email.toLowerCase(), formData.password);
            } else {
                result = await signup(formData.name, formData.email.toLowerCase(), formData.password);
            }

            if (result.success) {
                setFormData({ name: '', email: '', password: '' });
                onClose();
            } else {
                setError(result.error || 'Authentication failed');
                setFormData({ name: '', email: '', password: '' });
            }
        } catch (err) {
            setError('An unexpected error occurred');
            setFormData({ name: '', email: '', password: '' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[110] flex items-center justify-center p-6"
                >
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-zinc-950 border border-white/10 p-12 max-w-md w-full space-y-8 overflow-hidden"
                    >
                        <div className="space-y-4 text-center">
                            <p className="text-luxury-gold text-[10px] uppercase tracking-[0.5em]">
                                {isLogin ? 'Member Access' : 'Private Membership'}
                            </p>
                            <h2 className="text-3xl font-heading text-white">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && (
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-luxury-gold transition-colors text-sm tracking-widest text-white"
                                />
                            )}
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-luxury-gold transition-colors text-sm tracking-widest text-white"
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/10 py-4 pr-10 focus:outline-none focus:border-luxury-gold transition-colors text-sm tracking-widest text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-luxury-gold transition-colors p-2"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>

                            {error && (
                                <p className="text-red-500 text-[10px] uppercase tracking-wider text-center">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-luxury-gold text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-700 disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
                            </button>
                        </form>

                        <div className="text-center space-y-6">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-white/60 text-[10px] uppercase tracking-[0.3em] hover:text-luxury-gold transition-colors font-medium"
                            >
                                {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                            </button>

                            <button
                                onClick={onClose}
                                className="block w-full text-white/40 text-[11px] uppercase tracking-[0.5em] hover:text-white transition-colors font-bold"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
