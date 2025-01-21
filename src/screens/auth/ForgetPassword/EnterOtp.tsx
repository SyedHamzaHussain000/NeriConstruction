import {View, Text, StyleSheet} from 'react-native';
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

const CELL_COUNT = 6;

const EnterOtp = ({navigation}: {navigation: any}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  
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
    navigation.navigate("EnterNewPassword")
    if (value.length === CELL_COUNT) {
      console.log('OTP Entered:', value);
      // Handle OTP submission logic here
    } else {
      console.log('Please complete the OTP.');
    }
  };

  return (
    <AppImageBackground>
      <DropDownModal isModalVisible={visible}>
        <DropDownModalSheet icon={AppImages.Sheild}>
          <View style={{padding: 20, paddingTop: 0, gap: 20}}>
            <BoldText
              title="Forgot Password"
              textAligm={'center'}
              txtColour={APPCOLORS.BLACK}
              fontSize={3.5}
            />
            <NormalText
              title="A reset code has been sent to Tonald@work.com, check your email to continue the password reset process."
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
              <BoldText title="Resend it." txtColour={APPCOLORS.ICON_TEXT_COLOUR} fontSize={1.7} />
            </View>

            <AppButton title="Verify OTP" onPress={handleCodeSubmit} />
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
