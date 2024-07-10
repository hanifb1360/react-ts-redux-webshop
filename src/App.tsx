
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { CategoryProvider } from './context/CategoryContext';
import './App.css';
import OrderReview from './pages/OrderReview';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <CategoryProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/order-review" element={<OrderReview />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                </Routes>
              </div>
            
            <Footer />
          </div>
        </CategoryProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;

















