import { View, Text } from 'react-native'
import React from 'react'
import { responsiveHeight } from '../../utils/Responsive';
import { BoldText, NormalText } from '../DailyUse/AppText/AppText';
import CircleContainer from '../DailyUse/CircleContainer';
import { APPCOLORS } from '../../utils/APPCOLORS';

type props = {
    cardType: string;
    number?: number 
    bgColor: any
    icon: any
}

const BannerBoxes = ({cardType,number, bgColor, icon}: props) => {
  return (
    <View style={{height:responsiveHeight(10), width:responsiveHeight(12), borderRadius:10, backgroundColor:APPCOLORS.LIGHT_GRAY, borderWidth:0.1,  justifyContent:'center', padding:20}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:7, alignSelf:'center'}}>
                <CircleContainer color={bgColor} >
                    {
                        icon
                    }
                </CircleContainer>
                <NormalText title={cardType} fontSize={1.5}/>
        </View>
        <View style={{marginTop:5}}>

        <BoldText title={JSON.stringify(number)} fontSize={2}/>
        </View>
    </View>
  )
}

export default BannerBoxes