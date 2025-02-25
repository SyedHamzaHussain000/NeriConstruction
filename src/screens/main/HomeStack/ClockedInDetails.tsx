import React, { useState } from 'react'
import { View, Text, ImageBackground, TextInput, Image } from 'react-native'
import NormalHeader from '../../../components/AppHeaders/NormalHeader'
import WhiteContainers from '../../../components/WhiteContainers';
import {AppImages} from '../../../assets/AppImages';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { BoldText, NormalText } from '../../../components/DailyUse/AppText/AppText';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import AppButton, { SmallAppButton } from '../../../components/DailyUse/AppButton';
import ClockInSuccessModal from '../../../components/HomeComp/ClockInSuccessModal';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ClockedInDetails = ({navigation}: any) => {
    const [isModalVisible, setModalVisible] = useState<Boolean>(false);
  return (
    <View>
      <NormalHeader onPress={() => navigation.navigate('ClockedOut')} title="Details" />
      <WhiteContainers mrgnTop={2} marginHorizontal={4}>
         <View style={{ flexDirection: 'row', gap: responsiveHeight(1), marginHorizontal: responsiveWidth(1), paddingBottom: 10, marginTop: 5, alignItems: 'center' }}>
                  <AntDesign name="calendar" size={20} color={APPCOLORS.ICON_TEXT_COLOUR} />
                  <BoldText title='27 September 2024' fontSize={2} fntWeight="700" />
                </View>
        <View style={{borderWidth: 1.5, borderColor: '#EAEFCA', borderRadius: 15, padding: responsiveWidth(2)}}>
        <View style={{marginHorizontal: responsiveWidth(3)}}>
        <NormalText txtColour={APPCOLORS.DARK_GRAY} title="Selfie Clock In" fontSize={1.5} fntWeight='bold'  />
        </View>
        <View style={{padding: responsiveWidth(2)}}>
            <ImageBackground source={AppImages.BG} imageStyle={{ borderRadius: 15}} style={{width: '100%', height: responsiveHeight(45)}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: responsiveWidth(3)}}>
                    <View style={{gap: 3, paddingBottom: responsiveHeight(2)}}>
                    <NormalText txtColour={APPCOLORS.WHITE} title="Lat : 45.43534" fontSize={1.5} fntWeight='bold'/>
                    <NormalText txtColour={APPCOLORS.WHITE} title="Long : 97897.576" fontSize={1.5} fntWeight='bold'/>
                    <NormalText txtColour={APPCOLORS.WHITE} title="11/10/24 09:00AM GMT +07:00" fontSize={1.6} fntWeight='bold'/>
                    </View>
                    </View>
            </ImageBackground>
      
        <View>
            <NormalText mrgnTop={1.5} txtColour={APPCOLORS.DARK_GRAY} title="Clock-In Notes" fontSize={1.5} />
            <View style={{width: responsiveWidth(6), height: responsiveHeight(0.4), marginTop: 8, borderRadius: 20, backgroundColor: APPCOLORS.DARK_GRAY}} />
        <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1), justifyContent: 'space-between', padding: responsiveHeight(1), paddingLeft: 0, borderRadius: responsiveHeight(1) }}>
                <View>
                  <NormalText txtColour={APPCOLORS.DARK_GRAY} fontSize={1.6} title="Total Hours" />
                  <BoldText txtColour={APPCOLORS.ClockInBold} fntWeight="600" fontSize={1.8} title="08:00:00 hrs" />
                </View>
                <View>
                  <NormalText txtColour={APPCOLORS.DARK_GRAY} fontSize={1.6} title="Clock in & Out" />
                  <BoldText txtColour={APPCOLORS.ClockInBold} fntWeight="600" fontSize={1.8} title="09:00 AM — 05:00 PM" />
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: responsiveHeight(1), paddingLeft: 0, borderRadius: responsiveHeight(1) }}>
                <View>
                  <NormalText txtColour={APPCOLORS.DARK_GRAY} fontSize={1.6} title="Break" />
                  <BoldText txtColour={APPCOLORS.ClockInBold} fntWeight="600" fontSize={1.8} title="01:00:00 hrs" />
                </View>
                <View>
                  <NormalText txtColour={APPCOLORS.DARK_GRAY} fontSize={1.6} title="Take A Break & Back To Work" />
                  <BoldText txtColour={APPCOLORS.ClockInBold} fntWeight="600" fontSize={1.8} textAligm='right' title="12:00 AM — 01:00 PM" />
                </View>
              </View>
      </View>
      </View>
      </View>
      </WhiteContainers>

      <WhiteContainers mrgnTop={1}>
      <AppButton
        onPress={()=> setModalVisible(true)}
        title='Export As PDF'
        />
            </WhiteContainers>

{/* Modal */}
            <ClockInSuccessModal isModalVisible={isModalVisible} imageSource={AppImages.download}  title="Export As PDF Successful!" subTitle="Your clock-in data has been exported as a PDF. You can now download it." 
            onPress={()=> {
                        setModalVisible(false);
                        navigation.navigate('InAppCalendar');
                    }} 
                    btnTitle='Close Message' />
    </View>
  )
}

export default ClockedInDetails;