import React from 'react';
import { View, Image, FlatList } from 'react-native';
import DropDownModal from '../DropDownModal';
import { BoldText, NormalText } from '../DailyUse/AppText/AppText';
import { APPCOLORS } from '../../utils/APPCOLORS';
import AppButton, { SmallAppButton } from '../DailyUse/AppButton';
import { responsiveHeight, responsiveWidth } from '../../utils/Responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';

type ClockInConfirmModalProps = {
    isModalVisible: any,
    yesBtnOnPress: any,
    noBtnOnPress: any,
    imageSource: any,
    title: any,
    subTitle: any,
    noBtnTitle: any,
    yesBtnTitle: any,
}

const data = [
  {
    id: 1,
    title1: 'Today',
    title2: '08:00:00 Hrs',
  },
  {
    id: 2,
    title1: 'Overtime',
    title2: '00:00:00 Hrs',
  },
];

const ClockInConfirmModal = ({isModalVisible, yesBtnOnPress, noBtnOnPress, imageSource, title, subTitle, noBtnTitle, yesBtnTitle}: ClockInConfirmModalProps) => {
  return (
    <DropDownModal isModalVisible={isModalVisible}>
    <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: responsiveHeight(62), padding: 50, paddingBottom: 0, borderRadius: 15, position: 'relative' }}>
    <Image source={imageSource} style={{position: 'absolute', top: '-50'}} />
  <View style={{gap:15}}>
  <NormalText txtColour={APPCOLORS.BLACK} title={title} fontSize={3} fntWeight='bold' textAligm='center'/>
  <NormalText txtColour={APPCOLORS.DARK_GRAY} title={subTitle} fontSize={1.8} fntWeight='bold' textAligm='center'/>
            
            <View style={{flexDirection: 'row'}}>
                        <FlatList contentContainerStyle={{ gap: responsiveHeight(2), marginBottom: responsiveHeight(2), alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(2), width: '100%' }} horizontal data={data} renderItem={({ item }) => (
                          <View style={{ gap: responsiveHeight(1), width: responsiveWidth(42), backgroundColor: APPCOLORS.LIGHTWHITE, borderColor: APPCOLORS.GRAY_BORDER, borderWidth: 2, padding: responsiveHeight(1.5), borderRadius: responsiveHeight(1) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveHeight(1) }}>
                              <AntDesign name="clockcircle" size={20} color={APPCOLORS.Clock_Bg} />
                              <NormalText title={item.title1} fontSize={1.7} />
                            </View>
                            <BoldText title={item.title2} fontSize={2.5} />
                          </View>
                        )} />
                      </View>
            
            <AppButton
            onPress={yesBtnOnPress}
            title={yesBtnTitle}
            />

          <SmallAppButton
            onPress={noBtnOnPress}
            title={noBtnTitle}
            txtColor={APPCOLORS.ClockInBg}
            borderWidth={1.5}
            borderColor={APPCOLORS.ClockInBg}
            fontWeight='bold'
            borderRadious={25}
          />
            </View>
</View>
    </DropDownModal>
  )
}

export default ClockInConfirmModal