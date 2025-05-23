import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { AppImages } from '../../../assets/AppImages';
import { BoldText } from '../../../components/DailyUse/AppText/AppText';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Entypo';
import BackIcon from 'react-native-vector-icons/Ionicons';
import LanguageIcon from 'react-native-vector-icons/FontAwesome6';
import AppButton from '../../../components/DailyUse/AppButton';
import WhiteContainers from '../../../components/WhiteContainers';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../../utils/Api_endPoints';
import { useTranslation } from 'react-i18next';
import i18n from '../../../locales/index';
import { savingLanguageAction } from '../../../redux/actions/MainActions';

const languages = [
    { id: '1', name: 'English', iconColor: APPCOLORS.THEMEBLUETEXT },
    { id: '2', name: 'Spanish', iconColor: APPCOLORS.GRAY_BORDER },
    { id: '3', name: 'French', iconColor: APPCOLORS.GRAY_BORDER},
];

const Language = ({navigation}: any) => {
    const employeeData = useSelector((state: any) => state.getEmployeePersonalData);
    const languageState = useSelector((state: any) => state.savingLanguage?.language)
    const [isSelectedLanguage, setIsSelectedLanguage] = useState({language: ''});
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const renderItem = ({ item }: any) => (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            paddingTop: 0,
            paddingBottom: 0,
        }}>
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}
        onPress={() => setIsSelectedLanguage({language: item.name})}>
            {/* Language Icon */}
            <LanguageIcon name="language" size={20} color={APPCOLORS.ClockInBg} style={{marginRight: responsiveWidth(4)}} />
    
            {/* Language Name */}
            <Text style={{ flex: 1, fontSize: 16, color: '#000' }}>{item.name}</Text>
    
            {/* Three-dot Menu Icon */}
                <Icon name="dot-single" size={50} color={isSelectedLanguage.language === item.name ? APPCOLORS.ClockInBg : APPCOLORS.GRAY_BORDER} />
        </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        const resLanguage = languageState === 'en' ? 'English' : languageState === 'fr' ? "French" : 'Spanish'
        setIsSelectedLanguage({language: resLanguage})
    }, [languageState])

  return (
    <View style={{flex:1, backgroundColor:APPCOLORS.WHITE}}>
         <View style={{
            height: responsiveHeight(20),
            backgroundColor: APPCOLORS.ICON_TEXT_COLOUR,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Back Arrow with TouchableOpacity */}
            <TouchableOpacity
                onPress={() => navigation.goBack()} 
                style={{ position: 'absolute', left: 15, top: 15, padding: 10 }}
            >
                <BackIcon name="arrow-back" size={24} color={APPCOLORS.WHITE} />
            </TouchableOpacity>

            {/* Profile Title */}
            <BoldText title={t('My Profile')} textAligm={'center'} txtColour={APPCOLORS.WHITE} fontSize={3} />

            {/* Profile Picture */}
            <Image source={employeeData?.personalData?.profileImage 
                          ? { uri: `${baseUrl}/${employeeData.personalData.profileImage}` } 
                          : AppImages.pfps} style={{ position: 'absolute', zIndex: 10, bottom: -70, borderRadius: 10, width: responsiveWidth(30), height: responsiveHeight(16) }} />
        </View>

  <View style={{height:responsiveHeight(10), }}/>

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', gap:5}}>
            <BoldText title={employeeData?.personalDataLoadingState ? t("Loading...") : `${employeeData?.personalData?.firstName} ${employeeData?.personalData?.lastName}`} fontSize={2.5} textAligm={'center'}/>
            <MaterialIcons
             name={"verified"}
             size={responsiveFontSize(2.5)}
             color={APPCOLORS.ICON_TEXT_COLOUR}
            />
        </View> 
        <BoldText title={employeeData?.personalDataLoadingState ? t("Loading...") : employeeData?.personalData?.designation} txtColour={APPCOLORS.ICON_TEXT_COLOUR} fontSize={2} textAligm={'center'}/>

        <View style={{marginHorizontal: responsiveWidth(6), marginTop: responsiveHeight(2)}}>
        <BoldText title={t('Languages')} fontSize={2}/>

        <View style={{backgroundColor: APPCOLORS.SKY_BLUR, borderRadius: 10, marginTop: responsiveWidth(2)}}>
        <FlatList
            data={languages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
        </View>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <WhiteContainers>
        <AppButton
        onPress={()=> {
            if(isSelectedLanguage.language === 'English'){
                i18n.changeLanguage('en')
                dispatch(savingLanguageAction('en'))
                navigation.navigate('TabBar')
            }else if(isSelectedLanguage.language === 'Spanish'){
                i18n.changeLanguage('es')
                dispatch(savingLanguageAction('es'))
                navigation.navigate('TabBar')
            }else if(isSelectedLanguage.language === 'French'){
                i18n.changeLanguage('fr')
                dispatch(savingLanguageAction('fr'))
                navigation.navigate('TabBar')
            }
        }}
        title={t('Save')}
        />
        </WhiteContainers>
        </View>

    </View>
  );
};

export default Language;