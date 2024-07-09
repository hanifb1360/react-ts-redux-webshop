// src/components/Navbar.tsx
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">WEBSHOP</div>
      <FaBars className="hamburger-icon" onClick={toggleMenu} />
      <CSSTransition in={menuOpen} timeout={300} classNames="menu" unmountOnExit>
        <div className="menu">
          <FaTimes className="close-icon" onClick={toggleMenu} />
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Shop</li>
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Navbar;
