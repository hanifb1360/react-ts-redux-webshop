import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../src/types';
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
                <Route path={AppRoutes.Home} element={<Home />} />
                <Route path={AppRoutes.About} element={<About />} />
                <Route path={AppRoutes.Contact} element={<Contact />} />
                <Route path={AppRoutes.Shop} element={<Shop />} />
                <Route path={AppRoutes.Cart} element={<Cart />} />
                <Route path={AppRoutes.Profile} element={<Profile />} />
                <Route path={AppRoutes.OrderReview} element={<OrderReview />} />
                <Route path={AppRoutes.Payment} element={<Payment />} />
                <Route path={AppRoutes.OrderConfirmation} element={<OrderConfirmation />} />
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














