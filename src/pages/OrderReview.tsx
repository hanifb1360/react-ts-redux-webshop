
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

const OrderReview: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="container mx-auto p-6 pt-20">
      <h2 className="text-3xl font-bold mb-6">Order Review</h2>
      {cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.productId} className="flex justify-between items-center mb-2 p-2 border-b">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">Your cart is empty.</p>
      )}
    </div>
  );
};

export default OrderReview;

