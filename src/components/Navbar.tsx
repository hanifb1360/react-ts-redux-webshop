// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateHamburger, setAnimateHamburger] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setAnimateHamburger(!menuOpen);
    setAnimateClose(menuOpen);
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="navbar fixed w-full top-0 bg-black text-white p-4 flex justify-between items-center z-50">
      <Link to="/" className="navbar-brand">WEBSHOP</Link>
      <div className="flex items-center">
        <Link to="/cart" className="mr-4">
          <FaShoppingCart className="text-2xl" />
        </Link>
        <Link to="/profile" className="mr-4">
          <FaUser className="text-2xl" />
        </Link>
        <FaBars className={`hamburger-icon ${animateHamburger ? 'animate' : ''}`} onClick={toggleMenu} />
      </div>
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <FaTimes className={`close-icon ${animateClose ? 'animate' : ''}`} onClick={toggleMenu} />
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          <li><Link to="/shop" onClick={toggleMenu}>Shop</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;


