// src/pages/Shop.tsx
import React from 'react';
import Layout from '../components/Layout';
import CollapsibleMenu from '../components/CollapsibleMenu';
import ProductList from '../components/ProductList';

const Shop: React.FC = () => {
  return (
    <Layout>
      <div className="flex h-screen">
        <CollapsibleMenu />
        <div className="flex-1 p-4 overflow-y-auto">
          <ProductList />
        </div>
      </div>
    </Layout>
  );
};

export default Shop;




