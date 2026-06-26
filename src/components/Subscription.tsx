import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Truck, ArrowRight, ShieldCheck, HelpCircle, Flame, Calculator, Sliders, AlertCircle, ShoppingBag } from 'lucide-react';
import { SUBSCRIPTION_PLANS, SUBSCRIPTION_BOX_IMAGE } from '../data';
import { SubscriptionPlan } from '../types';

interface SubscriptionProps {
  onAddSubscriptionToCart: (plan: SubscriptionPlan) => void;
  onOpenCart: () => void;
}

export default function Subscription({ onAddSubscriptionToCart, onOpenCart }: SubscriptionProps) {
  // Sliders State for Savings Calculator
  const [weeklyConsum, setWeeklyConsum] = useState<number>(5); // 5 juices per week typical
  const [averagePrice, setAveragePrice] = useState<number>(250); // average juice bar price in INR

  // State to track if user added a subscription
  const [addedPlanId, setAddedPlanId] = useState<string | null>(null);

  // Math for Savings Calculator
  const retailWeeklyCost = weeklyConsum * averagePrice;
  const retailAnnualCost = retailWeeklyCost * 52;

  // Juice Lab cost (approximate bottle rate in standard plan, e.g. ₹180 per bottle instead of typical juice bar)
  const juiceLabBottleRate = 180; // Discounted base bottle rate
  const juiceLabWeeklyCost = weeklyConsum * juiceLabBottleRate * 0.85; // with 15% subscription discount
  const juiceLabAnnualCost = juiceLabWeeklyCost * 52;

  const annualSavings = Math.max(0, retailAnnualCost - juiceLabAnnualCost);
  const percentSaved = Math.round((annualSavings / retailAnnualCost) * 100) || 0;

  const handleSubscribe = (plan: SubscriptionPlan) => {
    onAddSubscriptionToCart(plan);
    setAddedPlanId(plan.id);
    setTimeout(() => {
      setAddedPlanId(null);
      onOpenCart();
    }, 1800);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* 1. Page Header Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-stone-100 p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Overlay glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/95 to-transparent z-0" />
          <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse-glow" />

          {/* Left Text content */}
          <div className="relative z-10 max-w-xl space-y-6 flex-1">
            <span className="inline-flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/20 text-orange-400 text-xs px-3.5 py-1 rounded-full font-mono uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Never Run Dry
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-white leading-none">
              Fuel Your Flow.<br />Delivered Fresh.
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-md font-sans">
              Join the Juice Lab subscription collective. Establish a regular routine of cold-pressed, enzyme-alive fuel delivered straight to your doorstep on your preferred rhythm.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#choose-plan"
                className="bg-orange-500 hover:bg-orange-600 text-stone-950 hover:text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-orange-500/10 flex items-center gap-2"
              >
                <span>View Delivery Plans</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#savings-calculator"
                className="bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700/60 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all"
              >
                Calculate Savings
              </a>
            </div>
          </div>

          {/* Right image box with floating shipping badge */}
          <div className="relative z-10 flex-1 max-w-md lg:max-w-lg w-full flex justify-center lg:justify-end">
            <div className="relative rounded-2xl overflow-hidden max-h-[340px] aspect-[4/3] group border border-stone-800 shadow-2xl">
              <img
                src={SUBSCRIPTION_BOX_IMAGE}
                alt="Juice Lab subscription delivery box"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 filter brightness-95"
              />
              {/* Floating Free Priority Shipping badge */}
              <div className="absolute top-4 right-4 bg-orange-500 text-stone-950 font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg border border-orange-400">
                Free Priority Shipping
              </div>
              {/* Floating bottom label */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-950/80 backdrop-blur border border-stone-800 p-3 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-400">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[8px] font-mono text-stone-400 uppercase leading-none">Shipment Logistics</span>
                  <span className="text-xs font-bold text-white mt-1 block">Insulated thermal crates & gel packs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Choose Your Rhythm Section */}
      <section id="choose-plan" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-mono text-orange-600 uppercase tracking-widest font-semibold">Flexible Options</span>
          <h2 className="text-3xl font-display font-semibold tracking-tight text-stone-900">
            Choose Your Rhythm
          </h2>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Choose the delivery frequency and pack volume that fits your health routine. Modify, pause, or cancel with one click.
          </p>
        </div>

        {/* 3 plans row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isPopular = plan.isPopular;
            const isAddingThis = addedPlanId === plan.id;
            
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl border p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular 
                    ? 'border-2 border-orange-500 shadow-xl lg:-translate-y-2 ring-4 ring-orange-500/10' 
                    : 'border-stone-200 hover:border-stone-400 hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-0 right-8 bg-orange-500 text-stone-950 font-mono text-[9px] uppercase tracking-wider font-bold px-4.5 py-1.5 rounded-b-xl shadow">
                    {plan.badge}
                  </div>
                )}

                {/* Card Top */}
                <div className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl text-stone-900">{plan.name}</h3>
                    <span className="inline-block text-[10px] font-mono text-stone-400 uppercase font-bold tracking-wider">
                      {plan.bottles} Bottles every {plan.interval === 'weekly' ? 'week' : '2 weeks'}
                    </span>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="font-mono text-3xl font-extrabold text-stone-900">₹{plan.price}</span>
                    <span className="text-stone-400 text-xs font-mono">/ delivery</span>
                  </div>

                  {/* Savings block */}
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100/50 rounded-xl px-3 py-2 flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Subscription Savings
                    </span>
                    <strong className="text-emerald-700 font-bold">{plan.savings}% Discount applied</strong>
                  </div>

                  <div className="h-px bg-stone-100 my-2" />

                  {/* Benefits bullet items */}
                  <ul className="space-y-3">
                    {plan.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="text-xs text-stone-600 flex items-start gap-2.5 leading-snug">
                        <span className="w-4.5 h-4.5 rounded-full bg-stone-100 text-stone-700 flex-shrink-0 flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscribe Button */}
                <div className="pt-8">
                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={isAddingThis}
                    className={`w-full font-bold text-xs py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular 
                        ? 'bg-orange-500 text-stone-950 hover:bg-stone-900 hover:text-white' 
                        : 'bg-stone-950 text-white hover:bg-orange-600'
                    }`}
                  >
                    {isAddingThis ? (
                      <span className="flex items-center gap-1.5 font-semibold">
                        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Adding Subscription...
                      </span>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Subscribe to {plan.name.split(' ')[1] || plan.name}</span>
                      </>
                    )}
                  </button>
                  <span className="block text-[9px] font-mono text-stone-400 text-center mt-2 uppercase tracking-wide">
                    Pause, swap, or cancel anytime before delivery
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CALCULATE YOUR SAVINGS INTERACTIVE CALCULATOR */}
      <section id="savings-calculator" className="max-w-4xl mx-auto px-6 scroll-mt-24">
        <div className="bg-stone-50 border border-stone-200 rounded-[32px] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* subtle background overlays */}
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-orange-100 rounded-full blur-2xl opacity-40 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left side sliders controls (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-orange-600 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" /> Financial Diagnostics
                </span>
                <h3 className="font-display font-semibold text-xl text-stone-900 tracking-tight">
                  Calculate Your Savings
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed max-w-sm">
                  Cold-pressed juices from local high-end juice bars cost up to ₹350 per serving. Toggle your current habits to evaluate your annualized savings with our subscription pricing.
                </p>
              </div>

              {/* Slider 1: Bottles consumed per week */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-700">Weekly Juice Consumption</span>
                  <span className="font-mono text-orange-600 bg-orange-50 border border-orange-100 rounded px-2 py-0.5">
                    {weeklyConsum} Servings / week
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={weeklyConsum}
                  onChange={(e) => setWeeklyConsum(Number(e.target.value))}
                  className="w-full accent-orange-500 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-stone-400">
                  <span>1 serving (occasional)</span>
                  <span>10 servings (heavy)</span>
                  <span>20 servings (expert)</span>
                </div>
              </div>

              {/* Slider 2: Average price paid in bars */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-700">Average Store/Cafe Price</span>
                  <span className="font-mono text-orange-600 bg-orange-50 border border-orange-100 rounded px-2 py-0.5">
                    ₹{averagePrice.toFixed(0)} / bottle
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={450}
                  step={10}
                  value={averagePrice}
                  onChange={(e) => setAveragePrice(Number(e.target.value))}
                  className="w-full accent-orange-500 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-stone-400">
                  <span>₹100</span>
                  <span>₹275</span>
                  <span>₹450</span>
                </div>
              </div>
            </div>

            {/* Right side outputs (5 cols) */}
            <div className="md:col-span-5 bg-stone-900 text-stone-100 rounded-2xl p-5 border border-stone-800 flex flex-col justify-between space-y-6 text-center">
              <div className="space-y-4">
                <span className="block text-[9px] font-mono text-stone-400 uppercase tracking-widest leading-none">Your Annual Diagnostics</span>
                
                <div className="space-y-1 pt-1">
                  <span className="block text-3xl font-mono font-extrabold text-orange-400">
                    ₹{annualSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs font-semibold text-white block">Annualized Savings Yield</span>
                </div>

                <div className="h-px bg-stone-800" />

                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="bg-stone-800/40 p-2.5 rounded border border-stone-800 text-center">
                    <span className="block text-[8px] font-mono text-stone-400 uppercase">Bar Spending</span>
                    <span className="text-xs font-mono font-bold text-stone-200 mt-1 block">₹{retailAnnualCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="bg-stone-800/40 p-2.5 rounded border border-stone-800 text-center">
                    <span className="block text-[8px] font-mono text-stone-400 uppercase">Juice Lab Cost</span>
                    <span className="text-xs font-mono font-bold text-stone-200 mt-1 block">₹{juiceLabAnnualCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {/* Micro badge output */}
              <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg p-2.5 text-xs font-medium font-mono leading-snug">
                🎉 Save <strong>{percentSaved}%</strong> of your juice expenditures this year!
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
