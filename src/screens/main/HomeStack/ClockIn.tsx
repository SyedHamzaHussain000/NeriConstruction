/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Image, FlatList, ScrollView, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { BoldText, NormalText } from '../../../components/DailyUse/AppText/AppText';
import { AppImages } from '../../../assets/AppImages';
import WhiteContainers from '../../../components/WhiteContainers';
import AppButton from '../../../components/DailyUse/AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ClockInCards from '../../../components/DailyUse/ClockInCards';
import { ClockInNowAction, getTimeInAndTimeOutAction, getWeeklyTimeInAndTimeOutAction, startTimerAction } from '../../../redux/actions/MainActions';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateToHrs, getFormattedDate, getFormattedTime } from '../../../utils/DateAndTimeFormater';

const data = [
  {
    id: 1,
    title1: 'Today',
    title2: '00:00 Hrs',
  },
  {
    id: 2,
    title1: 'This Pay Period',
    title2: '09:00 Hrs',
  },
];

const ClockIn = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth);
  const mainState = useSelector((state: any) => state.main);
  const weeklyTimeInTimeOut = useSelector((state: any) => state.getWeeklyTimeinTimeout);
  const todayTimeIn = useSelector((state: any) => state.getTimeInTimeOut);
  const timer = useSelector((state: any) => state.timer);
  const singleTask = useSelector((state: any) => state.getSingleTask)

  const routeData = route?.params?.data;

  const clockInNowHandler = () => {
    navigation.navigate('Attendant');
  }

  useEffect(() => {
    dispatch(getTimeInAndTimeOutAction(authState?.authData.data?._id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState?.authData.data?._id]);

  useEffect(() => {
    dispatch(getWeeklyTimeInAndTimeOutAction(authState?.authData.data?._id))
  }, [authState?.authData.data?._id])

  return (
    <View style={{ flex: 1 }}>
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
          <View style={{ width: responsiveWidth(90), flexDirection: 'row' }}>
            <FlatList contentContainerStyle={{ gap: responsiveHeight(2), marginBottom: responsiveHeight(2), alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(2), width: '100%' }} horizontal data={data} renderItem={({ item, index }) => (
              <View style={{ gap: responsiveHeight(1), width: responsiveWidth(40), backgroundColor: APPCOLORS.LIGHTWHITE, borderColor: APPCOLORS.GRAY_BORDER, borderWidth: 2, padding: responsiveHeight(2), borderRadius: responsiveHeight(1) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveHeight(1) }}>
                  <AntDesign name="clockcircle" size={20} color={APPCOLORS.Clock_Bg} />
                  <NormalText title={item.title1} fontSize={1.7} />
                </View>
                <BoldText title={index == 1 ? routeData?.duration : todayTimeIn?.timeInTimeOutData?.data[0]?.timeIn || '00:00'} fontSize={2.5} />
              </View>
            )} />
          </View>
          <AppButton title={mainState?.loadingState ? "Waiting..." : "Clock In Now"} disabled={mainState?.loadingState} onPress={() => clockInNowHandler()} height={8} fntSize={1.8} />
        </WhiteContainers>
      </View>
      <ScrollView contentContainerStyle={{ padding: 10, flexGrow: 1 }} showsVerticalScrollIndicator={false}>
       
        <View style={{ flex: 1 }}>
          {weeklyTimeInTimeOut?.weeklyTimeInTimeOutLoadingState ? <View><Text>Loading...</Text></View> : <FlatList 
          data={weeklyTimeInTimeOut?.weeklyTimeInTimeOutData}
          renderItem={({item}) => {
            return (
              <ClockInCards headingDate={item.date} inprogressTxt={item.status} timeIn={item.timeIn} timeOut={item.timeOut} />
            )
          }}
          />}
        </View>
      </ScrollView>
    </View>
  );
};

export default ClockIn;

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
  },
  listContainer: {
    flex: 1, // Makes this section scrollable
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: responsiveHeight(12),
  },
});
