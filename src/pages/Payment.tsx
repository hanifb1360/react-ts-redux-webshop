import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();

  // Mock payment processing function
  const handlePayment = () => {
    // Simulate payment processing delay
    setTimeout(() => {
      // Navigate to order confirmation page after payment
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

/*
 * For a real-world application, consider integrating a payment gateway to handle payments securely.
 * Some popular options include:
 * 
 * 1. Stripe:
 *    - Provides easy-to-use APIs for integrating payment processing.
 *    - Supports various payment methods including credit/debit cards, Apple Pay, Google Pay, etc.
 *    - Offers features like subscriptions, fraud prevention, and more.
 *    - Documentation: https://stripe.com/docs
 * 
 * 2. PayPal:
 *    - Another widely used payment processor that supports multiple payment methods.
 *    - Offers a straightforward integration process.
 *    - Provides options for one-time payments and recurring billing.
 *    - Documentation: https://developer.paypal.com/docs/api/overview/
 * 
 * 3. Square:
 *    - Known for its user-friendly interface and ease of integration.
 *    - Supports point-of-sale payments, e-commerce, and in-app payments.
 *    - Offers a variety of developer tools and resources.
 *    - Documentation: https://developer.squareup.com/docs
 * 
 * 4. Adyen:
 *    - A global payment processor that supports a wide range of payment methods and currencies.
 *    - Suitable for large-scale and international businesses.
 *    - Provides comprehensive APIs and detailed documentation.
 *    - Documentation: https://docs.adyen.com/
 * 
 * When integrating any payment gateway, make sure to follow best practices for security, including handling sensitive data like card numbers securely and complying with PCI-DSS standards.
 */
