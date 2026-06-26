import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, MapPin, Sparkles, HelpCircle, ArrowRight, ShieldCheck, Check, Droplet, Layers, X, Info } from 'lucide-react';
import { TIMELINE_STEPS } from '../data';

export default function Journey() {
  const [selectedStep, setSelectedStep] = useState<string>('step-1');
  const [isPressModalOpen, setIsPressModalOpen] = useState(false);
  const [hoveredMapPin, setHoveredMapPin] = useState(false);

  return (
    <div className="space-y-16 pb-24">
      {/* 1. Page Header Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-stone-100 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/95 to-transparent z-0" />
          <div className="absolute right-0 bottom-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-pulse-glow" />

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" /> Radial Sourcing Transparency
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
              From Soil to Sip: <br />Our Sourcing Journey
            </h1>
            <p className="text-stone-300 text-sm leading-relaxed max-w-md font-sans">
              We believe in uncompromised trace-integrity. We map and inspect every single organic orchard, brix level, and cold-pressed interval to bring you pure, raw cellular nourishment.
            </p>
          </div>

          <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-5 max-w-xs text-left">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">Our Promise</span>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              "We never green-harvest. Every single fruit is tree-ripened and hydraulic-pressed within four hours of arrival."
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Timeline Steps */}
      <section className="max-w-5xl mx-auto px-6 relative">
        {/* Continuous Line (Desktop) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-stone-200 hidden md:block" />

        <div className="space-y-16">
          {TIMELINE_STEPS.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            const stepId = step.id;
            
            return (
              <div 
                key={step.id} 
                className={`relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline center bubble indicator */}
                <div className="absolute left-1/2 -translate-x-1/2 w-9 h-9 bg-stone-900 border-4 border-stone-50 rounded-full flex items-center justify-center text-white text-xs font-mono font-bold z-10 hidden md:flex">
                  {step.stepNumber}
                </div>

                {/* Left Card: Content */}
                <div className="flex-1 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-orange-600 font-bold uppercase tracking-wider block">
                      Step {step.stepNumber} — {step.subtitle}
                    </span>
                    <h3 className="font-display font-semibold text-xl sm:text-2xl text-stone-950">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Badges list */}
                  {step.badges && (
                    <div className="flex flex-wrap gap-2">
                      {step.badges.map((b, i) => (
                        <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-mono text-[9px] uppercase tracking-wide px-2.5 py-0.5 rounded-full font-bold">
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Details Bullet points */}
                  {step.details && (
                    <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/50 space-y-2">
                      <h4 className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-semibold">Protocols</h4>
                      <ul className="space-y-1.5">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-xs text-stone-600 flex items-start gap-2 leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Trigger button */}
                  {step.actionLabel && (
                    <div className="pt-2">
                      <button
                        onClick={() => setIsPressModalOpen(true)}
                        className="bg-stone-900 hover:bg-orange-600 text-white font-semibold text-xs pl-4 pr-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{step.actionLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Card: Dynamic Media / Map View */}
                <div className="flex-1 w-full max-w-md relative">
                  {stepId === 'step-2' ? (
                    /* Interactive Map Widget for Step 2 */
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden p-4 space-y-4 shadow-sm">
                      <div className="flex justify-between items-center pb-2 border-b border-stone-200/60">
                        <div>
                          <span className="block text-[8px] font-mono text-stone-400 uppercase leading-none">Harvest Location</span>
                          <span className="text-xs font-bold text-stone-900 mt-1 block flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-orange-500 animate-bounce" /> {step.location}
                          </span>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border border-emerald-100">
                          Active Harvest Area
                        </span>
                      </div>

                      {/* Map Image container with pulsating marker */}
                      <div className="relative rounded-lg overflow-hidden border border-stone-200 aspect-[4/3] bg-stone-100">
                        <img
                          src={step.locationPinImg}
                          alt="Indore Harvest Map"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter brightness-105"
                        />
                        {/* Map pinpoint overlay with pulsating beacon */}
                        <div 
                          onMouseEnter={() => setHoveredMapPin(true)}
                          onMouseLeave={() => setHoveredMapPin(false)}
                          style={{ left: `${step.latLng?.x || 42}%`, top: `${step.latLng?.y || 55}%` }}
                          className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                        >
                          <span className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75" />
                          <span className="absolute inset-1 bg-orange-600 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-[8px]" />
                          
                          {/* Mini Map Pin Popover details */}
                          <div className={`absolute left-7 top-0 bg-white border border-stone-200 rounded-lg p-2.5 w-44 shadow-lg text-left transition-all duration-300 z-20 ${
                            hoveredMapPin ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-2 pointer-events-none'
                          }`}>
                            <h5 className="text-[10px] font-mono text-stone-400 uppercase leading-none">Central Valley CA</h5>
                            <span className="text-[11px] font-bold text-stone-900 block mt-1 leading-tight">Sunkist Heirloom Oranges</span>
                            <p className="text-[10px] text-stone-500 mt-1 leading-relaxed">
                              Soil mineral index of 9.2, optimal rain replenishment ratio.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Image under the map */}
                      <div className="relative h-32 rounded-lg overflow-hidden border border-stone-150">
                        <img
                          src={step.image}
                          alt={step.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex items-end p-3">
                          <p className="text-[10px] text-stone-100 leading-snug">Hand picking Cara Cara oranges at dawn.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Simple Image block for Step 1 and 3 */
                    <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm aspect-[4/3] group">
                      <img
                        src={step.image}
                        alt={step.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Caption */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur border border-stone-250 p-3 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-mono text-stone-400 uppercase block">Verification</span>
                          <span className="text-[11px] font-bold text-stone-900 flex items-center gap-1 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Sourced Organic Standard
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-stone-400 uppercase">Step {step.stepNumber}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. RADICAL COLD PRESS DRAWERS DIALOG MODAL */}
      <AnimatePresence>
        {isPressModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPressModalOpen(false)}
              className="fixed inset-0 bg-stone-950 z-50 cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed inset-x-4 bottom-4 top-4 md:inset-x-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:max-w-xl w-full bg-white rounded-3xl shadow-2xl z-50 border border-stone-200 overflow-hidden flex flex-col"
            >
              <div className="bg-stone-50 p-5 border-b border-stone-200 flex justify-between items-center">
                <div>
                  <h3 className="font-display font-bold text-lg text-stone-900 flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-orange-500 animate-pulse" />
                    <span>Hydraulic Cold Press Technology</span>
                  </h3>
                  <p className="text-xs text-stone-500">Comparing hydraulic extraction with traditional centrifugal blade juicing.</p>
                </div>
                <button
                  onClick={() => setIsPressModalOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal scroll contents */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
                <p className="text-stone-600 leading-relaxed text-xs">
                  Most grocery store juices are produced with <strong>Centrifugal Juicers</strong>. These use high-speed spinning blades that generate massive friction and heat. That heat cooks and oxidizes the liquid, killing essential digestive enzymes and rapidly degrading flavor profiles.
                </p>

                {/* Comparison Grid Table */}
                <div className="border border-stone-200 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-3 bg-stone-100/80 text-[10px] font-mono text-stone-500 uppercase tracking-wider p-2.5 border-b border-stone-200 font-bold">
                    <span>Parameter</span>
                    <span className="text-orange-600">Juice Lab Hydraulic</span>
                    <span>Centrifugal Blade</span>
                  </div>
                  <div className="divide-y divide-stone-150 text-xs text-stone-700">
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-semibold">Friction Heat</span>
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">Zero Heat (36°F)</span>
                      <span>Degrading (up to 120°F)</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-semibold">Oxidation Level</span>
                      <span className="text-emerald-600 font-semibold">Zero Oxidation</span>
                      <span>High (rapid browning)</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-semibold">Active Enzymes</span>
                      <span className="text-emerald-600 font-semibold">100% Fully Alive</span>
                      <span>Killed during spinning</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-semibold">Shelf Life</span>
                      <span className="text-emerald-600 font-semibold">Up to 17 Days</span>
                      <span>24-48 Hours only</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5">
                      <span className="font-semibold">Yield & Texture</span>
                      <span className="text-emerald-600 font-semibold">Silky, Micro-Filtered</span>
                      <span>Foamy, separated pulp</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex gap-3 text-xs text-orange-850">
                  <Info className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="font-bold">What is Cold Pasteurized (HPP)?</h5>
                    <p className="leading-relaxed text-stone-600 text-[11px]">
                      We never use chemical preservatives. High-Pressure Processing (HPP) protects shelf life by applying intense water pressure, not heat. This eliminates pathogens while leaving original enzymes and vitamins completely intact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setIsPressModalOpen(false)}
                  className="bg-stone-900 text-white font-semibold text-xs px-5 py-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
