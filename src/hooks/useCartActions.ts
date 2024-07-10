// src/hooks/useCartActions.ts
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../slices/cartSlice';
import { Product } from '../types';

const useCartActions = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return { handleAddToCart, handleRemoveFromCart, handleClearCart };
};

export default useCartActions;



