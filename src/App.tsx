// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext';
import { CategoryProvider } from './context/CategoryContext';
import Navbar from './components/Navbar';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <CategoryProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CategoryProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
















