import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { createOrder } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const CheckoutPage = () => {
  const createOrderFn = useAction(createOrder);
  const [cartItems, setCartItems] = useState([]); // Assume cartItems are fetched or passed down
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const order = await createOrderFn({ cartItems });
      // Redirect to success page or handle Stripe payment
      console.log('Order created successfully:', order);
    } catch (err) {
      setError('Failed to create order. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isProcessing ? (
        <div>Processing...</div>
      ) : (
        <button
          onClick={handleCheckout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Proceed to Payment
        </button>
      )}
      <div className="mt-4">
        <Link to="/cart" className="text-blue-500 hover:underline">
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
