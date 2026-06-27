import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShoppingBag, Truck, Thermometer, ShieldCheck, RefreshCw, X, ArrowRight, ExternalLink, Instagram, Phone, WifiOff } from 'lucide-react';

import Header from './components/Header';
import ShopAll from './components/ShopAll';
import Flavors from './components/Flavors';
import Journey from './components/Journey';
import Subscription from './components/Subscription';
import OurStory from './components/OurStory';
import CartDrawer from './components/CartDrawer';
import NutritionModal from './components/NutritionModal';

import AuthPage from './components/AuthPage';
import AccountDashboard from './components/AccountDashboard';
import { auth } from './firebase';

import { JuiceProduct, CartItem, SubscriptionPlan } from './types';
import { PRODUCTS } from './data';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('shop-all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const [selectedNutritionProductId, setSelectedNutritionProductId] = useState<string | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 2000);
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Cart operations
  const handleAddToCart = (product: JuiceProduct, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => !item.isBundle && item.product?.id === product.id);
      if (existing) {
        return prev.map(item => 
          (!item.isBundle && item.product?.id === product.id)
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, {
        id: `single-${product.id}`,
        product,
        quantity: qty
      }];
    });
    
    // Auto trigger micro slide-over open to give great user feedback
    setIsCartOpen(true);
  };

  const handleAddBundleToCart = (bundleName: string, price: number, selections: { [id: string]: number }) => {
    setCart(prev => {
      return [...prev, {
        id: `bundle-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        quantity: 1,
        isBundle: true,
        bundleName,
        bundlePrice: price,
        bundleBottles: { ...selections }
      }];
    });
    setIsCartOpen(true);
  };

  const handleAddSubscriptionToCart = (plan: SubscriptionPlan) => {
    setCart(prev => {
      // check if subscription is already in cart
      const existing = prev.find(item => item.isBundle && item.bundleName === `${plan.name} Subscription`);
      if (existing) {
        return prev.map(item =>
          (item.isBundle && item.bundleName === `${plan.name} Subscription`)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: `subscription-${plan.id}`,
        quantity: 1,
        isBundle: true,
        bundleName: `${plan.name} Subscription`,
        bundlePrice: plan.price
      }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  if (isAdminView) {
    if (!user) {
      return (
        <AuthPage onLogin={() => {}} />
      );
    }
    return (
      <AccountDashboard onLogout={() => setIsAdminView(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col font-sans antialiased overflow-x-hidden selection:bg-[#FF3E00] selection:text-white">
      
      {/* Offline/Syncing Banner */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#FF3E00] text-white text-xs font-mono uppercase tracking-widest font-bold text-center py-2 flex items-center justify-center gap-2"
          >
            <WifiOff className="w-3.5 h-3.5" /> Offline Mode — Changes will sync when reconnected
          </motion.div>
        )}
        {isSyncing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-emerald-500 text-white text-xs font-mono uppercase tracking-widest font-bold text-center py-2 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Syncing Offline Data...
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Brand Navigation Header */}
      <Header
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. Primary Page Content Switcher (with smooth transitions) */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {currentTab === 'shop-all' && (
              <ShopAll
                onNavigate={setCurrentTab}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onOpenNutrition={setSelectedNutritionProductId}
              />
            )}
            
            {currentTab === 'flavors' && (
              <Flavors
                onAddToCart={handleAddToCart}
                onAddBundleToCart={handleAddBundleToCart}
                cart={cart}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenNutrition={setSelectedNutritionProductId}
              />
            )}

            {currentTab === 'journey' && (
              <Journey />
            )}

            {currentTab === 'subscription' && (
              <Subscription
                onAddSubscriptionToCart={handleAddSubscriptionToCart}
                onOpenCart={() => setIsCartOpen(true)}
              />
            )}

            {currentTab === 'our-story' && (
              <OurStory
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onOpenCart={() => setIsCartOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Interactive Cart Slide-Over Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={handleUpdateQuantity}
        removeFromCart={handleRemoveFromCart}
        clearCart={handleClearCart}
        onOpenCheckoutSuccess={setSuccessOrderId}
      />

      {/* 4. Global Brand Footer */}
      <footer className="border-t border-white/10 py-16 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1 Brand logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF3E00] text-white flex items-center justify-center font-display font-black text-base">
                J
              </div>
              <span className="font-display font-black text-lg text-white uppercase tracking-tighter">Juice Lab</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-xs">
              Primal cellular nutrition squeezed fresh in Indore, India. Uncompromising raw cold press.
              <br/><br/>
              <span className="text-stone-300 font-bold">Founder: Jinu Samuel</span>
            </p>
            <div className="flex gap-3 text-[10px] text-[#FF3E00] font-mono pt-1 uppercase tracking-wider font-bold">
              <span>● Indore, India</span>
            </div>
          </div>

          {/* Col 2 Shop Tab links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-[#FF3E00] uppercase tracking-[0.2em] font-bold">Explore</h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li>
                <button onClick={() => setCurrentTab('shop-all')} className="hover:text-[#FF3E00] transition-colors cursor-pointer text-left">
                  Shop All Formulations
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('flavors')} className="hover:text-[#FF3E00] transition-colors cursor-pointer text-left">
                  Cold Pressed Flavors
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('subscription')} className="hover:text-[#FF3E00] transition-colors cursor-pointer text-left">
                  Subscription Cleanses
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Sourcing links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-[#FF3E00] uppercase tracking-[0.2em] font-bold">Sourcing</h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li>
                <button onClick={() => setCurrentTab('journey')} className="hover:text-[#FF3E00] transition-colors cursor-pointer text-left">
                  Biodynamic Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('our-story')} className="hover:text-[#FF3E00] transition-colors cursor-pointer text-left">
                  Our Editorial Story
                </button>
              </li>
              <li>
                <span className="text-stone-500">Pesticide Free Standard</span>
              </li>
            </ul>
          </div>

          {/* Col 4 Quick credits */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-[#FF3E00] uppercase tracking-[0.2em] font-bold">Contact</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Have wellness questions? Ask our text-line nutritionist daily.
            </p>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/JuiceLab_0108" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold font-mono text-[#F5F5F5] hover:text-[#FF3E00] transition-colors">
                <Instagram className="w-4 h-4" />
                JuiceLab_0108
              </a>
              <a href="tel:98264070108" className="flex items-center gap-2 text-sm font-bold font-mono text-[#F5F5F5] hover:text-[#FF3E00] transition-colors">
                <Phone className="w-4 h-4" />
                98264070108
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500">
          <span>© {new Date().getFullYear()} Juice Lab LLC. All Rights Reserved.</span>
          <div className="flex flex-wrap justify-center gap-4 mt-4 sm:mt-0 font-mono text-[10px] uppercase tracking-wider font-bold">
            <span className="hover:text-stone-300 cursor-pointer">FDA Guidelines</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span 
              onClick={() => setIsAdminView(true)} 
              className="hover:text-[#FF3E00] cursor-pointer"
            >
              Login / Account
            </span>
          </div>
        </div>
      </footer>

      {/* 5. Interactive CHECKOUT SUCCESS Order Tracker Dialog Modal */}
      <AnimatePresence>
        {successOrderId && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              onClick={() => setSuccessOrderId(null)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed inset-4 md:inset-x-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:max-w-xl md:h-auto w-full bg-[#121212] text-[#F5F5F5] z-50 border border-white/10 overflow-hidden flex flex-col"
            >
              {/* Header card with orange banner */}
              <div className="bg-[#FF3E00] text-white p-8 text-center space-y-3 relative">
                <button
                  onClick={() => setSuccessOrderId(null)}
                  className="absolute top-4 right-4 text-white hover:text-stone-200 p-1 rounded-full hover:bg-black/10 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="w-12 h-12 bg-[#0A0A0A] text-[#FF3E00] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display font-black text-xl uppercase tracking-tight">Order Squeezed & Confirmed!</h3>
                <span className="inline-block bg-[#0A0A0A] text-white font-mono text-[10px] px-3.5 py-1 uppercase tracking-widest font-bold">
                  Order ID: {successOrderId}
                </span>
              </div>

              {/* Order diagnostic details scroll */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1 bg-[#121212]">
                
                {/* Active Tracking Stepper progress */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono text-[#FF3E00] uppercase tracking-widest font-bold flex items-center gap-1.5 pb-2 border-b border-white/5">
                    <Truck className="w-4 h-4" /> Transit Logistics Tracker
                  </h4>
                  
                  <div className="grid grid-cols-4 text-center relative pt-1">
                    {/* Horizontal connection line */}
                    <div className="absolute left-[12%] right-[12%] top-4 h-[1px] bg-white/10 -z-10" />
                    <div className="absolute left-[12%] w-[33%] top-4 h-[1px] bg-[#FF3E00] -z-10" />

                    {/* Step 1: Confirmed */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 bg-[#FF3E00] text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">Ordered</span>
                    </div>

                    {/* Step 2: Squeezing */}
                    <div className="flex flex-col items-center gap-2 animate-pulse">
                      <div className="w-6 h-6 bg-[#FF3E00] text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">Squeezing</span>
                    </div>

                    {/* Step 3: Cold Transit */}
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="w-6 h-6 bg-stone-800 text-stone-500 flex items-center justify-center text-[9px] font-bold">3</div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">Transit</span>
                    </div>

                    {/* Step 4: Arrived */}
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="w-6 h-6 bg-stone-800 text-stone-500 flex items-center justify-center text-[9px] font-bold">4</div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Real-time temperature simulator */}
                <div className="bg-[#0A0A0A] border border-white/5 p-4 space-y-2 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">Thermal Sensor Status</span>
                    <span className="text-[10px] font-mono font-bold text-[#FF3E00] bg-[#FF3E00]/10 border border-[#FF3E00]/20 px-2 py-0.5 inline-block uppercase tracking-wider">
                      Keep-Cold Sensors Active
                    </span>
                    <p className="text-[11px] text-stone-400">Insulated crate tracking parameters.</p>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-1 text-[#FF3E00] justify-end">
                      <Thermometer className="w-4 h-4" />
                      <span className="font-mono text-lg font-bold">34.2°F</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#FF3E00] block uppercase font-bold tracking-wider">Optimal Range</span>
                  </div>
                </div>

                {/* Sourcing credentials promise card */}
                <div className="bg-[#0A0A0A] border border-white/5 p-4 flex gap-3 text-xs text-stone-300 leading-relaxed">
                  <ShieldCheck className="w-5 h-5 text-[#FF3E00] flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-white font-mono text-[10px] uppercase tracking-wider">Enzyme Alive Guarantee</h5>
                    <p className="text-stone-400 text-[11px]">
                      Your raw cold-pressed juices are squeezing right now in our Indore, India cold-rooms kept at 36°F. This guarantees maximum live enzyme longevity upon arrival.
                    </p>
                  </div>
                </div>

                <div className="text-center text-[11px] text-stone-500 border-t border-white/5 pt-3 font-mono uppercase tracking-wider">
                  Receipt details and real-time transit tracker sent to your inbox.
                </div>
              </div>

              {/* Close footer */}
              <div className="bg-[#0C0C0C] p-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setSuccessOrderId(null)}
                  className="bg-[#FF3E00] text-white font-mono font-bold text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-[#e03600] transition-colors cursor-pointer"
                >
                  Close Tracker
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <NutritionModal
        productId={selectedNutritionProductId}
        onClose={() => setSelectedNutritionProductId(null)}
      />

    </div>
  );
}
