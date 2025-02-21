/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import { APPCOLORS } from '../utils/APPCOLORS';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive';


type child = {
  children: React.ReactNode,
  bgColor?: any,
  mrgnTop?: any,
  marginHorizontal?: any
}

const WhiteContainers = ({ children, bgColor, mrgnTop, marginHorizontal }: child) => {
  return (
    <View style={{ backgroundColor: bgColor ? bgColor : APPCOLORS.WHITE, marginTop: responsiveHeight(mrgnTop), borderRadius: 10, padding: 10, marginHorizontal: responsiveWidth(marginHorizontal) }}>
      {children}
    </View>
  );
};

export default WhiteContainers;
