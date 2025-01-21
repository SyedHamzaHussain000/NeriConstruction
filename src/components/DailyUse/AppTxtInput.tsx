import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { APPCOLORS } from '../../utils/APPCOLORS'
import Feather from 'react-native-vector-icons/Feather'
import { responsiveFontSize, responsiveWidth } from '../../utils/Responsive'
import { NormalText } from './AppText/AppText'
import { TouchableOpacity } from 'react-native'

type props = {
    inputHeadig: string,
    icon?: any,
    placeholder?: string,
    password?:boolean,
    passwordShown?: boolean,
    setShowPassword?: () => void;
    showPassword?: boolean
}

const AppTxtInput = ({icon,inputHeadig,password,passwordShown,placeholder,showPassword,setShowPassword, }: props) => {
  return (
    <View>
      <NormalText title={inputHeadig} txtColour={APPCOLORS.DARK_GRAY} fontSize={1.8}/>

      <View style={{borderWidth:1.5, borderRadius:10, flexDirection:'row', paddingHorizontal:10, alignItems:'center', borderColor:APPCOLORS.BORDER_LINE_COLOR, paddingVertical:5, marginTop:5}}>
            {icon}
            <TextInput
            placeholder={placeholder}
            placeholderTextColor={APPCOLORS.DARK_GRAY}
            style={{marginLeft:10, width:responsiveWidth(70)}}
            secureTextEntry={password && !showPassword}
            />
            {
                password && (
                    <TouchableOpacity onPress={setShowPassword}>
                    <Feather
                        name={showPassword == true ? 'eye': 'eye-off'}
                        size={responsiveFontSize(3)}
                        color={APPCOLORS.ICON_TEXT_COLOUR}
                        />
                        </TouchableOpacity>
                )
            }
      </View>
    </View>
  )
}

export default AppTxtInput