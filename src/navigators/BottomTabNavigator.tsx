import Event from '../screens/Events';
import Scanner from '../screens/Scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#0F172A',
          height: 60,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Events':
              iconName = 'calendar-outline';
              break;
            case 'Scanner':
              iconName = 'scan-outline';
              break;
            default:
              iconName = 'help-circle-outline'; // Fallback icon
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Events"
        component={Event}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
