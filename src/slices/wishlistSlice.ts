// src/slices/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem } from '../types';

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      state.items.push(action.payload);
    },
    setWishlist(state, action: PayloadAction<WishlistItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { addToWishlist, setWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;


