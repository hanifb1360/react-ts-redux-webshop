import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateHamburger, setAnimateHamburger] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);

  const toggleMenu = () => {
    setAnimateHamburger(!menuOpen);
    setAnimateClose(menuOpen);
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">WEBSHOP</div>
      <FaBars className={`hamburger-icon ${animateHamburger ? 'animate' : ''}`} onClick={toggleMenu} />
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
