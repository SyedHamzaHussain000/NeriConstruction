import {View, Text, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../../components/AppHeaders/HomeHeader';
import {AppImages} from '../../assets/AppImages';
import Banner from '../../components/HomeComp/Banner';
import {APPCOLORS} from '../../utils/APPCOLORS';
import {TouchableOpacity} from 'react-native';
import {Calendar, } from 'react-native-calendars';
import WhiteContainers from '../../components/WhiteContainers';
import { NormalText } from '../../components/DailyUse/AppText/AppText';
import AgendaBars from '../../components/CalenderComp/AgendaBars';
import { useDispatch, useSelector } from 'react-redux';
import { getDaylyAgendaAction, getEmployeePersonalDataAction, getMonthlyAgendaAction, getWeeklyAgendaAction, getYearlyAgendaAction } from '../../redux/actions/MainActions';
import { baseUrl } from '../../utils/Api_endPoints';
import i18n from '../../locales/index';
import { useTranslation } from 'react-i18next';

function formatTimeRange(startDate, durationInHours = 1) {
  const pad = (n) => n.toString().padStart(2, '0');

  const day = pad(startDate.getDate());
  const month = pad(startDate.getMonth() + 1); // Months are zero-based
  const year = startDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const startHours = startDate.getHours();
  const startMinutes = startDate.getMinutes();
  const endDate = new Date(startDate.getTime() + durationInHours * 60 * 60 * 1000);
  const endHours = endDate.getHours();
  const endMinutes = endDate.getMinutes();

  const startTime = `${pad(startHours)}:${pad(startMinutes)}`;
  const endTime = `${pad(endHours)}:${pad(endMinutes)}`;

  return `${formattedDate}`;
}

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState({id: 1, name: t('Day')});
  const authData = useSelector((state: any) => state.auth?.authData);
  const dispatch = useDispatch();
  const languageState = useSelector((state: any) => state.savingLanguage?.language)

  const employeeData = useSelector((state: any) => state.getEmployeePersonalData);
  const daylyData = useSelector((state: any) => state.getDaylyAgenda);
  const weeklyData = useSelector((state: any) => state.getWeeklyAgenda);
  const monthlyData = useSelector((state: any) => state.getMonthlyAgenda);
  const yearlyData = useSelector((state: any) => state.getYearlyAgenda);

  const data = {
    [t('Day')]: daylyData?.daylyAgendaData,
    [t('Week')]: weeklyData?.weeklyAgendaData,
    [t('Month')]: monthlyData?.monthlyAgendaData,
    [t('Year')]: yearlyData?.yearlyAgendaData,
  }

  const load = {
    [t('Day')]: daylyData?.daylyAgendaLoadingState,
    [t('Week')]: weeklyData?.weeklyAgendaLoadingState,
    [t('Month')]: monthlyData?.monthlyAgendaLoadingState,
    [t('Year')]: yearlyData?.yearlyAgendaLoadingState,
  }
  
    useEffect(() => {
      if(!employeeData?.personalData){
        dispatch(getEmployeePersonalDataAction(authData?.data?._id))
      }
    }, [authData?.data?._id, employeeData])

    useEffect(() => {
      console.log(selectedTab.name, t('Day'))
      if(selectedDate && selectedTab.name === t('Day')){
        dispatch(getDaylyAgendaAction(authData?.data?._id))
      }else if(selectedDate && selectedTab.name === t('Week')){
        dispatch(getWeeklyAgendaAction(authData?.data?._id))
      }else if(selectedDate && selectedTab.name === t('Month')){
        const month = new Date(selectedDate).getMonth() + 1;
        const year = new Date(selectedDate).getFullYear();
        const day = new Date(selectedDate).getDate();
        if(day){
        dispatch(getMonthlyAgendaAction(authData?.data?._id, month, year, day))
        }
        dispatch(getMonthlyAgendaAction(authData?.data?._id, month, year))
      }else if(selectedDate && selectedTab.name === t('Year')){
        const year = new Date(selectedDate).getFullYear();
        dispatch(getYearlyAgendaAction(authData?.data?._id, year))
      }

    }, [authData, selectedDate, selectedTab])

    useEffect(() => {
      if(languageState){
        i18n.changeLanguage(languageState)
      }
    }, [languageState])

  return (
    <View style={{flex: 1, backgroundColor: APPCOLORS.BACKGROUND_COLOR}}>
      <HomeHeader
        Name={employeeData?.personalDataLoadingState ? "Loading..." : `${employeeData?.personalData?.firstName} ${employeeData?.personalData?.lastName}`}
        JobTitle={employeeData?.personalDataLoadingState ? "Loading..." : employeeData?.personalData?.designation}
        pfp={employeeData?.personalData?.profileImage 
          ? { uri: `${baseUrl}/${employeeData.personalData.profileImage}` } 
          : AppImages.pfp}
      />
      <ScrollView style={{flex: 1}}>
        <View style={{padding: 20, gap: 20}}>
          <Banner
            Heading={t('My Work Summary')}
            SubHeading={t('Today task & presence activity')}
            img={AppImages.camera}
          />
        </View>

        <FlatList
          horizontal={true}
          data={[
            {id: 1, name: t('Day')},
            {id: 2, name: t('Week')},
            {id: 3, name: t('Month')},
            {id: 4, name: t('Year')},
          ]}
          contentContainerStyle={{gap: 7}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: selectedTab.name === item.name ? APPCOLORS.ClockInBg : APPCOLORS.LIGHT_GRAY,
                  borderRadius: 200,
                  paddingHorizontal: 30,
                }}
                onPress={() => setSelectedTab({id: item.id, name: item.name})}
                >
                <Text style={{color: selectedTab.name === item.name ? '#fff' : 'black'}}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />

        <Calendar
          onDayPress={(day: any) => {
            setSelectedDate(day.dateString);
          }}
          style={{
            backgroundColor:APPCOLORS.BACKGROUND_COLOR
          }}
          theme={{
            backgroundColor: APPCOLORS.BACKGROUND_COLOR,
            calendarBackground: APPCOLORS.BACKGROUND_COLOR,
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'orange',
            },
          }}
        />

          <View style={{padding:20}}>
        <WhiteContainers>
          <View style={{padding:10, gap:10}}>
              <NormalText title={`${selectedTab.name === 'Day' ? 'Today' : `${selectedTab.name}ly`} Agenda`} fontSize={2}/>
             
         {load[selectedTab.name] ? <ActivityIndicator color='blue' size={20} /> : !!data[selectedTab.name]?.length ? <FlatList 
          data={data[selectedTab.name]}
          renderItem={({item}) => (
            <AgendaBars title={item?.taskTitle} time={formatTimeRange(new Date(item?.createdAt))} barColor={APPCOLORS.ICON_TEXT_COLOUR}/>
          )}
          /> : <View><Text style={{textAlign: 'center'}}>{t('No Data Found')}</Text></View>}

          </View>
        </WhiteContainers>
        </View>
      </ScrollView>
    </View>
  );
};

export default Calender;
