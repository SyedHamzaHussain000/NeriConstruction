/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import { APPCOLORS } from '../utils/APPCOLORS';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive';


type child = {
  children: React.ReactNode,
  bgColor?: any,
  mrgnTop?: any,
  marginHorizontal?: any,
  position?:any,
  top?: any,
  marginBottom?: any,
  borderRadius?: any,
  padding?: any,
  paddingHorizontal?: any,
}

const WhiteContainers = ({ children, bgColor, mrgnTop, marginHorizontal,position, top, marginBottom, borderRadius,padding,paddingHorizontal }: child) => {
  return (
    <View style={{ backgroundColor: bgColor ? bgColor : APPCOLORS.WHITE, marginTop: responsiveHeight(mrgnTop), borderRadius: borderRadius ? borderRadius : 10, padding: padding ? padding : 10, marginHorizontal: responsiveWidth(marginHorizontal), position: position, top: responsiveHeight(top), marginBottom: responsiveHeight(marginBottom), paddingHorizontal: responsiveWidth(paddingHorizontal) }}>
      {children}
    </View>
  );
};

export default WhiteContainers;
