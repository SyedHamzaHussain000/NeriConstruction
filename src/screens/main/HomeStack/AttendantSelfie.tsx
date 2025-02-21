import React from 'react';
import { View, Text, ImageBackground } from 'react-native'
import AttendantSelfieHeader from '../../../components/AppHeaders/AttendantSelfieHeader';
import { AppImages } from '../../../assets/AppImages';
import { responsiveHeight } from '../../../utils/Responsive';

const AttendantSelfie = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{flex: 1}}>
        <AttendantSelfieHeader navigation={navigation}
        isShownCameraTxt={true} />
        <ImageBackground source={AppImages.BG} style={{width: '100%', height: '100%'}}>
      
      <View style={{height: responsiveHeight(90), justifyContent: 'flex-end'}}>
      <AttendantSelfieHeader navigation={navigation} 
      isShownCameraTxt={false} isChangeCurrentIcon={true} isChangeCloseIcon={true}
      />
      </View>
        </ImageBackground>
    </View>
  )
}

export default AttendantSelfie