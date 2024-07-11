// src/slices/ordersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types';

interface OrdersState {
  orders: Order[];
}

// Initial state for the orders slice
const initialState: OrdersState = {
  orders: [],
};

// Create the orders slice with actions and reducers
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Action to add a new order to the state
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    // Action to set the orders in the state
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
  },
});

// Export actions to be used in components
export const { addOrder, setOrders } = ordersSlice.actions;

// Export the reducer to be included in the store
export default ordersSlice.reducer;
