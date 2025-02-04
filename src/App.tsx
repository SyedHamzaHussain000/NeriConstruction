import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from './screens/auth/OnBoarding/OnBoarding';
import Auth from './routes/Auth';
import Routes from './routes/Routes';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer  >
      <Routes/>
    </NavigationContainer>

  )
}

export default App