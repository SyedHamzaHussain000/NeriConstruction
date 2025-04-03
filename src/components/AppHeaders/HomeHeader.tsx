import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils/Responsive'
import { BoldText, NormalText } from '../DailyUse/AppText/AppText'
import { APPCOLORS } from '../../utils/APPCOLORS'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import CircleContainer from '../DailyUse/CircleContainer'
import { useNavigation } from '@react-navigation/native'
type props = {
    pfp?: any,
    Name: string,
    JobTitle: string,
    paddingHorizontal?: number,
}

const HomeHeader = ({JobTitle,Name,pfp, paddingHorizontal}:props) => {
    const nav = useNavigation();
  return (
    <View style={{paddingHorizontal: paddingHorizontal ? paddingHorizontal : 20, flexDirection:'row', alignItems:'center', gap:10, backgroundColor:APPCOLORS.WHITE, justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
        <Image source={pfp} style={{height:responsiveHeight(10), width:responsiveWidth(10), borderRadius:200, resizeMode:'contain'}}/>
        <View style={{alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center' ,gap:10}}>
                <BoldText title={Name} fontSize={2.5}/>
                <Octicons
                name={"check-circle-fill"}
                size={responsiveFontSize(2)}
                color={APPCOLORS.ICON_TEXT_COLOUR}
                />
            </View>
            <BoldText title={JobTitle} fontSize={1.5} txtColour={APPCOLORS.ICON_TEXT_COLOUR} />
        </View>
        </View>

        <View style={{flexDirection:'row', gap:10}}>
        <TouchableOpacity onPress={() => nav.navigate('Language')}>
        <CircleContainer>
            <Ionicons
            name={"language"}
            color={APPCOLORS.ICON_TEXT_COLOUR}
            size={responsiveFontSize(2)}
            />
        </CircleContainer>
        </TouchableOpacity>

            <TouchableOpacity onPress={() => nav.navigate('Notification')}>
        <CircleContainer >
            <Fontisto
            name={"bell-alt"}
            color={APPCOLORS.ICON_TEXT_COLOUR}
            size={responsiveFontSize(2)}
            />
        </CircleContainer>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default HomeHeader