import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { BoldText, NormalText } from '../../../components/DailyUse/AppText/AppText';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { AppImages } from '../../../assets/AppImages';
import WhiteContainers from '../../../components/WhiteContainers';
import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton, { SmallAppButton } from '../../../components/DailyUse/AppButton';
import ClockInCards from '../../../components/DailyUse/ClockInCards';
import ClockInConfirmModal from '../../../components/HomeComp/ClockInConfirmModal';
import ClockInSuccessModal from '../../../components/HomeComp/ClockInSuccessModal';

const data = [
    {
      id: 1,
      title1: 'Today',
      title2: '00:00 Hrs',
    },
    {
      id: 2,
      title1: 'This Pay Period',
      title2: '32:00 Hrs',
    },
  ];

const TakeABreak = ({navigation}: any) => {
        const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<Boolean>(false);
        const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<Boolean>(false);
  return (
    <View style={{ flex: 1, }}>
        <View style={styles.ContainerHeader}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: responsiveWidth(90),
                  }}>
                  <View>
                    <BoldText
                      title="Let’s Clock-In!"
                      fontSize={3}
                      txtColour={APPCOLORS.WHITE}
                    />
                    <BoldText
                      title="Don’t miss your clock in schedule"
                      fontSize={2}
                      txtColour={'#D9D6FE'}
                    />
                  </View>
                  <Image
                    source={AppImages.clock}
                    style={{
                      height: responsiveHeight(15),
                      width: responsiveWidth(15),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <WhiteContainers position='absolute' top='16' marginBottom='5'>
          <View style={{ width: responsiveWidth(90) }}>
            <BoldText title="Total Working Hour" fontSize={2} />
            <NormalText title="Paid Period 1 Sept 2024 - 30 Sept 2024" fontSize={1.5} />
          </View>
          <View style={{ width: responsiveWidth(88), flexDirection: 'row' }}>
            <FlatList contentContainerStyle={{ gap: responsiveHeight(2), marginBottom: responsiveHeight(2), alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(2), width: '100%' }} horizontal data={data} renderItem={({ item }) => (
              <View style={{ gap: responsiveHeight(1), width: responsiveWidth(42), backgroundColor: APPCOLORS.LIGHTWHITE, borderColor: APPCOLORS.GRAY_BORDER, borderWidth: 2, padding: responsiveHeight(2), borderRadius: responsiveHeight(1) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveHeight(1) }}>
                  <AntDesign name="clockcircle" size={20} color={APPCOLORS.Clock_Bg} />
                  <NormalText title={item.title1} fontSize={1.7} />
                </View>
                <BoldText title={item.title2} fontSize={2.5} />
              </View>
            )} />
          </View>
          <View style={{flexDirection: 'row', gap: 16, }}>
          <SmallAppButton title="Back To Work" onPress={() => navigation.navigate('ClockedIn')} height={8} fntSize={1.8} btnColor={APPCOLORS.ClockInBg} txtColor={APPCOLORS.WHITE} width={42} borderRadious={49} height={6.4} />
          <SmallAppButton title="Clock Out" onPress={() => setIsConfirmationModalVisible(true)} height={8} fntSize={1.8} btnColor={APPCOLORS.BLACK} width={42} borderRadious={49} height={6.4}/>
          </View>
        </WhiteContainers>
              </View>
              <ScrollView contentContainerStyle={{ padding: 10, flexGrow: 1,  }} showsVerticalScrollIndicator={false}>
       
        <View style={{ flex: 1, }}>
          <ClockInCards headingDate="27 September 2024"  />
          <ClockInCards headingDate="27 September 2024"  />
          <ClockInCards headingDate="27 September 2024"  />
          <ClockInCards headingDate="27 September 2024"  />
        </View>
      </ScrollView>

      <ClockInConfirmModal isModalVisible={isConfirmationModalVisible} imageSource={AppImages.timer} yesBtnTitle='Yes, Clock Out' noBtnTitle='No, Let me check' yesBtnOnPress={() => {
        setIsConfirmationModalVisible(false);
        setIsSuccessModalVisible(true);
      }} noBtnOnPress={() => setIsConfirmationModalVisible(false)}   title="Confirm Clockout" subTitle="Once you clock out, you won’t be able to edit this time. Please double-check your hours before proceeding."  />
      <ClockInSuccessModal isModalVisible={isSuccessModalVisible} imageSource={AppImages.timer} btnTitle='Close Message'  title="Clockout Successful!" subTitle="You’ve officially clocked out for the day. Thank you for your hard work! Time to relax and enjoy your break." 
      onPress={() => {
        setIsSuccessModalVisible(false);
        navigation.navigate('ClockedOut');
      }} 
      />
    </View>
  );
};

export default TakeABreak;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the root view takes full screen height
    backgroundColor: APPCOLORS.LIGHT_GRAY,
  },
  ContainerHeader: {
    height: responsiveHeight(27),
    backgroundColor: APPCOLORS.ICON_TEXT_COLOUR,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    padding: 20,
    marginBottom: responsiveHeight(19),
    justifyContent: 'space-between',
    position: 'relative',
  },
  listContainer: {
    flex: 1, // Makes this section scrollable
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: responsiveHeight(12),
  },
});
