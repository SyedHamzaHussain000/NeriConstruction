/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import React from 'react';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { BoldText, NormalText } from '../../../components/DailyUse/AppText/AppText';
import { AppImages } from '../../../assets/AppImages';
import WhiteContainers from '../../../components/WhiteContainers';
import AppButton from '../../../components/DailyUse/AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ClockInCards from '../../../components/DailyUse/ClockInCards';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ClockedOut = ({ navigation }: { navigation: any }) => {
  const weeklyTimeInTimeOut = useSelector((state: any) => state.getWeeklyTimeinTimeout);
  const todayTimeIn = useSelector((state: any) => state.getTimeInTimeOut);
  const singleTask = useSelector((state: any) => state.getSingleTask)
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
      title2: '32:00 Hrs',
    },
  ];
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
            <BoldText title={t("Total Working Hour")} fontSize={2} />
          <NormalText title={`${t('Paid Period')} ${singleTask?.singleTaskData?.startDate || 0} ${singleTask?.singleTaskData?.endDate || 0}`} fontSize={1.5} />
          </View>
          <View style={{ width: responsiveWidth(90), flexDirection: 'row' }}>
            <FlatList contentContainerStyle={{ gap: responsiveHeight(2), marginBottom: responsiveHeight(2), alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(2), width: '100%' }} horizontal data={data} renderItem={({ item, index }) => (
              <View style={{ gap: responsiveHeight(1), width: responsiveWidth(40), backgroundColor: APPCOLORS.LIGHTWHITE, borderColor: APPCOLORS.GRAY_BORDER, borderWidth: 2, padding: responsiveHeight(2), borderRadius: responsiveHeight(1) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveHeight(1) }}>
                  <AntDesign name="clockcircle" size={20} color={APPCOLORS.Clock_Bg} />
                  <NormalText title={item.title1} fontSize={1.7} />
                </View>
                <BoldText title={index == 0 ? todayTimeIn?.timeInTimeOutData?.data[0]?.timeIn || '00:00' : singleTask?.singleTaskData?.duration} fontSize={2.5} />
              </View>
            )} />
          </View>
          <AppButton title={t("Clocked Out")} onPress={() => navigation.navigate('ClockedInDetails')} height={8} fntSize={1.8} />
        </WhiteContainers>
      </View>
      <ScrollView contentContainerStyle={{ padding: 10, flexGrow: 1 }} showsVerticalScrollIndicator={false}>
       
        <View style={{ flex: 1 }}>
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

export default ClockedOut;

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
