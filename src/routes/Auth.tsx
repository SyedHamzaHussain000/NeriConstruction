import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from '../screens/auth/OnBoarding/OnBoarding';

const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Profile" component={OnBoarding} />
    </Stack.Navigator>
  )
}

export default Auth