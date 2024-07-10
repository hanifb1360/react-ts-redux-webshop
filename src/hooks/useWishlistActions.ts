// src/hooks/useWishlistActions.ts
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../slices/wishlistSlice';

const useWishlistActions = () => {
  const dispatch = useDispatch();

  const handleAddToWishlist = (productId: string) => {
    dispatch(addToWishlist(productId));
  };

  return { handleAddToWishlist };
};

export default useWishlistActions;
