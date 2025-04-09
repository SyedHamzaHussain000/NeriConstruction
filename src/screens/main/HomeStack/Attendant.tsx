/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, Platform, Alert, PermissionsAndroid, Linking } from 'react-native';
import { launchCamera as _launchCamera } from 'react-native-image-picker';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import WhiteContainers from '../../../components/WhiteContainers';
import { NormalText, BoldText } from '../../../components/DailyUse/AppText/AppText';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { AppImages } from '../../../assets/AppImages';
import AppButton from '../../../components/DailyUse/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { ClockInNowAction, getTimeInAndTimeOutAction, savedDataForClockIn } from '../../../redux/actions/MainActions';
import { getFormattedDate, getFormattedTime } from '../../../utils/DateAndTimeFormater';
const scheduleData = [
  {text: 'CLOCK IN', time: '09:00', width: responsiveWidth(45)},
  {text: 'CLOCK OUT', time: '05:00', width: responsiveWidth(45)},
]

let launchCamera = _launchCamera;

const Attendant = ({ navigation }: { navigation: any }) => {
    const timeInAndTimeOut = useSelector((state: any) => state.getTimeInTimeOut);
      const mainState = useSelector((state: any) => state.main);
    const authState = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Camera permission is required');
          Linking.openSettings();
          return false;
        }
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const selfieHandler = async () => {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;
  
      launchCamera(options, handleResponse);
  }

  const navTo = () => {
    navigation.navigate('SelfieToClockIn');
  }

  const handleResponse = (response: any) => {
    if (response.didCancel) {
      Alert.alert('Cancelled', 'User cancelled image picker');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage);
    } else {
      const timeValues = {
        id: authState?.authData.data?._id,
        date: getFormattedDate(),
        timeIn: getFormattedTime(),
        longitude: '24.8607',
        latitude: '67.0011',
        image: {
          uri: response.assets?.[0]?.uri,
          name: response.assets?.[0]?.fileName,
          type: response.assets?.[0]?.type || 'image/jpeg',
        },
      }
      dispatch(savedDataForClockIn(timeValues, navTo))
      // navigation.navigate("SelfieToClockIn", {photo: imageUri})
    }
  }

   useEffect(() => {
      dispatch(getTimeInAndTimeOutAction(authState?.authData.data?._id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState?.authData.data?._id]);

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
          renderItem={({item, index}) => {
                      return (
                        <View style={{width: item.width, alignItems: 'center', borderRadius: 14, backgroundColor: APPCOLORS.LIGHTWHITE, borderWidth: 1, borderColor:APPCOLORS.GRAY_BORDER, padding: responsiveHeight(1.5), marginTop: responsiveHeight(1.5)}}>
                        <NormalText txtColour={APPCOLORS.DARK_GRAY} title={item.text} fontSize={2} fntWeight='bold'/>
                        <NormalText txtColour={APPCOLORS.BLACK} title={index == 0 ? timeInAndTimeOut?.timeInTimeOutData?.data?.timeIn || '00:00' : timeInAndTimeOut?.timeInTimeOutData?.data?.timeOut || '00:00' } fontSize={4} fntWeight='bold' />
                      </View>
                      );
                    }}
        />
        
       
      </WhiteContainers>
      <View style={{height:responsiveHeight(30), justifyContent: 'flex-end'}}>
        <AppButton
        onPress={()=> selfieHandler()}
        title={mainState?.loadingState ? "Waiting..." : 'Selfie To Clock In'}
        disabled={mainState?.loadingState}
        />
        </View>
    </View>
  );
};

export default Attendant;
