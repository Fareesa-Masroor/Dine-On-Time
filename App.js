import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo

import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import LocationScreen from './screens/LocationScreen'; // Import the LocationScreen
import SplashScreen from './screens/SplashScreen'; // Import the SplashScreen
import LoginScreen from './screens/LoginScreen'; // Import the LoginScreen

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator({ route }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false, // Hide the header for all screens in Tab.Navigator
      })}
      tabBarOptions={{
        activeTintColor: '#ff3131',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#FAFAFA',
        inactiveBackgroundColor: 'white',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={route.params} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Create a stack for initial splash, login, and location selection
function InitialStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <InitialStack />
    </NavigationContainer>
  );
}
