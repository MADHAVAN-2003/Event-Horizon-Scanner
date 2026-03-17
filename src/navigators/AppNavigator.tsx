import Login from '../screens/Login';
import { useEffect, useState } from 'react';
import StatusScreen from '../screens/StatusScreen';
import { checkUserLoggedIn } from '../database/user';
import BottomTabNavigator from './BottomTabNavigator';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AppRouteParams = {
  Root: undefined;
  Login: undefined;
  StatusScreen: {
    status: 'valid' | 'used' | 'invalid';
  };
};

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Stack = createNativeStackNavigator<AppRouteParams>();

  useEffect(() => {
    const init = async () => {
      const loggedIn = await checkUserLoggedIn();
      setIsLoggedIn(loggedIn);
      setLoading(false);
    };

    init();
  }, []);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={'large'} color="#3A5F7E" />
      </View>
    );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'Root' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen name="StatusScreen" component={StatusScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
