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

  // Return null if no product is selected to be shown in the modal
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
        {/* Close button for the modal */}
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        {/* Product name */}
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        {/* Product description */}
        <p className="mb-4">{product.description}</p>
        {/* Product price */}
        <p className="mb-4 text-green-600 font-semibold">${product.price}</p>
        {/* Button to add product to cart */}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
        {/* Button to add product to wishlist */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
          onClick={() => handleAddToWishlist(product)}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductModal;







