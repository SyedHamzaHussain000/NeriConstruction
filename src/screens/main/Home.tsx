/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeePersonalDataAction } from '../../redux/actions/MainActions'
import { baseUrl } from '../../utils/Api_endPoints'

const Home = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const authData = useSelector((state: any) => state.auth?.authData);
  const employeeData = useSelector((state: any) => state.getEmployeePersonalData);

  useEffect(() => {
    dispatch(getEmployeePersonalDataAction(authData?.data?._id))
  }, [authData?.data?._id])

  return (
    <View style={{flex:1}}>
        <HomeHeader Name={employeeData?.personalDataLoadingState ? "Loading..." : `${employeeData?.personalData?.firstName} ${employeeData?.personalData?.lastName}`} JobTitle={employeeData?.personalDataLoadingState ? "Loading..." : employeeData?.personalData?.designation}  pfp={employeeData?.personalData?.profileImage 
  ? { uri: `${baseUrl}/${employeeData.personalData.profileImage}` } 
  : AppImages.pfp}/>
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