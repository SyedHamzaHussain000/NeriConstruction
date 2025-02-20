/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image } from 'react-native';
import React from 'react';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import WhiteContainers from '../../../components/WhiteContainers';
import { NormalText } from '../../../components/DailyUse/AppText/AppText';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { AppImages } from '../../../assets/AppImages';

const Attendant = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <NormalHeader onPress={() => navigation.goBack()} title="Clock In Area" />
      <WhiteContainers mrgnTop={2}>
        <View style={{ backgroundColor: APPCOLORS.ClockInBg, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: responsiveHeight(2), borderRadius: responsiveHeight(2) }}>
          <View>
            <NormalText txtColour={APPCOLORS.WHITE} fntWeight="600" fontSize={2.2} title="You are in the clock-in area!" />
            <NormalText width={60} txtColour={APPCOLORS.GREYISHWHITE} fntWeight="600" fontSize={2} title="Now you can press clock in in this area" />
          </View>
          <Image
            source={AppImages.clock}
            style={{
              height: responsiveHeight(10),
              width: responsiveWidth(20),
              resizeMode: 'stretch',
            }}
          />
        </View>
        <NormalText mrgnTop={2} txtColour={APPCOLORS.BLACK} fntWeight="700" fontSize={2.2} title="MY PROFILE" />
        <View>
          <Image source={AppImages.person} style={{ height: responsiveHeight(10), width: responsiveWidth(10), borderRadius: responsiveHeight(1) }} />
        <View>
          <NormalText txtColour={APPCOLORS.BLACK} title="Tonald Drump"/>
          <NormalText txtColour={APPCOLORS.THEMEBLUETEXT} title="29 September 2024"/>
          <NormalText txtColour={APPCOLORS.BLACK} title="Lat 45.43534 Long 97897.576"/>
        </View>
        </View>
      </WhiteContainers>
    </View>
  );
};

export default Attendant;
