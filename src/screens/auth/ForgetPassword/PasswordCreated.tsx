import {View, Text} from 'react-native';
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
const PasswordCreated = ({navigation}: {navigation: any}) => {
    const [visible, setVisible] = useState(false);
  
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
                title="Password Has Been Created"
                textAligm={'center'}
                txtColour={APPCOLORS.BLACK}
                fontSize={3.2}
              />
              <NormalText
                title="To log in to your account, click the Sign in button and enter your email along with your new password."
                textAligm={'center'}
                txtColour={APPCOLORS.DARK_GRAY}
                fontSize={1.6}
              />
  
           
              <AppButton title="Send Verification Code" onPress={()=>navigation.navigate("Login")} />
            </View>
          </DropDownModalSheet>
        </DropDownModal>
      </AppImageBackground>
    );
}

export default PasswordCreated