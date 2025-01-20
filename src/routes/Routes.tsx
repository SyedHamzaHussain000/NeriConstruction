import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import Auth from './Auth';


const Stack = createStackNavigator();
const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Profile" component={Auth} />
    </Stack.Navigator>
  )
}

export default Routes