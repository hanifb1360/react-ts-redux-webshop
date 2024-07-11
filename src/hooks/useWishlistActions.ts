// src/hooks/useWishlistActions.ts
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../slices/wishlistSlice';
import { Product } from '../types';

const useWishlistActions = () => {
  const dispatch = useDispatch();

  const handleAddToWishlist = (product: Product) => {
    const wishlistItem = {
      productId: product.id,
      productName: product.name,
      productDescription: product.description,
      productPrice: product.price,
      productImageUrl: product.imageUrls ? product.imageUrls[0] : '',
    };
    dispatch(addToWishlist(wishlistItem));
  };

  return { handleAddToWishlist };
};

export default useWishlistActions;

