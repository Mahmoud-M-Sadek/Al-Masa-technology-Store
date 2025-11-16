
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

export interface CustomerInfo {
    name: string;
    address: string;
    phone: string;
}

export interface Order {
    id: number;
    customer: CustomerInfo;
    items: CartItem[];
    total: number;
    date: string;
}
