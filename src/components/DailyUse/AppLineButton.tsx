import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { APPCOLORS } from '../../utils/APPCOLORS'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { ButtonTypes } from '../../types/AppTypes'
import { BoldText } from './AppText/AppText'

const AppLineButton = ({title, txtColorr = APPCOLORS.WHITE , btnColor,height=6 ,width=90,onPress}: ButtonTypes) => {
  return (
       <TouchableOpacity onPress={onPress} style={{ alignSelf:'center', alignItems:'center', justifyContent:'center',height:responsiveHeight(height), width:responsiveWidth(width), borderWidth:1,borderRadius:200, borderColor:APPCOLORS.ICON_TEXT_COLOUR,  }}>


               <BoldText title={title} fontSize={2} textAligm={'center'} txtColour={txtColorr}/>

       </TouchableOpacity>
  )
}

export default AppLineButton