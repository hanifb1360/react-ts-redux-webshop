// src/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Adds an item to the cart.
     * If the item already exists in the cart, it increases the quantity.
     * If the item does not exist in the cart, it adds the item to the cart.
     * 
     * @param state - The current state of the cart.
     * @param action - The action containing the item to be added.
     */
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    
    /**
     * Removes an item from the cart.
     * 
     * @param state - The current state of the cart.
     * @param action - The action containing the product ID of the item to be removed.
     */
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    
    /**
     * Clears all items from the cart.
     * 
     * @param state - The current state of the cart.
     */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;




