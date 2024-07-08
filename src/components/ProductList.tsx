
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
