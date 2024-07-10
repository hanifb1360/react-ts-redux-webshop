// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            &copy; 2024 WEBSHOP. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

