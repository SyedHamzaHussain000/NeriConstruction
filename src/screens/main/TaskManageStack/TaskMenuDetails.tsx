import {View, Text, Image, ScrollView, FlatList, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
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
import { useSelector } from 'react-redux';
import { formatDate } from '../../../utils/DateAndTimeFormater';
import { baseUrl } from '../../../utils/Api_endPoints';

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

const TaskMenuDetails = ({navigation}: {navigation: any}) => {
  const singleTask = useSelector((state: any) => state.getSingleTask)

  console.log(singleTask?.singleTaskData, 'res')
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <NormalHeader title="Task Details" onPress={()=> navigation.goBack()}/>

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
                <BoldText title="Create On Boarding Screen" fontSize={2} />
                <SmallButtonsOrBg
                  title={singleTask?.singleTaskData?.status}
                  btnColor={APPCOLORS.GRAY_BORDER}
                  height={4}
                  icon={<Ionicons name='time' size={12} color={APPCOLORS.DARK_GRAY} />}
                  txtColorr={APPCOLORS.DARK_GRAY}
                />
              </View>
              <NormalText 
              title={`Created ${formatDate(new Date(singleTask?.singleTaskData?.createdAt))}`}
               fontSize={1.8} />
            </View>
          </View>

          <Image
            source={{ uri: `${baseUrl}/${singleTask?.singleTaskData?.pdfFile}` }}
            style={{
              width: responsiveWidth(85),
              borderRadius: 10,
              height: responsiveHeight(30),
              marginTop: 10,
            }}
          />

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
              title={singleTask?.singleTaskData?.taskDetails}
              fontSize={1.5}
            />
          </View>

          <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
            <View style={{gap: 5}}>
              <BoldText title="Priority" fontSize={2} />
              <SmallButtonsOrBg
                title={singleTask?.singleTaskData?.priority}
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
              <BoldText title="Difficulty" fontSize={2} />
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
            <BoldText title="Assignee" fontSize={2} />

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
                <BoldText title='Admin' fontSize={2} />
                <BoldText
                  title="Sr Front End Developer"
                  fontSize={2}
                  txtColour={APPCOLORS.ICON_TEXT_COLOUR}
                />
              </View>
            </View>
          </View>

          <BoldText title='Comment Section' fontSize={2} mrgnTop={2}/>

         <CommentSection commentsData={singleTask?.singleTaskData?.comments} taskData={singleTask?.singleTaskData} />

        </WhiteContainers>}

        <WhiteContainers mrgnTop={3}>
          <View style={{padding: 8}}>

             <View style={{ width: responsiveWidth(95) }}>
                        <BoldText title="Total Working Hour" fontSize={2} />
                        <NormalText title="Paid Period 1 Sept 2024 - 30 Sept 2024" fontSize={1.5} />
                      </View>
                      <View style={{ width: responsiveWidth(82), flexDirection: 'row' }}>
                        <FlatList contentContainerStyle={{ gap: responsiveHeight(1), marginBottom: responsiveHeight(1), alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(2), width: '100%' }} horizontal data={data} renderItem={({ item }) => (
                          <View style={{ gap: responsiveHeight(1), width: responsiveWidth(40), backgroundColor: APPCOLORS.LIGHTWHITE, borderColor: APPCOLORS.GRAY_BORDER, borderWidth: 2, padding: responsiveHeight(2), borderRadius: responsiveHeight(1) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveHeight(1) }}>
                              <AntDesign name="clockcircle" size={20} color={APPCOLORS.Clock_Bg} />
                              <NormalText title={item.title1} fontSize={1.7} />
                            </View>
                            <BoldText title={item.title2} fontSize={2.5} />
                          </View>
                        )} />
                      </View>

        <View style={{marginTop:20}}>
        <AppButton
        onPress={()=> navigation.navigate("ClockIn")}
        title='Check In Now'
        width={85}
        />
        </View>
        </View>
         </WhiteContainers>
      </View>
    </ScrollView>
  );
};

export default TaskMenuDetails;
