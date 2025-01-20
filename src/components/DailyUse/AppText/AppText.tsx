import {StyleSheet, View,Text} from 'react-native';

import { responsiveFontSize } from '../../../utils/Responsive';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import React from 'react';

interface TextProps {
  title: string;
  fontSize?: number;
  textAligm?: any,
  textDecorate?: boolean,
  numofline?: number,
  txtColour?: any
}

export const NormalText = ({title, fontSize = 1.4, textAligm,textDecorate,numofline, txtColour}: TextProps) => {
  return (
    <View>
      <Text
        style={[styles.normalText, {color:txtColour ? txtColour : null, fontSize: responsiveFontSize(fontSize), textAlign: textAligm, textDecorationLine : textDecorate == true ? "underline" : "none"}]} numberOfLines={numofline}>
        {title}
      </Text>
    </View>
  );
};

export const BoldText = ({title, fontSize = 1.4, textAligm ,txtColour}: TextProps) => {
  return (
    <View>
      <Text
        style={[styles.boldText, {color:txtColour ? txtColour : null, fontSize: responsiveFontSize(fontSize), textAlign: textAligm}]} >
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
