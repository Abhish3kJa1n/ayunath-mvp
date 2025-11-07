import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { adminCreateProduct } from 'wasp/client/operations';

const AdminPage = () => {
  const createProductFn = useAction(adminCreateProduct);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [variants, setVariants] = useState([{ color: '', size: '' }]);

  const handleAddVariant = () => {
    setVariants([...variants, { color: '', size: '' }]);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleCreateProduct = () => {
    createProductFn({
      name: productName,
      description: productDescription,
      price: productPrice,
      variants: variants
    });
    setProductName('');
    setProductDescription('');
    setProductPrice(0);
    setVariants([{ color: '', size: '' }]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Products</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          className="border p-2 mb-2 w-full"
        />
        <div>
          <h2 className="text-xl font-bold mb-2">Variants</h2>
          {variants.map((variant, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Color"
                value={variant.color}
                onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                className="border p-2"
              />
              <input
                type="text"
                placeholder="Size"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                className="border p-2"
              />
            </div>
          ))}
          <button onClick={handleAddVariant} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Variant
          </button>
        </div>
      </div>
      <button onClick={handleCreateProduct} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Create Product
      </button>
    </div>
  );
};

export default AdminPage;
