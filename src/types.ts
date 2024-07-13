export enum ProductAvailability {
  InStock = 'InStock',
  OutOfStock = 'OutOfStock',
  Discontinued = 'Discontinued',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  availability: ProductAvailability;
  createdAt: string;
  imageUrls?: string[];
}


export interface WishlistItem {
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImageUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
}



export enum CategoryType {
  MainCategory = 'MainCategory',
  SubCategory = 'SubCategory',
}
export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  parentId: string | null;
  createdAt: string;
}
export interface CategoryContextProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}



export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export enum AppRoutes {
  Home = '/',
  About = '/about',
  Contact = '/contact',
  Shop = '/shop',
  Cart = '/cart',
  Profile = '/profile',
  OrderReview = '/order-review',
  Payment = '/payment',
  OrderConfirmation = '/order-confirmation',
}
