// src/pages/Cart.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';
import useFetchUser from '../hooks/useFetchUser';
import useCartActions from '../hooks/useCartActions';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user, loading } = useFetchUser();
  const { handleRemoveFromCart, handleClearCart } = useCartActions();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert('You need to log in to proceed with checkout.');
      navigate('/login');
    } else {
      navigate('/order-review');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-20">
      <h2 className="text-2xl font-bold mb-4 pt-10">Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map((item: CartItem) => (
              <li key={item.productId} className="flex justify-between items-center mb-2 p-2 border-b">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFromCart(item.productId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleCheckout}
            >
              Checkout
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;






