import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { APPCOLORS } from '../../utils/APPCOLORS'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { ButtonTypes } from '../../types/AppTypes'
import { BoldText } from './AppText/AppText'


const AppButton = ({title, txtColorr = APPCOLORS.WHITE , btnColor,height = 6 ,width = 90,onPress}: ButtonTypes) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignSelf:'center', alignItems:'center', justifyContent:'center' }}>
        <LinearGradient style={{height:responsiveHeight(height), width:responsiveWidth(width), alignItems:'center', justifyContent:'center', borderRadius:200}} colors={[APPCOLORS.PRIMARY_DARK,APPCOLORS.PRIMARY_DARK,APPCOLORS.PRIMARY_LIGHT]}>
            <BoldText title={title} fontSize={2} textAligm={'center'} txtColour={APPCOLORS.WHITE}/>
        </LinearGradient>
    </TouchableOpacity>
  )
}

export default AppButton