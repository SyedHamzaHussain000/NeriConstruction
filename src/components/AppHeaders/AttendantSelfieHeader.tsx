import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { APPCOLORS } from '../../utils/APPCOLORS';
import { NormalText } from '../DailyUse/AppText/AppText';
import Ionicons from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from '../../utils/Responsive';
import {AppImages} from '../../assets/AppImages';

interface propTypes{
    navigation: any;
    isShownCameraTxt?: Boolean;
    isChangeCurrentIcon?: Boolean;
    isChangeCloseIcon?: Boolean;
}

const AttendantSelfieHeader = ({ navigation, isShownCameraTxt, isChangeCurrentIcon, isChangeCloseIcon, }: propTypes) => {
  return (
    <View style={[styles.AttendantSelfieHeader, isChangeCurrentIcon && {backgroundColor: 'transparent'}]}>
        <View style={styles.leftText}>
      {isChangeCurrentIcon ? <Image source={AppImages.FoucsCamera} style={{width: 50, height: 50, }} /> : <Image source={AppImages.current} style={{width: 30, height: 30, }} />}
        </View>
      {isShownCameraTxt ?  <NormalText txtColour={APPCOLORS.WHITE} title='Camera' fontSize={2.5} fntWeight='bold'/> : <TouchableOpacity 
                      onPress={()=> !isShownCameraTxt && navigation.navigate("SelfieToClockIn")}
                      >
      <Image source={AppImages.CameraClick} style={{width: 70, height: 70, }} /></TouchableOpacity>}
     <TouchableOpacity
                      style={styles.rightText}
                      onPress={()=> !isChangeCloseIcon && navigation.navigate("Attendant")}
                      >
            {isChangeCloseIcon ? <Image source={AppImages.current} style={{width: 45, height: 45, }} /> : <Ionicons
                      name='close'
                      size={responsiveFontSize(3)}
                      color={APPCOLORS.LIGHT_GRAY}
                      />}
                      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  AttendantSelfieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#101828',
  },
  leftText: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
  },
  rightText: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default AttendantSelfieHeader;
