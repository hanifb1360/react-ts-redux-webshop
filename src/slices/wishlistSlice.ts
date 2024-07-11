// src/slices/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem } from '../types';

interface WishlistState {
  items: WishlistItem[];
}

// Initial state for the wishlist slice
const initialState: WishlistState = {
  items: [],
};

// Create the wishlist slice with actions and reducers
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Action to add a new item to the wishlist
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      state.items.push(action.payload);
    },
    // Action to set the wishlist items in the state
    setWishlist(state, action: PayloadAction<WishlistItem[]>) {
      state.items = action.payload;
    },
  },
});

// Export actions to be used in components
export const { addToWishlist, setWishlist } = wishlistSlice.actions;

// Export the reducer to be included in the store
export default wishlistSlice.reducer;


