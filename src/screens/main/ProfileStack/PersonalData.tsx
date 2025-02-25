import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import WhiteContainers from '../../../components/WhiteContainers';
import { BoldText } from '../../../components/DailyUse/AppText/AppText';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { AppImages } from '../../../assets/AppImages';
import NormalInput from '../../../components/PersonalDataComp/NormalInput';
import DropDownInput from '../../../components/PersonalDataComp/DropDownInput';
import AppButton from '../../../components/DailyUse/AppButton';
import UpdateProfileModal from '../../../components/PersonalDataComp/UpdateProfileModal';

const PersonalData = ({navigation}: any) => {
            const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<Boolean>(false);
            const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<Boolean>(false);
    
  return (
    <View style={{flex: 1}}>
      <NormalHeader onPress={() => navigation.goBack()} title="Personal Data" />

    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{padding: responsiveWidth(4)}}>
            <WhiteContainers paddingHorizontal={5}>
                            <BoldText title='My Personal Data' mrgnTop={1} txtColour={APPCOLORS.BLACK} fntWeight='bold' fontSize={2}/>
                            <BoldText title='Details about my personal data' txtColour={APPCOLORS.DARK_GRAY} fontSize={1.7}/>
                
                <View style={{alignItems: 'center', marginTop: responsiveHeight(2)}}>
                    <TouchableOpacity>
                    <Image source={AppImages.pfps} />
                        <BoldText title='Upload Photo' textAligm={'center'} txtColour={APPCOLORS.DARK_GRAY} fntWeight='bold' fontSize={2} mrgnTop={2}/>
                    </TouchableOpacity>
                <View style={{marginHorizontal: responsiveWidth(10)}}>
                <BoldText title='Format should be in .jpeg .png atleast 800x800px and less than 5MB' mrgnTop={0.5} textAligm={'center'} txtColour={APPCOLORS.DARK_GRAY} fontSize={1.5}/>
                </View>
                </View>

            <View>
                <View style={{marginTop: responsiveHeight(2)}}>
                <NormalInput labelTitle='First Name' icon='person' placeholder='Name' defaultValue='Tonald' />
                </View>
                <View style={{marginTop: responsiveHeight(1.5)}}>
                <NormalInput labelTitle='Last Name' icon='person' placeholder='Name' defaultValue='Drump' />
                </View>

                <View style={{marginTop: responsiveHeight(1.5)}}>
                <DropDownInput items={[
    { id: 1, label: 'Apple' },
    { id: 2, label: 'Banana' },
    { id: 3, label: 'Orange' },
    { id: 4, label: 'Mango' }
  ]} inputLable={'Date of Birth'} iconName={'calendar'} defaultVal={'10 December 1997'} />
                </View>

                <View style={{marginTop: responsiveHeight(1.5)}}>
                <DropDownInput items={[
    { id: 1, label: 'Apple' },
    { id: 2, label: 'Banana' },
    { id: 3, label: 'Orange' },
    { id: 4, label: 'Mango' }
  ]} inputLable={'Date of Birth'} iconName={'calendar'} defaultVal={'Junior Full Stack Developer'} />
                </View>
            </View>
            </WhiteContainers>

    <WhiteContainers mrgnTop={2} paddingHorizontal={5}>
    <BoldText title='Address' mrgnTop={1} txtColour={APPCOLORS.BLACK} fntWeight='bold' fontSize={2}/>
    <BoldText title='Your current domicile' txtColour={APPCOLORS.DARK_GRAY} fontSize={1.7}/>

    <View style={{marginTop: responsiveHeight(1.5)}}>
                <DropDownInput items={[
    { id: 1, label: 'Apple' },
    { id: 2, label: 'Banana' },
    { id: 3, label: 'Orange' },
    { id: 4, label: 'Mango' }
  ]} inputLable={'Country'} iconName={'location'} defaultVal={'USA'} />
                </View>

                <View style={{marginTop: responsiveHeight(1.5)}}>
                <DropDownInput items={[
    { id: 1, label: 'Apple' },
    { id: 2, label: 'Banana' },
    { id: 3, label: 'Orange' },
    { id: 4, label: 'Mango' }
  ]} inputLable={'State'} iconName={'location'} defaultVal={'California'} />
                </View>

                <View style={{marginTop: responsiveHeight(1.5)}}>
                <DropDownInput items={[
    { id: 1, label: 'Apple' },
    { id: 2, label: 'Banana' },
    { id: 3, label: 'Orange' },
    { id: 4, label: 'Mango' }
  ]} inputLable={'City'} iconName={'location'} defaultVal={'Los Angeles'} />
                </View>

    <View>
    <BoldText title='Full Address' txtColour={APPCOLORS.DARK_GRAY} fontSize={2} mrgnTop={2}/>
      <TextInput
        placeholder="Type here..."
        multiline={true} // Enables multiple lines
        numberOfLines={4} // Defines initial visible lines
        style={styles.textArea}
        defaultValue='909-1/2 E 49th St 
Los Angeles, California(CA), 90011'
      />
    </View>
    </WhiteContainers>
      </View>

      <WhiteContainers mrgnTop={2}>
    <AppButton
        onPress={()=> setIsUpdateModalVisible(true)}
        title='Update'
        />
    </WhiteContainers>
    </ScrollView>

    <UpdateProfileModal 
    isModalVisible={isUpdateModalVisible} imageSource={AppImages.personBox} yesBtnTitle='Yes, Update Profile' noBtnTitle='No, Let me check' yesBtnOnPress={() => {
            setIsUpdateModalVisible(false);
            setIsSuccessModalVisible(true);
          }} noBtnOnPress={() => setIsUpdateModalVisible(false)}   title="Update Profile" subTitle="Are you sure you want to update your profile? This will help us improve your experience and provide personalized features."
    />


<UpdateProfileModal 
    isModalVisible={isSuccessModalVisible} imageSource={AppImages.personBox} yesBtnTitle='View My Profile' yesBtnOnPress={() => {
        setIsSuccessModalVisible(false);
        navigation.navigate('Profile');
          }} title="Profile Updated!" subTitle="Your profile has been successfully updated. We’re excited to see you take this step!"
    />
    </View>
  )
}

const styles = StyleSheet.create({
    textArea: {
      width: '100%',
      height: responsiveHeight(14), // Adjust height as needed
      borderWidth: 1,
      borderColor: APPCOLORS.DARK_GRAY,
      borderRadius: 8,
      padding: 10,
      marginTop: 7,
      textAlignVertical: 'top', // Ensures text starts from top-left
      backgroundColor: '#fff',
      fontSize: 16,
    },
  });

export default PersonalData