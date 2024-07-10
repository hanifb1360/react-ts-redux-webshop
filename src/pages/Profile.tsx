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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-4 rounded hover:bg-red-600">
            Logout
          </button>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2">Wishlist</h3>
            <ul>
              {wishlist.map((item: WishlistItem) => (
                <li key={item.productId}>{item.productId}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2">Order History</h3>
            <ul>
              {orders.map((order: Order) => (
                <li key={order.id}>
                  <div className="border p-4 rounded mb-2">
                    <h4 className="font-bold">Order ID: {order.id}</h4>
                    <p>Items: {order.items.map((i) => i.name).join(', ')}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;





