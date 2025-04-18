import React from 'react';
import { View, Text, Image } from 'react-native';
import DropDownModal from '../DropDownModal';
import { AppImages } from '../../assets/AppImages';
import { NormalText } from '../DailyUse/AppText/AppText';
import { APPCOLORS } from '../../utils/APPCOLORS';
import AppButton from '../DailyUse/AppButton';
import { responsiveFontSize, responsiveHeight } from '../../utils/Responsive';
import Octicons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppTxtInput from '../DailyUse/AppTxtInput';

type ChangePasswordModalProps = {
    isModalVisible: any,
    onPress: any,
    imageSource: any,
    title: any,
    subTitle: any,
    btnTitle: any,
    formValues: any,
    setFormValues: any,
    isShowPassword: any,
    setIsShowPassword: any,
    isLoading?:any,
}

const ChangePasswordModal = ({isLoading, isModalVisible, onPress, imageSource, title, subTitle, btnTitle, formValues, setFormValues, isShowPassword, setIsShowPassword}: ChangePasswordModalProps) => {
  return (
    <DropDownModal isModalVisible={isModalVisible}>
    <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: responsiveHeight(btnTitle === 'Submit' ? 69 : 40), padding: 50, paddingBottom: 0, borderRadius: 15, position: 'relative' }}>
    <Image source={imageSource} style={{position: 'absolute', top: '-50'}} />
  <View style={{gap:15}}>
  <NormalText txtColour={APPCOLORS.BLACK} title={title} fontSize={3} fntWeight='bold' textAligm='center'/>
  <NormalText txtColour={APPCOLORS.DARK_GRAY} title={subTitle} fontSize={1.8} fntWeight='bold' textAligm='center'/>

    {btnTitle === 'Submit' && <View style={{gap: 20}}>
  <AppTxtInput
              inputHeadig="Old Password"
              icon={
                <Octicons
                  name={'credit-card-scan-outline'}
                  size={responsiveFontSize(3)}
                  color={APPCOLORS.ICON_TEXT_COLOUR}
                />
              }
              placeholder="Password"
              password={true}
              value={formValues?.oldPassword}
              onChangeText={(text) => setFormValues({...formValues, oldPassword: text})}
              setShowPassword={()=>setIsShowPassword({...isShowPassword, oldPassword: !isShowPassword?.oldPassword})}
              showPassword={isShowPassword?.oldPassword}
            />

<AppTxtInput
              inputHeadig="New Password"
              icon={
                <Octicons
                  name={'credit-card-scan-outline'}
                  size={responsiveFontSize(3)}
                  color={APPCOLORS.ICON_TEXT_COLOUR}
                />
              }
              placeholder="Password"
              password={true}
              value={formValues?.newPassword}
              onChangeText={(text) => setFormValues({...formValues, newPassword: text})}
              setShowPassword={()=>setIsShowPassword({...isShowPassword, newPassword: !isShowPassword?.newPassword})}
              showPassword={isShowPassword?.newPassword}
            />

<AppTxtInput
              inputHeadig="Re Enter New Password"
              icon={
                <Octicons
                  name={'credit-card-scan-outline'}
                  size={responsiveFontSize(3)}
                  color={APPCOLORS.ICON_TEXT_COLOUR}
                />
              }
              placeholder="Password"
              password={true}
              value={formValues?.reEnterPassword}
              onChangeText={(text) => setFormValues({...formValues, reEnterPassword: text})}
              setShowPassword={()=>setIsShowPassword({...isShowPassword, reEnterPassword: !isShowPassword?.reEnterPassword})}
              showPassword={isShowPassword?.reEnterPassword}
            />
      </View>    }  

            <AppButton
            onPress={onPress}
            title={isLoading ? "Waiting..." : btnTitle}
            disabled={isLoading}
            />
            </View>
</View>
    </DropDownModal>
  )
}

export default ChangePasswordModal;