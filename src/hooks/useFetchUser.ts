// src/hooks/useFetchUser.ts
import { useState, useEffect } from 'react';
import supabase from '../supabase/supabaseClient';
import { User } from '../types';
import { mapSupabaseUserToAppUser } from '../utils';

const useFetchUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Fetches the current authenticated user from Supabase.
     * Maps the fetched user data to the app's User type and sets the user state.
     * Handles any errors that occur during the fetch operation.
     */
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else if (data.user) {
        setUser(mapSupabaseUserToAppUser(data.user));
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useFetchUser;

