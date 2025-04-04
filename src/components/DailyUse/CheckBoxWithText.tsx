import { View, Text } from 'react-native'
import React from 'react'
import { NormalText } from './AppText/AppText'
import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { APPCOLORS } from '../../utils/APPCOLORS';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils/Responsive';

type props = {
    title: string,
    toggleCheckBox?: boolean
    setToggleCheckBox?: (val: boolean) => void;

}
const CheckBoxWithText = ({title,toggleCheckBox,setToggleCheckBox}:props) => {
  return (
    <View style={{flexDirection:'row', alignItems:'center',}}>
        <View>
          <BouncyCheckbox onPress={setToggleCheckBox} 
           fillColor={APPCOLORS.PRIMARY_DARK}
           isChecked={toggleCheckBox}
                unFillColor="#FFFFFF" 
                size={responsiveFontSize(2.5)}
                style={{width:responsiveHeight(3)}} 
            />
            </View>
      <NormalText title={title} fontSize={1.7} />

    </View>
  )
}

export default CheckBoxWithText