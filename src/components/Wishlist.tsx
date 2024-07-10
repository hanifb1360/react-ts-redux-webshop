// src/components/Wishlist.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Product, WishlistItem } from '../types';

const Wishlist: React.FC = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items as WishlistItem[]);
  const products = useSelector((state: RootState) => state.products.products as Product[]);

  const wishlistItems = wishlist.map((item) =>
    products.find((product) => product.id === item.productId)
  );

  console.log('Wishlist items:', wishlistItems);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <div className="grid grid-cols-3 gap-4">
        {wishlistItems.map(
          (item) =>
            item && (
              <div key={item.id} className="border p-4 rounded">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p>{item.description}</p>
                <p>${item.price}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Wishlist;





