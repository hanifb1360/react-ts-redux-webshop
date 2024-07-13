// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProducts } from '../slices/productSlice';
import supabase from '../supabase/supabaseClient';
import { useCategoryContext } from '../context/CategoryContext';
import ProductModal from './ProductModal';
import { Product, ProductAvailability } from '../types';

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
      } else if (data) {
        dispatch(setProducts(data.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: product.category_id,
          availability: product.availability as ProductAvailability,
          createdAt: product.created_at,
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

  const openProductModal = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="p-4">
      {selectedCategory ? (
        filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="p-4 border rounded mb-4 cursor-pointer" onClick={() => openProductModal(product.id)}>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-green-600 font-semibold">${product.price}</p>
              <p className={`text-sm ${product.availability === ProductAvailability.InStock ? 'text-green-500' : 'text-red-500'}`}>
                {product.availability}
              </p>
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
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductList;


























