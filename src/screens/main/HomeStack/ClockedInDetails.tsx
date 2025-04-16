import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, TextInput, Image, Platform, PermissionsAndroid, Alert } from 'react-native'
import NormalHeader from '../../../components/AppHeaders/NormalHeader'
import WhiteContainers from '../../../components/WhiteContainers';
import {AppImages} from '../../../assets/AppImages';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { BoldText, NormalText } from '../../../components/DailyUse/AppText/AppText';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import AppButton, { SmallAppButton } from '../../../components/DailyUse/AppButton';
import ClockInSuccessModal from '../../../components/HomeComp/ClockInSuccessModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { baseUrl, endPoints } from '../../../utils/Api_endPoints';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import * as base64 from 'base64-js';
// import Share from 'react-native-share';

const ClockedInDetails = ({navigation}: any) => {
    const [isModalVisible, setModalVisible] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const todayTimeIn = useSelector((state: any) => state.getTimeInTimeOut);
    const [details, setDetails] = useState({});
    const authState = useSelector((state: any) => state.auth);

    async function requestStoragePermission() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to download and manage files.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
      }
      return true;
    }

    const handleExportPDF = async () => {
      try {
        setIsLoading(true);
        
        const { config, fs } = RNFetchBlob;
        const downloads = fs.dirs.DownloadDir;
    
        // Date formatting
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        const url = `${baseUrl}${endPoints.downloadPDF}?employeeId=${authState?.authData.data?._id}&year=${year}&month=${month}&day=${day}`;
    
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        const pdfData = res.data;
        const base64Data = base64.fromByteArray(new Uint8Array(pdfData));
    
        const fileName = `report_${year}${month}${day}.pdf`;
        const filePath = `${downloads}/${fileName}`;
    
        // Write the file
        await fs.writeFile(filePath, base64Data, 'base64');
        const fileExists = await fs.exists(filePath);
    
        if (fileExists) {
          console.log('PDF downloaded successfully to:', filePath);
    
          if (Platform.OS === 'ios') {
            // await Share.open({
            //   url: `file://${filePath}`,
            //   type: 'application/pdf',
            //   title: 'Open PDF',
            // });
            console.log('ios')
          } else {
            Alert.alert('Download Complete', `PDF saved to Downloads as ${fileName}`);
            navigation.navigate('TabBar')
          }
        } else {
          Alert.alert('Error', 'Failed to save the PDF');
        }
    
      } catch (err) {
        console.warn('Error downloading PDF:', err?.message);
        Alert.alert('Error', 'Failed to download PDF');
      } finally {
        setIsLoading(false);
      }
    };

    const getData = async (id) => {
      try {
         const res = await axios.get(`${baseUrl}${endPoints.attendanceTotal}?attendanceId=${id}`);
         setDetails(res.data?.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getData(todayTimeIn?.timeInTimeOutData?.data[0]?._id)
    }, [todayTimeIn?.timeInTimeOutData]);


    
  return (
    <View>
      <NormalHeader onPress={() => navigation.goBack()} title="Details" />
      <WhiteContainers mrgnTop={2} marginHorizontal={4}>
         <View style={{ flexDirection: 'row', gap: responsiveHeight(1), marginHorizontal: responsiveWidth(1), paddingBottom: 10, marginTop: 5, alignItems: 'center' }}>
                  <AntDesign name="calendar" size={20} color={APPCOLORS.ICON_TEXT_COLOUR} />
                  <BoldText title={details?.date} fontSize={2} fntWeight="700" />
                </View>
        <View style={{borderWidth: 1.5, borderColor: '#EAEFCA', borderRadius: 15, padding: responsiveWidth(2)}}>
        <View style={{marginHorizontal: responsiveWidth(3)}}>
        <NormalText txtColour={APPCOLORS.DARK_GRAY} title="Selfie Clock In" fontSize={1.5} fntWeight='bold'  />
        </View>
        <View style={{padding: responsiveWidth(2)}}>
            <ImageBackground source={{uri: `${baseUrl}/${details?.image}`}} imageStyle={{ borderRadius: 15}} style={{width: '100%', height: responsiveHeight(45)}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: responsiveWidth(3)}}>
                    <View style={{gap: 3, paddingBottom: responsiveHeight(2)}}>
                    <NormalText txtColour={APPCOLORS.WHITE} title={`Lat : ${details?.latitude}`} fontSize={1.5} fntWeight='bold'/>
                    <NormalText txtColour={APPCOLORS.WHITE} title={`Long : ${details?.longitude}`} fontSize={1.5} fntWeight='bold'/>
                    <NormalText txtColour={APPCOLORS.WHITE} title={details?.createdAt} fontSize={1.6} fntWeight='bold'/>
                    </View>
                    </View>
            </ImageBackground>
      
        <View>
            <NormalText mrgnTop={1.5} txtColour={APPCOLORS.DARK_GRAY} title="Clock-In Notes" fontSize={1.5} />
            <View style={{width: responsiveWidth(6), height: responsiveHeight(0.4), marginTop: 8, borderRadius: 20, backgroundColor: APPCOLORS.DARK_GRAY}} />
        <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1), justifyContent: 'space-between', padding: responsiveHeight(1), paddingLeft: 0, borderRadius: responsiveHeight(1) }}>
                <View>
                  <NormalText txtColour={APPCOLORS.DARK_GRAY} fontSize={1.6} title="Total Hours" />
                  <BoldText txtColour={APPCOLORS.ClockInBold} fntWeight="600" fontSize={1.8} title={details?.shiftHours} />
                </View>
                <View>
                  <NormalText txtColour={APPCOLORS.DARK_GRAY} fontSize={1.6} title="Clock in & Out" />
                  <BoldText txtColour={APPCOLORS.ClockInBold} fntWeight="600" fontSize={1.8} title={`${details?.timeIn} — ${details?.timeOut}`} />
                </View>
              </View>

              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: responsiveHeight(1), paddingLeft: 0, borderRadius: responsiveHeight(1) }}>
                <View>
                  <NormalText txtColour={APPCOLORS.DARK_GRAY} fontSize={1.6} title="Break" />
                  <BoldText txtColour={APPCOLORS.ClockInBold} fntWeight="600" fontSize={1.8} title="01:00:00 hrs" />
                </View>
                <View>
                  <NormalText txtColour={APPCOLORS.DARK_GRAY} fontSize={1.6} title="Take A Break & Back To Work" />
                  <BoldText txtColour={APPCOLORS.ClockInBold} fntWeight="600" fontSize={1.8} textAligm='right' title="12:00 AM — 01:00 PM" />
                </View>
              </View> */}
      </View>
      </View>
      </View>
      </WhiteContainers>

      <WhiteContainers mrgnTop={1}>
      <AppButton
        onPress={()=> handleExportPDF()}
        title={isLoading ? "Waiting..." : 'Export As PDF'}
        disabled={isLoading}
        />
            </WhiteContainers>

{/* Modal */}
            <ClockInSuccessModal isModalVisible={isModalVisible} imageSource={AppImages.download}  title="Export As PDF Successful!" subTitle="Your clock-in data has been exported as a PDF. You can now download it." 
            onPress={()=> {
                        setModalVisible(false);
                        // navigation.navigate('Calender');
                    }} 
                    btnTitle='Close Message' />
    </View>
  )
}

export default ClockedInDetails;