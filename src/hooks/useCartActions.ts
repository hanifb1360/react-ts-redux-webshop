// src/hooks/useCartActions.ts
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../slices/cartSlice';
import { Product } from '../types';

const useCartActions = () => {
  const dispatch = useDispatch();

  /**
   * Adds a product to the cart.
   * Creates a cart item with the product details and dispatches the addToCart action.
   * @param product - The product to add to the cart.
   */
  const handleAddToCart = (product: Product) => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };

  /**
   * Removes a product from the cart.
   * Dispatches the removeFromCart action with the product ID.
   * @param productId - The ID of the product to remove from the cart.
   */
  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  /**
   * Clears all items from the cart.
   * Dispatches the clearCart action.
   */
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return { handleAddToCart, handleRemoveFromCart, handleClearCart };
};

export default useCartActions;




