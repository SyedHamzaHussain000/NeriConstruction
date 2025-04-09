import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { emailVerificationAction, resendOTPAction } from '../../../redux/actions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';

const CELL_COUNT = 6;

const EnterOtp = ({navigation, route}: {navigation: any, route?: any}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const loading = useSelector((state: any) => state.auth?.loadingState);
  const resendLoadingState = useSelector((state: any) => state.auth?.resendLoadingState);
  const dispatch = useDispatch();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const {accessToken, email} = route?.params;
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled]);
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setVisible(true); // Open modal when the screen is focused
      });
  
      return () => {
        setVisible(false); // Close modal when navigating away
        unsubscribe();
      };
    }, [navigation]);

  const handleCodeSubmit = () => {
    if(email){
      if (value.length === CELL_COUNT) {
        const formValues = {
          email: email,
          token: accessToken,
          otp: value,
        }
        dispatch(emailVerificationAction(formValues, navigation, setVisible))
      } else {
        Alert.alert('Please Enter otp');
      }
    }else {
      navigation.navigate("EnterNewPassword")
      if (value.length === CELL_COUNT) {
        console.log('OTP Entered:', value);
        // Handle OTP submission logic here
      } else {
        console.log('Please complete the OTP.');
      }
    }
  };

  const resendOtpHanlder = () => {
    const formValues = {
      email: email,
    }
    if(!isResendDisabled){
      dispatch(resendOTPAction(formValues))
      setTimer(60);
      setIsResendDisabled(true);
    }
  }

  return (
    <AppImageBackground>
      <DropDownModal isModalVisible={visible}>
        <DropDownModalSheet icon={AppImages.Sheild}>
          <View style={{padding: 20, paddingTop: 0, gap: 20}}>
            <BoldText
              title={email ? "Email Verification Sent!" : "Forgot Password"}
              textAligm={'center'}
              txtColour={APPCOLORS.BLACK}
              fontSize={3.5}
            />
            <NormalText
              title={`A reset code has been sent to ${email}, check your email to continue the password reset process.`}
              textAligm={'center'}
              txtColour={APPCOLORS.DARK_GRAY}
              fontSize={1.6}
            />

            {/* Code Input Field */}
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"

              renderCell={({index, symbol, isFocused}) => (
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[
                    styles.cell,
                    isFocused && styles.focusedCell,
                  ]}>
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />

            <View
              style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
              <BoldText title="Haven't received the verification code? " fontSize={1.7} />
              <TouchableOpacity onPress={resendOtpHanlder}
              disabled={isResendDisabled}>
              <BoldText title={resendLoadingState ? "Resending..." :  isResendDisabled ? `Resend OTP (${timer}s)` : 'Resend it.'} txtColour={APPCOLORS.ICON_TEXT_COLOUR} fontSize={1.7} />
              </TouchableOpacity>
            </View>

            <AppButton title={loading ? "Waiting..." : "Verify OTP"} disabled={loading} onPress={handleCodeSubmit} />
          </View>
        </DropDownModalSheet>
      </DropDownModal>
    </AppImageBackground>
  );
};

export default EnterOtp;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  cell: {
    width: 40,
    height: 50,
    lineHeight: 50,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  cellText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#333',
  },
  focusedCell: {
    borderColor: '#6200EE',
  },
});
