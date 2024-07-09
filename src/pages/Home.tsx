import React from 'react';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="hero bg-gray-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to WEBSHOP</h1>
        <p className="mt-4 text-xl">Find the best products for you</p>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add product cards here */}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
