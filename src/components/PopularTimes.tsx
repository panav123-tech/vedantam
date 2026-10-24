import React, { useState } from 'react';
import { Clock, Users, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { POPULAR_TIMES_DATA } from '../data/restaurantData';

export const PopularTimes: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'Saturday' | 'Sunday' | 'Weekdays'>('Saturday');
  const [activeHourIndex, setActiveHourIndex] = useState<number>(4); // default ~1 PM or 5 PM

  // Data mapping for different days
  const dayOccupancyMultiplier: Record<string, number> = {
    Saturday: 1,
    Sunday: 1.08,
    Weekdays: 0.75,
  };

  const multiplier = dayOccupancyMultiplier[selectedDay];

  return (
    <section id="popular-times" className="py-12 sm:py-16 bg-[#FFFDF7] border-b border-[#E7DECD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#9A3412] mb-1">
              Real-Time Dine-In Tracker
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#451A03]">
              Popular Times & Ambiance
            </h2>
          </div>

          {/* Day Selector Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-[#F3EADA] rounded-xl self-start md:self-auto">
            {(['Saturday', 'Sunday', 'Weekdays'] as const).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-[#9A3412] text-white shadow-xs'
                    : 'text-[#78350F] hover:text-[#451A03]'
                }`}
              >
                {day === 'Saturday' ? 'Saturdays (Peak)' : day}
              </button>
            ))}
          </div>
        </div>

        {/* Card Enclosure */}
        <div className="bg-white rounded-2xl border border-[#E7DECD] p-6 sm:p-8 shadow-xs">
          
          {/* Live Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E7DECD]">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-600"></span>
              </span>
              <div>
                <span className="text-sm font-bold text-[#451A03] flex items-center gap-2">
                  Live Status: <span className="text-emerald-700">Not too busy right now</span>
                </span>
                <p className="text-xs text-[#78350F]">
                  Typical wait time: <strong className="text-[#451A03]">5–10 mins</strong> · Tables readily available
                </p>
              </div>
            </div>

            <div className="text-xs text-[#78350F] bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
              <span>Based on Google Maps historical visit patterns</span>
            </div>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div className="mt-8">
            <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 pt-4 pb-2">
              {POPULAR_TIMES_DATA.map((item, index) => {
                const calculatedOccupancy = Math.min(100, Math.round(item.occupancy * multiplier));
                const isSelected = activeHourIndex === index;
                const isPeak = calculatedOccupancy >= 80;

                return (
                  <div
                    key={item.hour}
                    onClick={() => setActiveHourIndex(index)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {/* Tooltip on active */}
                    {isSelected && (
                      <div className="mb-2 text-center">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#451A03] text-white whitespace-nowrap shadow-xs">
                          {calculatedOccupancy}% busy
                        </span>
                      </div>
                    )}

                    {/* Bar visual */}
                    <div className="w-full max-w-[36px] bg-[#F5EDE1] rounded-t-md relative flex items-end overflow-hidden h-32 transition-all">
                      <div
                        style={{ height: `${calculatedOccupancy}%` }}
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          isSelected
                            ? 'bg-[#9A3412]'
                            : isPeak
                            ? 'bg-[#D97706] group-hover:bg-[#B45309]'
                            : 'bg-amber-300 group-hover:bg-amber-400'
                        }`}
                      ></div>
                    </div>

                    {/* Time Label */}
                    <span className={`text-[11px] mt-2 font-semibold transition-colors ${
                      isSelected ? 'text-[#9A3412] font-bold' : 'text-[#78350F]'
                    }`}>
                      {item.hour}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Hour Details Callout */}
          <div className="mt-6 p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DECD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#573010]">
            <div>
              <span className="font-bold text-[#451A03] mr-2">
                {POPULAR_TIMES_DATA[activeHourIndex].hour} on {selectedDay}:
              </span>
              <span>{POPULAR_TIMES_DATA[activeHourIndex].label}</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-[#78350F]">
              <Info className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Tip: Order filter coffee during morning 9–11 AM or evening 5–7 PM</span>
            </div>
          </div>

          {/* Amenities & Dining Features */}
          <div className="mt-8 pt-6 border-t border-[#E7DECD] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-[#451A03]">100% Pure Vegetarian</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-[#451A03]">LGBTQ+ Friendly Space</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-[#451A03]">Air Conditioned Seating</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-[#451A03]">Sector 4 Parking Available</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
