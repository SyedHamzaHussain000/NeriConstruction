import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import HomeHeader from '../../components/AppHeaders/HomeHeader'
import { AppImages } from '../../assets/AppImages'
import Banner from '../../components/HomeComp/Banner'
import WhiteContainers from '../../components/WhiteContainers'
import { BoldText, NormalText } from '../../components/DailyUse/AppText/AppText'
import CircleContainer from '../../components/DailyUse/CircleContainer'
import { APPCOLORS } from '../../utils/APPCOLORS'
import MeetingCards from '../../components/HomeComp/MeetingCards'
import SquareContainer from '../../components/DailyUse/SquareContainer'
import TaskCard from '../../components/HomeComp/TaskCard'
import Slider from '@react-native-community/slider';
import { responsiveWidth } from '../../utils/Responsive'
import { useSelector } from 'react-redux';

const Home = ({navigation}: {navigation: any}) => {
  return (
    <View style={{flex:1}}>
        <HomeHeader Name='Tonald Trump' JobTitle='Junior Full Stack Developer'  pfp={AppImages.pfp}/>
    <ScrollView style={{flex:1, }}>
        <View style={{padding:20, gap:20}}>
          <Banner Heading={"My Work Summary"} SubHeading={"Today task & presence activity"} img={AppImages.camera}/>
          <WhiteContainers > 
            <View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
            <BoldText title='Today Meeting' fontSize={2}/>
              <SquareContainer height={3} >
                  <BoldText title='2' txtColour={APPCOLORS.PRIMARY_DARK} fontSize={1.6} />
              </SquareContainer>
            </View>
            <NormalText title='Your schedule for the day' fontSize={1.8}/>

            <View style={{gap:10, marginTop:20}}>
              <MeetingCards title='Townhall Meeting'  endTime={"02:00 AM"} startTime={"01:30 AM"} onPress={()=> navigation.navigate("TaskDetail")}/>
              <MeetingCards title='Townhall Meeting'  endTime={"02:00 AM"} startTime={"01:30 AM"} onPress={()=> navigation.navigate("TaskDetail")}/>
            </View>
          </WhiteContainers>


          <WhiteContainers >
          <View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
            <BoldText title='Today Meeting' fontSize={2}/>
              <SquareContainer height={3} >
                  <BoldText title='1' txtColour={APPCOLORS.PRIMARY_DARK} fontSize={1.6} />
              </SquareContainer>
            </View>
              <NormalText title='Your schedule for the day' fontSize={1.8}/>

              <Slider
  style={{width: responsiveWidth(85),  height: 40}}
  minimumValue={0}
  maximumValue={1}
  disabled={true}
  
  minimumTrackTintColor="#FFFFFF"
  maximumTrackTintColor={APPCOLORS.ICON_TEXT_COLOUR}
/>

              <View style={{marginTop:15}}>
               <TaskCard title='Wiring Dashboard Analytics' />
              </View>
          </WhiteContainers>

        </View>

    </ScrollView>
    </View>
  )
}

export default Home