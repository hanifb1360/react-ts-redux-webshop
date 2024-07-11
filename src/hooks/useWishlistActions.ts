// src/hooks/useWishlistActions.ts
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../slices/wishlistSlice';
import { Product } from '../types';

const useWishlistActions = () => {
  const dispatch = useDispatch();

  // Function to handle adding a product to the wishlist
  const handleAddToWishlist = (product: Product) => {
    // Create a wishlist item from the product details
    const wishlistItem = {
      productId: product.id,
      productName: product.name,
      productDescription: product.description,
      productPrice: product.price,
      productImageUrl: product.imageUrls ? product.imageUrls[0] : '',
    };
    // Dispatch an action to add the item to the wishlist in the Redux store
    dispatch(addToWishlist(wishlistItem));
  };

  return { handleAddToWishlist };
};

export default useWishlistActions;

