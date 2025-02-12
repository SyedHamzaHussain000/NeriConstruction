import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
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
import Octicons from 'react-native-vector-icons/Octicons'
import Spacing from '../../components/DailyUse/AppText/Spacing';
import AppButton from '../../components/DailyUse/AppButton';
import CheckBoxWithText from '../../components/DailyUse/CheckBoxWithText';
import AppLineButton from '../../components/DailyUse/AppLineButton';
import { AppImages } from '../../assets/AppImages';
import Line from '../../components/DailyUse/Line';
import AppImageBackground from '../../components/DailyUse/AppImageBackground';
const Login = ({navigation}: {navigation: any}) => {

  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)



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
    <AppImageBackground >
      <DropDownModal isModalVisible={visible}>
        <DropDownModalSheet>
          <View style={{padding: 20}}>
            <BoldText
              title="Sign In"
              textAligm={'center'}
              txtColour={APPCOLORS.BLACK}
              fontSize={3.5}
              
            />
            <NormalText
              title="Sign in to my account"
              textAligm={'center'}
              txtColour={APPCOLORS.DARK_GRAY}
              fontSize={2}
            />

            <Spacing margin={4}/>
            <View style={{gap:30}}>

              <View style={{gap:10}}>
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
              inputHeadig="Password"
              icon={
                <Octicons
                  name={'lock'}
                  size={responsiveFontSize(3)}
                  color={APPCOLORS.ICON_TEXT_COLOUR}
                />
              }
              placeholder="My Password"
              password={true}
              setShowPassword={()=>setShowPassword(!showPassword)}
              showPassword={showPassword}
            />
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <CheckBoxWithText title='Remember me' setToggleCheckBox={(val) => setToggleCheckBox(val)}/>
                <TouchableOpacity onPress={()=> navigation.navigate("EnterEmail")}>
              <BoldText title='Forget Password?' textDecorate={true} fontSize={1.7} txtColour={APPCOLORS.ICON_TEXT_COLOUR}/>
                </TouchableOpacity>
            </View>
     
              <AppButton title='Sign In' onPress={()=> navigation.navigate("Main")} />
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                  <Line  lineWidht={40}/>
                    <BoldText title='OR' fontSize={2} txtColour={APPCOLORS.BORDER_LINE_COLOR}/>
                  <Line  lineWidht={40}/>
                </View>
              <AppLineButton title='Sign in With Employee ID' txtColorr={APPCOLORS.ICON_TEXT_COLOUR} icon={AppImages.person}/>

              <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center'}}>
                <BoldText title='Don’t have an account? ' fontSize={1.7}/>
                <TouchableOpacity onPress={()=> navigation.navigate("Signup")}>
                <BoldText title='Sign Up Here' txtColour={APPCOLORS.ICON_TEXT_COLOUR} fontSize={1.7}/>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </DropDownModalSheet>
      </DropDownModal>
    </AppImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});
