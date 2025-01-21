import { View, Text, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { AppImages } from '../../assets/AppImages'
type props = {
    children: React.ReactNode
}
const AppImageBackground = ({children}: props) => {
  return (
    <ImageBackground source={AppImages.BG} style={{flex:1}}>

        {
            children
        }

    </ImageBackground>
  )
}

export default AppImageBackground