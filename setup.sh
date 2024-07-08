#!/bin/bash

# Create directories
mkdir -p src/{components,hooks,slices}
touch src/{store.ts,supabaseClient.ts}
touch src/slices/{index.ts,userSlice.ts,categorySlice.ts,productSlice.ts,wishlistSlice.ts}
touch src/hooks/useFetchData.ts
touch src/components/{CategoryList.tsx,ProductList.tsx,Wishlist.tsx}

# Add initial content to files

# src/store.ts
cat <<EOL > src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './slices';

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;
EOL

# src/supabaseClient.ts
cat <<EOL > src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
EOL

# src/slices/index.ts
cat <<EOL > src/slices/index.ts
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
EOL

# src/slices/userSlice.ts
cat <<EOL > src/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  email: string | null;
  name: string | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    clearUser(state) {
      state.id = null;
      state.email = null;
      state.name = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
EOL

# src/slices/categorySlice.ts
cat <<EOL > src/slices/categorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  id: string;
  name: string;
  parentId?: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
EOL

# src/slices/productSlice.ts
cat <<EOL > src/slices/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imagePath: string[];
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
EOL

# src/slices/wishlistSlice.ts
cat <<EOL > src/slices/wishlistSlice.ts
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
EOL

# src/hooks/useFetchData.ts
cat <<EOL > src/hooks/useFetchData.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import supabase from '../supabaseClient';
import { setCategories } from '../slices/categorySlice';
import { setProducts } from '../slices/productSlice';
import { setWishlist } from '../slices/wishlistSlice';

const useFetchData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*');
      dispatch(setCategories(data));
    };

    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      dispatch(setProducts(data));
    };

    const fetchWishlist = async () => {
      const { data } = await supabase.from('wishlist').select('*');
      dispatch(setWishlist(data));
    };

    fetchCategories();
    fetchProducts();
    fetchWishlist();
  }, [dispatch]);
};

export default useFetchData;
EOL

# src/components/CategoryList.tsx
cat <<EOL > src/components/CategoryList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const CategoryList: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id} className="mb-2">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
EOL

# src/components/ProductList.tsx
cat <<EOL > src/components/ProductList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="font-bold">\${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
EOL

# src/components/Wishlist.tsx
cat <<EOL > src/components/Wishlist.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Wishlist: React.FC = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const products = useSelector((state: RootState) => state.products.products);

  const wishlistItems = wishlist.map(item => products.find(product => product.id === item.productId));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <div className="grid grid-cols-3 gap-4">
        {wishlistItems.map(item => item && (
          <div key={item.id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p>{item.description}</p>
            <p className="font-bold">\${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
EOL

echo "Setup script executed successfully."
