import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Sparkles, ShieldCheck, HelpCircle, Flame, Droplets, Info } from 'lucide-react';
import { HERO_MAIN_IMAGE, PRODUCTS } from '../data';
import { JuiceProduct } from '../types';

interface ShopAllProps {
  onNavigate: (tab: string) => void;
  onAddToCart: (product: JuiceProduct) => void;
  onOpenNutrition: (productId: string) => void;
}

export default function ShopAll({ onNavigate, onAddToCart, onOpenNutrition }: ShopAllProps) {
  // Extract specific products for Curated Blends
  const signatureCitrus = PRODUCTS.find(p => p.id === 'signature-citrus');
  const crimsonRoot = PRODUCTS.find(p => p.id === 'crimson-root');
  const verdantGlow = PRODUCTS.find(p => p.id === 'verdant-glow');

  // Parallax scroll state
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamic bottle color hue shifting helper
  const getProductFilterClass = (colorTheme: string) => {
    switch (colorTheme) {
      case 'orange':
        return 'hue-rotate-0 saturate-[1.1] brightness-[1.05]';
      case 'mango':
        // Custard Yellow
        return 'hue-rotate-[15deg] saturate-[0.85] brightness-[1.2]';
      case 'apple':
      case 'apple-light':
        // Pistachio Green
        return 'hue-rotate-[60deg] saturate-[0.7] brightness-[1.15]';
      case 'verdant':
        // Mint Green
        return 'hue-rotate-[110deg] saturate-[0.8] brightness-[1.2]';
      case 'berry':
      case 'pink':
        // Bubblegum Pink
        return 'hue-rotate-[290deg] saturate-[1.1] brightness-[1.3]';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-20 pb-24">
      {/* 1. Hero Banner */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <div className="relative overflow-hidden p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[480px]">
          {/* Subtle Ambient Background Gradient Overlays */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#FF3E00]/5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute left-1/3 bottom-10 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl animate-pulse-glow" />

          {/* Giant Parallax Background Text */}
          <div 
            style={{ 
              transform: `translateY(${scrollY * 0.15}px)`,
              willChange: 'transform'
            }}
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden z-0"
          >
            <span className="text-[14vw] font-display font-black text-white/[0.03] uppercase tracking-[0.1em] whitespace-nowrap leading-none">
              JUICE LAB
            </span>
          </div>

          {/* Left Text */}
          <div className="relative z-10 max-w-xl space-y-6 flex-1">
            <span className="inline-flex items-center gap-1.5 bg-[#FF3E00]/15 border border-[#FF3E00]/20 text-[#FF3E00] text-[10px] px-3.5 py-1 font-mono uppercase tracking-[0.15em] font-bold">
              <Sparkles className="w-3.5 h-3.5" /> 100% Pure & Cold Pressed
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tighter text-white uppercase leading-none">
              Primal <br />
              <span className="text-[#FF3E00]">
                Vitality.
              </span>
            </h1>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed font-sans max-w-md">
              Experience the raw, unaltered power of nature. We press high-yield heirloom crops in cold environments to pack active living enzymes and pure nectar straight into your glass.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('flavors')}
                className="w-full sm:w-auto justify-center bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 sm:px-8 sm:py-4 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Shop Flavors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('subscription')}
                className="w-full sm:w-auto justify-center bg-transparent hover:bg-white/5 text-stone-200 hover:text-white border border-white/10 hover:border-white/30 font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 sm:px-8 sm:py-4 transition-all cursor-pointer"
              >
                Delivery Plans
              </button>
            </div>
          </div>

          {/* Right Product Image with Parallax Wrapper */}
          <div 
            style={{ 
              transform: `translateY(${scrollY * -0.06}px)`,
              willChange: 'transform'
            }}
            className="relative z-10 flex-1 flex justify-center md:justify-end max-w-md w-full"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative flex flex-col items-center justify-center w-full min-h-[400px]"
            >
              <img
                src={HERO_MAIN_IMAGE}
                alt="Juice Lab Premium Bottle"
                referrerPolicy="no-referrer"
                className="max-h-[380px] object-contain hover:scale-[1.03] transition-transform duration-500 z-10"
              />

              {/* Badges on image */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2.5 z-20">
                <span className="block text-[8px] font-mono text-stone-400 uppercase leading-none tracking-[0.2em] mb-1 font-bold">Active Enzymes</span>
                <span className="text-[10px] font-bold text-white font-mono uppercase tracking-wider">100% Raw & Unpasteurized</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Curated Blends Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#FF3E00] uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" /> Signature Formulations
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter text-white uppercase">
              Curated Blends
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm font-mono max-w-md">
              Freshly squeezed and vacuum-sealed immediately. No water, no sweeteners, zero additives.
            </p>
          </div>
          <button
            onClick={() => onNavigate('flavors')}
            className="text-stone-300 hover:text-[#FF3E00] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1 group transition-colors cursor-pointer"
          >
            <span>View All Flavors</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Dynamic Bento Style Curated Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Large Signature Citrus */}
          {signatureCitrus && (
            <div className="lg:col-span-2 bg-[#121212] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 justify-between items-center relative overflow-hidden group hover:border-[#FF3E00]/30 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-[#FF3E00] text-white font-mono text-[9px] uppercase tracking-widest px-4 py-1.5 font-bold">
                {signatureCitrus.badge}
              </div>
              <div className="space-y-5 flex-1">
                <span className="inline-block bg-[#FF3E00]/10 border border-[#FF3E00]/20 text-[#FF3E00] font-mono text-[9px] px-3 py-1 uppercase tracking-wider font-bold">
                  Cold-Pressed Cara Cara
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">{signatureCitrus.name}</h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                  {signatureCitrus.description}
                </p>
                
                {/* Benefits */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {signatureCitrus.benefits.map((b, i) => (
                    <span key={i} className="bg-stone-900 text-stone-300 text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 border border-white/5">
                      {b}
                    </span>
                  ))}
                </div>

                 <div className="flex items-center gap-2 pt-3 flex-wrap">
                  <span className="font-mono text-2xl font-bold text-white mr-2">₹{signatureCitrus.price.toFixed(0)}</span>
                  <button
                    onClick={() => onAddToCart(signatureCitrus)}
                    className="bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => onOpenNutrition(signatureCitrus.id)}
                    className="border border-white/10 hover:border-white text-stone-400 hover:text-white font-mono text-[10px] uppercase tracking-widest px-4 py-3 transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Real-Time Clinical Nutrition Specs"
                  >
                    <Info className="w-3.5 h-3.5 text-[#FF3E00]" />
                    <span>Nutrition Specs</span>
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 w-full sm:w-48 h-48 sm:h-56 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF3E00]/5 to-[#FF3E00]/10 rounded-full scale-95 blur-md -z-10" />
                <img
                  src={signatureCitrus.image}
                  alt={signatureCitrus.name}
                  referrerPolicy="no-referrer"
                  className={`max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(255,62,0,0.1)] cursor-pointer ${getProductFilterClass(signatureCitrus.colorTheme)}`}
                  onClick={() => onOpenNutrition(signatureCitrus.id)}
                />
              </div>
            </div>
          )}

          {/* Column with 2 small cards */}
          <div className="flex flex-col gap-6">
            {/* Card 2: Crimson Root */}
            {crimsonRoot && (
              <div className="bg-[#121212] border border-white/10 p-6 flex items-center justify-between gap-4 group hover:border-[#FF3E00]/30 transition-all duration-300 relative">
                <div className="space-y-2 flex-1 min-w-0">
                  <span className="inline-block text-[9px] font-mono text-[#FF3E00] uppercase font-bold tracking-wider">
                    {crimsonRoot.badge}
                  </span>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight truncate cursor-pointer hover:text-[#FF3E00] transition-colors" onClick={() => onOpenNutrition(crimsonRoot.id)}>{crimsonRoot.name}</h3>
                  <p className="text-stone-400 text-xs truncate max-w-[180px] font-mono uppercase tracking-wider">{crimsonRoot.tagline}</p>
                   <div className="flex items-center gap-1.5 pt-3 flex-wrap">
                    <span className="font-mono text-base font-bold text-white mr-1">₹{crimsonRoot.price.toFixed(0)}</span>
                    <button
                      onClick={() => onAddToCart(crimsonRoot)}
                      className="bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => onOpenNutrition(crimsonRoot.id)}
                      className="border border-white/10 hover:border-white text-stone-400 hover:text-white font-mono text-[9px] uppercase tracking-wider px-2.5 py-2 transition-colors cursor-pointer flex items-center gap-1"
                      title="Real-Time Clinical Nutrition Specs"
                    >
                      <Info className="w-3 h-3 text-[#FF3E00]" />
                      <span>Nutrition</span>
                    </button>
                  </div>
                </div>
                <div className="w-20 h-24 relative flex items-center justify-center flex-shrink-0">
                  <div className="absolute inset-0 bg-[#FF3E00]/5 rounded-full blur-sm -z-10" />
                  <img
                    src={crimsonRoot.image}
                    alt={crimsonRoot.name}
                    referrerPolicy="no-referrer"
                    className={`max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer ${getProductFilterClass(crimsonRoot.colorTheme)}`}
                    onClick={() => onOpenNutrition(crimsonRoot.id)}
                  />
                </div>
              </div>
            )}

            {/* Card 3: Verdant Glow */}
            {verdantGlow && (
              <div className="bg-[#121212] border border-white/10 p-6 flex items-center justify-between gap-4 group hover:border-[#FF3E00]/30 transition-all duration-300 relative">
                <div className="space-y-2 flex-1 min-w-0">
                  <span className="inline-block text-[9px] font-mono text-emerald-500 uppercase font-bold tracking-wider">
                    {verdantGlow.badge}
                  </span>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight truncate cursor-pointer hover:text-[#FF3E00] transition-colors" onClick={() => onOpenNutrition(verdantGlow.id)}>{verdantGlow.name}</h3>
                  <p className="text-stone-400 text-xs truncate max-w-[180px] font-mono uppercase tracking-wider">{verdantGlow.tagline}</p>
                   <div className="flex items-center gap-1.5 pt-3 flex-wrap">
                    <span className="font-mono text-base font-bold text-white mr-1">₹{verdantGlow.price.toFixed(0)}</span>
                    <button
                      onClick={() => onAddToCart(verdantGlow)}
                      className="bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 transition-colors cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => onOpenNutrition(verdantGlow.id)}
                      className="border border-white/10 hover:border-white text-stone-400 hover:text-white font-mono text-[9px] uppercase tracking-wider px-2.5 py-2 transition-colors cursor-pointer flex items-center gap-1"
                      title="Real-Time Clinical Nutrition Specs"
                    >
                      <Info className="w-3 h-3 text-emerald-500" />
                      <span>Nutrition</span>
                    </button>
                  </div>
                </div>
                <div className="w-20 h-24 relative flex items-center justify-center flex-shrink-0">
                  <div className="absolute inset-0 bg-[#FF3E00]/5 rounded-full blur-sm -z-10" />
                  <img
                    src={verdantGlow.image}
                    alt={verdantGlow.name}
                    referrerPolicy="no-referrer"
                    className={`max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer ${getProductFilterClass(verdantGlow.colorTheme)}`}
                    onClick={() => onOpenNutrition(verdantGlow.id)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. The Lab Standard: Premium Bento Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-mono text-[#FF3E00] uppercase tracking-[0.2em] font-bold">The Lab Standard</span>
          <h2 className="text-[20px] font-display font-black tracking-tighter text-white uppercase">
            Uncompromising Raw Integrity
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm font-mono max-w-md mx-auto">
            What makes our cold press technology dramatically different from store-bought juices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-[#121212] border border-white/10 p-6 flex flex-col gap-4">
            <div className="w-10 h-10 bg-[#FF3E00]/10 border border-[#FF3E00]/20 flex items-center justify-center text-[#FF3E00]">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">100% Pure Fruit</h3>
            <p className="text-stone-400 text-xs leading-relaxed font-sans">
              No added sugars, filtered tap water, or chemical concentrates. You are consuming 100% pure organic fruit nectar.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#121212] border border-white/10 p-6 flex flex-col gap-4">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">Regenerative</h3>
            <p className="text-stone-400 text-xs leading-relaxed font-sans">
              Sourced entirely from orchards that practice regenerative agriculture, building nutrients back into Indore, India soil.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#121212] border border-white/10 p-6 flex flex-col gap-4">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">Hydraulic Press</h3>
            <p className="text-stone-400 text-xs leading-relaxed font-sans">
              Pressed with 14,000 lbs of continuous hydraulic pressure to separate active live enzymes and avoid heat degradation.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-[#121212] border border-white/10 p-6 flex flex-col gap-4">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FF3E00]">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">Enzymes Active</h3>
            <p className="text-stone-400 text-xs leading-relaxed font-sans">
              Kept cold from harvest to bottle. We guarantee fresh, live vitamins and minerals in every sip you take.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Newsletter/Commitment Promo Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#121212] border border-white/10 p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 relative overflow-hidden">
          {/* Accent blob */}
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#FF3E00]/5 rounded-full blur-2xl opacity-60" />
          
          <div className="relative z-10 max-w-lg mx-auto space-y-4">
            <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">Join the Cold-Pressed Movement</h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-sans">
              Get <strong className="text-[#FF3E00]">10% off</strong> your first single delivery or subscribe to unlock free insulated shipping. Use promo code <span className="bg-[#FF3E00]/10 border border-[#FF3E00]/20 text-[#FF3E00] px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider">COLDPRESSED10</span> at checkout.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-3 justify-center max-w-sm mx-auto">
              <button
                onClick={() => onNavigate('flavors')}
                className="bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 transition-colors cursor-pointer"
              >
                Start Your Order
              </button>
              <button
                onClick={() => onNavigate('subscription')}
                className="bg-transparent hover:bg-white/5 text-white border border-white/10 hover:border-white font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 transition-colors cursor-pointer"
              >
                Join Subscription
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
