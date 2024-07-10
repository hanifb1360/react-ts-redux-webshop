// src/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types';

// Load cart from local storage if available
const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn('Failed to load cart from local storage:', e);
    return [];
  }
};

// Save cart to local storage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.warn('Failed to save cart to local storage:', e);
  }
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      saveCartToLocalStorage(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.productId !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;

