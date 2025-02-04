import { View, Text } from 'react-native'
import React from 'react'
import { NormalText } from '../DailyUse/AppText/AppText'
import { TouchableOpacity } from 'react-native'

type props = {
    icon : any
    title: string
    onPress?: () => void
}
const Bars = ({icon,title, onPress}: props) => {
  return (
    <TouchableOpacity onPress={onPress} style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                {
                    icon
                }
                <NormalText title={title} fontSize={2}/>
            </View>
    </TouchableOpacity>
  )
}

export default Bars