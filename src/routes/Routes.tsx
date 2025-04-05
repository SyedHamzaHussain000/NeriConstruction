import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import Auth from './Auth';
import Main from './Main';
import { useSelector } from 'react-redux';


const Stack = createStackNavigator();
const Routes = () => {
  const state = useSelector((state: any) => state.auth);

  return (
    <Stack.Navigator screenOptions={{headerShown:false,}} initialRouteName={state?.authData ? 'Main' : 'Auth'}> 
       <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  )
}

export default Routes