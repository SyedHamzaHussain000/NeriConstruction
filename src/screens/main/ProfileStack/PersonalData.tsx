import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet, Platform, Text } from 'react-native';
import { launchImageLibrary as _launchImageLibrary } from 'react-native-image-picker';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import WhiteContainers from '../../../components/WhiteContainers';
import { BoldText } from '../../../components/DailyUse/AppText/AppText';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { AppImages } from '../../../assets/AppImages';
import NormalInput from '../../../components/PersonalDataComp/NormalInput';
import DropDownInput from '../../../components/PersonalDataComp/DropDownInput';
import AppButton from '../../../components/DailyUse/AppButton';
import UpdateProfileModal from '../../../components/PersonalDataComp/UpdateProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../../utils/Api_endPoints';
import { isUpdatedFalseAction, workProfileAction } from '../../../redux/actions/AuthActions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getEmployeePersonalDataAction } from '../../../redux/actions/MainActions';

let launchImageLibrary = _launchImageLibrary;

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const PersonalData = ({navigation}: any) => {
          const employeeData = useSelector((state: any) => state.getEmployeePersonalData);
            const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<Boolean>(false);
            const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<Boolean>(false);
            const [selectedImage, setSelectedImage] = useState(null);
            const dispatch = useDispatch();
              const data = useSelector((state: any) => state.auth?.authData)
               const [errors, setErrors] = useState({});
                const [image, setImage] = useState({uri: '', name: '', type: ''});
                const [showPicker, setShowPicker] = useState(false);
                const [date, setDate] = useState(new Date(employeeData?.personalData?.DOB));
              const loading = useSelector((state: any) => state.work?.workLoadingState)

            const [formValues, setFormValues] = useState({
                id: data?.data?._id,
                firstName: employeeData?.personalData?.firstName,
                lastName: employeeData?.personalData?.lastName,
                dateOfBirth: employeeData?.personalData?.DOB,
                position: employeeData?.personalData?.designation,
                country: employeeData?.personalData?.country,
                state: employeeData?.personalData?.state,
                city: employeeData?.personalData?.city,
                fullAddress: employeeData?.personalData?.fullAddress,
                image: {uri: '', name: '', type: ''},
              });

              const onChange = (event, selectedDate) => {
                  if (Platform.OS === 'android') setShowPicker(false); // hide on Android
                  if (selectedDate){
                    setDate(selectedDate)
                    setFormValues({...formValues, dateOfBirth: selectedDate?.toISOString()})
                    if (errors.dateOfBirth) setErrors(prev => ({...prev, dateOfBirth: null}));
                  };
                };

            const openImagePicker = () => {
              const options = {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
              };
          
              launchImageLibrary(options, handleResponse);
            };

            const handleResponse = (response: any) => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('Image picker error: ', response.error);
              } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSelectedImage(imageUri);
                setFormValues({...formValues, image: {uri: response.assets?.[0]?.uri,
                  name: response.assets?.[0]?.fileName,
                  type: response.assets?.[0]?.type || 'image/jpeg',}})
                if (errors.image) setErrors(prev => ({...prev, image: null}));
              }
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

            const handleUpdateProfile = () => {
              console.log('first')
                  console.log(formValues)
                  dispatch(workProfileAction(formValues, {noNav:false}, setIsUpdateModalVisible, setIsSuccessModalVisible))
              }

              const showDatePicker = () => {
                setShowPicker(true);
              };

              useEffect(() => {
                if(employeeData?.isUpdatedEmployeeData){
                    setIsUpdateModalVisible(false);
                    setIsSuccessModalVisible(true);
                    dispatch(getEmployeePersonalDataAction(data?.data?._id))
                }
              }, [employeeData?.isUpdatedEmployeeData])

  return (
    <View style={{flex: 1}}>
      <NormalHeader onPress={() => navigation.goBack()} title="Personal Data" />

    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{padding: responsiveWidth(4)}}>
            <WhiteContainers paddingHorizontal={5}>
                            <BoldText title='My Personal Data' mrgnTop={1} txtColour={APPCOLORS.BLACK} fntWeight='bold' fontSize={2}/>
                            <BoldText title='Details about my personal data' txtColour={APPCOLORS.DARK_GRAY} fontSize={1.7}/>
                
                <View style={{alignItems: 'center', marginTop: responsiveHeight(2)}}>
                    <TouchableOpacity onPress={() => openImagePicker()}>
                    <Image source={selectedImage || employeeData.personalData.profileImage ? {uri: selectedImage || `${baseUrl}/${employeeData.personalData.profileImage}`} : AppImages.pfps} style={{width: 200, height: 200, borderRadius: 25}} />
                                  {errors.image && <Text style={{color: 'red', textAlign: 'center', marginTop: 10}}>{errors.image}</Text>}
                        <BoldText title={selectedImage ? 'Change Photo' : 'Upload Photo'} textAligm={'center'} txtColour={APPCOLORS.DARK_GRAY} fntWeight='bold' fontSize={2} mrgnTop={2}/>
                    </TouchableOpacity>
                <View style={{marginHorizontal: responsiveWidth(10)}}>
                <BoldText title='Format should be in .jpeg .png atleast 800x800px and less than 5MB' mrgnTop={0.5} textAligm={'center'} txtColour={APPCOLORS.DARK_GRAY} fontSize={1.5}/>
                </View>
                </View>

            <View>
                <View style={{marginTop: responsiveHeight(2)}}>
                <NormalInput labelTitle='First Name' icon='person' placeholder='Fist Name' value={formValues.firstName}
                            onChangeText={(text: any) => {
                              setFormValues({...formValues, firstName: text})
                              if (errors.firstName) setErrors(prev => ({...prev, firstName: null}));
                            }}
                            />
                            {errors.firstName && <Text style={{color: 'red'}}>{errors.firstName}</Text>}
                </View>
                <View style={{marginTop: responsiveHeight(1.5)}}>
                <NormalInput labelTitle='Last Name' icon='person' placeholder='Last Name' value={formValues.lastName}
                            onChangeText={(text: any) => {
                              setFormValues({...formValues, lastName: text})
                              if (errors.lastName) setErrors(prev => ({...prev, lastName: null}));
                            }}
                            />
                            {errors.lastName && <Text style={{color: 'red'}}>{errors.lastName}</Text>}
                </View>

                <View style={{marginTop: responsiveHeight(1.5)}}>
                  <TouchableOpacity onPress={showDatePicker} activeOpacity={0.9}>
                <NormalInput labelTitle='Date Of Birth' icon='calendar' placeholder='Date Of Birth' 
                            value={formValues?.dateOfBirth ? formatDate(new Date(formValues?.dateOfBirth)) : ''}
                            onChangeText={(text: any) => {
                              setFormValues({...formValues, dateOfBirth: text})
                              if (errors.dateOfBirth) setErrors(prev => ({...prev, dateOfBirth: null}));
                            }}
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

                <View style={{marginTop: responsiveHeight(1.5)}}>
                <NormalInput labelTitle='Position' icon='calendar' placeholder='Position' value={formValues.position}
                            onChangeText={(text: any) => {
                              setFormValues({...formValues, position: text})
                              if (errors.position) setErrors(prev => ({...prev, position: null}));
                            }}
                            />
                            {errors.position && <Text style={{color: 'red'}}>{errors.position}</Text>}
                </View>
            </View>
            </WhiteContainers>

    <WhiteContainers mrgnTop={2} paddingHorizontal={5}>
    <BoldText title='Address' mrgnTop={1} txtColour={APPCOLORS.BLACK} fntWeight='bold' fontSize={2}/>
    <BoldText title='Your current domicile' txtColour={APPCOLORS.DARK_GRAY} fontSize={1.7}/>

    <View style={{marginTop: responsiveHeight(1.5)}}>
    <NormalInput labelTitle='Country' icon='location' placeholder='Country' value={formValues.country}
                            onChangeText={(text: any) => {
                              setFormValues({...formValues, country: text})
                              if (errors.country) setErrors(prev => ({...prev, country: null}));
                            }}
                            />
                            {errors.country && <Text style={{color: 'red'}}>{errors.country}</Text>}
                </View>

                <View style={{marginTop: responsiveHeight(1.5)}}>
                <NormalInput labelTitle='State' icon='location' placeholder='State' value={formValues.state}
                            onChangeText={(text: any) => {
                              setFormValues({...formValues, state: text})
                              if (errors.state) setErrors(prev => ({...prev, state: null}));
                            }}
                            />
                            {errors.state && <Text style={{color: 'red'}}>{errors.state}</Text>}
                </View>

                <View style={{marginTop: responsiveHeight(1.5)}}>
                <NormalInput labelTitle='City' icon='location' placeholder='City' value={formValues.city}
                            onChangeText={(text: any) => {
                              setFormValues({...formValues, city: text})
                              if (errors.city) setErrors(prev => ({...prev, city: null}));
                            }}
                            />
                            {errors.city && <Text style={{color: 'red'}}>{errors.city}</Text>}
                </View>

    <View>
    <BoldText title='Full Address' txtColour={APPCOLORS.DARK_GRAY} fontSize={2} mrgnTop={2}/>
      <TextInput
        placeholder="Type here..."
        multiline={true} // Enables multiple lines
        numberOfLines={4} // Defines initial visible lines
        style={styles.textArea}
        value={formValues.fullAddress}
                            onChangeText={(text: any) => {
                              setFormValues({...formValues, fullAddress: text})
                              if (errors.fullAddress) setErrors(prev => ({...prev, fullAddress: null}));
                            }}
                            />
                            {errors.fullAddress && <Text style={{color: 'red'}}>{errors.fullAddress}</Text>}
    </View>
    </WhiteContainers>
      </View>

      <WhiteContainers mrgnTop={2}>
    <AppButton
        onPress={()=> setIsUpdateModalVisible(true)}
        title='Update'
        />
    </WhiteContainers>
    </ScrollView>

    <UpdateProfileModal 
    isModalVisible={isUpdateModalVisible} imageSource={AppImages.personBox} yesBtnDisabled={loading} yesBtnTitle={loading ? "Waiting..." : 'Yes, Update Profile'} noBtnTitle='No, Let me check' yesBtnOnPress={() => handleUpdateProfile()} noBtnOnPress={() => setIsUpdateModalVisible(false)}   title="Update Profile" subTitle="Are you sure you want to update your profile? This will help us improve your experience and provide personalized features."
    />


<UpdateProfileModal 
    isModalVisible={isSuccessModalVisible} imageSource={AppImages.personBox} yesBtnTitle='View My Profile' yesBtnOnPress={() => {
        setIsSuccessModalVisible(false);
        dispatch(isUpdatedFalseAction())
          }} title="Profile Updated!" subTitle="Your profile has been successfully updated. We’re excited to see you take this step!"
    />
    </View>
  )
}

const styles = StyleSheet.create({
    textArea: {
      width: '100%',
      height: responsiveHeight(14), // Adjust height as needed
      borderWidth: 1,
      borderColor: APPCOLORS.DARK_GRAY,
      borderRadius: 8,
      padding: 10,
      marginTop: 7,
      textAlignVertical: 'top', // Ensures text starts from top-left
      backgroundColor: '#fff',
      fontSize: 16,
    },
  });

export default PersonalData