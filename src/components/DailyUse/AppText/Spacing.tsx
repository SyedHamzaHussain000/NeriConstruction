import { View, Text } from 'react-native'
import React from 'react'
import { responsiveHeight } from '../../../utils/Responsive'

interface margins {
    margin?: number
}
const Spacing = ({margin = 0}: margins) => {
  return (
    <View style={{marginTop:responsiveHeight(margin) }}/>
  )
}

export default Spacing