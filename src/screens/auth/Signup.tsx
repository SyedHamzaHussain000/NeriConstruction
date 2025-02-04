import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDownModal from '../../components/DropDownModal';
import {APPCOLORS} from '../../utils/APPCOLORS';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive';
import DropDownModalSheet from '../../components/DropDownModalSheet';
import {BoldText, NormalText} from '../../components/DailyUse/AppText/AppText';
import AppTxtInput from '../../components/DailyUse/AppTxtInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Spacing from '../../components/DailyUse/AppText/Spacing';
import AppButton from '../../components/DailyUse/AppButton';
import CheckBoxWithText from '../../components/DailyUse/CheckBoxWithText';
import AppLineButton from '../../components/DailyUse/AppLineButton';
import {AppImages} from '../../assets/AppImages';
import Line from '../../components/DailyUse/Line';
import AppImageBackground from '../../components/DailyUse/AppImageBackground';

const Signup = ({navigation}: {navigation: any}) => {
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APPCOLORS.MAIN_BG_COLOUR,
        padding: 20,
        gap: 10,
      }}>
      <Image
        source={AppImages.logo}
        style={{
          height: responsiveHeight(10),
          width: responsiveHeight(10),
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <BoldText
        title="Work Mate"
        textAligm={'center'}
        txtColour={APPCOLORS.BLACK}
        fontSize={3.5}
      />
      <NormalText
        title="Register Using Your Credentials"
        textAligm={'center'}
        txtColour={APPCOLORS.DARK_GRAY}
        fontSize={2}
      />

      <View style={{gap: 10}}>
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
        />

        <AppTxtInput
          inputHeadig="Phone Number"
          icon={
            <Ionicons
              name={'mail-outline'}
              size={responsiveFontSize(3)}
              color={APPCOLORS.ICON_TEXT_COLOUR}
            />
          }
          placeholder="1234 5678 0000"
        />

        <AppTxtInput
          inputHeadig="Company ID"
          icon={
            <Ionicons
              name={'mail-outline'}
              size={responsiveFontSize(3)}
              color={APPCOLORS.ICON_TEXT_COLOUR}
            />
          }
          placeholder="1015015"
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
          placeholder="........"
          password={true}
          setShowPassword={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
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
          placeholder="........"
          password={true}
          setShowPassword={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
        />

        <CheckBoxWithText title="I agree with terms & conditions and privacy policy" />

        <AppButton title="Sign Up" onPress={()=> navigation.navigate("WorkProfile")}/>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <BoldText title="Already have an account? " fontSize={1.7} />
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <BoldText
              title="Sign In Here"
              txtColour={APPCOLORS.ICON_TEXT_COLOUR}
              fontSize={1.7}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
