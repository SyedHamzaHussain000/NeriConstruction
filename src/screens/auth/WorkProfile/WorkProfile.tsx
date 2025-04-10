import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import {APPCOLORS} from '../../../utils/APPCOLORS';
import {
  BoldText,
  NormalText,
} from '../../../components/DailyUse/AppText/AppText';
import { Image } from 'react-native';
import { AppImages } from '../../../assets/AppImages';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import AppTxtInput from '../../../components/DailyUse/AppTxtInput';
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AppButton from '../../../components/DailyUse/AppButton';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { workProfileAction } from '../../../redux/actions/AuthActions';

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const WorkProfile = ({navigation, route}: any) => {
  const data = useSelector((state: any) => state.auth?.authData)

const [formValues, setFormValues] = useState({
    id: data?.data?._id,
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    position: '',
    country: '',
    state: '',
    city: '',
    fullAddress: '',
    image: {uri: '', name: '', type: ''},
  });
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState({uri: '', name: '', type: ''});
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState('');
  const loading = useSelector((state: any) => state.work?.workLoadingState)
  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowPicker(false); // hide on Android
    if (selectedDate){
      setDate(selectedDate)
      setFormValues({...formValues, dateOfBirth: selectedDate?.toISOString()})
      if (errors.dateOfBirth) setErrors(prev => ({...prev, dateOfBirth: null}));
    };
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const validateForm = () => {
    const newErrors: any = {};
  
    if (!formValues.image.uri) newErrors.image = 'Image is required';
    if (!formValues.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formValues.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formValues.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formValues.position.trim()) newErrors.position = 'Position is required';
    if (!formValues.country.trim()) newErrors.country = 'Country is required';
    if (!formValues.state.trim()) newErrors.state = 'State is required';
    if (!formValues.city.trim()) newErrors.city = 'City is required';
    if (!formValues.fullAddress.trim()) newErrors.fullAddress = 'Full address is required';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, (response) => {
      if (response.assets && response.assets.length > 0) {
          setFormValues({...formValues, image: {uri: response.assets?.[0]?.uri,
            name: response.assets?.[0]?.fileName,
            type: response.assets?.[0]?.type || 'image/jpeg',}})
        if (errors.image) setErrors(prev => ({...prev, image: null}));
      }
    });
  };
  

  const handleContinueProfile = () => {
    if(validateForm()){
      console.log(formValues)
      dispatch(workProfileAction(formValues, navigation))
    }
  }

  return (
    <View>
      <NormalHeader onPress={()=> navigation.goBack()} title="My Work Profile" />
      <ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:responsiveHeight(10)}}>
      <View style={{padding: 20, gap:20}}>
        <View style={style.container}>
          <BoldText title="Personal Data Information" fontSize={2} />
          <NormalText title="Your personal data information" fontSize={1.7} />

<TouchableOpacity onPress={() => pickImage()}>
          <Image source={formValues.image.uri ? {uri: formValues.image?.uri} : AppImages.upload} style={{alignSelf:'center', height:responsiveHeight(20), width:responsiveHeight(20), borderRadius: 30, marginTop: 10, resizeMode:image ? 'cover' : 'contain'}}/>
          {errors.image && <Text style={{color: 'red', textAlign: 'center', marginTop: 10}}>{errors.image}</Text>}
</TouchableOpacity>

          <View style={{width:responsiveWidth(60), alignSelf:'center', marginTop:10}}>
            <BoldText title="Upload Photo" fontSize={2} textAligm={'center'} />
            <NormalText title="Format should be in .jpeg .png atleast 800x800px and less than 5MB" fontSize={1.7}  textAligm={'center'}/>
          </View>

            <View style={{gap:20}}>
              <View>
            <AppTxtInput
            inputHeadig='First Name'
            icon={<Octicons name='person' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='First Name'
            value={formValues.firstName}
            onChangeText={(text: any) => {
              setFormValues({...formValues, firstName: text})
              if (errors.firstName) setErrors(prev => ({...prev, firstName: null}));
            }}
            />
            {errors.firstName && <Text style={{color: 'red'}}>{errors.firstName}</Text>}
            </View>

      <View>
<AppTxtInput
            inputHeadig='Last Name'
            icon={<Octicons name='person' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Last Name'
            value={formValues.lastName}
            onChangeText={(text: any) => {
              setFormValues({...formValues, lastName: text})
              if (errors.lastName) setErrors(prev => ({...prev, lastName: null}));
            }}
            />
            {errors.lastName && <Text style={{color: 'red'}}>{errors.lastName}</Text>}
              </View>

<View>
<TouchableOpacity onPress={showDatePicker} activeOpacity={0.9}>
<AppTxtInput
            inputHeadig='Date of Birth'
            icon={<AntDesign name='calendar' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Date of Birth'
            value={formValues?.dateOfBirth ? formatDate(new Date(formValues?.dateOfBirth)) : ''}
            editable={false}
            />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
              value={date || new Date(2000, 0, 1)} // default date if none is picked
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={new Date()}
              onChange={onChange}
              />
            )}
            {errors.dateOfBirth && <Text style={{color: 'red'}}>{errors.dateOfBirth}</Text>}
            </View>

<View>
<AppTxtInput
            inputHeadig='Position'
            icon={<MaterialCommunityIcons name='inbox-full-outline' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Position'
            value={formValues.position}
            onChangeText={(text: any) => {
              setFormValues({...formValues, position: text})
              if (errors.position) setErrors(prev => ({...prev, position: null}));
            }}
            />
            {errors.position && <Text style={{color: 'red'}}>{errors.position}</Text>}
            </View>
            </View>
        </View>


        <View style={style.container}>

        <BoldText title="Address" fontSize={2} />
          <NormalText title="Your current domicile" fontSize={1.7} />


            <View style={{gap:20, marginTop:20}}>
              <View>
            <AppTxtInput
            inputHeadig='Country'
            icon={<Ionicons name='location-outline' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Country'
            value={formValues.country}
            onChangeText={(text: any) => {
              setFormValues({...formValues, country: text})
              if (errors.country) setErrors(prev => ({...prev, country: null}));
            }}
            />
            {errors.country && <Text style={{color: 'red'}}>{errors.country}</Text>}
            </View>

<View>
<AppTxtInput
            inputHeadig='State'
            icon={<Ionicons name='location-outline' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='State'
            value={formValues.state}
            onChangeText={(text: any) => {
              setFormValues({...formValues, state: text})
              if (errors.state) setErrors(prev => ({...prev, state: null}));
            }}
            />
            {errors.state && <Text style={{color: 'red'}}>{errors.state}</Text>}
            </View>

            <View>
<AppTxtInput
            inputHeadig='City'
            icon={<Ionicons name='location-outline' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='City'
            value={formValues.city}
            onChangeText={(text: any) => {
              setFormValues({...formValues, city: text})
              if (errors.city) setErrors(prev => ({...prev, city: null}));
            }}
            />
            {errors.city && <Text style={{color: 'red'}}>{errors.city}</Text>}
            </View>

            <View>
<AppTxtInput
            inputHeadig='Full Address'
            icon={<Ionicons name='location-outline' size={responsiveFontSize(2)} color={APPCOLORS.ICON_TEXT_COLOUR}/>}
            placeholder='Address'
            value={formValues.fullAddress}
            onChangeText={(text: any) => {
              setFormValues({...formValues, fullAddress: text})
              if (errors.fullAddress) setErrors(prev => ({...prev, fullAddress: null}));
            }}
            />
            {errors.fullAddress && <Text style={{color: 'red'}}>{errors.fullAddress}</Text>}
            </View>

              <AppButton 
              title={loading ? "Waiting..." : 'Continue'}
              disabled={loading}
              onPress={()=> handleContinueProfile()}
              />


            </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default WorkProfile;


const style = StyleSheet.create({
  container: {backgroundColor: APPCOLORS.WHITE, padding: 10, borderRadius:10}
})