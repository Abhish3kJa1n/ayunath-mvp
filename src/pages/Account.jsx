import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getOrderHistory } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const AccountPage = () => {
  const { data: orders, isLoading, error } = useQuery(getOrderHistory);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Account Details</h1>
      <h2 className='text-xl mb-2'>Order History</h2>
      <div className='space-y-4'>
        {orders.map(order => (
          <div key={order.id} className='p-4 bg-slate-50 rounded-lg shadow'>
            <h3 className='text-lg font-semibold'>Order ID: {order.id}</h3>
            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
            <div className='mt-2'>
              <h4 className='font-semibold'>Items:</h4>
              <ul className='list-disc ml-5'>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.quantity} x {item.product.name} - ${item.product.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <Link to={`/order/${order.id}`} className='text-blue-500 hover:underline mt-2 inline-block'>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountPage;
