
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import Wishlist from './components/Wishlist';
import { AuthProvider } from './context/AuthContext';
import useFetchData from './hooks/useFetchData';

const App: React.FC = () => {
  useFetchData();

  return (
    <AuthProvider>
      <Router>
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-8">Webshop</h1>
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
