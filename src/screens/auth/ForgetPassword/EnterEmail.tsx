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
import { useDispatch, useSelector } from 'react-redux';
import { resendOTPAction } from '../../../redux/actions/AuthActions';
const EnterEmail = ({navigation}: {navigation: any}) => {
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.auth?.loadingState)

  const sendVerificationHandler = () => {
    if(email){
      const formValues = {email: email}
      dispatch(resendOTPAction(formValues, {isNavToEnterOtp: true}, navigation))
    }else {
      Alert.alert("Email is required");
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setVisible(true); // Open modal when the screen is focused
    });

    return () => {
      setVisible(false); // Close modal when navigating away
      unsubscribe();
    };
  }, [navigation]);

  return (
    <AppImageBackground>
      <DropDownModal isModalVisible={visible}>
        <DropDownModalSheet icon={AppImages.Sheild}>
          <View style={{padding: 20, paddingTop:0, gap:20}}>
            <BoldText
              title="Forgot Password"
              textAligm={'center'}
              txtColour={APPCOLORS.BLACK}
              fontSize={3.5}
            />
            <NormalText
              title="Reset password code will be sent to your email to reset your password."
              textAligm={'center'}
              txtColour={APPCOLORS.DARK_GRAY}
              fontSize={1.6}
            />

            <AppTxtInput
              inputHeadig="Email"
              icon={
                <Ionicons
                  name={'mail-outline'}
                  size={responsiveFontSize(3)}
                  color={APPCOLORS.ICON_TEXT_COLOUR}
                />
              }
              placeholder="My Email"
              value={email}
              onChangeText={(text: any) => setEmail(text)}
            />

            <AppButton title={loading ? "Waiting..." : "Send Verification Code"} disabled={loading} onPress={()=> sendVerificationHandler()} />
          </View>
        </DropDownModalSheet>
      </DropDownModal>
    </AppImageBackground>
  );
};

export default EnterEmail;
