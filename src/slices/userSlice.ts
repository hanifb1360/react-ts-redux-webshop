// src/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// Define the UserState interface representing the structure of the user state
interface UserState {
  id: string | null;
  email: string | null;
  name: string | null;
}

// Initialize the state with null values for id, email, and name
const initialState: UserState = {
  id: null,
  email: null,
  name: null,
};

// Create a slice for user with initial state, reducers, and actions
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer to set the user information in the state
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    // Reducer to clear the user information in the state
    clearUser(state) {
      state.id = null;
      state.email = null;
      state.name = null;
    },
  },
});

// Export the actions to set and clear user information
export const { setUser, clearUser } = userSlice.actions;
// Export the reducer to be used in the store
export default userSlice.reducer;
