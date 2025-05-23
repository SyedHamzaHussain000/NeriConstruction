import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/main/Home';
import TaskDetail from '../screens/main/HomeStack/TaskDetail';
import Calender from '../screens/main/Calender';
import TaskManage from '../screens/main/TaskManage';
import {APPCOLORS} from '../utils/APPCOLORS';
import {responsiveFontSize, responsiveHeight} from '../utils/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import Profile from '../screens/main/Profile';
import ClockIn from '../screens/main/HomeStack/ClockIn';
import Attendant from '../screens/main/HomeStack/Attendant';
import AttendantSelfie from '../screens/main/HomeStack/AttendantSelfie';
import SelfieToClockIn from '../screens/main/HomeStack/SelfieToClockIn';
import ClockedIn from '../screens/main/HomeStack/ClockedIn';
import TakeABreak from '../screens/main/HomeStack/TakeABreak';
import ClockedOut from '../screens/main/HomeStack/ClockedOut';
import ClockedInDetails from '../screens/main/HomeStack/ClockedInDetails';
import InAppCalendar from '../screens/main/HomeStack/InAppCalendar';
import TaskMenu from '../screens/main/TaskManageStack/TaskMenu';
import TaskMenuDetails from '../screens/main/TaskManageStack/TaskMenuDetails';
import FinishTask from '../screens/main/TaskManageStack/FinishTask';
import PersonalData from '../screens/main/ProfileStack/PersonalData';
import Notification from '../screens/main/TaskManageStack/Notification';
import Language from '../screens/main/ProfileStack/Language';
import Faq from '../screens/main/ProfileStack/Faq';
import Help from '../screens/main/ProfileStack/Help';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="TabBar">
      <Stack.Screen name="TabBar" component={TabBar} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="TaskManage" component={TaskManage} />
      <Stack.Screen name="TaskMenuDetails" component={TaskMenuDetails} />
      <Stack.Screen name="FinishTask" component={FinishTask} />
      <Stack.Screen name="ClockIn" component={ClockIn} />
      <Stack.Screen name="Attendant" component={Attendant} />
      <Stack.Screen name="AttendantSelfie" component={AttendantSelfie} />
      <Stack.Screen name="SelfieToClockIn" component={SelfieToClockIn} />
      <Stack.Screen name="ClockedIn" component={ClockedIn} />
      <Stack.Screen name="TakeABreak" component={TakeABreak} />
      <Stack.Screen name="ClockedOut" component={ClockedOut} />
      <Stack.Screen name="ClockedInDetails" component={ClockedInDetails} />
      <Stack.Screen name="InAppCalendar" component={InAppCalendar} />
      <Stack.Screen name="PersonalData" component={PersonalData} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
};
const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: APPCOLORS.BLACK},
      }}>
      <Tab.Screen
        name="Home"
        // component={Home}
        component={Calender}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={responsiveFontSize(2.7)}
                color={APPCOLORS.WHITE}
              />
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="Calender"
        component={Calender}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name={focused ? 'calendar' : 'calendar-outline'}
                size={responsiveFontSize(2.7)}
                color={APPCOLORS.WHITE}
              />
            );
          },
        }}
      /> */}
      <Tab.Screen
        name="TaskManage"
        // component={TaskManage}
        component={TaskMenu}
        // component={TaskMenuDetails}
        // component={FinishTask}
        // component={Notification}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'clipboard-text' : 'clipboard-text-outline'}
                size={responsiveFontSize(2.7)}
                color={APPCOLORS.WHITE}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return (
              <Octicons
                name={focused ? 'person-fill' : 'person'}
                size={responsiveFontSize(2.7)}
                color={APPCOLORS.WHITE}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
