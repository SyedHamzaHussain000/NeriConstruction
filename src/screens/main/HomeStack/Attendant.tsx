/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, FlatList } from 'react-native';
import React from 'react';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import WhiteContainers from '../../../components/WhiteContainers';
import { NormalText, BoldText } from '../../../components/DailyUse/AppText/AppText';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { AppImages } from '../../../assets/AppImages';
import AppButton from '../../../components/DailyUse/AppButton';

const scheduleData = [
  {text: 'CLOCK IN', time: '09:00', width: responsiveWidth(45)},
  {text: 'CLOCK OUT', time: '05:00', width: responsiveWidth(45)},
]

const Attendant = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <NormalHeader onPress={() => navigation.navigate('ClockIn')} title="Clock In Area" />
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
        <View style={{flexDirection: 'row', borderRadius: 14, backgroundColor: APPCOLORS.LIGHTWHITE, borderWidth: 1, borderColor:APPCOLORS.GRAY_BORDER,  padding: responsiveHeight(1.5), marginTop: responsiveHeight(1.5)}}>
          <Image source={AppImages.pfps} style={{height: responsiveHeight(10), width: responsiveWidth(20), borderRadius: responsiveHeight(1) }} />
        <View style={{marginLeft: responsiveWidth(3), gap: 10}}>
          <View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <NormalText txtColour={APPCOLORS.BLACK} title="Tonald Drump" fontSize={2} fntWeight='bold'/>
          <Image
            source={AppImages.correct}
          />
          </View>
          
          <NormalText txtColour={APPCOLORS.THEMEBLUETEXT} title="29 September 2024" mrgnTop={0.5} fontSize={1.5} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Image
            source={AppImages.location}
          />
          <NormalText txtColour={APPCOLORS.DARK_GRAY} title="Lat 45.43534 Long 97897.576" fntWeight='bold' fontSize={1.5}/>
          </View>
        </View>
        </View>
      
        <NormalText mrgnTop={2} txtColour={APPCOLORS.BLACK} fntWeight="700" fontSize={2.2} title="SCHEDULE" />

        <FlatList 
          data={scheduleData}
          contentContainerStyle={{gap: 16,}}
          horizontal
          scrollEnabled={false}
          renderItem={({item}) => {
                      return (
                        <View style={{width: item.width, alignItems: 'center', borderRadius: 14, backgroundColor: APPCOLORS.LIGHTWHITE, borderWidth: 1, borderColor:APPCOLORS.GRAY_BORDER, padding: responsiveHeight(1.5), marginTop: responsiveHeight(1.5)}}>
                        <NormalText txtColour={APPCOLORS.DARK_GRAY} title={item.text} fontSize={2} fntWeight='bold'/>
                        <NormalText txtColour={APPCOLORS.BLACK} title={item.time} fontSize={4} fntWeight='bold' />
                      </View>
                      );
                    }}
        />
        
       
      </WhiteContainers>
      <View style={{height:responsiveHeight(30), justifyContent: 'flex-end'}}>
        <AppButton
        onPress={()=> navigation.navigate("AttendantSelfie")}
        title='Selfie To Clock In'
        />
        </View>
    </View>
  );
};

export default Attendant;
