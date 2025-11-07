import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getProductDetails } from 'wasp/client/operations';
import { useParams, Link } from 'wasp/client/router';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { data: product, isLoading, error } = useQuery(getProductDetails, { slug });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-4">{product.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {product.media.map(media => (
          <img key={media.id} src={media.url} alt={product.name} className="w-full h-auto rounded-lg" />
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <ul>
          {product.variants.map(variant => (
            <li key={variant.id} className="my-2">
              <span className="font-medium">Color:</span> {variant.color} {variant.size && <span> - <span className="font-medium">Size:</span> {variant.size}</span>}
            </li>
          ))}
        </ul>
      </div>
      <Link to="/shop" className="text-blue-500 hover:underline mt-4 inline-block">Back to Shop</Link>
    </div>
  );
}

export default ProductDetailPage;
