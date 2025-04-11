import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppImageBackground from '../../../components/DailyUse/AppImageBackground';
import DropDownModal from '../../../components/DropDownModal';
import DropDownModalSheet from '../../../components/DropDownModalSheet';
import {AppImages} from '../../../assets/AppImages';
import {
  BoldText,
  NormalText,
} from '../../../components/DailyUse/AppText/AppText';
import {APPCOLORS} from '../../../utils/APPCOLORS';
import AppTxtInput from '../../../components/DailyUse/AppTxtInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {responsiveFontSize} from '../../../utils/Responsive';
import AppButton from '../../../components/DailyUse/AppButton';
import Octicons from 'react-native-vector-icons/Octicons'
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../../../redux/actions/AuthActions';

const EnterNewPassword = ({navigation, route}: any) => {
    const [visible, setVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const email = route?.params?.email;
    const loading = useSelector((state: any) => state.auth?.loadingState)

    const submitHandler = () => {
    if(password && confirmPassword){
      if(password === confirmPassword){
        const formValues = {
          email: email,
          password: password,
        }
        dispatch(resetPasswordAction(formValues, navigation, setVisible));
      }else {
        Alert.alert('Password and confirm password is not match');
      }
    }else {
      Alert.alert('Password and Confirm Password required');
    }
    }
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setVisible(true); // Open modal when the screen is focused
      });
  
      // return () => {
      //   setVisible(false); // Close modal when navigating away
      //   unsubscribe();
      // };
    }, [navigation]);
  
    return (
      <AppImageBackground>
        <DropDownModal isModalVisible={visible}>
          <DropDownModalSheet icon={AppImages.Sheild}>
            <View style={{padding: 20, paddingTop:0, gap:20}}>
              <BoldText
                title="Set a New Password"
                textAligm={'center'}
                txtColour={APPCOLORS.BLACK}
                fontSize={3.5}
              />
              <NormalText
                title="Please set a new password to secure your App account."
                textAligm={'center'}
                txtColour={APPCOLORS.DARK_GRAY}
                fontSize={1.6}
              />
  
  <AppTxtInput
              inputHeadig="Password"
              icon={
                <Octicons
                  name={'lock'}
                  size={responsiveFontSize(3)}
                  color={APPCOLORS.ICON_TEXT_COLOUR}
                />
              }
              placeholder="Input Password"
              password={true}
              setShowPassword={()=>setShowPassword(!showPassword)}
              showPassword={showPassword}
              value={password}
              onChangeText={(text: any) => setPassword(text)}
            />

<AppTxtInput
              inputHeadig="Confirm Password"
              icon={
                <Octicons
                  name={'lock'}
                  size={responsiveFontSize(3)}
                  color={APPCOLORS.ICON_TEXT_COLOUR}
                />
              }
              placeholder="Re Enter Your Password"
              password={true}
              setShowPassword={()=>setShowPassword(!showPassword)}
              showPassword={showPassword}
              value={confirmPassword}
              onChangeText={(text: any) => setConfirmPassword(text)}
            />
  
              <AppButton title={loading ? "Waiting..." : "Submit"} disabled={loading} onPress={()=> submitHandler()} />
            </View>
          </DropDownModalSheet>
        </DropDownModal>
      </AppImageBackground>
    );
}

export default EnterNewPassword