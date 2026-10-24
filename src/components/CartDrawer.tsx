import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check, Tag, Clock, Bike, Store, UtensilsCrossed } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types/restaurant';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'takeaway' | 'delivery' | 'dinein'>('dinein');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    id: string;
    total: number;
    itemsCount: number;
    orderType: string;
    customerName: string;
  } | null>(null);

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = items.reduce((sum, cartItem) => {
    let itemPrice = cartItem.item.price;
    if (cartItem.selectedOptions?.extraGheePodi) {
      itemPrice += 25;
    }
    return sum + itemPrice * cartItem.quantity;
  }, 0);

  const discountAmount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const gstAmount = Math.round(taxableSubtotal * 0.05);
  const deliveryFee = orderType === 'delivery' ? (taxableSubtotal >= 300 ? 0 : 30) : 0;
  const grandTotal = taxableSubtotal + gstAmount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'VEDANTAM15' || promoCode.trim().toUpperCase() === 'SOUTH15') {
      setDiscountApplied(true);
      setDiscountError('');
    } else {
      setDiscountError('Invalid coupon. Try "VEDANTAM15"');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and phone number for order updates.');
      return;
    }

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97706', '#9A3412', '#059669', '#F59E0B'],
      });
    } catch {}

    const orderId = `VDN-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      id: orderId,
      total: grandTotal,
      itemsCount: items.reduce((acc, curr) => acc + curr.quantity, 0),
      orderType: orderType === 'dinein' ? 'Dine-In Table Order' : orderType === 'takeaway' ? 'Takeaway Pickup' : 'Home Delivery',
      customerName: customerName.trim(),
    });

    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E7DECD] animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 bg-[#FAF0E1] border-b border-[#E7DECD] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#9A3412]" />
            <h2 className="font-serif-display text-xl font-bold text-[#451A03]">
              Your South Indian Feast
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78350F] hover:bg-white/80 cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Order State */}
        {confirmedOrder ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-emerald-700" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412] mb-1">
              Order Confirmed & Sent to Kitchen
            </span>
            <h3 className="font-serif-display text-2xl font-bold text-[#451A03] mb-2">
              Order #{confirmedOrder.id}
            </h3>
            <p className="text-xs text-[#78350F] mb-6 max-w-xs">
              Thank you, <strong className="text-[#451A03]">{confirmedOrder.customerName}</strong>! Our master chef in Vaishali is preparing your fresh order.
            </p>

            {/* Receipt Summary Card */}
            <div className="w-full p-4 rounded-xl bg-white border border-[#E7DECD] text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between text-[#78350F]">
                <span>Order Mode:</span>
                <span className="font-bold text-[#451A03]">{confirmedOrder.orderType}</span>
              </div>
              <div className="flex justify-between text-[#78350F]">
                <span>Estimated Time:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 15–20 minutes
                </span>
              </div>
              <div className="flex justify-between text-[#78350F]">
                <span>Total Items:</span>
                <span className="font-bold text-[#451A03]">{confirmedOrder.itemsCount} dishes</span>
              </div>
              <div className="pt-2 border-t border-[#E7DECD] flex justify-between font-bold text-sm text-[#451A03]">
                <span>Amount Paid:</span>
                <span className="tabular-nums">₹{confirmedOrder.total}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#A87954] mb-6">
              An SMS with live updates has been sent to your phone. Need immediate assistance? Call <strong className="text-[#9A3412]">070115 28202</strong>.
            </p>

            <button
              onClick={() => {
                setConfirmedOrder(null);
                onClose();
              }}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl cursor-pointer"
            >
              Back to Menu
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-[#B45309]" />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#451A03] mb-1">
              Your bag is empty
            </h3>
            <p className="text-xs text-[#78350F] max-w-xs mb-6">
              Explore our Thatte Idlis, crispy Benne Dosas, and authentic Filter Coffee to begin.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl cursor-pointer"
            >
              Explore Menu
            </button>
          </div>
        ) : (
          /* Active Cart with Items & Checkout Form */
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {/* Order Mode Segmented Selector */}
              <div>
                <span className="text-[11px] font-bold text-[#78350F] uppercase tracking-wider block mb-1.5">
                  Fulfillment Option
                </span>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F3EADA] rounded-xl">
                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`py-2 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      orderType === 'dinein'
                        ? 'bg-[#9A3412] text-white shadow-xs'
                        : 'text-[#78350F] hover:text-[#451A03]'
                    }`}
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>Dine-In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      orderType === 'takeaway'
                        ? 'bg-[#9A3412] text-white shadow-xs'
                        : 'text-[#78350F] hover:text-[#451A03]'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Takeaway</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 text-[11px] font-bold rounded-lg transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#9A3412] text-white shadow-xs'
                        : 'text-[#78350F] hover:text-[#451A03]'
                    }`}
                  >
                    <Bike className="w-3.5 h-3.5" />
                    <span>Delivery</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((cartItem, idx) => {
                  let unitPrice = cartItem.item.price;
                  if (cartItem.selectedOptions?.extraGheePodi) unitPrice += 25;
                  const itemTotal = unitPrice * cartItem.quantity;

                  return (
                    <div
                      key={`${cartItem.item.id}-${idx}`}
                      className="p-3.5 bg-white rounded-xl border border-[#E7DECD] shadow-xs flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif-display text-sm font-bold text-[#451A03] leading-snug">
                            {cartItem.item.name}
                          </h4>
                          <span className="text-[11px] font-semibold text-[#B45309] block">
                            ₹{unitPrice} each
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-[#A87954] hover:text-red-700 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      {cartItem.selectedOptions && (
                        <div className="text-[10px] text-[#78350F] space-y-0.5">
                          {cartItem.selectedOptions.jainPreparation && (
                            <span className="inline-block bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded mr-1">
                              Jain preparation
                            </span>
                          )}
                          {cartItem.selectedOptions.extraGheePodi && (
                            <span className="inline-block bg-amber-100 text-[#9A3412] px-1.5 py-0.2 rounded mr-1">
                              + Extra A2 Ghee Podi (₹25)
                            </span>
                          )}
                          {cartItem.selectedOptions.coffeeSweetness && (
                            <span className="inline-block bg-amber-100 text-[#9A3412] px-1.5 py-0.2 rounded mr-1">
                              Sugar: {cartItem.selectedOptions.coffeeSweetness.replace('_', ' ')}
                            </span>
                          )}
                          {cartItem.selectedOptions.specialInstructions && (
                            <p className="italic text-[#A87954]">
                              &quot;{cartItem.selectedOptions.specialInstructions}&quot;
                            </p>
                          )}
                        </div>
                      )}

                      {/* Quantity Stepper & Subtotal */}
                      <div className="pt-2 border-t border-[#F3EADA] flex items-center justify-between">
                        <div className="flex items-center gap-2 border border-[#E7DECD] rounded-lg p-0.5 bg-[#FAF7F2]">
                          <button
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity - 1)}
                            className="p-1 text-[#78350F] hover:bg-white rounded cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#451A03] px-2 tabular-nums">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                            className="p-1 text-[#78350F] hover:bg-white rounded cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-[#451A03] tabular-nums">
                          ₹{itemTotal}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo Coupon Code */}
              <div className="p-3 bg-white rounded-xl border border-[#E7DECD]">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-3.5 h-3.5 text-[#B45309]" />
                  <span className="text-xs font-bold text-[#451A03]">Have a Coupon?</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter VEDANTAM15"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={discountApplied}
                    className="flex-1 p-2 text-xs bg-[#FAF7F2] border border-[#E7DECD] rounded-lg text-[#451A03] uppercase font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={discountApplied || !promoCode}
                    className="px-3 py-2 text-xs font-bold text-white bg-[#B45309] hover:bg-[#92400E] disabled:opacity-50 rounded-lg cursor-pointer"
                  >
                    {discountApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {discountApplied && (
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                    ✓ 15% South Indian Welcome discount applied!
                  </p>
                )}
                {discountError && (
                  <p className="text-[11px] text-red-600 mt-1">{discountError}</p>
                )}
              </div>

              {/* Customer Contact Inputs */}
              <div className="p-3 bg-white rounded-xl border border-[#E7DECD] space-y-2">
                <span className="text-xs font-bold text-[#451A03] block">
                  Contact & Fulfillment Information
                </span>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full p-2 text-xs bg-[#FAF7F2] border border-[#E7DECD] rounded-lg text-[#451A03]"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number (for updates) *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  className="w-full p-2 text-xs bg-[#FAF7F2] border border-[#E7DECD] rounded-lg text-[#451A03]"
                />
                <input
                  type="text"
                  placeholder={
                    orderType === 'dinein'
                      ? 'Table Number (e.g. Table 4) or Seating Request'
                      : orderType === 'takeaway'
                      ? 'Pickup Name / Vehicle No.'
                      : 'Delivery Address in Vaishali / Ghaziabad'
                  }
                  value={tableOrAddress}
                  onChange={(e) => setTableOrAddress(e.target.value)}
                  className="w-full p-2 text-xs bg-[#FAF7F2] border border-[#E7DECD] rounded-lg text-[#451A03]"
                />
              </div>

              {/* Bill Details */}
              <div className="p-3.5 bg-[#FAF0E1] rounded-xl border border-[#E7DECD] space-y-1.5 text-xs text-[#78350F]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="tabular-nums">₹{subtotal}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Coupon Discount (15%):</span>
                    <span className="tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span className="tabular-nums">₹{gstAmount}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Charge:</span>
                    <span className="tabular-nums">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#E7DECD] flex justify-between font-bold text-sm text-[#451A03]">
                  <span>Total Amount:</span>
                  <span className="tabular-nums text-base text-[#9A3412]">₹{grandTotal}</span>
                </div>
              </div>

            </div>

            {/* Footer Checkout Action */}
            <div className="p-4 bg-[#FAF0E1] border-t border-[#E7DECD]">
              <button
                onClick={handlePlaceOrder}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#9A3412] hover:bg-[#7C2D12] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Order · ₹{grandTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
