import { combineReducers } from 'redux';
import userReducer from './userSlice';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import wishlistReducer from './wishlistSlice';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  products: productReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
