import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { APPCOLORS } from '../../utils/APPCOLORS'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { ButtonTypes } from '../../types/AppTypes'
import { BoldText } from './AppText/AppText'

const AppLineButton = ({title, txtColorr = APPCOLORS.WHITE , btnColor,height=6 ,width=90,onPress, icon}: ButtonTypes) => {
  return (
       <TouchableOpacity onPress={onPress} style={{ alignSelf:'center', alignItems:'center', justifyContent:'center',height:responsiveHeight(height), width:responsiveWidth(width), borderWidth:1,borderRadius:200, borderColor:APPCOLORS.ICON_TEXT_COLOUR, flexDirection: icon && "row"  }}>

              {
                icon && (
                  <Image source={icon} style={{resizeMode:'contain', height:responsiveHeight(4), width:responsiveHeight(4), marginRight:5}}/>
                )
              }

               <BoldText title={title} fontSize={2} textAligm={'center'} txtColour={txtColorr}/>

       </TouchableOpacity>
  )
}

export default AppLineButton