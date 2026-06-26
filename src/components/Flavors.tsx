import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, Eye, Plus, Minus, Scale, Info, Layers, CheckCircle2, Sliders, Activity, HelpCircle, X, Check, Flame, Award } from 'lucide-react';
import { PRODUCTS, NEON_DATA_GRAPH_IMAGE } from '../data';
import { JuiceProduct, JuiceCategory, CartItem } from '../types';

interface FlavorsProps {
  onAddToCart: (product: JuiceProduct, qty?: number) => void;
  onAddBundleToCart: (bundleName: string, price: number, bottles: { [id: string]: number }) => void;
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenNutrition: (productId: string) => void;
}

export default function Flavors({ onAddToCart, onAddBundleToCart, cart, onOpenCart, onOpenNutrition }: FlavorsProps) {
  const [selectedCategory, setSelectedCategory] = useState<JuiceCategory>('all');
  
  // Hover & selection preview
  const [activeProduct, setActiveProduct] = useState<JuiceProduct>(PRODUCTS[0]);
  const [isHovered, setIsHovered] = useState(false);

  // Serving Size Adjuster State
  const [servingSize, setServingSize] = useState<'8oz' | '12oz' | '16oz'>('12oz');

  // Custom Bundle Builder Modal State
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [bundleSize, setBundleSize] = useState<6 | 12 | 18>(6);
  const [bundleSelections, setBundleSelections] = useState<{ [productId: string]: number }>({
    'florida-classic': 0,
    'mango-nectar': 0,
    'orchard-apple': 0,
    'crimson-root': 0,
    'verdant-glow': 0,
    'signature-citrus': 0,
  });

  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  // Nutrition adjustment math based on serving size
  const scaleFactor = {
    '8oz': 0.66,
    '12oz': 1.0,
    '16oz': 1.33
  }[servingSize];

  // Dynamically calculate aggregate nutrition of custom box builder
  const totalSelectedInBundle = (Object.values(bundleSelections) as number[]).reduce((a, b) => a + b, 0);
  
  const getBundleAggregateNutrition = () => {
    if (totalSelectedInBundle === 0) {
      return { vitaminC: 0, calories: 0, naturalSugars: 0, potassium: 0, calcium: 0 };
    }
    let vitC = 0, cal = 0, sug = 0, pot = 0, calc = 0;
    (Object.entries(bundleSelections) as [string, number][]).forEach(([pId, qty]) => {
      const p = PRODUCTS.find(prod => prod.id === pId);
      if (p && qty > 0) {
        vitC += p.nutrition.vitaminC * qty;
        cal += p.nutrition.calories * qty;
        sug += p.nutrition.naturalSugars * qty;
        pot += p.nutrition.potassium * qty;
        calc += p.nutrition.calcium * qty;
      }
    });
    return {
      vitaminC: Math.round(vitC / totalSelectedInBundle),
      calories: Math.round(cal / totalSelectedInBundle),
      naturalSugars: Math.round(sug / totalSelectedInBundle),
      potassium: Math.round(pot / totalSelectedInBundle),
      calcium: Math.round(calc / totalSelectedInBundle),
    };
  };

  const bundleStats = getBundleAggregateNutrition();

  const handleBundleIncrement = (productId: string) => {
    if (totalSelectedInBundle < bundleSize) {
      setBundleSelections(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1
      }));
    }
  };

  const handleBundleDecrement = (productId: string) => {
    if ((bundleSelections[productId] || 0) > 0) {
      setBundleSelections(prev => ({
        ...prev,
        [productId]: prev[productId] - 1
      }));
    }
  };

  // Bundle Pricing math
  const getBundlePrice = () => {
    const basePricePerBottle = 200; // Average baseline in Rupees
    const subtotal = bundleSize * basePricePerBottle;
    const discount = bundleSize === 6 ? 0.05 : bundleSize === 12 ? 0.12 : 0.20;
    return Number((subtotal * (1 - discount)).toFixed(0));
  };

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

  const handleAddBundleToCart = () => {
    if (totalSelectedInBundle !== bundleSize) return;
    const bundleName = `Custom ${bundleSize}-Pack Blend`;
    onAddBundleToCart(bundleName, getBundlePrice(), bundleSelections);
    
    // reset builder state
    setBundleSelections({
      'florida-classic': 0,
      'mango-nectar': 0,
      'orchard-apple': 0,
      'crimson-root': 0,
      'verdant-glow': 0,
      'signature-citrus': 0,
    });
    setIsBuilderOpen(false);
  };

  // Color mappings for active product theme accents
  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'orange':
        return {
          bg: 'bg-[#FF3E00]/10',
          border: 'border-[#FF3E00]/30',
          text: 'text-[#FF3E00]',
          progress: 'bg-[#FF3E00]',
          accentGlow: 'from-[#FF3E00]/20 to-transparent',
          badgeBg: 'bg-[#FF3E00]/10 text-[#FF3E00] border-[#FF3E00]/20',
          focusRing: 'focus:ring-[#FF3E00]/25'
        };
      case 'mango':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-500',
          progress: 'bg-amber-500',
          accentGlow: 'from-amber-500/20 to-transparent',
          badgeBg: 'bg-amber-500/10 text-amber-450 border-amber-500/20',
          focusRing: 'focus:ring-amber-500/25'
        };
      case 'apple':
      case 'apple-light':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          progress: 'bg-emerald-400',
          accentGlow: 'from-emerald-500/15 to-transparent',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          focusRing: 'focus:ring-emerald-500/25'
        };
      case 'verdant':
        return {
          bg: 'bg-teal-500/10',
          border: 'border-teal-500/30',
          text: 'text-teal-400',
          progress: 'bg-teal-500',
          accentGlow: 'from-teal-500/15 to-transparent',
          badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
          focusRing: 'focus:ring-teal-500/25'
        };
      case 'berry':
      case 'pink':
        return {
          bg: 'bg-rose-400/10',
          border: 'border-rose-400/30',
          text: 'text-rose-400',
          progress: 'bg-rose-400',
          accentGlow: 'from-rose-400/15 to-transparent',
          badgeBg: 'bg-rose-400/10 text-rose-450 border-rose-400/20',
          focusRing: 'focus:ring-rose-400/25'
        };
      default:
        return {
          bg: 'bg-stone-500/10',
          border: 'border-stone-500/30',
          text: 'text-stone-400',
          progress: 'bg-[#FF3E00]',
          accentGlow: 'from-stone-500/20 to-transparent',
          badgeBg: 'bg-stone-850 text-stone-200 border-stone-700',
          focusRing: 'focus:ring-[#FF3E00]/25'
        };
    }
  };

  const activeTheme = getThemeColors(activeProduct.colorTheme);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-12 pb-24 text-[#F5F5F5]">
      {/* 1. Page Hero Banner */}
      <section className="bg-[#0C0C0C] border border-white/10 rounded-none p-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Dynamic Background Glow based on active product */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#FF3E00]/5 rounded-full blur-3xl transition-colors duration-500" />
        <div className={`absolute left-10 bottom-0 w-80 h-48 bg-gradient-to-t ${activeTheme.accentGlow} rounded-full blur-3xl opacity-40 transition-all duration-700`} />
        
        <div className="space-y-4 max-w-xl relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-[#FF3E00]/15 border border-[#FF3E00]/20 text-[#FF3E00] text-[10px] px-3.5 py-1 font-mono uppercase tracking-[0.15em] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3E00] animate-spin" /> Squeezed fresh daily
          </span>
          <h1 className="font-display font-black text-[22px] tracking-tighter text-white uppercase leading-none">
            Raw Formulations.
          </h1>
          <p className="text-stone-400 text-sm leading-relaxed max-w-md font-sans">
            Our cold-pressed organic formulations are extracted in small batches without thermal pasteurization or added sugars, protecting crucial digestive enzymes.
          </p>
        </div>
        
        {/* Quick helper tag */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 bg-[#121212] border border-white/10 p-5 rounded-none max-w-full lg:max-w-xs relative z-10 space-y-2 overflow-hidden break-words break-all sm:break-normal">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">💡 Diagnostics Connected</h4>
          <p className="text-[11px] text-stone-400 leading-normal font-mono break-words">
            Hover over any flavor block to instantly overlay diagnostic bio-metrics, Vitamin C indices, and pulp consistency.
          </p>
        </div>
      </section>

      {/* 2. Products Grid + Smart Dashboard Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2/3 width): Filter Selector & Products Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Filter Selector */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
            {(['all', 'orange', 'mango', 'apple', 'berry'] as JuiceCategory[]).map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#FF3E00] text-white shadow-sm' 
                      : 'bg-[#121212] text-stone-400 hover:text-white border border-white/5 hover:border-white/20'
                  }`}
                >
                  {cat === 'all' ? 'All Flavors' : `${cat} blends`}
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredProducts.map((p) => {
              const isSelected = activeProduct.id === p.id;
              const pTheme = getThemeColors(p.colorTheme);
              return (
                <motion.div
                  key={p.id}
                  onMouseEnter={() => { setActiveProduct(p); setIsHovered(true); }}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setActiveProduct(p)}
                  className={`bg-[#121212] rounded-none border p-5 flex flex-col justify-between h-auto min-h-[380px] relative overflow-hidden transition-all duration-300 group cursor-pointer ${
                    isSelected 
                      ? 'border-[#FF3E00] bg-[#FF3E00]/5' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {/* Badge */}
                  <div className={`absolute top-4 left-4 border text-[8px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-none ${pTheme.badgeBg}`}>
                    {p.badge}
                  </div>

                  {/* Bottle Shot */}
                  <div className="h-44 w-full flex items-center justify-center relative pt-4">
                    {/* Shadow overlay */}
                    <div className="absolute w-24 h-24 bg-stone-900 rounded-full blur-md -z-10 opacity-60 group-hover:scale-110 transition-transform duration-500" />
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className={`max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(255,62,0,0.08)] ${getProductFilterClass(p.colorTheme)}`}
                    />
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1 mt-3">
                    <h3 className="font-display font-black text-base text-white uppercase tracking-tight group-hover:text-[#FF3E00] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-stone-400 truncate font-mono uppercase tracking-wider">
                      {p.tagline}
                    </p>
                  </div>

                  {/* Interactive footer card trigger */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-white">₹{p.price.toFixed(0)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenNutrition(p.id);
                        }}
                        className="p-2 border border-white/10 text-stone-400 hover:text-white hover:border-white transition-colors cursor-pointer"
                        title="View Real-Time Biological Nutrition Specs"
                      >
                        <Info className="w-3.5 h-3.5 text-[#FF3E00]" />
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p);
                      }}
                      className="bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono font-bold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-none transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {/* Special "Bundle & Save — Custom Box Builder" card */}
            <div className="bg-[#121212] border-2 border-dashed border-white/20 hover:border-[#FF3E00]/60 rounded-none p-6 flex flex-col justify-between h-auto min-h-[380px] transition-all group relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-[#FF3E00]/5 rounded-full blur-2xl group-hover:bg-[#FF3E00]/10 transition-colors" />
              <div className="space-y-3.5">
                <span className="inline-block bg-[#FF3E00]/10 text-[#FF3E00] text-[9px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-none border border-[#FF3E00]/20">
                  Bundle & Save
                </span>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-tight group-hover:text-[#FF3E00] transition-colors">
                  Custom Blend Crate
                </h3>
                <p className="text-stone-400 text-xs leading-relaxed font-sans">
                  Mix and match any 6, 12, or 18 cold-pressed juices to craft your tailored wellness cleanse. Save up to 20% + free priority insulated shipping!
                </p>
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="flex items-center gap-1.5 text-stone-300">
                    <Check className="w-3.5 h-3.5 text-[#FF3E00]" />
                    <span>Choose exact ratios</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-300">
                    <Check className="w-3.5 h-3.5 text-[#FF3E00]" />
                    <span>Dynamic nutrition averages</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                <div>
                  <span className="block text-[8px] font-mono text-stone-400 uppercase leading-none">Starting at</span>
                  <span className="font-mono text-base font-bold text-[#FF3E00]">₹1,140</span>
                </div>
                <button
                  onClick={() => setIsBuilderOpen(true)}
                  className="bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-none transition-all cursor-pointer"
                >
                  Start Builder
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width): STICKY SMART DASHBOARD */}
        <div className="lg:col-sticky lg:sticky lg:top-24 space-y-6">
          <div className="bg-[#0C0C0C] border border-white/10 rounded-none p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Activity className={`w-4 h-4 ${activeTheme.text}`} />
                <h3 className="font-display font-black text-xs text-white uppercase tracking-wider">
                  Live Diagnostics
                </h3>
              </div>
              <span className="text-[9px] font-mono text-[#FF3E00] bg-[#FF3E00]/10 px-2.5 py-0.5 rounded-none border border-[#FF3E00]/20 uppercase font-bold tracking-wider">
                Spectrograph
              </span>
            </div>

            {/* Product description header */}
            <div className="space-y-2 flex flex-col justify-between border-b border-white/5 pb-4">
              <div className="space-y-1">
                <h4 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-1.5">
                  {activeProduct.name}
                </h4>
                <p className="text-stone-400 text-xs leading-relaxed font-sans">
                  {activeProduct.description}
                </p>
              </div>
              <button
                onClick={() => onOpenNutrition(activeProduct.id)}
                className="w-full bg-[#FF3E00]/10 hover:bg-[#FF3E00] text-[#FF3E00] hover:text-white border border-[#FF3E00]/20 hover:border-transparent font-mono text-[9px] uppercase tracking-widest py-2 px-3 transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-1"
              >
                <Activity className="w-3 h-3 animate-pulse text-[#FF3E00] group-hover:text-white" />
                <span>Analyze Live Bio Facts</span>
              </button>
            </div>

            {/* Dynamic metrics block with customized progress indicators */}
            <div className="space-y-4 pt-1">
              {/* Vitamin C */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-stone-300">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-stone-500" /> Vitamin C Yield
                  </span>
                  <span className="font-bold text-white">{activeProduct.nutrition.vitaminC}% Daily</span>
                </div>
                <div className="w-full bg-stone-900 h-2 rounded-none overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, activeProduct.nutrition.vitaminC)}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                    className={`h-full ${activeTheme.progress}`}
                  />
                </div>
              </div>

              {/* Calories */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-stone-300">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-stone-500" /> Energy Content
                  </span>
                  <span className="font-bold text-white">{activeProduct.nutrition.calories} kcal</span>
                </div>
                <div className="w-full bg-stone-900 h-2 rounded-none overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (activeProduct.nutrition.calories / 160) * 100)}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                    className={`h-full ${activeTheme.progress}`}
                  />
                </div>
              </div>

              {/* Natural Sugars */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-stone-300">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-stone-500" /> Natural Sugars
                  </span>
                  <span className="font-bold text-white">{activeProduct.nutrition.naturalSugars}g</span>
                </div>
                <div className="w-full bg-stone-900 h-2 rounded-none overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (activeProduct.nutrition.naturalSugars / 32) * 100)}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                    className={`h-full ${activeTheme.progress}`}
                  />
                </div>
              </div>
            </div>

            {/* Sensation sliders (sweetness, consistency, energy) */}
            <div className="border-t border-white/5 pt-4 space-y-3 font-mono">
              <h5 className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Sensation Profile</h5>
              
              <div className="grid grid-cols-1 gap-2.5">
                {/* Sweetness */}
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span>Sweetness Profile</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span 
                        key={s} 
                        className={`w-2.5 h-2.5 rounded-none border transition-all ${
                          s <= activeProduct.sweetness 
                            ? `${activeTheme.progress} border-transparent` 
                            : 'bg-stone-900 border-white/10'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Pulp (Consistency) */}
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span>Consistency (Pulp)</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <span 
                        key={p} 
                        className={`w-2.5 h-2.5 rounded-none border transition-all ${
                          p <= activeProduct.pulp 
                            ? `${activeTheme.progress} border-transparent` 
                            : 'bg-stone-900 border-white/10'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Energy Boost */}
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span>Energy Boost Index</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((e) => (
                      <span 
                        key={e} 
                        className={`w-2.5 h-2.5 rounded-none border transition-all ${
                          e <= activeProduct.energy 
                            ? `${activeTheme.progress} border-transparent` 
                            : 'bg-stone-900 border-white/10'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits list */}
            <div className="border-t border-white/5 pt-4 space-y-2">
              <h5 className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">Primary Bio-Benefits</h5>
              <div className="flex flex-wrap gap-1.5">
                {activeProduct.benefits.map((b, i) => (
                  <span key={i} className="bg-stone-900 border border-white/5 rounded-none px-2.5 py-1 text-[10px] text-stone-300 font-mono uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className={`w-3 h-3 ${activeTheme.text}`} />
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick cart total widget */}
          <div className="bg-[#121212] border border-white/10 text-white rounded-none p-5 flex items-center justify-between shadow-md">
            <div>
              <span className="block text-[8px] font-mono text-stone-400 uppercase leading-none font-bold">Bag Status</span>
              <span className="text-sm font-mono font-bold text-white mt-1 block">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} Bottles added
              </span>
            </div>
            <button
              onClick={onOpenCart}
              className="bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono font-bold text-xs uppercase tracking-widest px-5.5 py-3 rounded-none transition-colors cursor-pointer"
            >
              View Bag Total
            </button>
          </div>
        </div>
      </section>

      {/* 3. "Transparent Fuel" Interactive Diagnostics Section */}
      <section className="bg-[#0C0C0C] border border-white/10 rounded-none p-8 md:p-12 relative overflow-hidden">
        {/* Abstract background */}
        <div className="absolute inset-0 bg-stone-900/30 mix-blend-multiply pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#FF3E00]/5 rounded-full blur-3xl" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="text-xs font-mono text-[#FF3E00] uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> Bio-Dynamic Profiling
            </span>
            <h2 className="text-[22px] font-display font-black text-white uppercase tracking-tighter leading-none">
              Transparent Fuel Diagnostics
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md font-sans">
              Toggle your preferred serving size to watch raw diagnostics dynamically rescale based on laboratory liquid metrics.
            </p>

            {/* Serving Size Selector Buttons */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">Serving Volume</label>
              <div className="flex gap-1.5 bg-black border border-white/10 rounded-none p-1 max-w-full sm:max-w-sm">
                {(['8oz', '12oz', '16oz'] as const).map((size) => {
                  const sizeLabels = { '8oz': '8 oz Glass', '12oz': '12 oz Bottle', '16oz': '16 oz Bottle' };
                  return (
                    <button
                      key={size}
                      onClick={() => setServingSize(size)}
                      className={`flex-1 text-center py-2.5 text-[10px] font-mono font-bold uppercase rounded-none transition-all cursor-pointer ${
                        servingSize === size 
                          ? 'bg-[#FF3E00] text-white shadow-md' 
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {sizeLabels[size]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Numeric Metrics Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/5 pt-6">
              <div className="bg-[#121212] p-3.5 rounded-none border border-white/10 text-center">
                <span className="block text-[9px] font-mono text-stone-400 uppercase">Vitamin C</span>
                <span className="text-lg sm:text-xl font-mono font-bold text-[#FF3E00] mt-1 block">
                  {Math.round(activeProduct.nutrition.vitaminC * scaleFactor)}%
                </span>
                <span className="text-[8px] font-mono text-stone-500">Daily Value</span>
              </div>
              
              <div className="bg-[#121212] p-3.5 rounded-none border border-white/10 text-center">
                <span className="block text-[9px] font-mono text-stone-400 uppercase">Energy</span>
                <span className="text-lg sm:text-xl font-mono font-bold text-white mt-1 block">
                  {Math.round(activeProduct.nutrition.calories * scaleFactor)}
                </span>
                <span className="text-[8px] font-mono text-stone-500">kcal</span>
              </div>

              <div className="bg-[#121212] p-3.5 rounded-none border border-white/10 text-center">
                <span className="block text-[9px] font-mono text-stone-400 uppercase">Sugars</span>
                <span className="text-lg sm:text-xl font-mono font-bold text-amber-400 mt-1 block">
                  {Math.round(activeProduct.nutrition.naturalSugars * scaleFactor)}g
                </span>
                <span className="text-[8px] font-mono text-stone-500">100% Organic</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider leading-relaxed pt-1.5 border-t border-white/5">
              * Note: Values represent 100% freshly pressed, non-diluted liquid extraction profiles.
            </div>
          </div>

          {/* Right Column: Neon Data Visualization image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative rounded-none overflow-hidden border border-white/10 bg-[#121212] p-4 max-w-md w-full shadow-2xl">
              <div className="absolute top-3 left-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[8px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-none flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                <span>Live Lab Readout</span>
              </div>
              <img
                src={NEON_DATA_GRAPH_IMAGE}
                alt="Juice Lab Diagnostics Readout"
                referrerPolicy="no-referrer"
                className="w-full object-cover rounded-none border border-white/5 shadow-inner brightness-110 contrast-115 hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur border border-white/10 rounded-none px-2.5 py-1 text-[9px] font-mono text-stone-300">
                Spectrograph: brix_test_run_ok
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CUSTOM BUNDLE BUILDER DIALOG MODAL */}
      <AnimatePresence>
        {isBuilderOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBuilderOpen(false)}
              className="fixed inset-0 bg-[#000000]/80 z-50 cursor-pointer backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed inset-4 md:inset-x-auto md:inset-y-12 md:left-1/2 md:-translate-x-1/2 md:max-w-4xl w-full bg-[#0C0C0C] border border-white/10 rounded-none shadow-2xl z-50 overflow-hidden flex flex-col text-white"
            >
              {/* Header */}
              <div className="bg-[#121212] p-5 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h2 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#FF3E00]" />
                    <span>Custom Blend Crate Builder</span>
                  </h2>
                  <p className="text-xs text-stone-400 font-mono uppercase tracking-wider mt-0.5">Choose box size, then mix and match exact bottles of your choice.</p>
                </div>
                <button
                  onClick={() => setIsBuilderOpen(false)}
                  className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Columns Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left side (7 cols): Crate sizes and selector list */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Choose Size Block */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">
                      Step 1: Select Box Capacity
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {([6, 12, 18] as const).map((size) => {
                        const discount = size === 6 ? '5%' : size === 12 ? '12%' : '20%';
                        const active = bundleSize === size;
                        return (
                          <button
                            key={size}
                            onClick={() => {
                              setBundleSize(size);
                              // Reset choices to prevent exceeding new cap
                              setBundleSelections({
                                'florida-classic': 0,
                                'mango-nectar': 0,
                                'orchard-apple': 0,
                                'crimson-root': 0,
                                'verdant-glow': 0,
                                'signature-citrus': 0,
                                });
                            }}
                            className={`p-3.5 rounded-none border text-center transition-all cursor-pointer ${
                              active 
                                ? 'border-[#FF3E00] bg-[#FF3E00]/10' 
                                : 'border-white/10 hover:border-white/20 bg-[#121212]'
                            }`}
                          >
                            <span className="block text-lg font-display font-black text-white uppercase">{size} Pack</span>
                            <span className="block text-[9px] font-mono text-[#FF3E00] font-bold mt-1 uppercase tracking-widest">
                              Save {discount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Product list with +/- selectors */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">
                      Step 2: Add Flavors ({totalSelectedInBundle} / {bundleSize} selected)
                    </label>
                    <div className="divide-y divide-white/5 max-h-[360px] overflow-y-auto pr-1">
                      {PRODUCTS.map((prod) => {
                        const qty = bundleSelections[prod.id] || 0;
                        const isAtCap = totalSelectedInBundle >= bundleSize;
                        return (
                          <div key={prod.id} className="py-3.5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 object-contain bg-stone-900 border border-white/5"
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-display font-bold text-white uppercase tracking-tight truncate leading-tight">{prod.name}</h4>
                                <span className="text-[10px] text-stone-400 font-mono inline-block">
                                  ₹{prod.price.toFixed(0)} / bottle
                                </span>
                              </div>
                            </div>

                            {/* Counter Selector */}
                            <div className="flex items-center border border-white/10 rounded-none bg-black p-1">
                              <button
                                disabled={qty === 0}
                                onClick={() => handleBundleDecrement(prod.id)}
                                className="p-1 bg-[#121212] border border-white/10 text-stone-400 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-mono text-xs font-bold text-white">
                                {qty}
                              </span>
                              <button
                                disabled={isAtCap}
                                onClick={() => handleBundleIncrement(prod.id)}
                                className="p-1 bg-[#121212] border border-white/10 text-stone-400 hover:text-white disabled:opacity-35 transition-all cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right side (5 cols): Diagnostic Summary & visual crate */}
                <div className="lg:col-span-5 bg-[#121212] p-5 border border-white/10 flex flex-col justify-between space-y-5 rounded-none">
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono text-white uppercase tracking-widest font-bold flex items-center gap-1.5 pb-2 border-b border-white/5">
                      <Sliders className="w-3.5 h-3.5 text-[#FF3E00]" /> Dynamic Crate Diagnostics
                    </h3>

                    {/* Bottle grid representation */}
                    <div className="space-y-2">
                      <span className="block text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold">Crate Layout View</span>
                      <div className="grid grid-cols-6 gap-1 bg-black p-2.5 border border-white/5 min-h-[64px] items-center justify-center text-center">
                        {Array.from({ length: bundleSize }).map((_, idx) => {
                          // Find which selected item maps to this slot
                          let selectedId = '';
                          let accum = 0;
                          (Object.entries(bundleSelections) as [string, number][]).forEach(([pId, qty]) => {
                            if (selectedId) return;
                            if (idx >= accum && idx < accum + qty) {
                              selectedId = pId;
                            }
                            accum += qty;
                          });

                          const mappedProduct = PRODUCTS.find(p => p.id === selectedId);
                          const pTheme = mappedProduct ? getThemeColors(mappedProduct.colorTheme) : null;

                          return (
                            <div 
                              key={idx}
                              className={`aspect-square sm:aspect-auto sm:h-12 rounded-none flex items-center justify-center transition-all ${
                                mappedProduct 
                                  ? `${pTheme?.progress} text-white font-bold text-xs shadow-inner`
                                  : 'bg-[#121212] border border-dashed border-white/10 text-stone-600'
                              }`}
                            >
                              {mappedProduct ? (
                                <span className="text-[10px] font-mono leading-none font-bold">{mappedProduct.name.split(' ')[0][0]}</span>
                              ) : (
                                <span className="text-[10px] font-mono text-stone-600">+</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Weighted average metrics of selection */}
                    <div className="space-y-3 pt-2">
                      <span className="block text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold">Crate Nutrition Profile</span>
                      
                      {/* Vitamin C */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-stone-300">
                          <span>Avg Vitamin C Yield</span>
                          <span className="font-bold text-white">{bundleStats.vitaminC}%</span>
                        </div>
                        <div className="w-full bg-stone-900 h-1.5 rounded-none overflow-hidden">
                          <div className="bg-[#FF3E00] h-full transition-all" style={{ width: `${Math.min(100, bundleStats.vitaminC)}%` }} />
                        </div>
                      </div>

                      {/* Calories */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-stone-300">
                          <span>Avg Calories Content</span>
                          <span className="font-bold text-white">{bundleStats.calories} kcal</span>
                        </div>
                        <div className="w-full bg-stone-900 h-1.5 rounded-none overflow-hidden">
                          <div className="bg-white h-full transition-all" style={{ width: `${Math.min(100, (bundleStats.calories / 160) * 100)}%` }} />
                        </div>
                      </div>

                      {/* Natural Sugars */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-stone-300">
                          <span>Avg Sugars Profile</span>
                          <span className="font-bold text-white">{bundleStats.naturalSugars}g</span>
                        </div>
                        <div className="w-full bg-stone-900 h-1.5 rounded-none overflow-hidden">
                          <div className="bg-amber-500 h-full transition-all" style={{ width: `${Math.min(100, (bundleStats.naturalSugars / 32) * 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add to cart block */}
                  <div className="pt-4 border-t border-white/5 space-y-3.5 mt-auto">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-mono uppercase text-stone-400">Box Special Pricing</span>
                      <span className="font-mono text-xl font-bold text-[#FF3E00]">₹{getBundlePrice().toFixed(0)}</span>
                    </div>

                    <button
                      disabled={totalSelectedInBundle !== bundleSize}
                      onClick={handleAddBundleToCart}
                      className="w-full bg-[#FF3E00] text-white font-mono font-bold py-3.5 px-4 rounded-none text-xs uppercase tracking-widest hover:bg-white hover:text-black disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        {totalSelectedInBundle === bundleSize 
                          ? 'Add Custom Box to Bag' 
                          : `Add ${bundleSize - totalSelectedInBundle} more to unlock`
                        }
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
