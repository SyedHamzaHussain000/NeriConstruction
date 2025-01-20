import { View, Text } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import { AppImages } from '../../../assets/AppImages';
import BordingCard from '../../../components/boardingComp/BordingCard';
import LinearGradient from 'react-native-linear-gradient';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import AppButton from '../../../components/DailyUse/AppButton';
import AppLineButton from '../../../components/DailyUse/AppLineButton';

const OnBoarding = () => {

  const slides = [
    {
      key: 1,
      title: 'Welcome to App',
      text: 'Make Smart Decisions! Set clear timelines for projects and celebrate your achievements!',
      image: AppImages.boardingone,
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Manage Stress Effectively',
      text: 'Stay Balanced! Track your workload and maintain a healthy stress level with ease.',
      image: AppImages.boardingtwo,
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Plan for Success',
      text: 'Your Journey Starts Here! Earn achievement badges as you conquer your tasks. Let’s get started!',
      image: AppImages.boardingthree,
      backgroundColor: '#22bcb5',
    }
  ];



  return (
    <LinearGradient colors={[APPCOLORS.PRIMARY_LIGHT,  APPCOLORS.WHITE]} style={{flex:1}}>
      <View style={{flex:0.9}}>
      <AppIntroSlider 
        data={slides}
        showPrevButton={false}
        showNextButton={false}
        showDoneButton={false}
        renderItem={({item})=>{

          return(
            <View style={{flex:0.8, alignItems:'center', justifyContent:'center'}}>
              <View style={{padding:20}}>

                <BordingCard heading={item.title} subheading={item.text} img={item.image}/>
              </View>
            </View>
          )
        }}
      />
      </View>

      <View style={{gap:10}}>
        <AppButton title='Next' />
        <AppLineButton title='Skip' txtColorr={APPCOLORS.ICON_TEXT_COLOUR}/>
      </View>

    </LinearGradient>
  )
}

export default OnBoarding