import 'react-native-url-polyfill/auto';
import Config from 'react-native-config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://${Config.SUPABASE_PROJ_ID}.supabase.co`;
const supabaseAnonKey = Config.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Required for native mobile
  },
});
