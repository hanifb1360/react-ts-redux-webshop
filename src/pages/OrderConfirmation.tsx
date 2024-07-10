
import React from 'react';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold mb-6">Order Confirmation</h2>
        <p className="mb-4">Thank you for your purchase! Your order has been placed successfully.</p>
        <p className="text-gray-700">You will receive an email confirmation shortly.</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;

