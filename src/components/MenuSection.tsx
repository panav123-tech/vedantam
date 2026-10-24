import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Sparkles, Flame, Heart, X, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, MenuCategory } from '../types/restaurant';

interface MenuSectionProps {
  onAddToCart: (
    item: MenuItem,
    options?: {
      jainPreparation?: boolean;
      extraGheePodi?: boolean;
      coffeeSweetness?: 'regular' | 'less_sugar' | 'no_sugar';
      specialInstructions?: string;
    }
  ) => void;
}

const CATEGORY_TABS: { id: MenuCategory; label: string; hindi: string }[] = [
  { id: 'all', label: 'All Specials', hindi: 'सभी व्यंजन' },
  { id: 'thatte_idlis', label: 'Thatte & Idlis', hindi: 'थट्टे व इडली' },
  { id: 'dosas', label: 'Crispy Dosas', hindi: 'मसाला डोसा' },
  { id: 'vadas_starters', label: 'Vadas & Tiffin', hindi: 'वड़ा व टिफिन' },
  { id: 'meals_rice', label: 'Comfort Rice', hindi: 'भात व भोजन' },
  { id: 'beverages_sweets', label: 'Filter Kaapi & Sweets', hindi: 'कॉफ़ी व मिष्ठान' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [jainOnly, setJainOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  
  // Customization modal state
  const [selectedItemForCustom, setSelectedItemForCustom] = useState<MenuItem | null>(null);
  const [customJain, setCustomJain] = useState(false);
  const [customExtraPodi, setCustomExtraPodi] = useState(false);
  const [customSweetness, setCustomSweetness] = useState<'regular' | 'less_sugar' | 'no_sugar'>('regular');
  const [customNotes, setCustomNotes] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (jainOnly && !item.isJainAvailable) {
        return false;
      }
      if (popularOnly && !item.isPopular) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesHindi = item.hindiName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        return matchesName || matchesHindi || matchesDesc;
      }
      return true;
    });
  }, [activeCategory, jainOnly, popularOnly, searchQuery]);

  const handleOpenCustomize = (item: MenuItem) => {
    setSelectedItemForCustom(item);
    setCustomJain(false);
    setCustomExtraPodi(false);
    setCustomSweetness('regular');
    setCustomNotes('');
  };

  const handleConfirmAdd = () => {
    if (!selectedItemForCustom) return;
    onAddToCart(selectedItemForCustom, {
      jainPreparation: customJain,
      extraGheePodi: customExtraPodi,
      coffeeSweetness: selectedItemForCustom.id.includes('coffee') ? customSweetness : undefined,
      specialInstructions: customNotes.trim() ? customNotes : undefined,
    });
    setSelectedItemForCustom(null);
  };

  return (
    <section id="menu" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E7DECD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase font-bold tracking-wider text-[#9A3412] mb-1">
            Traditional South Indian Tiffin
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#451A03] mb-3">
            Handcrafted Menu & Specialties
          </h2>
          <p className="text-sm text-[#78350F] leading-relaxed">
            Fresh stone-ground batter fermented naturally overnight. Cooked fresh on hot iron tawas and bamboo steamers, served with pure A2 cow ghee and homemade chutneys.
          </p>
        </div>

        {/* Filter Controls Bar: Search + Dietary Filters */}
        <div className="bg-white rounded-2xl border border-[#E7DECD] p-4 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B45309]" />
              <input
                type="text"
                placeholder="Search Thatte Idli, Benne Dosa, Filter Coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E7DECD] rounded-xl focus:outline-hidden focus:border-[#9A3412] text-[#451A03] placeholder-[#A87954]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#78350F] hover:text-[#451A03]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Dietary Toggles (Buttons with handlers) */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => setJainOnly(!jainOnly)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  jainOnly
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#573010] border border-[#E7DECD] hover:bg-[#F3EADA]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Jain Options Only</span>
              </button>

              <button
                onClick={() => setPopularOnly(!popularOnly)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  popularOnly
                    ? 'bg-[#9A3412] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#573010] border border-[#E7DECD] hover:bg-[#F3EADA]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bestsellers</span>
              </button>
            </div>

          </div>

          {/* Category Tabs: Horizontal Scroll on Mobile */}
          <div className="mt-4 pt-4 border-t border-[#F3EADA] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#78350F] text-[#FFFBEB] shadow-xs'
                    : 'bg-[#FAF7F2] text-[#78350F] hover:bg-[#F3EADA] hover:text-[#451A03]'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] opacity-75 font-normal">({tab.hindi})</span>
              </button>
            ))}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E7DECD] p-8">
            <p className="text-base font-semibold text-[#451A03] mb-1">No matching South Indian delicacies found</p>
            <p className="text-xs text-[#78350F] mb-4">Try clearing filters or search for another keyword like &quot;Idli&quot; or &quot;Dosa&quot;</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setJainOnly(false);
                setPopularOnly(false);
              }}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E7DECD] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image Section */}
                <div className="relative aspect-16/10 bg-[#FAF7F2] overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-linear-to-br from-amber-50 to-[#F5EDE1] text-center">
                      <span className="font-serif-display text-lg font-bold text-[#78350F]">{item.name}</span>
                      <span className="text-xs text-[#9A3412] mt-1 font-hindi">{item.hindiName}</span>
                    </div>
                  )}

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                  {/* Price Tag in Bottom Right of Image */}
                  <div className="absolute bottom-3 right-3 bg-[#451A03]/90 backdrop-blur-md text-amber-200 text-sm font-bold px-2.5 py-1 rounded-lg border border-amber-300/30 tabular-nums">
                    ₹{item.price}
                  </div>

                  {/* Badges on Top */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isPopular && (
                      <span className="bg-[#B45309] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        Bestseller
                      </span>
                    )}
                    {item.isJainAvailable && (
                      <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        Jain Available
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#B45309] mb-1">
                      <span>Pure Veg</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category.replace('_', ' ').toUpperCase()}</span>
                      {item.isSpicy && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-red-700 flex items-center gap-0.5">
                            <Flame className="w-3 h-3" /> Spicy
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-display text-lg font-bold text-[#451A03] group-hover:text-[#9A3412] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    {item.hindiName && (
                      <p className="font-hindi text-xs text-[#78350F] mb-2">{item.hindiName}</p>
                    )}

                    {/* Description */}
                    <p className="text-xs text-[#6B3A19] leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    {/* Accompaniments */}
                    {item.accompaniments && (
                      <div className="text-[11px] text-[#8C5227] bg-[#FAF7F2] p-2 rounded-lg border border-[#E7DECD]/80 mb-4">
                        <span className="font-bold text-[#451A03]">Served with: </span>
                        <span>{item.accompaniments.join(' · ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#F3EADA]">
                    <div className="text-xs text-[#78350F]">
                      <span className="font-bold text-base text-[#451A03] tabular-nums">₹{item.price}</span>
                      <span className="text-[10px] text-[#A87954] block">Incl. all taxes</span>
                    </div>

                    <button
                      onClick={() => handleOpenCustomize(item)}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Item Customization Modal */}
      {selectedItemForCustom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] w-full max-w-md rounded-2xl border border-[#E7DECD] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="bg-[#FAF0E1] p-5 border-b border-[#E7DECD] flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A3412]">
                  Customize Your Dish
                </span>
                <h3 className="font-serif-display text-xl font-bold text-[#451A03]">
                  {selectedItemForCustom.name}
                </h3>
                <p className="font-hindi text-xs text-[#78350F]">{selectedItemForCustom.hindiName}</p>
              </div>
              <button
                onClick={() => setSelectedItemForCustom(null)}
                className="p-1.5 rounded-lg text-[#78350F] hover:bg-white/80 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customization Options */}
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Jain Preparation Toggle */}
              {selectedItemForCustom.isJainAvailable && (
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E7DECD] cursor-pointer hover:border-[#D97706]/50">
                  <div>
                    <span className="text-xs font-bold text-[#451A03] block">Jain Preparation (No Onion / Garlic)</span>
                    <span className="text-[11px] text-[#78350F]">Prepared in separate sattvic cookware</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={customJain}
                    onChange={(e) => setCustomJain(e.target.checked)}
                    className="w-4 h-4 accent-[#9A3412] cursor-pointer"
                  />
                </label>
              )}

              {/* Extra Podi & Pure Ghee Add-on */}
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E7DECD] cursor-pointer hover:border-[#D97706]/50">
                <div>
                  <span className="text-xs font-bold text-[#451A03] block">Extra Pure Desi Ghee & Malgapodi (+₹25)</span>
                  <span className="text-[11px] text-[#78350F]">Authentic gunpowder spice blend roasted in A2 cow ghee</span>
                </div>
                <input
                  type="checkbox"
                  checked={customExtraPodi}
                  onChange={(e) => setCustomExtraPodi(e.target.checked)}
                  className="w-4 h-4 accent-[#9A3412] cursor-pointer"
                />
              </label>

              {/* Filter Coffee Sugar Choice */}
              {selectedItemForCustom.id.includes('coffee') && (
                <div className="p-3.5 rounded-xl bg-white border border-[#E7DECD]">
                  <span className="text-xs font-bold text-[#451A03] block mb-2">Sugar Level</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'regular', label: 'Regular' },
                      { id: 'less_sugar', label: 'Less Sugar' },
                      { id: 'no_sugar', label: 'No Sugar' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setCustomSweetness(opt.id as any)}
                        className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          customSweetness === opt.id
                            ? 'bg-[#9A3412] text-white border-[#9A3412]'
                            : 'bg-[#FAF7F2] text-[#573010] border-[#E7DECD]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Cooking Instructions */}
              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1">
                  Cooking Notes or Dietary Request
                </label>
                <textarea
                  placeholder="e.g., Make it extra crisp, pack chutneys separately, less spicy sambar..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl focus:outline-hidden focus:border-[#9A3412] text-[#451A03]"
                ></textarea>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#FAF0E1] p-4 border-t border-[#E7DECD] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#78350F] block">Total for Item</span>
                <span className="text-lg font-bold text-[#451A03] tabular-nums">
                  ₹{selectedItemForCustom.price + (customExtraPodi ? 25 : 0)}
                </span>
              </div>
              <button
                onClick={handleConfirmAdd}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Confirm & Add</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
