// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../supabase/supabaseClient';
import { RootState } from '../store';
import { setOrders } from '../slices/ordersSlice';
import { Order, WishlistItem, User } from '../types';
import { mapSupabaseUserToAppUser } from '../utils';
import AuthenticationForm from '../components/AuthenticationForm';

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    /**
     * Fetches the authenticated user's profile data.
     * Sets the user state and fetches the user's orders if a user is found.
     */
    const fetchProfileData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else if (data.user) {
        setUser(mapSupabaseUserToAppUser(data.user));
        await fetchOrders(data.user.id);
      }
      setLoading(false);
    };

    /**
     * Fetches the authenticated user's orders from the database.
     * Dispatches the orders to the Redux store.
     */
    const fetchOrders = async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId);
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        dispatch(setOrders(data || []));
      }
    };

    fetchProfileData();
  }, [navigate, dispatch]);

  /**
   * Handles user logout by signing out the user from Supabase.
   * Sets the user state to null to show the login form.
   * Redirects to the profile page.
   */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Set user to null to show the login form
    navigate('/profile');
  };

  /**
   * Toggles the authentication form between sign-up and login modes.
   */
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    /**
     * Listens for changes in the authentication state.
     * If a user is authenticated, sets the user state and redirects to the profile page.
     */
    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUserToAppUser(session.user));
        navigate('/profile');
      }
    });

    return () => {
      authListener.data?.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Profile</h2>
        {user ? (
          <div className="space-y-6">
            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="text-2xl font-semibold">User Information</h3>
              <p className="mt-2"><strong>Email:</strong> {user.email}</p>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>

            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="text-2xl font-semibold mb-2">Wishlist</h3>
              {wishlist.length > 0 ? (
                <ul className="space-y-2">
                  {wishlist.map((item: WishlistItem) => (
                    <li key={item.productId} className="border p-2 rounded bg-white shadow">
                      <h4 className="font-semibold">{item.productName}</h4>
                      <p>{item.productDescription}</p>
                      <p className="text-green-600 font-semibold">${item.productPrice}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items in wishlist.</p>
              )}
            </div>

            <div className="border p-4 rounded-lg bg-gray-50">
              <h3 className="text-2xl font-semibold mb-2">Order History</h3>
              {orders.length > 0 ? (
                <ul className="space-y-4">
                  {orders.map((order: Order) => (
                    <li key={order.id} className="border p-4 rounded bg-white shadow">
                      <h4 className="font-bold">Order ID: {order.id}</h4>
                      <p>Items: {order.items.map((i) => i.name).join(', ')}</p>
                      <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found.</p>
              )}
            </div>
          </div>
        ) : (
          <AuthenticationForm isSignUp={isSignUp} toggleSignUp={toggleSignUp} />
        )}
      </div>
    </div>
  );
};

export default Profile;











