import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Hero from './components/Hero';
import CollectionSlider from './components/CollectionSlider';
import Features from './components/Features';
import BrandStory from './components/BrandStory';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import DesignCreation from './components/advanced/DesignCreation';
import MaterialDetails from './components/advanced/MaterialDetails';
import PrivateClient from './components/advanced/PrivateClient';
import RealMoments from './components/advanced/RealMoments';
import AuthModal from './components/advanced/AuthModal';
import { motion, AnimatePresence } from 'framer-motion';

// Commerce Imports
import { useStore } from './context/StoreContext';
import { useAuth } from './context/AuthContext';
import ExploreCollection from './components/commerce/ExploreCollection';
import SelectionPage from './components/commerce/SelectionPage';
import CheckoutPage from './components/commerce/CheckoutPage';
import ProductDetailPage from './components/commerce/ProductDetailPage';
import OrdersPage from './components/commerce/OrdersPage';

function App() {
  const { view, setView, selection, isViewingMode, setIsViewingMode, clearSelection } = useStore();
  const { user, logout } = useAuth();
  const [showConsultation, setShowConsultation] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'explore': return <ExploreCollection onConsultation={() => setShowConsultation(true)} />;
      case 'selection': return <SelectionPage onConsultation={() => setShowConsultation(true)} />;
      case 'checkout': return <CheckoutPage />;
      case 'product-detail': return <ProductDetailPage onConsultation={() => setShowConsultation(true)} />;
      case 'orders': return <OrdersPage setView={setView} />;
      default: return (
        <main>
          <Hero onConsultation={() => setShowConsultation(true)} />
          <BrandStory />
          <DesignCreation />
          <CollectionSlider />
          <MaterialDetails />
          <RealMoments />
          <Features />
          <PrivateClient />
          <Testimonials />
          <CTASection onConsultation={() => setShowConsultation(true)} />
        </main>
      );
    }
  };

  const [consultationData, setConsultationData] = useState({
    name: '',
    email: '',
    preferences: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'

  const [shake, setShake] = useState(false);

  const handleConsultationSubmit = async () => {
    if (!consultationData.name.trim() || !consultationData.email.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('http://localhost:5000/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...consultationData,
          email: consultationData.email.toLowerCase()
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setConsultationData({ name: '', email: '', preferences: '' });
        setTimeout(() => {
          setShowConsultation(false);
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
        setConsultationData({ name: '', email: '', preferences: '' });
      }
    } catch (err) {
      setSubmitStatus('error');
      setConsultationData({ name: '', email: '', preferences: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="selection:bg-luxury-gold selection:text-black transition-colors duration-1000 bg-luxury-black text-white">

      {/* Dynamic Nav */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center transition-all duration-700 bg-black/20 backdrop-blur-sm text-white">
        <div
          onClick={() => setView('landing')}
          className="text-xl md:text-2xl font-cinzel font-bold tracking-[0.3em] cursor-pointer hover:text-luxury-gold transition-colors"
        >
          LUMIÈRE
        </div>

        <div className="flex items-center space-x-6 md:space-x-10 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">
          <button
            onClick={() => setView('landing')}
            className={`hover:text-luxury-gold transition-all duration-500 pb-2 relative hidden md:block ${view === 'landing' ? 'text-luxury-gold' : 'opacity-60'}`}
          >
            Home
            {view === 'landing' && (
              <motion.div
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-luxury-gold"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>

          <button
            onClick={() => setView('explore')}
            className={`hover:text-luxury-gold transition-all duration-500 pb-2 relative ${view === 'explore' ? 'text-luxury-gold' : 'opacity-60'}`}
          >
            Collections
            {view === 'explore' && (
              <motion.div
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-luxury-gold"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>

          <button
            onClick={() => setView('selection')}
            className="group relative flex items-center space-x-3 pb-2"
          >
            <span className={`transition-all duration-500 group-hover:text-luxury-gold ${view === 'selection' ? 'text-luxury-gold' : 'opacity-60'}`}>Selection</span>
            {view === 'selection' && (
              <motion.div
                layoutId="navUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-luxury-gold"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {selection.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-1.5 h-1.5 bg-luxury-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              />
            )}
          </button>

          {user && (
            <button
              onClick={() => setView('orders')}
              className={`hover:text-luxury-gold transition-all duration-500 pb-2 relative ${view === 'orders' ? 'text-luxury-gold' : 'opacity-60'}`}
            >
              My Orders
              {view === 'orders' && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-luxury-gold"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          )}

          {user ? (
            <div className="relative group">
              <div className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold text-sm font-heading cursor-pointer group-hover:border-luxury-gold transition-all duration-700 bg-white/5 backdrop-blur-sm overflow-hidden">
                <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
                <motion.div
                  className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </div>

              <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-50">
                <div className="bg-zinc-950 border border-white/10 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[140px]">
                  <button
                    onClick={() => {
                      logout();
                      clearSelection();
                      setView('landing');
                    }}
                    className="w-full flex items-center space-x-3 px-6 py-4 hover:bg-white/5 transition-all group/btn"
                  >
                    <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 group-hover/btn:text-red-400 transition-colors whitespace-nowrap font-bold">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="px-4 py-2 border border-white/10 hover:border-luxury-gold/50 hover:text-luxury-gold transition-all duration-500"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>

      {/* Point 2: Consultation Modal */}
      <AnimatePresence>
        {showConsultation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setShowConsultation(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                x: shake ? [-10, 10, -10, 10, 0] : 0
              }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                duration: shake ? 0.4 : 0.8,
                x: { duration: 0.4 }
              }}
              className="relative bg-zinc-950 border border-white/10 p-12 max-w-lg w-full space-y-12 overflow-hidden"
            >
              {isSubmitting && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full"
                  />
                </div>
              )}

              <div className="space-y-4 text-center">
                <p className="text-luxury-gold text-[10px] uppercase tracking-[0.5em]">Private Invitation</p>
                <h2 className="text-3xl font-heading text-white">Private Consultation</h2>
                <p className="text-white/80 text-lg italic font-serif">A dedicated specialist will curate a collection tailored to your essence.</p>
              </div>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-4"
                >
                  <div className="w-16 h-16 border border-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-luxury-gold text-2xl">✓</span>
                  </div>
                  <p className="text-luxury-gold text-xs uppercase tracking-[0.4em]">Message Received</p>
                  <p className="text-white/60">An expert will reach out to you within the hour.</p>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-8">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={consultationData.name}
                      onChange={(e) => setConsultationData({ ...consultationData, name: e.target.value })}
                      className={`w-full bg-transparent border-b py-4 focus:outline-none transition-colors text-sm tracking-widest text-white ${!consultationData.name.trim() && shake ? 'border-red-500/50' : 'border-white/10 focus:border-luxury-gold'}`}
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={consultationData.email}
                      onChange={(e) => setConsultationData({ ...consultationData, email: e.target.value })}
                      className={`w-full bg-transparent border-b py-4 focus:outline-none transition-all text-sm tracking-widest text-white ${!consultationData.email.trim() && shake ? 'border-red-500/50' : 'border-white/10 focus:border-luxury-gold'}`}
                    />
                    <textarea
                      placeholder="Additional Preferences (Optional)"
                      rows={3}
                      value={consultationData.preferences}
                      onChange={(e) => setConsultationData({ ...consultationData, preferences: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-luxury-gold transition-colors text-sm tracking-widest resize-none text-white"
                    />
                  </div>

                  <button
                    onClick={handleConsultationSubmit}
                    disabled={isSubmitting}
                    className={`w-full bg-luxury-gold text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Transmitting...' : 'Request Consultation'}
                  </button>

                  {submitStatus === 'error' && (
                    <p className="text-red-500 text-[10px] uppercase tracking-wider text-center">Transmission failed. Please try again later.</p>
                  )}
                </>
              )}

              <button
                onClick={() => setShowConsultation(false)}
                className="w-full text-white/60 text-[11px] uppercase tracking-[0.5em] hover:text-luxury-gold transition-colors font-bold"
              >
                Close Invitation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Grain Overlay */}
      {view !== 'checkout' && (
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
          <svg className='w-full h-full'>
            <filter id='noiseFilter'>
              <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
            </filter>
            <rect width='100%' height='100%' filter='url(#noiseFilter)' />
          </svg>
        </div>
      )}

      {view === 'landing' && <Footer onConsultation={() => setShowConsultation(true)} />}
    </div>
  )
}

export default App;
