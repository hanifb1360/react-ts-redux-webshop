import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './ProductModal.css';

interface ProductModalProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  images: string[];
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, images, onClose }) => {
  return (
    <div className="product-modal">
      <div className="product-modal-content">
        <FaTimes className="close-icon" onClick={onClose} />
        <h2>{product.name}</h2>
        <div className="product-carousel">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`${product.name} ${index + 1}`} />
          ))}
        </div>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default ProductModal;
