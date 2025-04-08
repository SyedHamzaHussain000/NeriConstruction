/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, Image, Alert } from 'react-native';
import { launchCamera as _launchCamera } from 'react-native-image-picker';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import WhiteContainers from '../../../components/WhiteContainers';
import {AppImages} from '../../../assets/AppImages';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { NormalText } from '../../../components/DailyUse/AppText/AppText';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import AppButton, { SmallAppButton } from '../../../components/DailyUse/AppButton';
import DropDownModal from '../../../components/DropDownModal';
import ClockInSuccessModal from '../../../components/HomeComp/ClockInSuccessModal';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../utils/Api_endPoints';

let launchCamera = _launchCamera;

const SelfieToClockIn = ({navigation, route}: any) => {
    const [isModalVisible, setModalVisible] = useState<Boolean>(false);
    // const {photo} = route?.params;
    const [newPhoto, setNewPhoto] = useState<Boolean>();
    const mainState = useSelector((state: any) => state.main?.clockInData);
    const data = mainState?.data

    const handleRetakePhoto = () => {
            const options = {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 2000,
              maxWidth: 2000,
            };
            launchCamera(options, handleResponse);
    }

    const handleResponse = (response: any) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setNewPhoto(imageUri);
      }
    }

  return (
    <View>
      <NormalHeader onPress={() => navigation.goBack()} title="Selfie To Clock In" />
      <WhiteContainers mrgnTop={2} marginHorizontal={4}>
        <View style={{padding: responsiveWidth(2)}}>
            <ImageBackground source={ {uri: `${baseUrl}/${data?.image}`} } imageStyle={{ borderRadius: 15}} style={{width: '100%', height: responsiveHeight(55)}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20}}>
                    <View style={{gap: 3}}>
                    <NormalText txtColour={APPCOLORS.WHITE} title={`Lat : ${data?.location?.coordinates[0]}`} fontSize={1.5} fntWeight="bold"/>
                    <NormalText txtColour={APPCOLORS.WHITE} title={`Long : ${data?.location?.coordinates[1]}`} fontSize={1.5} fntWeight="bold"/>
                    <NormalText txtColour={APPCOLORS.WHITE} title={data?.createdAt} fontSize={1.6} fntWeight="bold"/>
                    </View>

                    <View style={{padding: responsiveWidth(1), paddingVertical: responsiveHeight(3)}}>
                    <SmallAppButton
                        onPress={()=> handleRetakePhoto()}
                        title="ReTake Photo"
                        width={70}
                        btnColor="#5B2ED4"
                        icon="rotate"
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
            borderColor: '#ccc',
            borderRadius: 8,
            marginTop: responsiveHeight(1),
            padding: 15,
            backgroundColor: '#fff',
            textAlignVertical: 'top', // Align text to the top
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
        title="Clock In"
        />
            </WhiteContainers>

{/* Modal */}
            <ClockInSuccessModal isModalVisible={isModalVisible} imageSource={AppImages.personBox}  title="Clock-In Successful!" subTitle="You’re all set! Your clock-in was successful. Head over to your dashboard to see your assigned tasks."
            onPress={()=> {
                        setModalVisible(false);
                        navigation.navigate('ClockedIn');
                    }}
                    btnTitle="Go To Clock In Page" />
    </View>
  );
};

export default SelfieToClockIn;
