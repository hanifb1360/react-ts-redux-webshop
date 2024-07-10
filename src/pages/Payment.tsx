
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Mock payment processing
    setTimeout(() => {
      navigate('/order-confirmation');
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 pt-20">
      <h2 className="text-3xl font-bold mb-6">Payment</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">Enter your payment details:</p>
        {/* Mock payment form */}
        <div className="mb-4">
          <label className="block mb-2">Card Number</label>
          <input type="text" className="border p-2 w-full rounded" placeholder="1234 5678 9012 3456" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Expiration Date</label>
          <input type="text" className="border p-2 w-full rounded" placeholder="MM/YY" />
        </div>
        <div className="mb-4">
          <label className="block mb-2">CVV</label>
          <input type="text" className="border p-2 w-full rounded" placeholder="123" />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;

