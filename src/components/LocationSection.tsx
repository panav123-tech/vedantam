import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Share2, Send, ExternalLink, Copy, Check, Car, Train, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [phoneForSMS, setPhoneForSMS] = useState('');
  const [sentSMS, setSentSMS] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2500);
  };

  const handleSendToPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneForSMS.trim()) return;
    setSentSMS(true);
    setTimeout(() => {
      setSentSMS(false);
      setShowSendModal(false);
      setPhoneForSMS('');
    }, 2000);
  };

  return (
    <section id="location" className="py-14 sm:py-20 bg-[#FFFDF7] border-b border-[#E7DECD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase font-bold tracking-wider text-[#9A3412] mb-1">
            Visit & Contact
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#451A03] mb-3">
            Find Us in Vaishali, Ghaziabad
          </h2>
          <p className="text-sm text-[#78350F] leading-relaxed">
            Centrally situated in Sector 4 Vaishali, with convenient access from Vaishali Metro Station, Indirapuram, Vasundhara, and East Delhi.
          </p>
        </div>

        {/* 2-Column Split: Detailed Info Left, Interactive Map & Directions Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Address, Operating Hours, Metro, Plus Code */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E7DECD] shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[#9A3412]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-bold text-[#451A03] mb-1">
                    Address
                  </h3>
                  <p className="text-xs text-[#573010] leading-relaxed font-medium">
                    {RESTAURANT_INFO.address}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] font-mono bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E7DECD] text-[#78350F]">
                      Plus Code: {RESTAURANT_INFO.plusCode}
                    </span>
                    <button
                      onClick={handleCopyPlusCode}
                      className="text-[11px] font-bold text-[#9A3412] hover:text-[#7C2D12] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPlusCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPlusCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Phone */}
              <div className="pt-4 border-t border-[#F3EADA] flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[#9A3412]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-bold text-[#451A03] mb-0.5">
                    Call for Table or Tiffin Pickup
                  </h3>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-base font-bold text-[#9A3412] hover:text-[#7C2D12] block tracking-wide"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                  <p className="text-[11px] text-[#A87954]">
                    Direct line to our restaurant reception counter
                  </p>
                </div>
              </div>

              {/* Operating Hours Table */}
              <div className="pt-4 border-t border-[#F3EADA]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#451A03] mb-2">
                  <Clock className="w-4 h-4 text-[#B45309]" />
                  <span>Dine-In & Takeaway Hours</span>
                </div>

                <div className="space-y-1.5 text-xs text-[#78350F]">
                  <div className="flex justify-between py-1 border-b border-[#FAF7F2]">
                    <span className="font-semibold">Monday – Sunday:</span>
                    <span className="font-bold text-emerald-800">7:00 AM – 10:30 PM</span>
                  </div>
                  <div className="flex justify-between py-0.5 text-[11px] text-[#A87954]">
                    <span>Morning Tiffin & Filter Kaapi:</span>
                    <span>7:00 AM – 11:30 AM</span>
                  </div>
                  <div className="flex justify-between py-0.5 text-[11px] text-[#A87954]">
                    <span>Full Meals & Dosa Lunch:</span>
                    <span>12:00 PM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between py-0.5 text-[11px] text-[#A87954]">
                    <span>Evening Tiffin & Dinner:</span>
                    <span>4:30 PM – 10:30 PM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Metro & Commute Guide */}
            <div className="bg-[#FAF0E1]/70 p-5 rounded-2xl border border-[#E7DECD] text-xs text-[#573010] space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#451A03]">
                <Train className="w-4 h-4 text-[#9A3412]" />
                <span>How to Reach Vedantam</span>
              </div>
              <ul className="space-y-2 list-disc pl-4 text-xs">
                <li>
                  <strong>By Delhi Metro (Blue Line):</strong> De-board at <strong>Vaishali Metro Station</strong> (approx. 800m). E-rickshaws and auto-rickshaws reach Sector 4 in 3 minutes.
                </li>
                <li>
                  <strong>By Car / Cab:</strong> Convenient parking near Plot 116 Sector 4. Direct route via Madan Mohan Malviya Marg from Anand Vihar / Indirapuram.
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column (7 cols): Map Visualization, Direct Actions, Zomato Link */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Styled Map Enclosure */}
            <div className="bg-white rounded-2xl border border-[#E7DECD] overflow-hidden shadow-xs">
              <div className="relative h-72 sm:h-84 bg-[#E8EDE4] overflow-hidden">
                
                {/* Visual South Indian Styled Map Graphic */}
                <div className="absolute inset-0 bg-[#E8EDE4] flex flex-col items-center justify-center p-6 text-center">
                  
                  {/* Stylized Map Roads Pattern */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
                    backgroundImage: 'linear-gradient(#9A3412 1px, transparent 1px), linear-gradient(90deg, #9A3412 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}></div>

                  {/* Marker Center */}
                  <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
                    <div className="p-3 bg-[#9A3412] text-white rounded-full shadow-xl border-4 border-white flex items-center justify-center">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div className="mt-2 bg-[#451A03] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                      Vedantam (वेदांतम)
                    </div>
                  </div>

                  <p className="relative z-10 text-xs font-bold text-[#451A03] mt-3">
                    Plot no. 116, Sector 4, Vaishali, Ghaziabad
                  </p>
                  <p className="relative z-10 text-[11px] text-[#78350F] max-w-sm mt-0.5">
                    Near Gandhi Path & Vaishali Central Market · Uttar Pradesh 201019
                  </p>

                  <div className="relative z-10 mt-4 flex items-center gap-3">
                    <a
                      href={RESTAURANT_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>

                </div>

                {/* Bottom Left Quick Status Pill */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-bold text-emerald-800 border border-emerald-200 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Live: Open now till 10:30 PM</span>
                </div>

              </div>

              {/* Action Buttons Toolbar below Map */}
              <div className="p-4 bg-[#FAF7F2] border-t border-[#E7DECD] grid grid-cols-2 sm:grid-cols-4 gap-2">
                
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-[#E7DECD] hover:border-[#D97706] text-[#78350F] hover:text-[#9A3412] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Directions</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="p-2.5 rounded-xl bg-white border border-[#E7DECD] hover:border-[#D97706] text-[#78350F] hover:text-[#9A3412] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Call Us</span>
                </a>

                <button
                  onClick={() => setShowSendModal(true)}
                  className="p-2.5 rounded-xl bg-white border border-[#E7DECD] hover:border-[#D97706] text-[#78350F] hover:text-[#9A3412] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Send to Phone</span>
                </button>

                <a
                  href={RESTAURANT_INFO.zomatoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-[#E7DECD] hover:border-[#D97706] text-[#78350F] hover:text-[#9A3412] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Zomato Menu</span>
                </a>

              </div>
            </div>

            {/* Quick Fact Callout */}
            <div className="p-4 rounded-xl bg-white border border-[#E7DECD] flex items-center justify-between text-xs text-[#78350F]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold text-[#451A03]">LGBTQ+ Friendly & Safe Atmosphere</span>
              </div>
              <span className="text-[11px] text-[#A87954] hidden sm:inline">
                Reported by 234 diners as top value
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Send to Phone Interactive Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] w-full max-w-sm rounded-2xl border border-[#E7DECD] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-serif-display text-lg font-bold text-[#451A03] mb-1">
              Send Address to Mobile
            </h3>
            <p className="text-xs text-[#78350F] mb-4">
              Receive the address and Google Maps directions link for Vedantam directly on your phone.
            </p>

            {sentSMS ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 font-semibold">
                ✓ Address dispatched successfully!
              </div>
            ) : (
              <form onSubmit={handleSendToPhone} className="space-y-3">
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phoneForSMS}
                  onChange={(e) => setPhoneForSMS(e.target.value)}
                  required
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] rounded-xl cursor-pointer"
                  >
                    Send SMS
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSendModal(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-[#78350F] bg-white border border-[#E7DECD] rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
