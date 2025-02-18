import { View, Text } from 'react-native'
import React from 'react'
import CircleContainer from '../DailyUse/CircleContainer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { APPCOLORS } from '../../utils/APPCOLORS'
import { responsiveFontSize, responsiveHeight } from '../../utils/Responsive'
import { BoldText, NormalText } from '../DailyUse/AppText/AppText'
import { Image } from 'react-native'
import { AppImages } from '../../assets/AppImages'
import AppButton from '../DailyUse/AppButton'


type props = {
    title: string,
    startTime: string,
    endTime: string,
    Members?: any,
    onPress: () => void,
}
const MeetingCards = ({Members, endTime,startTime,title, onPress}:props) => {
  return (
    <View style={{padding:10, backgroundColor:APPCOLORS.MORE_LIGHT_GRAY, borderWidth:0.2, borderRadius:10, gap:15}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', }}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:5}}>
                <CircleContainer color={APPCOLORS.ICON_TEXT_COLOUR} alignSelf={'flex-start'}>
                        <Ionicons
                        name={"videocam"}
                        color={APPCOLORS.WHITE}
                        size={responsiveFontSize(1.3)}
                        />
                </CircleContainer>

                <BoldText title={title} fontSize={2}/>
            </View>

            <View style={{flexDirection:'row', alignItems:'center', gap:4}}>
                <NormalText title={startTime} fontSize={1.7} />
                <NormalText title='-' fontSize={2}/>
                <NormalText title={endTime} fontSize={1.7}/>
            </View>
        </View>


        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                <Image source={AppImages.Frame} style={{height:responsiveHeight(4), width:responsiveHeight(8), resizeMode:'contain'}}/>
                <NormalText title='+3' fontSize={2}/>
            </View>

            <AppButton width={25} height={4}  title='Join Meet' onPress={onPress}/>
        </View>
    </View>
  )
}

export default MeetingCards