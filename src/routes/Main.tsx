import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/main/Home';
import TaskDetail from '../screens/main/HomeStack/TaskDetail';
import Calender from '../screens/main/Calender';
import TaskManage from '../screens/main/TaskManage';
import { APPCOLORS } from '../utils/APPCOLORS';
import { responsiveFontSize, responsiveHeight } from '../utils/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import Octicons from 'react-native-vector-icons/Octicons'
import Profile from '../screens/main/Profile';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Main = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false, tabBarStyle:{backgroundColor:APPCOLORS.BLACK}}}>
    <Tab.Screen name="Home" component={Home} 
    options={{
      tabBarShowLabel:false,
      tabBarLabel: "",
      tabBarIcon: ({focused}) => {
        return(

              <Ionicons
              name={focused ?  "home" : "home-outline"}
              size={responsiveFontSize(2.7)}
              color={APPCOLORS.WHITE}
              />

        )
      }
    }} />
    <Tab.Screen name="Calender" component={Calender} 
        options={{
          tabBarShowLabel:false,
          tabBarLabel: "",
          tabBarIcon: ({focused}) => {
            return(
    
                  <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
                  size={responsiveFontSize(2.7)}
                  color={APPCOLORS.WHITE}
                  />
    
            )
          }
        }}/>
    <Tab.Screen name="TaskManage" component={TaskManage} 
        options={{
          tabBarShowLabel:false,
          tabBarLabel: "",
          tabBarIcon: ({focused}) => {
            return(
    
                  <MaterialCommunityIcons
                  name={focused ? "clipboard-text": "clipboard-text-outline"}
                  size={responsiveFontSize(2.7)}
                  color={APPCOLORS.WHITE}
                  />
    
            )
          }
        }}/>
    <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarShowLabel:false,
          tabBarLabel: "",
          tabBarIcon: ({focused}) => {
            return(
    
                  <Octicons
                  name={focused ? "person-fill" : "person"}
                  size={responsiveFontSize(2.7)}
                  color={APPCOLORS.WHITE}
                  />
    
            )
          }
        }} />

  </Tab.Navigator>
  )
}

export default Main