import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const HomePage = () => {
  const { data: products, isLoading, error } = useQuery(getProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 bg-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to Ayunath</h1>
      <h2 className="text-xl mb-2">Featured Ayurvedic Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="p-4 bg-slate-50 rounded-lg">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm">{product.description}</p>
            <p className="text-sm font-bold">${product.price}</p>
            <Link to={`/product/${product.slug}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
