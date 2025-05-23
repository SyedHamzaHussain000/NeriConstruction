import {View, Text, Image, ScrollView, FlatList, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import React, { useEffect } from 'react';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import WhiteContainers from '../../../components/WhiteContainers';
import {
  BoldText,
  NormalText,
} from '../../../components/DailyUse/AppText/AppText';
import SmallButtonsOrBg from '../../../components/DailyUse/SmallButtonsOrBg';
import {APPCOLORS} from '../../../utils/APPCOLORS';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive';
import {AppImages} from '../../../assets/AppImages';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from '../../../components/DailyUse/AppButton';
import CommentSection from '../../../components/TaskManageComp/CommentSection';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../utils/DateAndTimeFormater';
import { baseUrl, endPoints, errHandler } from '../../../utils/Api_endPoints';
import { getAllTasksByEmployeeAction, getSingleTaskAction } from '../../../redux/actions/MainActions';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const data = [
  {
    id: 1,
    title1: 'Today',
    title2: '00:00 Hrs',
  },
  {
    id: 2,
    title1: 'This Pay Period',
    title2: '32:00 Hrs',
  },
];

function formatDateRange(startDate, endDate) {
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'short' }); // e.g., "Sept"
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

const TaskMenuDetails = ({navigation, route}: any) => {
  const singleTask = useSelector((state: any) => state.getSingleTask)
  const taskId = route?.params?.taskId
  const dispatch = useDispatch()
   const todayTimeIn = useSelector((state: any) => state.getTimeInTimeOut);
   const authData = useSelector((state: any) => state.auth?.authData);
   const { t } = useTranslation();
 
  useEffect(() => {
    dispatch(getSingleTaskAction(taskId))
  }, [taskId])

  const changeStatus = async () => {
    try {
      console.log(taskId)
       const res = await axios.post(`${baseUrl}${endPoints.changeStatus}`, {
        'id': taskId,
        'status': singleTask?.singleTaskData?.status === "In Progress" ? "Finish" : "In Progress",
       });
      
       if(res.data.sucess){
        dispatch(getSingleTaskAction(taskId))
        dispatch(getAllTasksByEmployeeAction(authData?.data?._id))
       }
    } catch (error) {
        errHandler(error)
        console.log(error)      
    }
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <NormalHeader title={t("Task Details")} onPress={()=> navigation.goBack()}/>

      <View style={{padding: 20}}>
       {singleTask?.taskLoadingState ? <ActivityIndicator color='blue' size={50} /> : <WhiteContainers>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: responsiveWidth(85),
                  alignItems: 'center',
                }}>
                <BoldText title={t("Create On Boarding Screen")} fontSize={2} />
                <SmallButtonsOrBg
                  title={singleTask?.singleTaskData?.status === "Finish" ? t('Finish') : t('In Progress')}
                  btnColor={APPCOLORS.GRAY_BORDER}
                  height={4}
                  icon={<Ionicons name='time' size={12} color={APPCOLORS.DARK_GRAY} />}
                  txtColorr={APPCOLORS.DARK_GRAY}
                  onPress={() => {
                    Alert.alert(
                      t('Change Status'),
                      `${t('Task Current Status is')}: ${singleTask?.singleTaskData?.status === "Finish" ? t('Finish') : t('In Progress')}`,
                      [
                        {
                          text: `${t('Change to')} ${singleTask?.singleTaskData?.status === "In Progress" ? t("Finish") : t("In Progress")}`,
                          onPress: () => changeStatus(),
                        },
                        {
                          text: t('Cancel'),
                          style: 'cancel',
                          onPress: () => console.log('User cancelled'),
                        },
                      ],
                      { cancelable: true }
                    );
                  }}
                />
              </View>
              <NormalText 
              title={`${t('Created')} ${formatDate(new Date(singleTask?.singleTaskData?.createdAt))}`}
               fontSize={1.8} />
            </View>
          </View>

        {singleTask?.singleTaskData?.pdfFile ? <Image
            source={{ uri: `${baseUrl}/${singleTask?.singleTaskData?.pdfFile}` }}
            style={{
              width: responsiveWidth(85),
              borderRadius: 10,
              height: responsiveHeight(30),
              marginTop: 10,
            }}
          /> : <View style={{ width: responsiveWidth(85),
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: responsiveHeight(30),}}><Text style={{fontSize: 20}}>{t('Image Not Found')}</Text></View>}

          <View style={{flexDirection: 'row', gap: 10}}>
            {/* <Image
              source={AppImages.detail}
              style={{
                width: responsiveHeight(10),
                borderRadius: 10,
                height: responsiveHeight(10),
                marginTop: 10,
              }}
            /> */}
            {/* <Image
              source={AppImages.detail}
              style={{
                width: responsiveHeight(10),
                borderRadius: 10,
                height: responsiveHeight(10),
                marginTop: 10,
              }}
            /> */}
          </View>

          <View style={{marginTop: 20}}>
            <BoldText title="Description" fontSize={2} />
            <NormalText
              txtColour={'#475467'}
              title={singleTask?.singleTaskData?.taskDetails || singleTask?.singleTaskData?.description}
              fontSize={1.5}
            />
          </View>

          <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
            <View style={{gap: 5}}>
              <BoldText title={t("Priority")} fontSize={2} />
              <SmallButtonsOrBg
                title={t(singleTask?.singleTaskData?.priority)}
                icon={
                  <FontAwesome
                    name="flag"
                    color={APPCOLORS.WHITE}
                    size={responsiveFontSize(2)}
                  />
                }
                btnColor={'#F95555'}
                height={4}
              />
            </View>

            <View style={{gap: 5}}>
              <BoldText title={t("Difficulty")} fontSize={2} />
              <SmallButtonsOrBg
                txtColorr={APPCOLORS.BLACK}
                // title="Very Easy (Less Than a Day)"
                title={singleTask?.singleTaskData?.difficulty}
                icon={<Image source={AppImages.smile} />}
                btnColor={APPCOLORS.WHITE}
                height={4}
              />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <BoldText title={t("Assignee")} fontSize={2} />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 15,
              }}>
              <Image
                source={AppImages.pfp}
                style={{
                  height: responsiveHeight(6),
                  width: responsiveHeight(6),
                }}
              />

              <View>
                <BoldText title={t('Admin')} fontSize={2} />
                <BoldText
                  title={t("Sr Front End Developer")}
                  fontSize={2}
                  txtColour={APPCOLORS.ICON_TEXT_COLOUR}
                />
              </View>
            </View>
          </View>

          <BoldText title={t('Comment Section')} fontSize={2} mrgnTop={2}/>

         <CommentSection commentsData={singleTask?.singleTaskData?.comments} taskData={singleTask?.singleTaskData} />

        </WhiteContainers>}

     {!singleTask?.taskLoadingState &&   <WhiteContainers mrgnTop={3}>
          <View style={{padding: 8}}>

             <View style={{ width: responsiveWidth(95) }}>
                        <BoldText title={t("Total Working Hour")} fontSize={2} />
                        {/* <NormalText title="Paid Period 1 Sept 2024 - 30 Sept 2024" fontSize={1.5} /> */}
                        <NormalText title={`${t('Paid Period')} ${singleTask?.singleTaskData?.startDate || 0} ${singleTask?.singleTaskData?.endDate || 0}`} fontSize={1.5} />
                      </View>
                      <View style={{ width: responsiveWidth(82), flexDirection: 'row' }}>
                        <FlatList contentContainerStyle={{ gap: responsiveHeight(1), marginBottom: responsiveHeight(1), alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(2), width: '100%' }} horizontal data={data} renderItem={({ item, index }) => (
                          <View style={{ gap: responsiveHeight(1), width: responsiveWidth(40), backgroundColor: APPCOLORS.LIGHTWHITE, borderColor: APPCOLORS.GRAY_BORDER, borderWidth: 2, padding: responsiveHeight(2), borderRadius: responsiveHeight(1) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveHeight(1) }}>
                              <AntDesign name="clockcircle" size={20} color={APPCOLORS.Clock_Bg} />
                              <NormalText title={item.title1} fontSize={1.7} />
                            </View>
                            <BoldText title={index == 1 ? singleTask?.singleTaskData?.duration || '00:00' : todayTimeIn?.timeInTimeOutData?.data[0]?.timeIn || '00:00'} fontSize={2.5} />
                          </View>
                        )} />
                      </View>

        <View style={{marginTop:20}}>
        <AppButton
        onPress={()=> navigation.navigate("ClockIn", {data: singleTask?.singleTaskData})}
        title={t('Check In Now')}
        width={85}
        />
        </View>
        </View>
         </WhiteContainers>}
      </View>
    </ScrollView>
  );
};

export default TaskMenuDetails;
