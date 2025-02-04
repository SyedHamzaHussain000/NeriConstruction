import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils/Responsive';
import { APPCOLORS } from '../../utils/APPCOLORS';
import { BoldText } from '../DailyUse/AppText/AppText';
import Ionicons from 'react-native-vector-icons/Ionicons'
type props = {
    title: string,
    onPress?: ()=> void;
}
const NormalHeader = ({title, onPress}:props) => {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20, padding:20, backgroundColor:APPCOLORS.WHITE, alignItems:'center'}}>
        
        <TouchableOpacity onPress={onPress} style={{height:responsiveHeight(4), width:responsiveHeight(4), borderRadius:200, alignItems:'center', justifyContent:'center', backgroundColor:APPCOLORS.SKY_BLUR}}>
                <Ionicons
                name={"chevron-back"}
                color={APPCOLORS.BLACK}
                size={responsiveFontSize(2)}
                
                />
        </TouchableOpacity>

        <BoldText title={title} fontSize={2.5}/>

        <View style={{width:responsiveWidth(4)}}/>
    </View>
  )
}

export default NormalHeader