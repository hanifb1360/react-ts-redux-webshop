// src/components/ProductModal.tsx
import React from 'react';
import { Product } from '../types';
import useCartActions from '../hooks/useCartActions';
import useWishlistActions from '../hooks/useWishlistActions';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { handleAddToCart } = useCartActions();
  const { handleAddToWishlist } = useWishlistActions();

  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p className="mb-4">{product.description}</p>
        <p className="mb-4 text-green-600 font-semibold">${product.price}</p>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
          onClick={() => handleAddToWishlist(product.id)}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductModal;





