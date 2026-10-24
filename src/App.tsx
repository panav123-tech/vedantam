/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PopularTimes } from './components/PopularTimes';
import { MenuSection } from './components/MenuSection';
import { StorySection } from './components/StorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { MenuItem, CartItem } from './types/restaurant';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [addedItemToast, setAddedItemToast] = useState<string | null>(null);

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAddToCart = (
    item: MenuItem,
    options?: {
      jainPreparation?: boolean;
      extraGheePodi?: boolean;
      coffeeSweetness?: 'regular' | 'less_sugar' | 'no_sugar';
      specialInstructions?: string;
    }
  ) => {
    setCartItems((prev) => {
      // Find matching item with same options
      const existingIdx = prev.findIndex((ci) => {
        if (ci.item.id !== item.id) return false;
        const o1 = ci.selectedOptions;
        const o2 = options;
        return (
          o1?.jainPreparation === o2?.jainPreparation &&
          o1?.extraGheePodi === o2?.extraGheePodi &&
          o1?.coffeeSweetness === o2?.coffeeSweetness &&
          o1?.specialInstructions === o2?.specialInstructions
        );
      });

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      } else {
        return [...prev, { item, quantity: 1, selectedOptions: options }];
      }
    });

    // Show temporary toast
    setAddedItemToast(`Added "${item.name}" to your order bag!`);
    setTimeout(() => {
      setAddedItemToast(null);
    }, 2800);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], quantity: newQty };
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C241E]">
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenOrder={() => {
            const menuEl = document.getElementById('menu');
            menuEl?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <PopularTimes />

        <MenuSection onAddToCart={handleAddToCart} />

        <StorySection />

        <ReviewsSection />

        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Item Added Toast Notification */}
      {addedItemToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#451A03] text-white px-5 py-3 rounded-xl shadow-xl border border-amber-300/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-semibold">{addedItemToast}</span>
          <button
            onClick={() => {
              setAddedItemToast(null);
              setIsCartOpen(true);
            }}
            className="text-xs font-bold text-amber-300 hover:text-white underline cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Floating Bottom Quick Action for Mobile if Cart has items */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 right-4 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#9A3412] text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 font-bold text-xs uppercase tracking-wider cursor-pointer border-2 border-white"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag ({totalCartCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
