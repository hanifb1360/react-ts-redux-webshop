// src/slices/categorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Category interface representing the structure of a category
interface Category {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
}

// Define the CategoryState interface representing the state structure for categories
interface CategoryState {
  categories: Category[];
}

// Initialize the state with an empty categories array
const initialState: CategoryState = {
  categories: [],
};

// Create a slice for categories with initial state, reducers, and actions
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Reducer to set the categories in the state
    setCategories(state, action: PayloadAction<Category[]>) {
      // Update the state with the categories provided in the action payload
      state.categories = action.payload;
    },
  },
});

// Export the action to set categories
export const { setCategories } = categorySlice.actions;
// Export the reducer to be used in the store
export default categorySlice.reducer;

