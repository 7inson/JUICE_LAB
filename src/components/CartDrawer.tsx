import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, CheckCircle2, Truck, Tag, ArrowRight, CreditCard, MapPin, Inbox } from 'lucide-react';
import { CartItem, JuiceProduct } from '../types';
import { PRODUCTS } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  onOpenCheckoutSuccess: (orderId: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  onOpenCheckoutSuccess
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  
  // Shipping Form State
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });
  
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

  // Card Form State
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate prices
  const itemsSubtotal = cart.reduce((acc, item) => {
    if (item.isBundle && item.bundlePrice) {
      return acc + (item.bundlePrice * item.quantity);
    } else if (item.product) {
      return acc + (item.product.price * item.quantity);
    }
    return acc;
  }, 0);

  // Shipping logic (₹500 free shipping threshold)
  const shippingThreshold = 500;
  const isFreeShipping = itemsSubtotal >= shippingThreshold || itemsSubtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 50.00;

  // Discount calculation
  const discountAmount = appliedDiscount ? (itemsSubtotal * (appliedDiscount.percent / 100)) : 0;
  const totalCost = Math.max(0, itemsSubtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = promoCode.toUpperCase().trim();
    if (normalized === 'COLDPRESSED10') {
      setAppliedDiscount({ code: 'COLDPRESSED10', percent: 10 });
      setPromoCode('');
    } else if (normalized === 'FRESH30') {
      setAppliedDiscount({ code: 'FRESH30', percent: 30 });
      setPromoCode('');
    } else {
      alert('Invalid promo code! Try "COLDPRESSED10" for 10% off.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedDiscount(null);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.fullName || !shippingForm.email || !shippingForm.address || !shippingForm.city || !shippingForm.zipCode) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardForm.cardNumber || !cardForm.expiry || !cardForm.cvv) {
      alert('Please fill out card details.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = `JL-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      setCheckoutStep('cart');
      setAppliedDiscount(null);
      setShippingForm({ fullName: '', email: '', address: '', city: '', zipCode: '', phone: '' });
      setCardForm({ cardNumber: '', expiry: '', cvv: '' });
      onClose();
      onOpenCheckoutSuccess(generatedOrderId);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900 z-50 cursor-pointer"
          />

          {/* Cart Panel */}
          <motion.div
            id="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col h-full border-l border-stone-200"
          >
            {/* Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-display font-semibold tracking-tight text-stone-900">
                  {checkoutStep === 'cart' && 'Your Cart'}
                  {checkoutStep === 'shipping' && 'Shipping Details'}
                  {checkoutStep === 'payment' && 'Secure Checkout'}
                </h2>
                <span className="bg-stone-200 text-stone-700 text-xs px-2 py-0.5 rounded-full font-mono">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper for checkout */}
            {cart.length > 0 && (
              <div className="grid grid-cols-3 text-center border-b border-stone-100 bg-stone-50/50">
                <button
                  disabled={checkoutStep === 'cart'}
                  onClick={() => setCheckoutStep('cart')}
                  className={`py-2 text-xs font-mono border-b-2 transition-all ${
                    checkoutStep === 'cart'
                      ? 'border-orange-500 text-orange-600 font-semibold'
                      : 'border-transparent text-stone-400 hover:text-stone-600'
                  }`}
                >
                  01. Review Cart
                </button>
                <button
                  disabled={checkoutStep === 'cart' || checkoutStep === 'shipping'}
                  onClick={() => setCheckoutStep('shipping')}
                  className={`py-2 text-xs font-mono border-b-2 transition-all ${
                    checkoutStep === 'shipping'
                      ? 'border-orange-500 text-orange-600 font-semibold'
                      : 'border-transparent text-stone-400 hover:text-stone-600'
                  }`}
                >
                  02. Shipping
                </button>
                <div
                  className={`py-2 text-xs font-mono border-b-2 ${
                    checkoutStep === 'payment'
                      ? 'border-orange-500 text-orange-600 font-semibold'
                      : 'border-transparent text-stone-400'
                  }`}
                >
                  03. Payment
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-300 mb-4 border border-stone-100">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-display font-medium text-stone-800 mb-1">Your cart is empty</h3>
                  <p className="text-sm text-stone-500 mb-6 max-w-[240px]">
                    Explore our pure cold-pressed flavors to energize your body!
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-stone-900 text-white font-medium px-6 py-2.5 rounded-full text-sm hover:bg-orange-600 transition-colors shadow-sm cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* STEP 1: CART ITEMS */}
                  {checkoutStep === 'cart' && (
                    <div className="space-y-4">
                      {/* Shipping progress */}
                      <div className="bg-orange-50/50 border border-orange-100/50 rounded-xl p-3.5 mb-2">
                        {isFreeShipping ? (
                          <div className="flex items-center gap-2 text-xs text-orange-800 font-medium">
                            <Truck className="w-4 h-4 text-orange-600 animate-bounce" />
                            <span>Congratulations! You unlocked <strong>Free Insulated Shipping</strong>!</span>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-stone-700">
                              <span className="flex items-center gap-1.5">
                                <Truck className="w-3.5 h-3.5 text-stone-400" />
                                Add <strong className="text-orange-600">₹{(shippingThreshold - itemsSubtotal).toFixed(2)}</strong> for free shipping!
                              </span>
                              <span className="font-mono text-stone-500">₹{itemsSubtotal.toFixed(2)} / ₹500</span>
                            </div>
                            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-orange-500 h-full transition-all duration-500"
                                style={{ width: `${Math.min(100, (itemsSubtotal / shippingThreshold) * 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Items list */}
                      <div className="divide-y divide-stone-100">
                        {cart.map((item) => {
                          const isBundle = item.isBundle;
                          const name = isBundle ? item.bundleName : item.product?.name;
                          const tagline = isBundle ? 'Customized multi-flavor blend' : item.product?.tagline;
                          const price = isBundle ? item.bundlePrice : item.product?.price;
                          const image = isBundle 
                            ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFfuNanH1k-fM7TeVO9YjiDV838Yy2TFnmbwbC48lOo3W3SsEd6Zj915jVzIOsQJZbJf717g85q6yTo_eKGuQoLovgpJNVNGyGSYGehGq0FPeJ7nQ6_zOJIT0IGmvjC0d4yjd0HK-dCk4O7-Q6nHUr-mdkhZFb2w_JLDiWVv0Y08U8xSzf6kwWGwUpGx6PiIOMP5FTkMAkPbX6CriMsNW3C1Vsa4CdEt0HWiA7jjnERH_IMvOtB2WS-15ZPdmgk-Hvvv_r13SQdp8'
                            : item.product?.image;

                          return (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="py-4 flex gap-4 items-start"
                            >
                              <img
                                src={image}
                                alt={name}
                                referrerPolicy="no-referrer"
                                className={`w-16 h-16 object-contain bg-stone-50 rounded-lg border border-stone-100 flex-shrink-0 mix-blend-multiply ${!isBundle && item.product ? getProductFilterClass(item.product.colorTheme) : ''}`}
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display font-medium text-sm text-stone-900 truncate leading-snug">
                                  {name}
                                </h4>
                                <p className="text-xs text-stone-400 truncate mb-2">{tagline}</p>
                                
                                {isBundle && item.bundleBottles && (
                                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                                    {Object.entries(item.bundleBottles).map(([pId, qty]) => {
                                      const p = PRODUCTS.find(prod => prod.id === pId);
                                      if (!p || qty === 0) return null;
                                      return (
                                        <span key={pId} className="inline-flex items-center bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded text-[10px] font-mono">
                                          {qty}x {p.name.split(' ')[1] || p.name}
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}

                                <div className="flex items-center justify-between">
                                  {/* Quantity controls */}
                                  <div className="flex items-center border border-stone-200 rounded-full bg-white px-1.5 py-0.5">
                                    <button
                                      onClick={() => updateQuantity(item.id, -1)}
                                      className="p-1 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="w-7 text-center font-mono text-xs text-stone-800 font-semibold">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="p-1 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm font-semibold text-stone-800">
                                      ₹{((price || 0) * item.quantity).toFixed(2)}
                                    </span>
                                    <button
                                      onClick={() => removeFromCart(item.id)}
                                      className="p-1 text-stone-300 hover:text-rose-500 rounded transition-colors cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Promo Section */}
                      <div className="pt-4 border-t border-stone-100">
                        {appliedDiscount ? (
                          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                            <div className="flex items-center gap-2 text-emerald-800 text-xs">
                              <Tag className="w-4 h-4 text-emerald-600" />
                              <span>Applied Code: <strong className="font-mono">{appliedDiscount.code}</strong> (<strong>{appliedDiscount.percent}% OFF</strong>)</span>
                            </div>
                            <button
                              onClick={handleRemovePromo}
                              className="text-xs text-stone-400 hover:text-stone-600 underline font-mono cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleApplyPromo} className="flex gap-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="PROMO CODE (Try: COLDPRESSED10)"
                              className="flex-1 bg-stone-50 hover:bg-stone-100/50 focus:bg-white text-xs border border-stone-200 rounded-lg px-3 py-2 uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500/25 transition-all"
                            />
                            <button
                              type="submit"
                              className="bg-stone-900 text-white font-medium px-4 py-2 text-xs rounded-lg hover:bg-orange-600 transition-colors shadow-sm cursor-pointer"
                            >
                              Apply
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: SHIPPING FORM */}
                  {checkoutStep === 'shipping' && (
                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <h4 className="text-sm font-display font-medium text-stone-800 flex items-center gap-1.5 pb-1 border-b border-stone-100">
                        <MapPin className="w-4 h-4 text-stone-400" /> Shipping Destination
                      </h4>
                      <div className="space-y-3.5">
                        <div>
                          <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={shippingForm.fullName}
                            onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                            placeholder="John Doe"
                            className="w-full text-sm bg-stone-50 focus:bg-white border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={shippingForm.email}
                            onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full text-sm bg-stone-50 focus:bg-white border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1">Delivery Address *</label>
                          <input
                            type="text"
                            required
                            value={shippingForm.address}
                            onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                            placeholder="123 Organic Lane"
                            className="w-full text-sm bg-stone-50 focus:bg-white border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1">City *</label>
                            <input
                              type="text"
                              required
                              value={shippingForm.city}
                              onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                              placeholder="Indore"
                              className="w-full text-sm bg-stone-50 focus:bg-white border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1">Zip Code *</label>
                            <input
                              type="text"
                              required
                              value={shippingForm.zipCode}
                              onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                              placeholder="90001"
                              className="w-full text-sm bg-stone-50 focus:bg-white border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1">Phone (Optional)</label>
                          <input
                            type="text"
                            value={shippingForm.phone}
                            onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                            placeholder="(555) 000-0000"
                            className="w-full text-sm bg-stone-50 focus:bg-white border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                          />
                        </div>
                      </div>
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full bg-stone-900 text-white font-medium py-3 px-4 rounded-xl text-sm hover:bg-orange-600 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Proceed to Payment</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 3: SECURE PAYMENT */}
                  {checkoutStep === 'payment' && (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <h4 className="text-sm font-display font-medium text-stone-800 flex items-center gap-1.5 pb-1 border-b border-stone-100">
                        <CreditCard className="w-4 h-4 text-stone-400" /> Payment Card Info
                      </h4>
                      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col gap-3.5 shadow-inner">
                        <div className="flex justify-between items-center pb-2 border-b border-stone-200/50">
                          <span className="text-xs text-stone-500 font-mono">Juice Lab Merchant Gateway</span>
                          <div className="flex gap-1.5">
                            <span className="w-7 h-4 bg-stone-300 rounded text-[8px] font-bold text-stone-600 flex items-center justify-center">VISA</span>
                            <span className="w-7 h-4 bg-stone-300 rounded text-[8px] font-bold text-stone-600 flex items-center justify-center">MC</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1">Card Number *</label>
                          <input
                            type="text"
                            required
                            maxLength={19}
                            value={cardForm.cardNumber}
                            onChange={(e) => {
                              // format with spaces
                              const v = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                              setCardForm({ ...cardForm, cardNumber: v });
                            }}
                            placeholder="4000 1234 5678 9010"
                            className="w-full text-sm bg-white border border-stone-200 rounded-lg px-3 py-2 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1">Expiry (MM/YY) *</label>
                            <input
                              type="text"
                              required
                              maxLength={5}
                              value={cardForm.expiry}
                              onChange={(e) => {
                                let v = e.target.value;
                                if (v.length === 2 && !v.includes('/')) {
                                  v = v + '/';
                                }
                                setCardForm({ ...cardForm, expiry: v });
                              }}
                              placeholder="12/28"
                              className="w-full text-sm bg-white border border-stone-200 rounded-lg px-3 py-2 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-stone-500 uppercase mb-1">CVV *</label>
                            <input
                              type="password"
                              required
                              maxLength={4}
                              value={cardForm.cvv}
                              onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '') })}
                              placeholder="***"
                              className="w-full text-sm bg-white border border-stone-200 rounded-lg px-3 py-2 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/50 flex items-start gap-2 text-xs text-stone-500 leading-normal">
                        <Inbox className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>Receipt and custom cold-pressed guidelines will be emailed immediately to <strong>{shippingForm.email || 'your address'}</strong>.</span>
                      </div>

                      <div className="pt-4 space-y-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-stone-900 text-white font-medium py-3.5 px-4 rounded-xl text-sm hover:bg-orange-600 transition-colors shadow-md flex items-center justify-center gap-2 disabled:bg-stone-400 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Verifying Payment...
                            </span>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-amber-300" />
                              <span>Authorize & Pay ₹{totalCost.toFixed(2)}</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setCheckoutStep('shipping')}
                          className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs font-mono transition-colors cursor-pointer"
                        >
                          ← Back to Shipping
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>

            {/* Footer Summary (Sticky) */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-stone-200 bg-stone-50/50 space-y-4">
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-mono text-stone-800 font-medium">₹{itemsSubtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Discount ({appliedDiscount.percent}%)</span>
                      <span className="font-mono font-medium">-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Priority Shipping</span>
                    <span className="font-mono text-stone-800 font-medium">
                      {shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="h-px bg-stone-200 my-1" />
                  <div className="flex justify-between text-base font-display font-semibold text-stone-900">
                    <span>Estimated Total</span>
                    <span className="font-mono text-lg text-orange-600">₹{totalCost.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' && (
                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full bg-stone-900 text-white font-medium py-3.5 px-4 rounded-xl text-sm hover:bg-orange-600 transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Proceed to Shipping</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
