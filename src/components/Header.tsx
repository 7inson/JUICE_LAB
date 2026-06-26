import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, User, Award, Flame, LogOut, Settings, Leaf, Coffee, ClipboardList } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  cart: CartItem[];
  onOpenCart: () => void;
}

export default function Header({ currentTab, onChangeTab, cart, onOpenCart }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'shop-all', label: 'Shop All' },
    { id: 'flavors', label: 'Flavors' },
    { id: 'journey', label: 'Journey' },
    { id: 'subscription', label: 'Subscription' },
    { id: 'our-story', label: 'Our Story' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onChangeTab('shop-all')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 bg-[#FF3E00] text-white flex items-center justify-center font-display font-black text-lg transition-colors">
            J
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-tighter text-white uppercase group-hover:text-[#FF3E00] transition-colors">Juice Lab</span>
            <span className="block text-[8px] font-mono tracking-[0.2em] text-[#FF3E00] uppercase leading-none font-bold">Cold Pressed</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#121212] p-1 border border-white/10">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onChangeTab(link.id)}
                className={`relative px-5 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  isActive ? 'text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-pill"
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="absolute inset-0 bg-[#FF3E00] border border-[#FF3E00]"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Widgets */}
        <div className="flex items-center gap-3 relative">
          {/* User Account Button */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 bg-[#121212] hover:bg-stone-800 text-stone-400 hover:text-white border border-white/5 hover:border-white/20 transition-all cursor-pointer"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10 cursor-default" 
                    onClick={() => setIsProfileOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-72 bg-[#121212] border border-white/10 p-4 z-20 text-[#F5F5F5]"
                  >
                    <div className="flex items-center gap-3 pb-3.5 border-b border-white/5">
                      <div className="w-11 h-11 bg-[#FF3E00] text-white flex items-center justify-center font-display font-black text-sm">
                        JD
                      </div>
                      <div>
                        <h4 className="text-sm font-display font-black uppercase tracking-tight text-white">John Doe</h4>
                        <span className="text-[9px] font-mono text-[#FF3E00] bg-[#FF3E00]/10 border border-[#FF3E00]/20 px-2 py-0.5 inline-block mt-1 font-bold uppercase tracking-wider">
                          VIP Sip Club Member
                        </span>
                      </div>
                    </div>

                    {/* Member Stats */}
                    <div className="grid grid-cols-2 gap-2 my-3.5">
                      <div className="bg-[#0A0A0A] border border-white/5 p-2.5 flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#FF3E00]" />
                        <div>
                          <span className="block text-[8px] font-mono text-stone-500 uppercase font-bold tracking-wider">Points</span>
                          <span className="text-xs font-mono font-bold text-white">420 pts</span>
                        </div>
                      </div>
                      <div className="bg-[#0A0A0A] border border-white/5 p-2.5 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-[#FF3E00]" />
                        <div>
                          <span className="block text-[8px] font-mono text-stone-500 uppercase font-bold tracking-wider">Streak</span>
                          <span className="text-xs font-mono font-bold text-white">3 weeks</span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="space-y-1">
                      <button 
                        onClick={() => { onChangeTab('subscription'); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs text-stone-300 hover:text-white hover:bg-stone-800 transition-all text-left cursor-pointer font-mono uppercase tracking-wider"
                      >
                        <Leaf className="w-4 h-4 text-stone-500" />
                        <span>Manage Subscription</span>
                      </button>
                      <button 
                        onClick={() => { onChangeTab('journey'); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs text-stone-300 hover:text-white hover:bg-stone-800 transition-all text-left cursor-pointer font-mono uppercase tracking-wider"
                      >
                        <ClipboardList className="w-4 h-4 text-stone-500" />
                        <span>Sourcing Journey</span>
                      </button>
                      <button 
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs text-stone-300 hover:text-white hover:bg-stone-800 transition-all text-left cursor-pointer font-mono uppercase tracking-wider"
                      >
                        <Settings className="w-4 h-4 text-stone-500" />
                        <span>Preferences</span>
                      </button>
                      <div className="h-px bg-white/5 my-2" />
                      <button 
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs text-[#FF3E00] hover:bg-[#FF3E00]/10 transition-all text-left cursor-pointer font-mono font-bold uppercase tracking-wider"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#FF3E00] hover:bg-[#FF3E00]/90 text-white px-3 py-2 lg:pl-4 lg:pr-5 lg:py-2.5 transition-all group select-none cursor-pointer border border-[#FF3E00]"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline text-xs font-mono font-bold tracking-widest uppercase">Bag</span>
            <span className="w-5 h-5 bg-white/20 rounded-none flex items-center justify-center text-[10px] font-mono font-bold">
              {cartItemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav indicator bar */}
      <div className="lg:hidden flex flex-wrap justify-center gap-2 py-2 mt-3 pt-3 border-t border-white/10 bg-[#0C0C0C]">
        {navLinks.map((link) => {
          const isActive = currentTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onChangeTab(link.id)}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                isActive ? 'bg-[#FF3E00] text-white' : 'bg-[#121212] text-stone-400 border border-white/5 hover:bg-stone-800'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
