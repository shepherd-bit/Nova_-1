export interface ProductImage {
  url?: string;
  gradient: string;
  emoji: string;
  src?: string;
  label: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  superCategory: 'Smartphones' | 'Laptops' | 'Audio' | 'Wearables' | 'Computing' | string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: ProductImage[];
  specs: Record<string, string>;
  description: string;
  features: string[];
  box: string[];
  colors: ProductColor[];
  inStock: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isPromo: boolean;
}

export interface CartItem {
  id: string;
  color: string;
  qty: number;
  product: Product;
}

export interface ToastItem {
  id: number;
  msg: string;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  price: [number, number];
  rating: number;
  inStock: boolean;
  onSale: boolean;
  isNew: boolean;
  colors: string[];
}

export interface CheckoutFormData {
  email: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  shipping: string;
  card: string;
  expiry: string;
  cvc: string;
}

export interface OrderConfirmation {
  orderRef: string;
  estimatedDelivery: string;
  trackingNumber: string;
  total: number;
  items: CartItem[];
  customer: CheckoutFormData;
  isSimulated?: boolean;
}
