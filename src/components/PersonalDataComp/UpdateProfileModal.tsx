import React from 'react';
import { View, Image, FlatList } from 'react-native';
import DropDownModal from '../DropDownModal';
import { BoldText, NormalText } from '../DailyUse/AppText/AppText';
import { APPCOLORS } from '../../utils/APPCOLORS';
import AppButton, { SmallAppButton } from '../DailyUse/AppButton';
import { responsiveHeight, responsiveWidth } from '../../utils/Responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';

type UpdateProfileModalProps = {
    isModalVisible: any,
    yesBtnOnPress: any,
    noBtnOnPress: any,
    imageSource: any,
    title: any,
    subTitle: any,
    noBtnTitle: any,
    yesBtnTitle: any,
}

const UpdateProfileModal = ({isModalVisible, yesBtnOnPress, noBtnOnPress, imageSource, title, subTitle, noBtnTitle, yesBtnTitle}: UpdateProfileModalProps) => {
  return (
    <DropDownModal isModalVisible={isModalVisible}>
    <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: noBtnTitle ? responsiveHeight(45) : responsiveHeight(36), padding: 50, paddingBottom: 0, borderRadius: 15, position: 'relative' }}>
    <Image source={imageSource} style={{position: 'absolute', top: '-50'}} />
  <View style={{gap:15}}>
  <NormalText txtColour={APPCOLORS.BLACK} title={title} fontSize={3} fntWeight='bold' textAligm='center'/>
  <NormalText txtColour={APPCOLORS.DARK_GRAY} title={subTitle} fontSize={1.8} fntWeight='bold' textAligm='center'/>
            
            <AppButton
            onPress={yesBtnOnPress}
            title={yesBtnTitle}
            />

          {noBtnTitle && <SmallAppButton
            onPress={noBtnOnPress}
            title={noBtnTitle}
            txtColor={APPCOLORS.ClockInBg}
            borderWidth={1.5}
            borderColor={APPCOLORS.ClockInBg}
            fontWeight='bold'
            borderRadious={25}
          />}
            </View>
</View>
    </DropDownModal>
  )
}

export default UpdateProfileModal;