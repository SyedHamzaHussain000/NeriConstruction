/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Text } from 'react-native';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import React from 'react';

interface TextProps {
  title: string;
  fontSize?: number;
  fntWeight?: string,
  textAligm?: any,
  textDecorate?: boolean,
  numofline?: number,
  txtColour?: any,
  width?: number,
  mrgnTop?: number,
}

export const NormalText = ({ title, mrgnTop, fontSize = 1.4, width, fntWeight, textAligm, textDecorate, numofline, txtColour }: TextProps) => {
  return (
    <View>
      <Text
        style={[styles.normalText, { color: txtColour ? txtColour : null, marginTop: responsiveHeight(mrgnTop), width: responsiveWidth(width), fontWeight: fntWeight, fontSize: responsiveFontSize(fontSize), textAlign: textAligm, textDecorationLine: textDecorate == true ? 'underline' : 'none' }]} numberOfLines={numofline}>
        {title}
      </Text>
    </View>
  );
};

export const BoldText = ({ title, mrgnTop, fontSize = 1.4, textAligm, fntWeight, txtColour, textDecorate, width }: TextProps) => {
  return (
    <View>
      <Text
        style={[styles.boldText, { color: txtColour ? txtColour : null, marginTop: responsiveHeight(mrgnTop), width: responsiveWidth(width), fontWeight: fntWeight, fontSize: responsiveFontSize(fontSize), textAlign: textAligm, textDecorationLine: textDecorate == true ? "underline" : "none" }]} >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  normalText: {
    fontSize: responsiveFontSize(1.4),
    color: APPCOLORS.BLACK,
  },
  boldText: {
    fontSize: responsiveFontSize(1.4),
    color: APPCOLORS.BLACK,
    fontWeight: 'bold',
  },
});
