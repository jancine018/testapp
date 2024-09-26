// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './index'; // Import your login screen
import RegisterScreen from './RegisterScreen'; // Assuming you have a RegisterScreen
import MainApp from './(tabs)/MainApp'; // Adjust path if necessary

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="MainApp" component={MainApp} /> {/* Ensure this matches */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
