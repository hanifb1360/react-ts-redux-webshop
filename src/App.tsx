// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import CollapsibleMenu from './components/CollapsibleMenu';
import ProductList from './components/ProductList';
import { AuthProvider } from './context/AuthContext';
import { CategoryProvider } from './context/CategoryContext';
import useFetchData from './hooks/useFetchData';
import './App.css';

const App: React.FC = () => {
  useFetchData();

  return (
    <AuthProvider>
      <Router>
        <CategoryProvider>
          <div className="app">
            <Navbar />
            <div className="main-content">
              <CollapsibleMenu />
              <ProductList />
            </div>
          </div>
        </CategoryProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;











