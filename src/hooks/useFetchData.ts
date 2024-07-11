import { useDispatch } from 'react-redux';
import { setCategories } from '../slices/categorySlice';
import { setProducts } from '../slices/productSlice';
import { setWishlist } from '../slices/wishlistSlice';
import supabase from '../supabase/supabaseClient';

const useFetchData = () => {
  const dispatch = useDispatch();

  /**
   * Fetches categories from Supabase and dispatches the setCategories action with the fetched data.
   */
  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      dispatch(setCategories(data));
    }
  };

  /**
   * Fetches products from Supabase and dispatches the setProducts action with the fetched data.
   */
  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      dispatch(setProducts(data));
    }
  };

  /**
   * Fetches wishlist items for a specific user from Supabase and dispatches the setWishlist action with the fetched data.
   * @param userId - The ID of the user whose wishlist items are to be fetched.
   */
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

