import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { APPCOLORS } from '../../utils/APPCOLORS'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { ButtonTypes } from '../../types/AppTypes'
import { BoldText } from './AppText/AppText'


const SmallButtonsOrBg = ({title, txtColorr = APPCOLORS.WHITE , btnColor,height = 6 ,width = 90,onPress, icon}: ButtonTypes) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignSelf:'center', alignItems:'center', justifyContent:'center' }}>
        <View style={{height:responsiveHeight(height), paddingHorizontal:10, alignItems:'center', justifyContent:'center', borderRadius:2000, backgroundColor:btnColor, flexDirection:'row', gap:5}} >
            {
                icon
            }
            <BoldText title={title} fontSize={1.5} textAligm={'center'} txtColour={txtColorr}/>
        </View>
    </TouchableOpacity>
  )
}

export default SmallButtonsOrBg