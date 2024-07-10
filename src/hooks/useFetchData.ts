import { useDispatch } from 'react-redux';
import { setCategories } from '../slices/categorySlice';
import { setProducts } from '../slices/productSlice';
import { setWishlist } from '../slices/wishlistSlice';
import supabase from '../supabase/supabaseClient';

const useFetchData = () => {
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      dispatch(setCategories(data));
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      dispatch(setProducts(data));
    }
  };

  const fetchWishlist = async (userId: string) => {
    const { data, error } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', userId);
    if (error) {
      console.error('Error fetching wishlist:', error);
    } else {
      dispatch(setWishlist(data));
    }
  };

  return { fetchCategories, fetchProducts, fetchWishlist };
};

export default useFetchData;

