import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from '../screens/auth/OnBoarding/OnBoarding';
import Login from '../screens/auth/Login';
import EnterEmail from '../screens/auth/ForgetPassword/EnterEmail';
import EnterOtp from '../screens/auth/ForgetPassword/EnterOtp';
import EnterNewPassword from '../screens/auth/ForgetPassword/EnterNewPassword';
import PasswordCreated from '../screens/auth/ForgetPassword/PasswordCreated';

const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='OnBoarding'>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />

      {/* Forget password flow */}
      <Stack.Screen name="EnterEmail" component={EnterEmail} />
      <Stack.Screen name="EnterOtp" component={EnterOtp} />
      <Stack.Screen name="EnterNewPassword" component={EnterNewPassword} />
      <Stack.Screen name="PasswordCreated" component={PasswordCreated} />
      
    </Stack.Navigator>
  )
}

export default Auth