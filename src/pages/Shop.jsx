import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const ShopPage = () => {
  const { data: products, isLoading, error } = useQuery(getProducts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={product.media[0]?.url} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-800 font-semibold">${product.price.toFixed(2)}</p>
            <Link to={`/product/${product.slug}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShopPage;
