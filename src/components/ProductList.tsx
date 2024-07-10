// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProducts } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';
import { addToWishlist } from '../slices/wishlistSlice';
import supabase from '../supabaseClient';
import { useCategoryContext } from '../context/CategoryContext';
import ProductModal from './ProductModal';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { selectedCategory } = useCategoryContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      }
      if (data) {
        dispatch(setProducts(data.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: product.category_id,
          createdAt: product.created_at,
          imageUrls: [], // Add a default value for imageUrls
        }))));
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.categoryId === selectedCategory));
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ productId: product.id, name: product.name, quantity: 1 }));
  };

  const handleAddToWishlist = (productId: string) => {
    console.log(`Dispatching addToWishlist for product: ${productId}`);
    dispatch(addToWishlist(productId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
      {selectedCategory ? (
        filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleProductClick(product)}
            >
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="mb-2">{product.description}</p>
              <p className="text-green-600 font-semibold">${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products available for this category.</p>
        )
      ) : (
        <p>Please select a category to view products.</p>
      )}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          addToCart={handleAddToCart}
          addToWishlist={handleAddToWishlist}
        />
      )}
    </div>
  );
};

export default ProductList;




















