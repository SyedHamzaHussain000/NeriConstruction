import { View, Text } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from '../../utils/Responsive'
import { NormalText } from '../DailyUse/AppText/AppText'
import { Image } from 'react-native'
import { AppImages } from '../../assets/AppImages'

type props = {
    title: String,
    time: String,
    barColor: any
}
const AgendaBars = ({time,title ,barColor}:props) => {
  return (
    <View style={{flexDirection:'row',gap:10, marginTop: 10, borderWidth:0.2, borderRadius:10}}>
        <View style={{height:responsiveHeight(10),width:responsiveWidth(5), backgroundColor:barColor, borderTopLeftRadius:10, borderBottomLeftRadius:10}}/>
        <View style={{height:responsiveHeight(10), justifyContent:'space-between', paddingBottom:10}}>
                <View style={{flexDirection:'row', alignItems:'center' , width:responsiveWidth(70), justifyContent:'space-between'}}>
                    <NormalText title={title} fontSize={1.8}  />
                    <Image source={AppImages.threecircle} style={{height:responsiveHeight(6), width:responsiveHeight(6), resizeMode:'contain'}}/>
                </View>

                <View style={{flexDirection:'row',  width:responsiveWidth(70), justifyContent:'space-between'}}>
                    <NormalText title={time} fontSize={1.8}  />
                    <NormalText title='Design' fontSize={1.8}  />
                </View>
        </View>
    </View>
  )
}

export default AgendaBars