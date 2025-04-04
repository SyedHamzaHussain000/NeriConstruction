/* eslint-disable react-native/no-inline-styles */
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { APPCOLORS } from '../../utils/APPCOLORS';
import { responsiveHeight, responsiveWidth } from '../../utils/Responsive';
import LinearGradient from 'react-native-linear-gradient';
import { ButtonTypes, SmallBtnTypes } from '../../types/AppTypes';
import { BoldText, NormalText } from './AppText/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const AppButton = ({ title, txtColorr = APPCOLORS.WHITE, fntSize, disabled, btnColor, height = 6, width = 90, onPress }: ButtonTypes) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <LinearGradient style={{ height: responsiveHeight(height), width: responsiveWidth(width), alignItems: 'center', justifyContent: 'center', borderRadius: 200 }} colors={[APPCOLORS.PRIMARY_DARK, APPCOLORS.PRIMARY_DARK, APPCOLORS.PRIMARY_DARK, APPCOLORS.PRIMARY_LIGHT]}>
        <BoldText title={title} fontSize={fntSize ? fntSize : 1.5} textAligm={'center'} txtColour={APPCOLORS.WHITE} />
      </LinearGradient>
    </TouchableOpacity>
  );
};
export const SmallAppButton = ({ title, txtColorr = APPCOLORS.WHITE, icon, fntSize,txtColor = APPCOLORS.WHITE, btnColor, height = 6, width = 90, borderRadious, borderWidth, borderColor, onPress }: SmallBtnTypes) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', borderRadius: borderRadious ? borderRadious : responsiveHeight(2), gap: responsiveHeight(1), height: responsiveHeight(height), width: responsiveWidth(width), alignSelf: 'center', backgroundColor: btnColor, alignItems: 'center', justifyContent: 'center', borderWidth: borderWidth, borderColor: borderColor }}>
      {icon && (
        icon === 'rotate' ? <FontAwesome6 name={icon} size={15} color={APPCOLORS.Clock_Bg} /> : <AntDesign name={icon} size={15} color={APPCOLORS.Clock_Bg} />
      )}
      <NormalText fntWeight="500" title={title} fontSize={fntSize ? fntSize : 1.5} textAligm={'center'} txtColour={txtColor} />
    </TouchableOpacity>
  );
};

export default AppButton;
