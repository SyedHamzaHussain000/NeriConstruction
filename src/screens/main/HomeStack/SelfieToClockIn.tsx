/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../../utils/Api_endPoints';
import { ClockInNowAction, savedDataForClockIn } from '../../../redux/actions/MainActions';
import { getFormattedDate, getFormattedTime } from '../../../utils/DateAndTimeFormater';
import { useTranslation } from 'react-i18next';

let launchCamera = _launchCamera;

const SelfieToClockIn = ({navigation}: any) => {
    const [isModalVisible, setModalVisible] = useState<Boolean>(false);
    const [clockInNotes, setClockInNotes] = useState<string>('');
    const [newPhoto, setNewPhoto] = useState<Object>({uri: '', name: '', type: ''});
    const mainState = useSelector((state: any) => state.main?.clockInData);
    const loadingState = useSelector((state: any) => state.main?.loadingState);
    const data = mainState
    const authState = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const singleTask = useSelector((state: any) => state.getSingleTask)
    const { t } = useTranslation();

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
        Alert.alert(t('Cancelled'), t('User cancelled image picker'));
      } else if (response.errorCode) {
        Alert.alert(t('Error'), response.errorMessage);
      } else {
        // let imageUri = response.uri || response.assets?.[0]?.uri;
        const timeValues = {
                id: authState?.authData.data?._id,
                date: getFormattedDate(),
                timeIn: getFormattedTime(),
                longitude: data?.longitude,
                latitude: data?.latitude,
                image: {
                  uri: response.assets?.[0]?.uri,
                  name: response.assets?.[0]?.fileName,
                  type: response.assets?.[0]?.type || 'image/jpeg',
                },
              }
              dispatch(savedDataForClockIn(timeValues))
        setNewPhoto({
          uri: response.assets?.[0]?.uri,
          name: response.assets?.[0]?.fileName,
          type: response.assets?.[0]?.type || 'image/jpeg',
        });
      }
    }

    const clockinHandler = () => {
      // setModalVisible(true)
      const timeValues = {
        id: authState?.authData.data?._id,
        taskId: singleTask?.singleTaskData?._id,
        date: getFormattedDate(),
        timeIn: getFormattedTime(),
        image: data?.image || newPhoto,
        clockInNotes: clockInNotes || '',
        lat: data?.latitude,
        long: data?.longitude,
        locationName: 'Times Square',
      }
      dispatch(ClockInNowAction(timeValues, setModalVisible))
      console.log(timeValues)
    }

  return (
    <View>
      <NormalHeader onPress={() => navigation.goBack()} title={t("Selfie To Clock In")} />
      <ScrollView>
      <WhiteContainers mrgnTop={2} marginHorizontal={4}>
        <View style={{ padding: responsiveWidth(2) }}>
          <ImageBackground source={data ? {uri: data?.image?.uri} : AppImages.BG} imageStyle={{ borderRadius: 15 }} style={{ width: '100%', height: responsiveHeight(55) }}>
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20 }}>
              <View style={{ gap: 3 }}>
                <NormalText txtColour={APPCOLORS.WHITE} title={`Lat : ${data?.latitude}`} fontSize={1.5} fntWeight="bold" />
                <NormalText txtColour={APPCOLORS.WHITE} title={`Long : ${data?.longitude}`} fontSize={1.5} fntWeight="bold" />
                <NormalText txtColour={APPCOLORS.WHITE} title={data?.date} fontSize={1.6} fntWeight="bold" />
              </View>

              <View style={{ padding: responsiveWidth(1), paddingVertical: responsiveHeight(3) }}>
                <SmallAppButton
                  onPress={() => handleRetakePhoto()}
                  title={t("ReTake Photo")}
                  width={70}
                  btnColor="#5B2ED4"
                  icon="rotate" />
              </View>
            </View>
          </ImageBackground>

          <View>
            <NormalText mrgnTop={1.5} txtColour={APPCOLORS.DARK_GRAY} title={t("Clock In Notes (Optional)")} fontSize={1.5} />
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
              placeholder={t("Clock-in Notes")}
              onChangeText={(text) => setClockInNotes(text)}
              value={clockInNotes}
              multiline={true} // Allows multiple lines but not resizable
            />
          </View>
        </View>
      </WhiteContainers><WhiteContainers mrgnTop={1}>
          <AppButton
            onPress={() => clockinHandler()}
            title={loadingState ? t("Waiting...") : t("Clock In")}
            // disabled={loadingState}
            />
        </WhiteContainers>
        </ScrollView>


{/* Modal */}
            <ClockInSuccessModal isModalVisible={isModalVisible} imageSource={AppImages.personBox}  title={t("Clock-In Successful!")} subTitle={t("You’re all set! Your clock-in was successful. Head over to your dashboard to see your assigned tasks.")}
            onPress={()=> {
                        setModalVisible(false);
                        navigation.navigate('ClockedIn');
                    }}
                    btnTitle={t("Go To Clock In Page")} />
    </View>
  );
};

export default SelfieToClockIn;
