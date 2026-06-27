import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Leaf, Shield, Award, HelpCircle, ArrowRight, Check, Compass, Heart, RotateCcw, Plus, ShoppingBag } from 'lucide-react';
import { QUIZ_QUESTIONS, PRODUCTS } from '../data';
import { JuiceProduct } from '../types';

interface OurStoryProps {
  onAddToCart: (product: JuiceProduct) => void;
  onOpenCart: () => void;
}

export default function OurStory({ onAddToCart, onOpenCart }: OurStoryProps) {
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

  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [scores, setScores] = useState<{ orange: number; mango: number; apple: number; berry: number }>({
    orange: 0,
    mango: 0,
    apple: 0,
    berry: 0
  });
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionSelect = (score: { orange?: number; mango?: number; apple?: number; berry?: number }) => {
    setScores(prev => ({
      orange: prev.orange + (score.orange || 0),
      mango: prev.mango + (score.mango || 0),
      apple: prev.apple + (score.apple || 0),
      berry: prev.berry + (score.berry || 0),
    }));

    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setScores({ orange: 0, mango: 0, apple: 0, berry: 0 });
    setCurrentQuestionIdx(0);
    setQuizFinished(false);
    setQuizStarted(false);
  };

  // Determine winning category and recommended product
  const getQuizResult = () => {
    const { orange, mango, apple, berry } = scores;
    let maxScore = Math.max(orange, mango, apple, berry);
    
    let winCat: 'orange' | 'mango' | 'apple' | 'berry' = 'orange';
    if (maxScore === mango) winCat = 'mango';
    else if (maxScore === apple) winCat = 'apple';
    else if (maxScore === berry) winCat = 'berry';

    // Find recommended product based on category
    let recProduct = PRODUCTS.find(p => p.id === 'florida-classic')!; // default
    let archetype = '';
    let bioDescription = '';

    if (winCat === 'orange') {
      recProduct = PRODUCTS.find(p => p.id === 'florida-classic') || PRODUCTS[0];
      archetype = 'The Citrus Energizer';
      bioDescription = 'You thrive on clean morning energy, immunities, and citrus brightness. Your body seeks instant electrolyte cellular activation and high Vitamin C levels.';
    } else if (winCat === 'mango') {
      recProduct = PRODUCTS.find(p => p.id === 'mango-nectar') || PRODUCTS[1];
      archetype = 'The Velvet Explorer';
      bioDescription = 'You love rich, full-bodied tropical profiles, luxurious natural sweetness, and digestive wellness. Your body craves vitamin A and skin-restorative antioxidants.';
    } else if (winCat === 'apple') {
      recProduct = PRODUCTS.find(p => p.id === 'verdant-glow') || PRODUCTS.find(p => p.id === 'orchard-apple') || PRODUCTS[2];
      archetype = 'The Alkaline Purist';
      bioDescription = 'You seek deep hydration, cellular cleansing, and crisp refreshing nutrients. Your body thrives on dark greens, apple enzymes, and organic detoxifiers.';
    } else if (winCat === 'berry') {
      recProduct = PRODUCTS.find(p => p.id === 'crimson-root') || PRODUCTS[4];
      archetype = 'The Crimson Warrior';
      bioDescription = 'You appreciate deep earthy berries, beet nitrites, and pre-workout oxygenating stamina. Your body responds heavily to wild antioxidants and organic root performance.';
    }

    return { winCat, recProduct, archetype, bioDescription };
  };

  const result = quizFinished ? getQuizResult() : null;

  const handleAddRecommendedToCart = () => {
    if (result && result.recProduct) {
      onAddToCart(result.recProduct);
      onOpenCart();
    }
  };

  return (
    <div className="space-y-16 pb-24">
      {/* 1. Page Header Editorial Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-5 pt-6">
        <span className="text-xs font-mono text-orange-600 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 animate-pulse" /> Squeezing Since 2018
        </span>
        <h1 className="font-serif font-semibold text-3xl sm:text-4.5xl lg:text-5xl tracking-tight text-[#705627] leading-tight">
          Born in Indore, India, <br />
          <span className="italic font-normal text-stone-500">Pressed for the World</span>
        </h1>
        <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans">
          Juice Lab started in a small Indore, India kitchen with one core belief: that nutrition should never be cooked, diluted, or compromised. Today, we still work with the same family farms, extracting living vitality using our hand-crafted cold press technology.
        </p>
      </section>

      {/* 2. Sourcing Commitments Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 space-y-3.5">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-base text-stone-950">Traceable Coordinates</h3>
            <p className="text-stone-500 text-xs leading-relaxed">
              Every single bottle carries a QR code tracing back to the specific Indore, India regenerative grove and harvest datetime index.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 space-y-3.5">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-base text-stone-950">Zero Pasteurized Heat</h3>
            <p className="text-stone-500 text-xs leading-relaxed">
              We never cook our liquids. We preserve organic enzymes and vitamins using clean cold rooms kept at strict 36°F.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 space-y-3.5">
            <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-display font-semibold text-base text-stone-950">Insulated Circular Flow</h3>
            <p className="text-stone-500 text-xs leading-relaxed">
              Our custom insulated box templates are made from 100% biodegradable cornstarch inserts, protecting both products and ecosystems.
            </p>
          </div>
        </div>
      </section>

      {/* 3. "FIND YOUR FUEL" INTERACTIVE FLAVOR QUIZ */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="bg-stone-50 border border-stone-200 rounded-[32px] overflow-hidden shadow-sm">
          {/* Welcome view */}
          {!quizStarted && (
            <div className="p-8 sm:p-12 text-center space-y-6">
              <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-[9px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full">
                Interactive Persona Matcher
              </span>
              <h2 className="font-display font-bold text-2xl text-stone-950">
                Find Your Fuel Quiz
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                Take our 1-minute diagnostic flavor quiz. Our smart algorithm matches your wellness targets and flavor preferences to recommend your optimal cold-pressed signature blend.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => setQuizStarted(true)}
                  className="bg-stone-950 hover:bg-orange-600 text-white font-semibold text-xs px-7 py-3 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Start Fuel Quiz
                </button>
              </div>
            </div>
          )}

          {/* Active Question view */}
          {quizStarted && !quizFinished && (
            <div className="p-8 sm:p-12 space-y-6">
              {/* Question progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-stone-400 uppercase font-bold">
                  <span>Sensation Quiz Progress</span>
                  <span>Question {currentQuestionIdx + 1} / {QUIZ_QUESTIONS.length}</span>
                </div>
                <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-orange-500 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-stone-950 pt-2">
                {QUIZ_QUESTIONS[currentQuestionIdx].question}
              </h3>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {QUIZ_QUESTIONS[currentQuestionIdx].options.map((option, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleOptionSelect(option.score)}
                    className="bg-white hover:bg-stone-100/55 border border-stone-200 rounded-xl p-4 text-left text-xs sm:text-sm text-stone-700 hover:text-stone-950 font-medium transition-all hover:border-orange-300 hover:shadow-sm flex items-center justify-between cursor-pointer"
                  >
                    <span>{option.text}</span>
                    <span className="text-[10px] font-mono text-stone-400 group-hover:text-orange-600">Select →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results SUCCESS Screen */}
          {quizFinished && result && (
            <div className="p-8 sm:p-12 space-y-6 relative">
              {/* Accent success elements */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
              
              <div className="text-center space-y-2 relative z-10">
                <span className="text-xs font-mono text-emerald-600 font-bold uppercase tracking-wider block">
                  Match Completed!
                </span>
                <h2 className="font-display font-bold text-2xl text-stone-950">
                  {result.archetype} Archetype
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                  {result.bioDescription}
                </p>
              </div>

              {/* Recommended Product Details Card */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-center relative z-10">
                <div className="w-24 h-32 relative flex items-center justify-center flex-shrink-0">
                  <div className="absolute inset-0 bg-stone-50 rounded-full blur-sm -z-10" />
                  <img
                    src={result.recProduct.image}
                    alt={result.recProduct.name}
                    referrerPolicy="no-referrer"
                    className={`max-h-full max-w-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.05)] ${getProductFilterClass(result.recProduct.colorTheme)}`}
                  />
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left min-w-0">
                  <span className="bg-orange-50 text-orange-700 border border-orange-100 font-mono text-[9px] uppercase tracking-wide px-2 py-0.5 rounded font-bold">
                    100% MATCH
                  </span>
                  <h4 className="font-display font-bold text-sm text-stone-950 truncate leading-snug">
                    {result.recProduct.name}
                  </h4>
                  <p className="text-stone-500 text-xs leading-relaxed max-w-sm">
                    {result.recProduct.description}
                  </p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-4 pt-1">
                    <span className="font-mono text-base font-bold text-stone-950">₹{result.recProduct.price.toFixed(0)}</span>
                    <button
                      onClick={handleAddRecommendedToCart}
                      className="bg-stone-950 hover:bg-orange-600 text-white font-semibold text-[11px] px-4.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Match to Bag</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Reset Quiz button */}
              <div className="text-center pt-2 relative z-10 border-t border-stone-200/60">
                <button
                  onClick={resetQuiz}
                  className="text-xs text-stone-400 hover:text-stone-700 hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Sensation Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
