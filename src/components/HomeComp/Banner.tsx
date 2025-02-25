import { View, Text, Image } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from '../../utils/Responsive'
import { APPCOLORS } from '../../utils/APPCOLORS'
import { BoldText, NormalText } from '../DailyUse/AppText/AppText'

type props = {
  Heading: string,
  SubHeading: string,
  img: any,
  width?: any,
}
const Banner = ({Heading,SubHeading,img, width}: props) => {
  return (
    <View style={{width:responsiveWidth(width ? width : 90), padding:20, paddingRight:0, backgroundColor:APPCOLORS.ICON_TEXT_COLOUR, justifyContent:'space-between', flexDirection:'row', alignSelf:'center', borderRadius:20, alignItems:'center'}}>
      <View>
            <BoldText title={Heading} txtColour={APPCOLORS.WHITE} fontSize={3}/>
            <NormalText title={SubHeading} txtColour={APPCOLORS.WHITE} fontSize={2}/>
      </View>

      <Image source={img} style={{height:responsiveHeight(8), width:responsiveWidth(20),  resizeMode:'contain'}}/>


    </View>
  )
}

export default Banner