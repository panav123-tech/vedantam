import React, { useState } from 'react';
import { Star, MapPin, Clock, Phone, Navigation, Share2, Bookmark, Check, Utensils, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenOrder }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vedantam - South Indian Restaurant',
        text: 'Experience authentic Karnataka Thatte Idli & Benne Dosa at Vedantam, Vaishali Ghaziabad.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="overview" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#FAF7F2] bg-kolam border-b border-[#E7DECD] overflow-hidden">
      {/* Subtle decorative temple corner flare */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-amber-200/30 to-transparent pointer-events-none -mr-20 -mt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split: Editorial Presentation Left, High-Fidelity Banana Leaf Feast Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column (7 cols): Identity, Accreditations & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Unboxed Metadata & Status */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#78350F] font-semibold mb-3">
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
                Open Now · Closes 10:30 PM
              </span>
              <span className="text-[#B45309]">·</span>
              <span>₹200–400 per person</span>
              <span className="text-[#B45309]">·</span>
              <span className="text-amber-800">Vaishali, Ghaziabad</span>
            </div>

            {/* Title & Brand Name */}
            <div className="mb-4">
              <div className="flex items-baseline gap-3 mb-1">
                <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#451A03] leading-[1.08] text-balance">
                  Vedantam
                </h1>
                <span className="font-hindi text-2xl sm:text-3xl text-[#9A3412] font-semibold">
                  वेदांतम
                </span>
              </div>
              <p className="text-lg sm:text-xl font-medium text-[#78350F] tracking-tight">
                Authentic South Indian Pure Vegetarian Restaurant
              </p>
            </div>

            {/* Google Rating & Trust Cluster */}
            <div className="flex flex-wrap items-center gap-3 py-3 px-4 rounded-xl bg-amber-50/70 border border-amber-200/70 mb-5">
              <div className="flex items-center gap-1.5 bg-[#B45309] text-white px-2 py-0.5 rounded font-bold text-sm">
                <span>{RESTAURANT_INFO.rating}</span>
                <Star className="w-3.5 h-3.5 fill-current text-white" />
              </div>
              <div className="text-xs text-[#78350F]">
                <span className="font-bold text-[#451A03]">(594 Google Reviews)</span>
                <span className="mx-1.5 text-amber-300">·</span>
                <span className="text-amber-900 font-medium">Famous for Thatte Idli & Benne Dosa</span>
              </div>
              <div className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>LGBTQ+ Friendly</span>
              </div>
            </div>

            {/* Descriptive Body Narrative */}
            <p className="text-sm sm:text-base text-[#573010] leading-relaxed mb-6 max-w-2xl">
              Immerse yourself in authentic South Indian tiffin traditions. Hand-steamed fluffy Bidadi-style Thatte Idlis drizzled with pure A2 cow ghee and gunpowder podi, paper-crisp Davangere Benne Roast Dosas, and freshly brewed Kumbakonam brass filter coffee.
            </p>

            {/* Primary Action Button Cluster */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={onOpenOrder}
                className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Utensils className="w-4 h-4" />
                Order Online
              </button>

              <button
                onClick={onOpenReservation}
                className="px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-[#78350F] bg-white hover:bg-[#FDF9F3] border border-[#D97706]/40 hover:border-[#D97706] rounded-xl transition-all shadow-xs hover:shadow-sm flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                Reserve a Table
              </button>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 text-[#78350F] bg-white hover:bg-amber-50 border border-[#E7DECD] rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Get Directions on Google Maps"
              >
                <Navigation className="w-4 h-4 text-[#B45309]" />
                <span className="hidden sm:inline">Directions</span>
              </a>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-3 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                  isSaved
                    ? 'bg-amber-100 text-[#9A3412] border-amber-300'
                    : 'bg-white text-[#78350F] border-[#E7DECD] hover:bg-amber-50'
                }`}
                title="Save restaurant"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-[#9A3412]' : 'text-[#B45309]'}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-3 text-[#78350F] bg-white hover:bg-amber-50 border border-[#E7DECD] rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                title="Share restaurant"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#B45309]" />}
                <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
            </div>

            {/* Live Service Modes */}
            <div className="flex items-center gap-4 text-xs font-semibold text-[#78350F] border-t border-[#E7DECD] pt-4">
              <span className="text-[#9A3412]">Available Today:</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Dine-in
              </span>
              <span className="text-amber-300">·</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Takeaway
              </span>
              <span className="text-amber-300">·</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Delivery
              </span>
            </div>

          </div>

          {/* Right Column (5 cols): High-Impact Feast Image with Floating Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-amber-100/50 aspect-4/3 lg:aspect-auto lg:h-full">
              <img
                src="/src/assets/images/hero_south_indian_feast_1792828019728.jpg"
                alt="Authentic South Indian Feast at Vedantam with Thatte Idli, Benne Masala Dosa, Chutneys, and Brass Filter Coffee"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 backdrop-blur-md bg-black/35 rounded-xl border border-white/20">
                <p className="font-serif-display text-base font-bold text-amber-200">
                  The Royal Banana Leaf Experience
                </p>
                <p className="text-xs text-white/90">
                  Served traditionally with 3 signature chutneys & unlimited piping hot drumstick sambar.
                </p>
              </div>

              {/* Top Corner Floating Pill */}
              <div className="absolute top-4 right-4 bg-[#B45309]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md border border-amber-300/30 flex items-center gap-1.5">
                <span>Karnataka Special</span>
              </div>
            </div>
          </div>

        </div>

        {/* Full-Width 4-Column Feature Strip Below Hero */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/90 p-5 rounded-xl border border-[#E7DECD] shadow-xs hover:border-[#D97706]/40 transition-colors">
            <div className="text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">01. Signature Dish</div>
            <h3 className="font-serif-display text-lg font-bold text-[#451A03] mb-1">Bidadi Thatte Idli</h3>
            <p className="text-xs text-[#78350F] leading-relaxed">
              Broad, pillowy soft steamed cakes drenched in pure desi cow ghee and gunpowder Malgapodi.
            </p>
          </div>

          <div className="bg-white/90 p-5 rounded-xl border border-[#E7DECD] shadow-xs hover:border-[#D97706]/40 transition-colors">
            <div className="text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">02. Roasted In Butter</div>
            <h3 className="font-serif-display text-lg font-bold text-[#451A03] mb-1">Benne Roast Dosa</h3>
            <p className="text-xs text-[#78350F] leading-relaxed">
              Golden crisp Davangere style crepes layered with fresh white churned butter and potato mash.
            </p>
          </div>

          <div className="bg-white/90 p-5 rounded-xl border border-[#E7DECD] shadow-xs hover:border-[#D97706]/40 transition-colors">
            <div className="text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">03. Kumbakonam Style</div>
            <h3 className="font-serif-display text-lg font-bold text-[#451A03] mb-1">Brass Filter Kaapi</h3>
            <p className="text-xs text-[#78350F] leading-relaxed">
              Freshly ground 80:20 chicory blend poured back and forth into brass dabara with rich velvety foam.
            </p>
          </div>

          <div className="bg-white/90 p-5 rounded-xl border border-[#E7DECD] shadow-xs hover:border-[#D97706]/40 transition-colors">
            <div className="text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">04. 100% Sattvic Kitchen</div>
            <h3 className="font-serif-display text-lg font-bold text-[#451A03] mb-1">Pure Vegetarian</h3>
            <p className="text-xs text-[#78350F] leading-relaxed">
              Prepared without artificial coloring. Jain friendly options available for almost all dishes.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
