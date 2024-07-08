
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import supabase from '../supabaseClient';
import { setCategories } from '../slices/categorySlice';
import { setProducts } from '../slices/productSlice';
import { setWishlist } from '../slices/wishlistSlice';

const useFetchData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*');
      if (data) dispatch(setCategories(data));
    };

    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      if (data) dispatch(setProducts(data));
    };

    const fetchWishlist = async () => {
      const { data } = await supabase.from('wishlist').select('*');
      if (data) dispatch(setWishlist(data));
    };

    fetchCategories();
    fetchProducts();
    fetchWishlist();
  }, [dispatch]);
};

export default useFetchData;
