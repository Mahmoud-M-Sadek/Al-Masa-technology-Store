
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  images: string[];
  category: Category;
  isAvailable: boolean;
  isBestSeller?: boolean;
}

export type Category = string;

export interface CartItem extends Product {
  quantity: number;
}