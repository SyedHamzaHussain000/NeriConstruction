import { View, Text } from 'react-native'
import React from 'react'
import { APPCOLORS } from '../utils/APPCOLORS'


type child = {
    children: React.ReactNode
    bgColor?:any
}

const WhiteContainers = ({children,bgColor}: child) => {
  return (
    <View style={{backgroundColor: bgColor ? bgColor :APPCOLORS.WHITE, borderRadius:10, padding:10}}>
      {children}
    </View>
  )
}

export default WhiteContainers