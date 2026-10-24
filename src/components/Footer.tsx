import React from 'react';
import { MapPin, Phone, Clock, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C1810] text-[#E7DECD] border-t border-[#451A03] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#451A03]/80">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-display text-2xl font-bold tracking-tight text-[#FEF3C7]">
                Vedantam
              </span>
              <span className="font-hindi text-lg text-[#F59E0B]">
                वेदांतम
              </span>
            </div>
            <p className="text-xs text-[#D1BFA7] leading-relaxed">
              Authentic South Indian Pure Vegetarian Restaurant. Bringing traditional Bidadi Thatte Idlis, Davangere Benne Dosas, and freshly brewed Kumbakonam Filter Coffee to Vaishali, Ghaziabad.
            </p>
            <div className="pt-2 text-xs text-[#F59E0B] font-semibold flex items-center gap-1.5">
              <span>🌱 100% Pure Vegetarian Kitchen</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-sm font-bold uppercase tracking-wider text-[#FEF3C7]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#D1BFA7]">
              <li>
                <a href="#overview" className="hover:text-amber-300 transition-colors">Overview & Highlights</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-300 transition-colors">Full Tiffin & Dosa Menu</a>
              </li>
              <li>
                <a href="#story" className="hover:text-amber-300 transition-colors">The Vedantam Story</a>
              </li>
              <li>
                <a href="#popular-times" className="hover:text-amber-300 transition-colors">Live Busy Times (Saturdays)</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-300 transition-colors">Customer Reviews (4.4 ★)</a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-300 transition-colors">Location & Directions</a>
              </li>
            </ul>
          </div>

          {/* Timings & Service */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-sm font-bold uppercase tracking-wider text-[#FEF3C7]">
              Service Hours
            </h4>
            <div className="space-y-1.5 text-xs text-[#D1BFA7]">
              <p className="flex items-center gap-1.5 text-amber-200 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Open 7 Days a Week</span>
              </p>
              <p>7:00 AM – 10:30 PM (All Day)</p>
              <p className="text-[11px] text-[#A8947C] pt-1">
                Breakfast Tiffin: 7:00 AM – 11:30 AM
              </p>
              <p className="text-[11px] text-[#A8947C]">
                South Indian Meals: 12:00 PM – 4:00 PM
              </p>
              <p className="text-[11px] text-[#A8947C]">
                Evening Tiffin & Dinner: 4:30 PM – 10:30 PM
              </p>
            </div>
          </div>

          {/* Visit & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-sm font-bold uppercase tracking-wider text-[#FEF3C7]">
              Visit Us
            </h4>
            <p className="text-xs text-[#D1BFA7] leading-relaxed">
              {RESTAURANT_INFO.address}
            </p>
            <p className="text-xs text-amber-300 font-mono">
              Plus Code: {RESTAURANT_INFO.plusCode}
            </p>
            <div className="pt-2">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#9A3412] hover:bg-[#B45309] px-3 py-1.5 rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A8947C]">
          <p>
            © {new Date().getFullYear()} Vedantam - South Indian Restaurant. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>LGBTQ+ Friendly</span>
            <span>·</span>
            <span>Vaishali, Ghaziabad</span>
            <span>·</span>
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              Google Maps
            </a>
            <span>·</span>
            <a
              href={RESTAURANT_INFO.zomatoUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              Zomato
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
