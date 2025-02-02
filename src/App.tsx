import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from './screens/auth/OnBoarding/OnBoarding';
import Auth from './routes/Auth';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer  >
      <Stack.Navigator initialRouteName='Auth' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Profile" component={OnBoarding} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App