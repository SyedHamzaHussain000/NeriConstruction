/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import { APPCOLORS } from '../utils/APPCOLORS';
import { responsiveHeight } from '../utils/Responsive';


type child = {
  children: React.ReactNode,
  bgColor?: any,
  mrgnTop?: any,

}

const WhiteContainers = ({ children, bgColor, mrgnTop }: child) => {
  return (
    <View style={{ backgroundColor: bgColor ? bgColor : APPCOLORS.WHITE, marginTop: responsiveHeight(mrgnTop), borderRadius: 10, padding: 10 }}>
      {children}
    </View>
  );
};

export default WhiteContainers;
