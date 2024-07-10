// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setOrders } from '../slices/ordersSlice';
import { Order, WishlistItem, User } from '../types';
import { mapSupabaseUserToAppUser } from '../utils';

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-4 mx-auto p-4 pt-20">
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
                      {item.productId}
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
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;






