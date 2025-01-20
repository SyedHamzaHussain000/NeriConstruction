import { View, Text, Image } from 'react-native'
import React from 'react'
import { BoldText, NormalText } from '../DailyUse/AppText/AppText'
import { responsiveHeight } from '../../utils/Responsive'
import Spacing from '../DailyUse/AppText/Spacing'


interface props {
    heading: string,
    subheading: string,
    img: any
    
}

const BordingCard = ({heading,img, subheading}: props) => {
  return (
    <View>
      <Image source={img} style={{height:responsiveHeight(40), width:responsiveHeight(40), resizeMode:'contain', }}/>
        <Spacing margin={2} />
        <BoldText title={heading} fontSize={3} textAligm={'center'}/>
        <NormalText title={subheading} fontSize={1.5} textAligm={'center'} />
    </View>
  )
}

export default BordingCard