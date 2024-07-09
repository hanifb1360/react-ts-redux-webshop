import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProducts } from '../slices/productSlice';
import supabase from '../supabaseClient';
import './ProductList.css';
import { useCategoryContext } from '../context/CategoryContext';

// Define the Product interface within the same file
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  createdAt: string;
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { selectedCategory } = useCategoryContext();

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

  return (
    <div className="product-list">
      {selectedCategory ? (
        filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products available for this category.</p>
        )
      ) : (
        <p>Please select a category to view products.</p>
      )}
    </div>
  );
};

export default ProductList;













