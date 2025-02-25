import React from 'react';
import { View, Text, Image } from 'react-native';
import DropDownModal from '../DropDownModal';
import { AppImages } from '../../assets/AppImages';
import { NormalText } from '../DailyUse/AppText/AppText';
import { APPCOLORS } from '../../utils/APPCOLORS';
import AppButton from '../DailyUse/AppButton';
import { responsiveHeight } from '../../utils/Responsive';

type ClockInSuccessModalProps = {
    isModalVisible: any,
    onPress: any,
    imageSource: any,
    title: any,
    subTitle: any,
    btnTitle: any
}

const ClockInSuccessModal = ({isModalVisible, onPress, imageSource, title, subTitle, btnTitle}: ClockInSuccessModalProps) => {
  return (
    <DropDownModal isModalVisible={isModalVisible}>
    <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: responsiveHeight(35), padding: 50, paddingBottom: 0, borderRadius: 15, position: 'relative' }}>
    <Image source={imageSource} style={{position: 'absolute', top: '-50'}} />
  <View style={{gap:15}}>
  <NormalText txtColour={APPCOLORS.BLACK} title={title} fontSize={3} fntWeight='bold' textAligm='center'/>
  <NormalText txtColour={APPCOLORS.DARK_GRAY} title={subTitle} fontSize={1.8} fntWeight='bold' textAligm='center'/>
            <AppButton
            onPress={onPress}
            title={btnTitle}
            />
            </View>
</View>
    </DropDownModal>
  )
}

export default ClockInSuccessModal