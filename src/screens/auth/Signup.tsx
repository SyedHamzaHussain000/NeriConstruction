import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { APPCOLORS } from '../../utils/APPCOLORS';
import { AppImages } from '../../assets/AppImages';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from '../../utils/ValidationsRegex';
import AppTxtInput from '../../components/DailyUse/AppTxtInput';
import { BoldText, NormalText } from '../../components/DailyUse/AppText/AppText';
import AppButton from '../../components/DailyUse/AppButton';
import CheckBoxWithText from '../../components/DailyUse/CheckBoxWithText';
import { responsiveHeight } from '../../utils/Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { handleSignUpAction } from '../../redux/actions/AuthActions';

const Signup = ({ navigation }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    phoneNumber: '',
    companyId: '',
    password: '',
    confirmPass: '',
  });
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value.trim() });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let validationErrors: Record<string, string> = {};
  
    // Required field validations
    if (!formValues.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(formValues.email)) {
      validationErrors.email = 'Invalid email format';
    }
  
    if (!formValues.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formValues.phoneNumber)) {
      validationErrors.phoneNumber = 'Phone number must be 10 digits';
    }
  
    if (!formValues.companyId.trim()) {
      validationErrors.companyId = 'Company ID is required';
    } else if (!/^\d+$/.test(formValues.companyId)) {
      validationErrors.companyId = 'Company ID must be numeric';
    }
  
    if (!formValues.password.trim()) {
      validationErrors.password = 'Password is required';
    } 
  
    if (!formValues.confirmPass.trim()) {
      validationErrors.confirmPass = 'Confirm Password is required';
    } else if (formValues.password !== formValues.confirmPass) {
      validationErrors.confirmPass = 'Passwords do not match';
    }
  
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  

  const handleSignUp = () => {
    // navigation.navigate('WorkProfile');

    if(!state?.loadingState){
      if (validateForm()) {
        if(isChecked){
          dispatch(handleSignUpAction(formValues, navigation));
        }else{
          Alert.alert('Please select checkbox');
        }
      }
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: APPCOLORS.MAIN_BG_COLOUR, padding: 20, 
        gap: 10,
       }}
    >
      <Image
        source={AppImages.logo}
        style={{
          height: 100,
          width: 100,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <BoldText title="Work Mate" textAligm="center" fontSize={3.5} />
      <NormalText title="Register Using Your Credentials" textAligm="center" fontSize={2} />

    <View style={{gap: 20}}>
      {/* Email Input */}
      <View>
      <AppTxtInput
        inputHeadig="Email"
        icon={<Ionicons name="mail-outline" size={20} />}
        placeholder="My Email"
        value={formValues.email}
        onChangeText={(text) => handleChange('email', text)}
        />
      {errors.email && <NormalText title={errors.email} txtColour="red" fontSize={1.8} />}
        </View>

      {/* Phone Number Input */}
      <View>
      <AppTxtInput
        inputHeadig="Phone Number"
        icon={<Ionicons name="call-outline" size={20} />}
        placeholder="1234567890"
        keyboardType="numeric"
        value={formValues.phoneNumber}
        onChangeText={(text) => {
          if(text?.length <= 10){
            handleChange('phoneNumber', text)
          }
        }}
      />
      {errors.phoneNumber && <NormalText title={errors.phoneNumber} txtColour="red" fontSize={1.8} />}
      </View>

      {/* Company ID Input */}
      <View>
      <AppTxtInput
        inputHeadig="Company ID"
        icon={<Ionicons name="business-outline" size={20} />}
        placeholder="1015015"
        keyboardType="numeric"
        value={formValues.companyId}
        onChangeText={(text) => handleChange('companyId', text)}
      />
      {errors.companyId && <NormalText title={errors.companyId} txtColour="red" fontSize={1.8} />}
      </View>

      {/* Password Input */}
      <View>
      <AppTxtInput
        inputHeadig="Password"
        icon={<Octicons name="lock" size={20} />}
        placeholder="********"
        password
        showPassword={showPassword}
        setShowPassword={() => setShowPassword(!showPassword)}
        value={formValues.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      {errors.password && <NormalText title={errors.password} txtColour="red" fontSize={1.8} />}
      </View>

      {/* Confirm Password Input */}
      <View>
      <AppTxtInput
        inputHeadig="Confirm Password"
        icon={<Octicons name="lock" size={20} />}
        placeholder="********"
        password
        showPassword={showPassword}
        setShowPassword={() => setShowPassword(!showPassword)}
        value={formValues.confirmPass}
        onChangeText={(text) => handleChange('confirmPass', text)}
      />
      {errors.confirmPass && <NormalText title={errors.confirmPass} txtColour="red" fontSize={1.8} />}
      </View>

      <CheckBoxWithText title="I agree with terms & conditions and privacy policy" toggleCheckBox={isChecked} setToggleCheckBox={(check) => setIsChecked(check)} />

      <AppButton title={state?.loadingState ? "Waiting..." : "Sign Up"} onPress={handleSignUp} disabled={state?.loadingState} />
      </View>

      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10, marginBottom: responsiveHeight(5) }}>
        <BoldText title="Already have an account? " fontSize={1.7} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <BoldText title="Sign In Here" txtColour={APPCOLORS.ICON_TEXT_COLOUR} fontSize={1.7} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signup;
