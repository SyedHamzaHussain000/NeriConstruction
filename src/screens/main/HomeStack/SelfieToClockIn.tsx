import React, { useState } from 'react'
import { View, Text, ImageBackground, TextInput, Image } from 'react-native'
import NormalHeader from '../../../components/AppHeaders/NormalHeader'
import WhiteContainers from '../../../components/WhiteContainers';
import {AppImages} from '../../../assets/AppImages';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { NormalText } from '../../../components/DailyUse/AppText/AppText';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import AppButton, { SmallAppButton } from '../../../components/DailyUse/AppButton';
import DropDownModal from '../../../components/DropDownModal';
import ClockInSuccessModal from '../../../components/HomeComp/ClockInSuccessModal';

const SelfieToClockIn = ({navigation}: any) => {
    const [isModalVisible, setModalVisible] = useState<Boolean>(false);
  return (
    <View>
      <NormalHeader onPress={() => navigation.navigate('AttendantSelfie')} title="Selfie To Clock In" />
      <WhiteContainers mrgnTop={2} marginHorizontal={4}>
        <View style={{padding: responsiveWidth(2)}}>
            <ImageBackground source={AppImages.BG} imageStyle={{ borderRadius: 15}} style={{width: '100%', height: responsiveHeight(55)}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20}}>
                    <View style={{gap: 3}}>
                    <NormalText txtColour={APPCOLORS.WHITE} title="Lat : 45.43534" fontSize={1.5} fntWeight='bold'/>
                    <NormalText txtColour={APPCOLORS.WHITE} title="Long : 97897.576" fontSize={1.5} fntWeight='bold'/>
                    <NormalText txtColour={APPCOLORS.WHITE} title="11/10/24 09:00AM GMT +07:00" fontSize={1.6} fntWeight='bold'/>
                    </View>
                    
                    <View style={{padding: responsiveWidth(1), paddingVertical: responsiveHeight(3)}}>
                    <SmallAppButton
                        onPress={()=> navigation.navigate("AttendantSelfie")}
                        title='ReTake Photo'
                        width={70}
                        btnColor='#5B2ED4'
                        icon='rotate'
                        />
                    </View>
                    </View>
            </ImageBackground>
      
        <View>
            <NormalText mrgnTop={1.5} txtColour={APPCOLORS.DARK_GRAY} title="Clock In Notes (Optional)" fontSize={1.5} />
      <TextInput
        style={{
            height: responsiveHeight(15), // Fixed height to prevent resizing
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginTop: responsiveHeight(1),
            padding: 15,
            backgroundColor: "#fff",
            textAlignVertical: "top", // Align text to the top
          }}
        placeholder="Clock-in Notes"
        multiline={true} // Allows multiple lines but not resizable
      />
      </View>
      </View>
      </WhiteContainers>

      <WhiteContainers mrgnTop={1}>
      <AppButton
        onPress={()=> setModalVisible(true)}
        title='Clock In'
        />
            </WhiteContainers>

{/* Modal */}
            <ClockInSuccessModal isModalVisible={isModalVisible} imageSource={AppImages.personBox}  title="Clock-In Successful!" subTitle="You’re all set! Your clock-in was successful. Head over to your dashboard to see your assigned tasks." 
            onPress={()=> {
                        setModalVisible(false);
                        navigation.navigate('ClockedIn');
                    }} 
                    btnTitle='Go To Clock In Page' />
    </View>
  )
}

export default SelfieToClockIn