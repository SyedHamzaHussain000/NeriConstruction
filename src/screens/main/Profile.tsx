import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight } from '../../utils/Responsive'
import { APPCOLORS } from '../../utils/APPCOLORS'
import { BoldText } from '../../components/DailyUse/AppText/AppText'
import { AppImages } from '../../assets/AppImages'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import WhiteContainers from '../../components/WhiteContainers'
import Bars from '../../components/ProfileComp/Bars'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
const Profile = ({navigation}: {navigation: any}) => {
  return (
    <View style={{flex:1, backgroundColor:APPCOLORS.WHITE}}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{height:responsiveHeight(20), backgroundColor:APPCOLORS.ICON_TEXT_COLOUR, alignItems:'center', justifyContent:'center'}}>
            <BoldText title='My Profile' textAligm={'center'} txtColour={APPCOLORS.WHITE} fontSize={3}/>
            
            <Image source={AppImages.pfps} style={{position:'absolute', zIndex:10 ,bottom:-70}}/>
        </View>
        <View style={{height:responsiveHeight(10), }}/>

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', gap:5}}>
            <BoldText title='Tonald Drump' fontSize={2.5} textAligm={'center'}/>
            <MaterialIcons
             name={"verified"}
             size={responsiveFontSize(2.5)}
             color={APPCOLORS.ICON_TEXT_COLOUR}
            />
        </View> 
        <BoldText title='Junior Full Stack Developer' txtColour={APPCOLORS.ICON_TEXT_COLOUR} fontSize={2} textAligm={'center'}/>

        <View style={{padding:20, gap:20}}>
            <BoldText title='CONTACT' fontSize={2}/>

            <WhiteContainers bgColor={"#F4F6F9"}>
                    <View style={{padding:10, gap:10}}>
                            <Bars icon={<Ionicons name={"mail"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='Tonald@gmail.com'/>
                            <Bars icon={<Ionicons name={"location"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='Taman Anggrek'/>
                    </View>
            </WhiteContainers>
        </View>

        <View style={{padding:20, gap:10}}>
            <BoldText title='ACCOUNT' fontSize={2}/>

            <WhiteContainers bgColor={"#F4F6F9"}>
                    <View style={{padding:10, gap:10}}>
                            <Bars icon={<Ionicons name={"person"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='Personal Data'/>
                    </View>
            </WhiteContainers>
        </View>

        <View style={{padding:20, gap:10}}>
            <BoldText title='SETTINGS' fontSize={2}/>

            <WhiteContainers bgColor={"#F4F6F9"}>
                    <View style={{padding:10, gap:20}}>
                            <Bars icon={<Ionicons name={"settings"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='Change Password'/>
                            <Bars icon={<Ionicons name={"language"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='Set Language'/>
                            <Bars icon={<Ionicons name={"information-circle"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='FAQ'/>
                            <Bars icon={<Ionicons name={"help-circle"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='Help'/>
                            <Bars icon={<AntDesign name={"logout"} size={responsiveFontSize(3) } color={APPCOLORS.DARK_ORANGE}/>} title='Logout' onPress={()=> navigation.navigate("Auth")}/>
                    </View>
            </WhiteContainers>
        </View>
        </ScrollView>
    </View>
  )
}

export default Profile