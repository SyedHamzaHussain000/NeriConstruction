import { View, Text } from 'react-native'
import React from 'react'
import { responsiveWidth } from '../../utils/Responsive'
import { APPCOLORS } from '../../utils/APPCOLORS'
type props = {
 lineWidht: number
}

const Line = ({lineWidht}:props) => {
  return (
    <View style={{height:1, width:responsiveWidth(lineWidht), backgroundColor:APPCOLORS.BORDER_LINE_COLOR, }}/>
  )
}

export default Line