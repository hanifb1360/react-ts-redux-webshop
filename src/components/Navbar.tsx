// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  // State for controlling the menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);
  // State for controlling the animation of the hamburger icon
  const [animateHamburger, setAnimateHamburger] = useState(false);
  // State for controlling the animation of the close icon
  const [animateClose, setAnimateClose] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Function to toggle the menu and animations
  const toggleMenu = () => {
    setAnimateHamburger(!menuOpen);
    setAnimateClose(menuOpen);
    setMenuOpen(!menuOpen);
  };

  // Function to handle user sign-out and navigation to the login page
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="navbar fixed w-full top-0 bg-black text-white p-4 flex justify-between items-center z-50">
      {/* Navbar brand linking to the home page */}
      <Link to="/" className="navbar-brand">WEBSHOP</Link>
      <div className="flex items-center">
        {/* Link to the cart page */}
        <Link to="/cart" className="mr-4">
          <FaShoppingCart className="text-2xl" />
        </Link>
        {/* Link to the profile page */}
        <Link to="/profile" className="mr-4">
          <FaUser className="text-2xl" />
        </Link>
        {/* Hamburger icon for toggling the menu */}
        <FaBars className={`hamburger-icon ${animateHamburger ? 'animate' : ''}`} onClick={toggleMenu} />
      </div>
      {/* Collapsible menu */}
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        {/* Close icon for collapsing the menu */}
        <FaTimes className={`close-icon ${animateClose ? 'animate' : ''}`} onClick={toggleMenu} />
        <ul>
          {/* Navigation links */}
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



