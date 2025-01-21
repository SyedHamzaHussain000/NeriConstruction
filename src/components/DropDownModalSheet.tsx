import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {responsiveHeight, responsiveWidth} from '../utils/Responsive';
import {APPCOLORS} from '../utils/APPCOLORS';
import LinearGradient from 'react-native-linear-gradient';
import Spacing from './DailyUse/AppText/Spacing';

type DropdownProps = {
  children: React.ReactNode; // Content inside the dropdown
  icon?: any;
};

const DropDownModalSheet = ({children, icon}: DropdownProps) => {
  return (
    <View style={style.container}>
      {icon && (
        <LinearGradient colors={[APPCOLORS.PRIMARY_DARK, APPCOLORS.PRIMARY_LIGHT]} style={style.linear}>
          <Image source={icon}  style={{height:responsiveHeight(5), width:responsiveHeight(5), resizeMode:'contain'}}/>
        </LinearGradient>

      )}
      {
        icon && (
          <Spacing margin={6}/>
        )
      }
      {children}
    </View>
  );
};

export default DropDownModalSheet;

const style = StyleSheet.create({
  container: {

    width: responsiveWidth(100),
    backgroundColor: APPCOLORS.WHITE,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  linear: {
    position: 'absolute',
    alignSelf: 'center',
    height: responsiveHeight(10),
    width: responsiveHeight(10),
    borderRadius: 20,
    zIndex: 10,
    top: -40,
    alignItems:'center',
    justifyContent:'center'
  },
});
