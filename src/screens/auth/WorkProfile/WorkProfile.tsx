import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, { useState } from 'react';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import {APPCOLORS} from '../../../utils/APPCOLORS';
import {
  BoldText,
  NormalText,
} from '../../../components/DailyUse/AppText/AppText';
import { Image } from 'react-native';
import { AppImages } from '../../../assets/AppImages';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import AppTxtInput from '../../../components/DailyUse/AppTxtInput';
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AppButton from '../../../components/DailyUse/AppButton';
const WorkProfile = ({navigation, route}: any) => {
const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    position: '',
    country: '',
    state: '',
    city: '',
    fullAddress: '',
  });
  const id = route?.params?.employeeId

  return (
    <View>
      <NormalHeader onPress={()=> navigation.goBack()} title="My Work Profile" />
      <ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:responsiveHeight(10)}}>
      <View style={{padding: 20, gap:20}}>
        <View style={style.container}>
          <BoldText title="Personal Data Information" fontSize={2} />
          <NormalText title="Your personal data information" fontSize={1.7} />

          <Image source={AppImages.upload} style={{alignSelf:'center', height:responsiveHeight(20), width:responsiveHeight(20), resizeMode:'contain'}}/>

          <View style={{width:responsiveWidth(60), alignSelf:'center', marginTop:10}}>
            <BoldText title="Upload Photo" fontSize={2} textAligm={'center'} />
            <NormalText title="Format should be in .jpeg .png atleast 800x800px and less than 5MB" fontSize={1.7}  textAligm={'center'}/>
          </View>

            <View style={{gap:20}}>
            <AppTxtInput
            inputHeadig='First Name'
            icon={<Octicons name='person' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Tonald'
            value={formValues.firstName}
            onChangeText={(text: any) => setFormValues({...formValues, firstName: text})}
            />

<AppTxtInput
            inputHeadig='Last Name'
            icon={<Octicons name='person' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Drump'
            value={formValues.lastName}
            onChangeText={(text: any) => setFormValues({...formValues, lastName: text})}
            />


<AppTxtInput
            inputHeadig='Date of Birth'
            icon={<AntDesign name='calendar' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Date of Birth'
            />


<AppTxtInput
            inputHeadig='Position'
            icon={<MaterialCommunityIcons name='inbox-full-outline' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Select Position'
            />
            </View>
        </View>


        <View style={style.container}>

        <BoldText title="Address" fontSize={2} />
          <NormalText title="Your current domicile" fontSize={1.7} />


            <View style={{gap:20, marginTop:20}}>
            <AppTxtInput
            inputHeadig='Country'
            icon={<Ionicons name='location-outline' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='USA'
            />

<AppTxtInput
            inputHeadig='State'
            icon={<Ionicons name='location-outline' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='California'
            />


<AppTxtInput
            inputHeadig='City'
            icon={<Ionicons name='location-outline' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Los Angeles'
            />


<AppTxtInput
            inputHeadig='Full Address'
            icon={<Ionicons name='location-outline' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Los Angeles'
            />

              <AppButton 
              title='Continue'
              onPress={()=> navigation.navigate("Main")}
              />


            </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default WorkProfile;


const style = StyleSheet.create({
  container: {backgroundColor: APPCOLORS.WHITE, padding: 10, borderRadius:10}
})