
import { User as SupabaseUser } from '@supabase/auth-js';
import { User as AppUser } from './types';

export const mapSupabaseUserToAppUser = (supabaseUser: SupabaseUser): AppUser => ({
  id: supabaseUser.id,
  email: supabaseUser.email ?? 'no-email@provided.com', // Provide a default value
  name: supabaseUser.user_metadata?.name || '',
  createdAt: new Date().toISOString(), // Or however you want to handle this
});
