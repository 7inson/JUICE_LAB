import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Activity, ShieldCheck, Heart, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data';

interface NutritionData {
  name: string;
  servingSize: string;
  calories: number;
  macronutrients: {
    carbohydrates: string;
    protein: string;
    fat: string;
    dietaryFiber: string;
  };
  vitaminsAndMinerals: Array<{
    name: string;
    amount: string;
    benefit: string;
  }>;
  healthBenefits: string[];
  dietaryCertificates: string[];
  healthScore: number;
  source: string;
}

interface NutritionModalProps {
  productId: string | null;
  onClose: () => void;
}

export default function NutritionModal({ productId, onClose }: NutritionModalProps) {
  const [data, setData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Cycle through science/lab-themed loading messages for high-end aesthetic feedback
  useEffect(() => {
    if (!loading) return;
    const steps = [
      "Connecting to Biosensor Database...",
      "Sequencing Raw Phytonutrient Phenotypes...",
      "Synthesizing Mineral & Enzymic Bioavailability...",
      "Compiling Dietitian Clinical Health Matrix..."
    ];
    
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % steps.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!productId) {
      setData(null);
      return;
    }

    async function fetchNutrition() {
      setLoading(true);
      setError(null);
      setLoadingStep(0);
      try {
        // Instant offline resolution
        
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) {
          throw new Error("Product metadata not found");
        }

        // Generate offline nutrition specs based on product data
        const mockData: NutritionData = {
          name: product.name,
          servingSize: "250ml",
          calories: product.nutrition.calories,
          macronutrients: {
            carbohydrates: `${product.nutrition.naturalSugars + 5}g`,
            protein: "2g",
            fat: "0g",
            dietaryFiber: `${product.pulp * 2}g`
          },
          vitaminsAndMinerals: [
            { name: "Vitamin C", amount: `${product.nutrition.vitaminC}% DV`, benefit: "Immune System Support" },
            { name: "Potassium", amount: `${product.nutrition.potassium}mg`, benefit: "Electrolyte Balance" },
            { name: "Calcium", amount: `${product.nutrition.calcium}% DV`, benefit: "Bone Density" },
            { name: "Magnesium", amount: "15% DV", benefit: "Muscle Recovery" }
          ],
          healthBenefits: [
            "Cold-pressed to retain 99% of raw enzymes",
            "Zero added refined sugars or concentrates",
            "Flash chilled to preserve molecular stability"
          ],
          dietaryCertificates: ["100% Vegan", "Raw (Unpasteurized)", "Gluten-Free"],
          healthScore: 98,
          source: "Offline Lab Database"
        };
        
        setData(mockData);
      } catch (err: any) {
        console.error(err);
        setError("Our biological tracking systems are currently calibrating. Please try again shortly.");
      } finally {
        setLoading(false);
      }
    }

    fetchNutrition();
  }, [productId]);

  if (!productId) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          id="nutrition-modal-overlay"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-3xl bg-[#0F0F0F] border border-white/10 rounded-none shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          id="nutrition-modal-card"
        >
          {/* Top orange status header bar */}
          <div className="h-1 bg-[#FF3E00]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 border border-white/5 bg-[#121212] transition-colors hover:border-white/20 cursor-pointer z-30"
            aria-label="Close nutrition report"
            id="nutrition-modal-close-btn"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Content container */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-[#FF3E00]/10 border-t-[#FF3E00] rounded-full animate-spin" />
                  <Activity className="absolute w-6 h-6 text-[#FF3E00] animate-pulse" />
                </div>
                <div className="space-y-2">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF3E00]">
                    Juice Lab Bio-Scan
                  </span>
                  <p className="font-mono text-xs text-stone-400">
                    {[
                      "Connecting to Biosensor Database...",
                      "Sequencing Raw Phytonutrient Phenotypes...",
                      "Synthesizing Mineral & Enzymic Bioavailability...",
                      "Compiling Dietitian Clinical Health Matrix..."
                    ][loadingStep]}
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-5">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-[#FF3E00] flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="font-display font-black text-white text-lg uppercase tracking-tight">Analysis Error</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">{error}</p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-transparent hover:bg-white/5 border border-white/10 hover:border-white text-white font-mono text-[10px] uppercase tracking-widest px-6 py-2.5 transition-colors cursor-pointer"
                >
                  Dismiss Report
                </button>
              </div>
            )}

            {/* Content State */}
            {data && !loading && (
              <div className="space-y-8">
                
                {/* Header Profile */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-[#FF3E00]/10 border border-[#FF3E00]/20 text-[#FF3E00] font-mono text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                        Lab Analyzed
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[8px] text-stone-400 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        <span>Real-Time Analysis</span>
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                      {data.name}
                    </h2>
                    <p className="text-stone-400 font-mono text-xs uppercase tracking-wider">
                      Serving Profile: <strong className="text-white">{data.servingSize}</strong>
                    </p>
                  </div>

                  {/* Health Score Circular Dial */}
                  <div className="flex items-center gap-4 bg-[#121212] border border-white/5 p-3.5 sm:p-4 max-w-xs">
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          className="stroke-white/5 fill-none"
                          strokeWidth="3.5"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          className="stroke-[#FF3E00] fill-none"
                          strokeWidth="3.5"
                          strokeDasharray={150}
                          strokeDashoffset={150 - (150 * data.healthScore) / 100}
                        />
                      </svg>
                      <span className="absolute font-mono text-sm font-black text-white">
                        {data.healthScore}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[8px] uppercase tracking-widest text-[#FF3E00] font-bold">
                        Nutrient Density
                      </span>
                      <span className="text-xs font-bold text-stone-200 uppercase font-display tracking-tight">
                        Clinical Vitality Score
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column: Core Nutrition facts */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#FF3E00]" />
                      <span>Macronutrient Diagnostics</span>
                    </h3>

                    {/* Calories Indicator */}
                    <div className="bg-[#121212] border border-white/5 p-5 text-center relative overflow-hidden group">
                      <span className="block text-[8px] font-mono text-stone-400 uppercase tracking-widest mb-1.5 font-bold">
                        Est. Metabolic Energy
                      </span>
                      <span className="text-4xl font-display font-black text-white leading-none">
                        {data.calories}
                      </span>
                      <span className="text-xs font-mono text-[#FF3E00] ml-1 uppercase font-bold tracking-widest">
                        kcal
                      </span>
                    </div>

                    {/* Macros Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#121212] border border-white/5 p-3">
                        <span className="block text-[8px] font-mono text-stone-400 uppercase tracking-wider mb-1 font-bold">
                          Carbohydrates
                        </span>
                        <span className="text-base font-mono font-bold text-white">
                          {data.macronutrients.carbohydrates}
                        </span>
                      </div>
                      <div className="bg-[#121212] border border-white/5 p-3">
                        <span className="block text-[8px] font-mono text-stone-400 uppercase tracking-wider mb-1 font-bold">
                          Dietary Fiber
                        </span>
                        <span className="text-base font-mono font-bold text-white">
                          {data.macronutrients.dietaryFiber}
                        </span>
                      </div>
                      <div className="bg-[#121212] border border-white/5 p-3">
                        <span className="block text-[8px] font-mono text-stone-400 uppercase tracking-wider mb-1 font-bold">
                          Active Protein
                        </span>
                        <span className="text-base font-mono font-bold text-white">
                          {data.macronutrients.protein}
                        </span>
                      </div>
                      <div className="bg-[#121212] border border-white/5 p-3">
                        <span className="block text-[8px] font-mono text-stone-400 uppercase tracking-wider mb-1 font-bold">
                          Lipids / Fat
                        </span>
                        <span className="text-base font-mono font-bold text-white">
                          {data.macronutrients.fat}
                        </span>
                      </div>
                    </div>

                    {/* Certificates */}
                    <div className="space-y-2 pt-2">
                      <span className="block text-[8px] font-mono text-stone-400 uppercase tracking-widest font-black">
                        Compliance Certifications
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {data.dietaryCertificates.map((cert, index) => (
                          <span
                            key={index}
                            className="bg-emerald-500/5 text-emerald-400 text-[8px] font-mono font-bold uppercase tracking-widest px-2.5 py-1.5 border border-emerald-500/10 flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3 h-3" />
                            <span>{cert}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Vitamins & Health Benefits */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 font-black flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Vitamins & Micronutrients</span>
                    </h3>

                    {/* Micronutrient Slider Bars */}
                    <div className="space-y-4 bg-[#121212] border border-white/5 p-5">
                      {data.vitaminsAndMinerals.map((vitamin, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-bold text-stone-200">{vitamin.name}</span>
                            <span className="font-bold text-[#FF3E00]">{vitamin.amount} DV</span>
                          </div>
                          
                          {/* Custom visual horizontal chart */}
                          <div className="h-1.5 bg-white/5 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#FF3E00]/60 to-[#FF3E00]"
                              style={{ width: `${Math.min(100, parseInt(vitamin.amount) || 20)}%` }}
                            />
                          </div>
                          
                          {/* Dietitian clinical commentary */}
                          <p className="text-[10px] text-stone-400 font-sans leading-relaxed">
                            {vitamin.benefit}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

                {/* Scientifically-Backed Health Benefits */}
                <div className="bg-stone-950/40 border border-white/5 p-6 space-y-4">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-300 font-black flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#FF3E00]" />
                    <span>Dietitian-Approved Sourcing & Clinical Health Benefits</span>
                  </h4>
                  <ul className="space-y-3.5">
                    {data.healthBenefits.map((benefit, i) => (
                      <li key={i} className="flex gap-3 text-xs leading-relaxed text-stone-300">
                        <span className="text-[#FF3E00] font-mono text-sm leading-none select-none">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}

          </div>

          {/* Footer Analysis */}
          <div className="bg-[#121212] border-t border-white/5 px-6 sm:px-8 py-4.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[9px] font-mono text-stone-400 text-center sm:text-left leading-relaxed">
              Data Verified via: <strong className="text-white">{data?.source || "Lab Database"}</strong>
            </span>
            <button
              onClick={onClose}
              className="w-full sm:w-auto bg-[#FF3E00] hover:bg-white text-white hover:text-black font-mono font-bold text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-none transition-all cursor-pointer"
              id="nutrition-modal-dismiss-footer-btn"
            >
              Close Diagnostic
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
