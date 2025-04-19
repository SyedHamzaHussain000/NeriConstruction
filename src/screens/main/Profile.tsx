import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils/Responsive'
import { APPCOLORS } from '../../utils/APPCOLORS'
import { BoldText } from '../../components/DailyUse/AppText/AppText'
import { AppImages } from '../../assets/AppImages'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import WhiteContainers from '../../components/WhiteContainers'
import Bars from '../../components/ProfileComp/Bars'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ChangePasswordModal from '../../components/ProfileComp/ChangePasswordModal'
import LogOutModal from '../../components/LogOutModal'
import { LogoutAction, setNewPasswordAction } from '../../redux/actions/AuthActions';
import { baseUrl } from '../../utils/Api_endPoints';
import { useTranslation } from 'react-i18next';

const Profile = ({navigation}: {navigation: any}) => {
    const state = useSelector((state: any) => state.auth);
    const employeeData = useSelector((state: any) => state.getEmployeePersonalData);
    const dispatch = useDispatch();
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<Boolean>(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<Boolean>(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState<Boolean>(false);
    const [formValues, setFormValues] = useState<Object>({oldPassword: '', newPassword: '', reEnterPassword: ''});
    const [isShowPassword, setIsShowPassword] = useState<Object>({oldPassword: false, newPassword: false, reEnterPassword: false});
    const authData = useSelector((state: any) => state.auth?.authData);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const { t } = useTranslation();

    const validateForm = () => {
        const { oldPassword, newPassword, reEnterPassword } = formValues;

        // Empty fields
        if (!oldPassword || !newPassword || !reEnterPassword) {
            Alert.alert(t("All fields are required."));
            return false;
        }

        // Check password match
        if (newPassword !== reEnterPassword) {
            Alert.alert(t("New password and re-entered password do not match."));
            return false;
        }

        return true;
    };

    const logoutHandler = () => {
            setIsLogoutModalVisible(false);
            dispatch(LogoutAction(navigation))
    }

    const newPasswordSubmitHandler = () => {
        if(validateForm()){
                const form = {
                        email: authData?.data?.email,
                        password: formValues?.oldPassword,
                        newPassword: formValues?.newPassword,
                }
                dispatch(setNewPasswordAction(form, setFormValues, setIsLoading, setIsUpdateModalVisible, setIsSuccessModalVisible))
        }
    }

  return (
    <View style={{flex:1, backgroundColor:APPCOLORS.WHITE}}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{height:responsiveHeight(20), backgroundColor:APPCOLORS.ICON_TEXT_COLOUR, alignItems:'center', justifyContent:'center'}}>
            <BoldText title={t('My Profile')} textAligm={'center'} txtColour={APPCOLORS.WHITE} fontSize={3}/>
            
            <Image source={employeeData?.personalData?.profileImage 
              ? { uri: `${baseUrl}/${employeeData.personalData.profileImage}` } 
              : AppImages.pfps} style={{position:'absolute', zIndex:10 ,bottom:-70, borderRadius: 10, width: responsiveWidth(30), height: responsiveHeight(16)}}/>
        </View>
        <View style={{height:responsiveHeight(10), }}/>

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', gap:5}}>
            <BoldText title={employeeData?.personalDataLoadingState ? "Loading..." : `${employeeData?.personalData?.firstName} ${employeeData?.personalData?.lastName}`} fontSize={2.5} textAligm={'center'}/>
            <MaterialIcons
             name={"verified"}
             size={responsiveFontSize(2.5)}
             color={APPCOLORS.ICON_TEXT_COLOUR}
            />
        </View> 
        <BoldText title={employeeData?.personalDataLoadingState ? "Loading..." : employeeData?.personalData?.designation} txtColour={APPCOLORS.ICON_TEXT_COLOUR} fontSize={2} textAligm={'center'}/>

        <View style={{padding:20, gap:20}}>
            <BoldText title={t('CONTACT')} fontSize={2}/>

            <WhiteContainers bgColor={"#F4F6F9"}>
                    <View style={{padding:10, gap:10}}>
                            <Bars icon={<Ionicons name={"mail"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title={state?.authData?.data?.email}/>
                            <Bars icon={<Ionicons name={"location"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title={employeeData?.personalData?.state}/>
                    </View>
            </WhiteContainers>
        </View>

        <View style={{padding:20, gap:10}}>
            <BoldText title={t('ACCOUNT')} fontSize={2}/>

            <WhiteContainers bgColor={"#F4F6F9"}>
                    <View style={{padding:10, gap:10}}>
                            <Bars icon={<Ionicons name={"person"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title={t('Personal Data')} onPress={() => navigation.navigate('PersonalData')}/>
                    </View>
            </WhiteContainers>
        </View>

        <View style={{padding:20, gap:10}}>
            <BoldText title={t('SETTINGS')} fontSize={2}/>

            <WhiteContainers bgColor={"#F4F6F9"}>
                    <View style={{padding:10, gap:20}}>
                            <Bars icon={<Ionicons name={"settings"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title={t('Change Password')} onPress={() => setIsUpdateModalVisible(true)} />
                            <Bars icon={<Ionicons name={"language"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title={t('Set Language')} onPress={()=> navigation.navigate("Language")} />
                            <Bars icon={<Ionicons name={"information-circle"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title={t('FAQ')} onPress={() => navigation.navigate('Faq')}/>
                            <Bars icon={<Ionicons name={"help-circle"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title={t('Help')}
                            onPress={()=> navigation.navigate("Help")}
                            />
                            <Bars icon={<AntDesign name={"logout"} size={responsiveFontSize(3) } 
                            color={APPCOLORS.DARK_ORANGE}/>} title={t('Logout')} 
                            onPress={()=> setIsLogoutModalVisible(true)}
                            
                            />
                    </View>
            </WhiteContainers>
        </View>
        </ScrollView>

        <ChangePasswordModal isLoading={isLoading} isModalVisible={isUpdateModalVisible} onPress={() => newPasswordSubmitHandler()} formValues={formValues} setFormValues={setFormValues} isShowPassword={isShowPassword} setIsShowPassword={setIsShowPassword} imageSource={AppImages.key} title={t('Set a New Password')} subTitle={t('Please set a new password to secure your App account.')} btnTitle={t('Submit')} isShow={true} />
        
        
        <ChangePasswordModal isModalVisible={isSuccessModalVisible} onPress={() => setIsSuccessModalVisible(false)} imageSource={AppImages.key} title={t('Password Has Been Updated')} subTitle={t('To log in to your account, click the Sign in button and enter your email along with your new password.')} btnTitle={t('Go back')} />
        
        <LogOutModal isModalVisible={isLogoutModalVisible}
         onPress={() => logoutHandler()}
        imageSource={AppImages.download}
         title={t('Are You Sure You Want To Logout?')} 
         subTitle={t('Since the 1500s, when an unknown printer took a galley of type and scrambled specimen book.')} 
         btnTitle={t('Logout')} noBtnTitle={t('No')}  noBtnOnPress={() => setIsLogoutModalVisible(false)} />
    </View>
  )
}

export default Profile