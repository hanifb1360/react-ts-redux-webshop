import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
}

interface WishlistState {
  wishlist: WishlistItem[];
}

const initialState: WishlistState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishlistItem[]>) {
      state.wishlist = action.payload;
    },
    addWishlistItem(state, action: PayloadAction<WishlistItem>) {
      state.wishlist.push(action.payload);
    },
    removeWishlistItem(state, action: PayloadAction<string>) {
      state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
    },
  },
});

export const { setWishlist, addWishlistItem, removeWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
