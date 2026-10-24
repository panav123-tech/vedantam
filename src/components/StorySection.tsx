import React from 'react';
import { Sparkles, Utensils, Coffee, HeartHandshake, ShieldCheck } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-14 sm:py-20 bg-[#FFFDF7] border-b border-[#E7DECD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase font-bold tracking-wider text-[#9A3412] mb-1">
            The Philosophy & Roots
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#451A03] mb-3">
            From the Master Kitchen of Vedantam
          </h2>
          <p className="text-sm text-[#78350F] leading-relaxed">
            Preserving centuries-old Karnataka and Tamil tiffin traditions in Sector 4, Vaishali.
          </p>
        </div>

        {/* 2-Column Split: Owner Narrative Left, Atmospheric Restaurant Interior Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#573010] leading-relaxed">
            
            <div className="p-6 rounded-2xl bg-[#FAF0E1]/70 border border-[#E7DECD] relative">
              <span className="text-xs uppercase font-bold tracking-wider text-[#9A3412] block mb-2">
                Words From The Founder & Culinary Team
              </span>
              <p className="italic font-serif-display text-base sm:text-lg text-[#451A03] mb-4">
                &ldquo;South Indian cuisine is loved for its comforting flavours, aromatic spices, and satisfying combinations. From steamed idlis to crispy dosas and freshly brewed coffee, every dish offers a unique experience.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-[#6B3A19] leading-relaxed mb-3">
                At Vedantam, food lovers can explore a variety of authentic vegetarian South Indian favourites in one place. One dish worth exploring is our <strong>Coconut Ghee Podi Idli</strong>. Soft idlis combined with fragrant cow ghee and flavourful podi create a delicious balance of textures and spices.
              </p>
              <p className="text-xs sm:text-sm text-[#6B3A19] leading-relaxed mb-3">
                Another classic is <strong>Thatte Idli</strong>, recognised for its broad, soft, and fluffy shape. It is ideal for anyone who prefers a comforting meal with traditional South Indian accompaniments. For savoury cravings, our <strong>South Indian Vada Sambar</strong> combines crispy medu vada with warm, flavourful sambar.
              </p>
              <p className="text-xs sm:text-sm text-[#6B3A19] leading-relaxed">
                Complete your meal with a cup of authentic <strong>South Indian filter coffee</strong>. Its rich aroma and distinctive taste make it a favourite for coffee enthusiasts who appreciate traditional preparation styles. Whether you are looking for a light snack, a filling meal, or a place to enjoy South Indian specialities with family, Vedantam is your home away from home.
              </p>
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-[#E7DECD] flex items-center gap-3">
                <Utensils className="w-5 h-5 text-[#9A3412] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#451A03]">Stone-Ground</h4>
                  <p className="text-[10px] text-[#78350F]">Natural wild fermentation</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E7DECD] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#451A03]">Pure A2 Desi Ghee</h4>
                  <p className="text-[10px] text-[#78350F]">Zero palm oil or adulterants</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E7DECD] flex items-center gap-3">
                <Coffee className="w-5 h-5 text-[#B45309] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#451A03]">Coorg Plantation Blend</h4>
                  <p className="text-[10px] text-[#78350F]">Served in heavy brass dabara</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Res Interior Photography */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl relative aspect-4/3 lg:aspect-auto lg:h-[480px]">
              <img
                src="/src/assets/images/ambiance_vedantam_restaurant_1792828021704.jpg"
                alt="Vedantam Restaurant Vaishali Warm South Indian Interior with Brass Bells and Kolam Artwork"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white p-3.5 backdrop-blur-md bg-black/40 rounded-xl border border-white/20">
                <h4 className="font-serif-display text-sm font-bold text-amber-200">
                  Vaishali Sector 4 Dining Hall
                </h4>
                <p className="text-[11px] text-white/90">
                  Peaceful family ambiance thoughtfully designed with traditional brass accents, wooden finishes, and warm natural light.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Thematic Pillars of Vedantam */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-[#E7DECD] shadow-xs hover:border-[#D97706]/40 transition-colors">
            <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase block mb-2">
              Chapter 01
            </span>
            <h3 className="font-serif-display text-lg font-bold text-[#451A03] mb-2">
              Bidadi Thatte Idli
            </h3>
            <p className="text-xs text-[#78350F] leading-relaxed">
              Originated on the historic Bangalore-Mysore highway. Steamed in specialized round plate moulds over cotton weave to retain soft, aerated fluffiness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E7DECD] shadow-xs hover:border-[#D97706]/40 transition-colors">
            <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase block mb-2">
              Chapter 02
            </span>
            <h3 className="font-serif-display text-lg font-bold text-[#451A03] mb-2">
              White Butter (Benne) Dosas
            </h3>
            <p className="text-xs text-[#78350F] leading-relaxed">
              Freshly churned white farm butter gives our dosas a signature crispy golden exterior with an aromatic, melt-in-the-mouth center.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E7DECD] shadow-xs hover:border-[#D97706]/40 transition-colors">
            <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase block mb-2">
              Chapter 03
            </span>
            <h3 className="font-serif-display text-lg font-bold text-[#451A03] mb-2">
              Homemade Malgapodi
            </h3>
            <p className="text-xs text-[#78350F] leading-relaxed">
              Roasted whole urad dal, chana dal, Byadgi chillies, curry leaves, and sesame seeds pounded fresh in small batches every morning.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E7DECD] shadow-xs hover:border-[#D97706]/40 transition-colors">
            <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase block mb-2">
              Chapter 04
            </span>
            <h3 className="font-serif-display text-lg font-bold text-[#451A03] mb-2">
              The Kaapi Ritual
            </h3>
            <p className="text-xs text-[#78350F] leading-relaxed">
              Slow-dripped first decoction through stainless steel filters, mixed with boiled full-cream milk and aerated through rhythmic meter-long pours.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
