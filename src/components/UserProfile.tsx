// src/components/UserProfile.tsx
import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchWishlist = async (userId: string) => {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', userId);
      if (error) {
        console.error('Error fetching wishlist:', error);
      } else {
        setWishlist(data || []);
      }
    };

    const fetchOrders = async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId);
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data || []);
      }
    };

    if (user) {
      fetchWishlist(user.id);
      fetchOrders(user.id);
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold mb-6 text-center">Profile</h2>
      <div className="bg-white shadow-md rounded p-6">
        <p className="text-lg mb-4"><span className="font-semibold">Email:</span> {user?.email}</p>
        <button onClick={handleLogout} className="bg-red-500 text-white p-3 rounded w-full mb-6">
          Logout
        </button>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Wishlist</h3>
          <ul className="space-y-2">
            {wishlist.length > 0 ? (
              wishlist.map(item => (
                <li key={item.product_id} className="p-3 border rounded">{item.product_id}</li>
              ))
            ) : (
              <p className="text-gray-500">No items in wishlist.</p>
            )}
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Order History</h3>
          <ul className="space-y-2">
            {orders.length > 0 ? (
              orders.map(order => (
                <li key={order.id} className="p-3 border rounded">
                  <div className="font-semibold">Order ID: {order.id}</div>
                  <div>Items: {order.items.map((i: any) => i.productId).join(', ')}</div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No order history available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
