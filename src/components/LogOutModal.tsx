import React from 'react';
import { View, Text, Image } from 'react-native';
import DropDownModal from './DropDownModal';
import { AppImages } from '../assets/AppImages';
import { NormalText } from './DailyUse/AppText/AppText';
import { APPCOLORS } from './../utils/APPCOLORS';
import AppButton, { SmallAppButton } from './DailyUse/AppButton';
import { responsiveHeight } from './../utils/Responsive';

type LogOutModalProps = {
    isModalVisible: any,
    onPress: any,
    imageSource: any,
    title: any,
    subTitle: any,
    btnTitle: any,
    noBtnTitle: any,
    noBtnOnPress: any,
}

const LogOutModal = ({isModalVisible, onPress, imageSource, title, subTitle, btnTitle, noBtnTitle, noBtnOnPress}: LogOutModalProps) => {
  return (
    <DropDownModal isModalVisible={isModalVisible}>
    <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: responsiveHeight(35), padding: 50, paddingBottom: 0, borderRadius: 15, position: 'relative' }}>
    <Image source={imageSource} style={{position: 'absolute', top: '-50'}} />
  <View style={{gap:15}}>
  <NormalText txtColour={APPCOLORS.BLACK} title={title} fontSize={3} fntWeight='bold' textAligm='center'/>
  <NormalText txtColour={APPCOLORS.DARK_GRAY} title={subTitle} fontSize={1.8} fntWeight='bold' textAligm='center'/>
           
           <View style={{flexDirection: 'row', gap: 15,}}>
            <SmallAppButton
            onPress={noBtnOnPress}
            title={noBtnTitle}
            width={40}
            height={6}
            borderColor={APPCOLORS.ClockInBg}
            borderWidth={1}
            borderRadious={25}
            txtColor={APPCOLORS.ClockInBg}
            />

            <AppButton
            onPress={onPress}
            title={btnTitle}
            width={40}
            
            />
            </View>
            </View>
</View>
    </DropDownModal>
  )
}

export default LogOutModal