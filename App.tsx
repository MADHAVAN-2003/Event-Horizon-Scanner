import './global.css';
import { useCallback, useEffect } from 'react';
import { supabase } from './src/lib/supabase';
import AppNavigator from './src/navigators/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  getLastSync,
  insertTickets,
  setLastSync,
} from './src/database/ticketService';
import { useAppDispatch } from './src/redux/store';
import { setIsSync } from './src/redux/slices/syncSlice';

const App = () => {
  const dispatch = useAppDispatch();

  const getTickets = useCallback(async () => {
    const pageSize = 1000;
    let start = 0;

    dispatch(setIsSync(true));

    const lastSync = await getLastSync();

    while (true) {
      let query = supabase
        .from('tickets')
        .select('*')
        .order('created_at')
        .range(start, start + pageSize - 1);

      if (lastSync) {
        query = query.gt('created_at', lastSync);
      }

      const { data, error } = await query;

      if (error) {
        console.log('Fetch error:', error);
        break;
      }

      if (!data || data.length === 0) {
        break;
      }

      await insertTickets(data);

      start += pageSize;
    }

    await setLastSync(new Date().toISOString());
    dispatch(setIsSync(false));
  }, [dispatch]);

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  return (
    <SafeAreaProvider className="flex-1 bg-black-100">
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
