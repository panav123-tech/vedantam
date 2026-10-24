export type MenuCategory = 'all' | 'thatte_idlis' | 'dosas' | 'vadas_starters' | 'meals_rice' | 'beverages_sweets';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: MenuCategory;
  price: number;
  description: string;
  image?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isJainAvailable?: boolean;
  calories?: string;
  accompaniments?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOptions?: {
    jainPreparation?: boolean;
    extraGheePodi?: boolean;
    coffeeSweetness?: 'regular' | 'less_sugar' | 'no_sugar';
    specialInstructions?: string;
  };
}

export interface ReservationDetails {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: 'main_hall' | 'courtyard' | 'tiffin_express';
  occasion?: string;
  specialRequests?: string;
}

export interface UserReview {
  id: string;
  author: string;
  authorType?: string; // e.g. "Local Guide · 236 reviews"
  rating: number;
  relativeTime: string;
  text: string;
  tags?: string[];
  ownerReply?: {
    date: string;
    text: string;
  };
  likesCount?: number;
}
