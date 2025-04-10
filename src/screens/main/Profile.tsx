import React, { useState } from 'react'
import { View, Image, ScrollView } from 'react-native'
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
import { LogoutAction } from '../../redux/actions/AuthActions';
import { baseUrl } from '../../utils/Api_endPoints';

const Profile = ({navigation}: {navigation: any}) => {
    const state = useSelector((state: any) => state.auth);
    const employeeData = useSelector((state: any) => state.getEmployeePersonalData);
    const dispatch = useDispatch();
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<Boolean>(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<Boolean>(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState<Boolean>(false);

    const logoutHandler = () => {
            setIsLogoutModalVisible(false);
            dispatch(LogoutAction(navigation))
    }

  return (
    <View style={{flex:1, backgroundColor:APPCOLORS.WHITE}}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{height:responsiveHeight(20), backgroundColor:APPCOLORS.ICON_TEXT_COLOUR, alignItems:'center', justifyContent:'center'}}>
            <BoldText title='My Profile' textAligm={'center'} txtColour={APPCOLORS.WHITE} fontSize={3}/>
            
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
            <BoldText title='CONTACT' fontSize={2}/>

            <WhiteContainers bgColor={"#F4F6F9"}>
                    <View style={{padding:10, gap:10}}>
                            <Bars icon={<Ionicons name={"mail"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title={state?.authData?.data?.email}/>
                            <Bars icon={<Ionicons name={"location"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title={employeeData?.personalData?.state}/>
                    </View>
            </WhiteContainers>
        </View>

        <View style={{padding:20, gap:10}}>
            <BoldText title='ACCOUNT' fontSize={2}/>

            <WhiteContainers bgColor={"#F4F6F9"}>
                    <View style={{padding:10, gap:10}}>
                            <Bars icon={<Ionicons name={"person"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='Personal Data' onPress={() => navigation.navigate('PersonalData')}/>
                    </View>
            </WhiteContainers>
        </View>

        <View style={{padding:20, gap:10}}>
            <BoldText title='SETTINGS' fontSize={2}/>

            <WhiteContainers bgColor={"#F4F6F9"}>
                    <View style={{padding:10, gap:20}}>
                            <Bars icon={<Ionicons name={"settings"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='Change Password' onPress={() => setIsUpdateModalVisible(true)} />
                            <Bars icon={<Ionicons name={"language"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='Set Language' onPress={()=> navigation.navigate("Language")} />
                            <Bars icon={<Ionicons name={"information-circle"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='FAQ' onPress={() => navigation.navigate('Faq')}/>
                            <Bars icon={<Ionicons name={"help-circle"} size={responsiveFontSize(3) } color={APPCOLORS.ICON_TEXT_COLOUR}/>} title='Help'
                            onPress={()=> navigation.navigate("Help")}
                            />
                            <Bars icon={<AntDesign name={"logout"} size={responsiveFontSize(3) } 
                            color={APPCOLORS.DARK_ORANGE}/>} title='Logout' 
                            onPress={()=> setIsLogoutModalVisible(true)}
                            
                            />
                    </View>
            </WhiteContainers>
        </View>
        </ScrollView>

        <ChangePasswordModal isModalVisible={isUpdateModalVisible} onPress={() => {
            setIsUpdateModalVisible(false);
            setIsSuccessModalVisible(true);
            }} imageSource={AppImages.key} title='Set a New Password' subTitle='Please set a new password to secure your App account.' btnTitle='Submit' />
        
        
        <ChangePasswordModal isModalVisible={isSuccessModalVisible} onPress={() => setIsSuccessModalVisible(false)} imageSource={AppImages.key} title='Password Has Been Updated' subTitle='To log in to your account, click the Sign in button and enter your email along with your new password.' btnTitle='Go back' />
        
        <LogOutModal isModalVisible={isLogoutModalVisible}
         onPress={() => logoutHandler()}
        imageSource={AppImages.download}
         title='Are You Sure You Want To Logout?' 
         subTitle='Since the 1500s, when an unknown printer took a galley of type and scrambled specimen book.' 
         btnTitle='Logout' noBtnTitle='No'  noBtnOnPress={() => setIsLogoutModalVisible(false)} />
    </View>
  )
}

export default Profile