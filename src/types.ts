export interface NutritionProfile {
  vitaminC: number; // percentage (e.g. 120 for 120%)
  calories: number; // kcal
  naturalSugars: number; // grams
  potassium: number; // mg
  calcium: number; // percentage
}

export type JuiceCategory = 'orange' | 'mango' | 'apple' | 'berry' | 'all';

export interface JuiceProduct {
  id: string;
  name: string;
  tagline: string;
  category: JuiceCategory;
  badge: string;
  description: string;
  price: number;
  image: string;
  isBestSeller?: boolean;
  colorTheme: 'orange' | 'mango' | 'apple' | 'berry' | 'apple-light' | 'pink' | 'verdant';
  nutrition: NutritionProfile;
  sweetness: number; // 1-5
  pulp: number; // 1-5 (consistency)
  energy: number; // 1-5
  benefits: string[];
}

export interface CartItem {
  id: string; // can be productId, or bundle-uuid
  product?: JuiceProduct; // undefined if bundle
  quantity: number;
  isBundle?: boolean;
  bundleName?: string;
  bundlePrice?: number;
  bundleBottles?: { [productId: string]: number }; // map of product id to quantity inside this bundle
}

export interface TimelineStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  badges?: string[];
  image: string;
  location?: string;
  locationPinImg?: string;
  latLng?: { x: number; y: number }; // Relative percentage coordinates for India pin
  actionLabel?: string;
  details?: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  bottles: number;
  interval: 'weekly' | 'biweekly';
  savings: number; // percentage (e.g. 15 for 15%)
  isPopular?: boolean;
  badge?: string;
  description: string;
  benefits: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: {
      orange?: number;
      mango?: number;
      apple?: number;
      berry?: number;
    };
  }[];
}
