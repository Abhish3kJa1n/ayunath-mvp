import React, { useState, useEffect } from 'react';
import { useAction, useQuery } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { addToCart } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const addToCartFn = useAction(addToCart);
  const { data: products, isLoading, error } = useQuery(getProducts);

  useEffect(() => {
    // Simulating fetching cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleCheckout = () => {
    // Logic to proceed to checkout, maybe redirect to a checkout page
    // This could involve setting up a checkout session with Stripe
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg">
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <p className="text-lg font-bold">${item.product.price * item.quantity}</p>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
      <Link to="/shop" className="text-blue-500 hover:underline mt-4 inline-block">
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartPage;
