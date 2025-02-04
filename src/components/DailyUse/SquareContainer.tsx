import { View, Text } from 'react-native'
import React from 'react'
import { APPCOLORS } from '../../utils/APPCOLORS'
import { responsiveHeight } from '../../utils/Responsive'

type props = {
    children: React.ReactNode,
    color?:any,
    alignSelf?: any,
    height: number,
}
const SquareContainer = ({children,color,alignSelf,height = 4}: props) => {
  return (
            <View style={{height:responsiveHeight(height), width:responsiveHeight(height), backgroundColor:color ? color : APPCOLORS.LIGHT_GRAY, alignSelf:alignSelf ? alignSelf: null, alignItems:'center', justifyContent:'center' , borderRadius:5 }}>
                {
                    children
                }
            </View>
  )
}

export default SquareContainer