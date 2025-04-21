import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { formatDateToHrs } from '../../../utils/DateAndTimeFormater';
import { takeABreakAction } from '../../../redux/actions/MainActions';
import { useTranslation } from 'react-i18next';


const ClockedIn = ({navigation}: any) => {
      const { t } = useTranslation();
  const data = [
      {
        id: 1,
        title1: t('Today'),
        title2: '00:00 Hrs',
      },
      {
        id: 2,
        title1: t('This Pay Period'),
        title2: '09:00 Hrs',
      },
    ];
  const weeklyTimeInTimeOut = useSelector((state: any) => state.getWeeklyTimeinTimeout);
  const timeInAndTimeOut = useSelector((state: any) => state.getTimeInTimeOut);
  const [todayHrs, setTodayHrs] = useState('');
    const singleTask = useSelector((state: any) => state.getSingleTask)
  const timer = useSelector((state: any) => state.timer);
  const todayTimeIn = useSelector((state: any) => state.getTimeInTimeOut);
  const loading = useSelector((state: any) => state.break?.takeBreakLoadingState);
  const dispatch = useDispatch() 
  
  useEffect(() => {
      const date = timeInAndTimeOut ? new Date(timeInAndTimeOut?.timeInTimeOutData?.data?.date) : null;
      const resDate = date ? formatDateToHrs(date) : '00:00 Hrs'
      setTodayHrs(resDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeInAndTimeOut]);

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
                      title={t("Let’s Clock-In!")}
                      fontSize={3}
                      txtColour={APPCOLORS.WHITE}
                    />
                    <BoldText
                      title={t("Don’t miss your clock in schedule")}
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
            <NormalText title={`${t('Paid Period')} ${singleTask?.singleTaskData?.startDate || 0} ${singleTask?.singleTaskData?.endDate || 0}`} fontSize={1.5} />
          </View>
          <View style={{ width: responsiveWidth(88), flexDirection: 'row' }}>
            <FlatList contentContainerStyle={{ gap: responsiveHeight(2), marginBottom: responsiveHeight(2), alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(2), width: '100%' }} horizontal data={data} renderItem={({ item, index }) => (
              <View style={{ gap: responsiveHeight(1), width: responsiveWidth(42), backgroundColor: APPCOLORS.LIGHTWHITE, borderColor: APPCOLORS.GRAY_BORDER, borderWidth: 2, padding: responsiveHeight(2), borderRadius: responsiveHeight(1) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveHeight(1) }}>
                  <AntDesign name="clockcircle" size={20} color={APPCOLORS.Clock_Bg} />
                  <NormalText title={item.title1} fontSize={1.7} />
                </View>
                <BoldText title={index == 0 ? todayTimeIn?.timeInTimeOutData?.data[0]?.timeIn || '00:00' : singleTask?.singleTaskData?.duration} fontSize={2.5} />
              </View>
            )} />
          </View>
          <View style={{flexDirection: 'row', gap: 16, }}>
          <SmallAppButton title={loading ? t("Waiting") : t("Take A Break")}  onPress={() => dispatch(takeABreakAction(todayTimeIn.timeInTimeOutData?.data[0], navigation))} height={8} fntSize={1.8} btnColor={APPCOLORS.WHITE} borderWidth={1} borderColor={APPCOLORS.ClockInBg} txtColor={APPCOLORS.ClockInBg} width={42} borderRadious={49} height={6.4} />
          <SmallAppButton title={t("Clock Out")} onPress={() => navigation.navigate('TakeABreak')} height={8} fntSize={1.8} btnColor={APPCOLORS.BLACK} width={42} borderRadious={49} height={6.4}/>
          </View>
        </WhiteContainers>
              </View>
              <ScrollView contentContainerStyle={{ padding: 10, flexGrow: 1,  }} showsVerticalScrollIndicator={false}>
       
        <View style={{ flex: 1, }}>
            <FlatList 
              data={weeklyTimeInTimeOut?.weeklyTimeInTimeOutData}
              renderItem={({item}) => {
                return (
                  <ClockInCards headingDate={item.date} timeIn={item.timeIn} timeOut={item.timeOut} />
                )
              }}
              />
        </View>
      </ScrollView>
    </View>
  );
};

export default ClockedIn;

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
