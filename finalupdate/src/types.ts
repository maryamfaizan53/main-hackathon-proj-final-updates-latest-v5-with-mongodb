// src/types.ts
export interface Product {
  id?: string;       // optional, if you're transitioning from ID-based
  slug?: string;     // optional, if you prefer slug-based
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  image?: string;    // from your GROQ query "image": imagePath
  imagePath?: string; // old or fallback
  category?: {
    title?: string;
  };
}
