// src/types.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  createdAt: string;
  imageUrls?: string[];
}

export interface ProductImage {
  id: string;
  productId: string;
  imagePath: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
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

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
}
