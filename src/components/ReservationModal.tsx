import React, { useState } from 'react';
import { X, Calendar, Users, Clock, Check, Sparkles, MapPin, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('1:00 PM');
  const [seatingArea, setSeatingArea] = useState<'main_hall' | 'courtyard' | 'tiffin_express'>('courtyard');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Please fill in your name and contact phone number.');
      return;
    }

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D97706', '#9A3412', '#059669', '#F59E0B'],
      });
    } catch {}

    const code = `VDN-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(code);
  };

  const handleResetAndClose = () => {
    setConfirmationCode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] w-full max-w-xl rounded-2xl border border-[#E7DECD] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#FAF0E1] p-5 sm:p-6 border-b border-[#E7DECD] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A3412] mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Table Reservation</span>
            </div>
            <h2 className="font-serif-display text-2xl font-bold text-[#451A03]">
              Reserve Your Table at Vedantam
            </h2>
            <p className="text-xs text-[#78350F] mt-0.5">
              Sector 4, Vaishali, Ghaziabad · 7:00 AM to 10:30 PM
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-[#78350F] hover:bg-white/80 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmationCode ? (
          /* Confirmation Success State */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-emerald-700" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
                Booking Confirmed
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#451A03] mt-1">
                Reservation Code: {confirmationCode}
              </h3>
              <p className="text-xs text-[#78350F] max-w-md mx-auto mt-2">
                We look forward to serving you, <strong className="text-[#451A03]">{fullName}</strong>! A confirmation SMS and email have been dispatched.
              </p>
            </div>

            {/* Summary Details */}
            <div className="bg-white p-4 rounded-xl border border-[#E7DECD] text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#78350F]">Date & Time:</span>
                <span className="font-bold text-[#451A03]">{date} at {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78350F]">Party Size:</span>
                <span className="font-bold text-[#451A03]">{guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78350F]">Seating:</span>
                <span className="font-bold text-[#451A03]">
                  {seatingArea === 'courtyard' ? 'Traditional Courtyard' : seatingArea === 'main_hall' ? 'AC Family Hall' : 'Quick Tiffin Booth'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78350F]">Location:</span>
                <span className="font-bold text-[#451A03]">Plot 116, Sector 4, Vaishali</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-[11px] text-[#78350F] max-w-md mx-auto">
              <p className="font-semibold text-[#451A03] mb-0.5">Dine-In Guidelines:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Please arrive 10 minutes prior to your booking.</li>
                <li>Your table will be held for 15 minutes past scheduled time.</li>
                <li>For changes, please call the front desk at <strong>{RESTAURANT_INFO.phone}</strong>.</li>
              </ul>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full max-w-md py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* Party Size Stepper */}
            <div>
              <label className="block text-xs font-bold text-[#451A03] mb-1.5">
                Number of Guests
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 8, '10+'].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setGuests(typeof num === 'number' ? num : 10)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      (num === '10+' && guests >= 10) || guests === num
                        ? 'bg-[#9A3412] text-white border-[#9A3412]'
                        : 'bg-white text-[#573010] border-[#E7DECD] hover:bg-[#FAF0E1]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time Slot Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1">
                  Reservation Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1">
                  Select Time Slot *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
                >
                  <optgroup label="Morning Tiffin & Breakfast">
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                  </optgroup>
                  <optgroup label="Traditional Lunch">
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                  </optgroup>
                  <optgroup label="Evening Kaapi & Snacks">
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                  </optgroup>
                  <optgroup label="Family Dinner">
                    <option value="7:30 PM">7:30 PM</option>
                    <option value="8:15 PM">8:15 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="9:45 PM">9:45 PM</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Seating Ambiance Preference */}
            <div>
              <label className="block text-xs font-bold text-[#451A03] mb-1.5">
                Preferred Seating Ambiance
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'courtyard', label: 'Traditional Courtyard', desc: 'Kolam & brass lamps' },
                  { id: 'main_hall', label: 'AC Family Hall', desc: 'Spacious & quiet' },
                  { id: 'tiffin_express', label: 'Quick Tiffin Booth', desc: 'Fast casual dining' },
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSeatingArea(area.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      seatingArea === area.id
                        ? 'bg-[#FAF0E1] border-[#9A3412] text-[#451A03]'
                        : 'bg-white border-[#E7DECD] text-[#78350F] hover:bg-amber-50/50'
                    }`}
                  >
                    <span className="text-xs font-bold block">{area.label}</span>
                    <span className="text-[10px] text-[#A87954]">{area.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Rajesh Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g., 98110 XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="rajesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#451A03] mb-1">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
                >
                  <option value="Casual Dining">Casual Dining / Tiffin</option>
                  <option value="Family Gathering">Family Gathering</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Business Lunch">Business Breakfast / Lunch</option>
                </select>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-[#451A03] mb-1">
                Special Requests or Dietary Requirements (Optional)
              </label>
              <textarea
                placeholder="e.g., High chair required for infant, Jain food for 2 guests, elderly seating near entrance..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={2}
                className="w-full p-2.5 text-xs bg-white border border-[#E7DECD] rounded-xl text-[#451A03]"
              ></textarea>
            </div>

            {/* Submit Action */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Table Reservation</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
