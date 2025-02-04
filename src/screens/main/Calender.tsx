import {View, Text, ScrollView, FlatList} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from '../../components/AppHeaders/HomeHeader';
import {AppImages} from '../../assets/AppImages';
import Banner from '../../components/HomeComp/Banner';
import {APPCOLORS} from '../../utils/APPCOLORS';
import {TouchableOpacity} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import WhiteContainers from '../../components/WhiteContainers';
import { NormalText } from '../../components/DailyUse/AppText/AppText';
import AgendaBars from '../../components/CalenderComp/AgendaBars';
const Calender = () => {
  const [selected, setSelected] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: APPCOLORS.BACKGROUND_COLOR}}>
      <HomeHeader
        Name="Tonald Trump"
        JobTitle="Junior Full Stack Developer"
        pfp={AppImages.pfp}
      />
      <ScrollView style={{flex: 1}}>
        <View style={{padding: 20, gap: 20}}>
          <Banner
            Heading={'My Work Summary'}
            SubHeading={'Today task & presence activity'}
            img={AppImages.camera}
          />
        </View>

        <FlatList
          horizontal={true}
          data={[
            {id: 1, name: 'Day'},
            {id: 2, name: 'Week'},
            {id: 3, name: 'Month'},
            {id: 4, name: 'Year'},
          ]}
          contentContainerStyle={{gap: 7}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: APPCOLORS.LIGHT_GRAY,
                  borderRadius: 200,
                  paddingHorizontal: 30,
                }}>
                <Text style={{color: 'black'}}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />

        <Calendar
          onDayPress={(day: any) => {
            setSelected(day.dateString);
          }}
          style={{
            backgroundColor:APPCOLORS.BACKGROUND_COLOR
          }}
          theme={{
            backgroundColor: APPCOLORS.BACKGROUND_COLOR,
            calendarBackground: APPCOLORS.BACKGROUND_COLOR,
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'orange',
            },
          }}
        />




          <View style={{padding:20}}>
        <WhiteContainers>
          <View style={{padding:10, gap:10}}>
              <NormalText title='Today Agenda' fontSize={2}/>
              <AgendaBars title={"Wiring Dashboard Analytics"} time={"13:00 - 14:00"} barColor={APPCOLORS.DARK_ORANGE}/>
              <AgendaBars title={"Wiring Dashboard Analytics"} time={"13:00 - 14:00"} barColor={APPCOLORS.SKY_BLUR}/>
              <AgendaBars title={"Wiring Dashboard Analytics"} time={"13:00 - 14:00"} barColor={APPCOLORS.ICON_TEXT_COLOUR}/>

          </View>
        </WhiteContainers>
        </View>
      </ScrollView>
    </View>
  );
};

export default Calender;
