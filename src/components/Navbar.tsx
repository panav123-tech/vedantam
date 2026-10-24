import React, { useState } from 'react';
import { ShoppingBag, Calendar, Phone, Clock, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcements & Quick Info Bar */}
      <div className="bg-[#B45309] text-[#FFFBEB] text-xs py-1.5 px-4 sm:px-8 border-b border-[#92400E]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              {RESTAURANT_INFO.hours}
            </span>
            <span className="hidden sm:inline text-amber-200/60">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-amber-100">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              Plot 116, Sector 4, Vaishali, Ghaziabad
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>{RESTAURANT_INFO.displayPhone}</span>
            </a>
            <span className="text-amber-200/60">·</span>
            <span className="text-amber-200 font-semibold">Pure Vegetarian</span>
          </div>
        </div>
      </div>

      {/* Primary Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1-2 Primary Actions) */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DECD] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Brand Wordmark in Display Typography */}
          <a
            href="#"
            className="flex items-baseline gap-2 group whitespace-nowrap shrink-0"
          >
            <span className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-[#78350F] group-hover:text-[#9A3412] transition-colors">
              Vedantam
            </span>
            <span className="font-hindi text-sm sm:text-base text-[#B45309] font-medium tracking-wide">
              वेदांतम
            </span>
          </a>

          {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#451A03]">
            <a
              href="#overview"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              Overview
            </a>
            <a
              href="#menu"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              Our Menu
            </a>
            <a
              href="#story"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              The Heritage
            </a>
            <a
              href="#popular-times"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              Popular Times
            </a>
            <a
              href="#reviews"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
            <a
              href="#location"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              Directions
            </a>
          </nav>

          {/* Zone 3: Primary Action & Cart */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg text-[#78350F] hover:bg-[#F3EADA] transition-colors flex items-center justify-center cursor-pointer"
              aria-label="View online order bag"
            >
              <ShoppingBag className="w-5 h-5 text-[#9A3412]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D97706] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-lg transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#78350F] hover:bg-[#F3EADA] rounded-md cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E7DECD] px-5 py-4 space-y-3">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#451A03] hover:text-[#9A3412]"
            >
              Overview
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#451A03] hover:text-[#9A3412]"
            >
              Full Menu & Tiffin
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#451A03] hover:text-[#9A3412]"
            >
              The Story & Heritage
            </a>
            <a
              href="#popular-times"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#451A03] hover:text-[#9A3412]"
            >
              Busy Times & Ambiance
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#451A03] hover:text-[#9A3412]"
            >
              Guest Reviews (4.4 ★)
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#451A03] hover:text-[#9A3412]"
            >
              Location & Contact
            </a>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] rounded-lg shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                Reserve a Table
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider text-[#78350F] bg-[#EEDCC7] rounded-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                View Bag ({cartCount})
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
