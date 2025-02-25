import {View, Text, Image, ScrollView} from 'react-native';
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
const TaskDetail = ({navigation}: {navigation: any}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <NormalHeader title="Task Details" onPress={()=> navigation.goBack()}/>

      <View style={{padding: 20}}>
        <WhiteContainers>
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
                  title="New Task"
                  btnColor={APPCOLORS.ICON_TEXT_COLOUR}
                  height={4}
                />
              </View>
              <NormalText title="Created 27 Sept 2024" fontSize={1.8} />
            </View>
          </View>

          <Image
            source={AppImages.detail}
            style={{
              width: responsiveWidth(85),
              borderRadius: 10,
              height: responsiveHeight(30),
              marginTop: 10,
            }}
          />

          <View style={{flexDirection: 'row', gap: 10}}>
            <Image
              source={AppImages.detail}
              style={{
                width: responsiveHeight(10),
                borderRadius: 10,
                height: responsiveHeight(10),
                marginTop: 10,
              }}
            />
            <Image
              source={AppImages.detail}
              style={{
                width: responsiveHeight(10),
                borderRadius: 10,
                height: responsiveHeight(10),
                marginTop: 10,
              }}
            />
          </View>

          <View style={{marginTop: 20}}>
            <BoldText title="Description" fontSize={2} />
            <NormalText
              txtColour={'#475467'}
              title="Create on boarding page based on pic, pixel perfect, with the user story of i want to know what kind of apps is this so i need to view onboarding screen to leverage my knowledge so that i know what kind of apps is this"
              fontSize={1.5}
            />
          </View>

          <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
            <View style={{gap: 5}}>
              <BoldText title="Priority" fontSize={2} />
              <SmallButtonsOrBg
                title="High"
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
                title="Very Easy (Less Than a Day)"
                icon={<Image source={AppImages.smile} />}
                btnColor={APPCOLORS.WHITE}
                height={4}
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <BoldText title="Duration" fontSize={2} />
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Ionicons
                name="time"
                size={responsiveFontSize(2)}
                color={APPCOLORS.DARK_GRAY}
              />
              <NormalText title="01:30 AM - 02:00 AM" fontSize={1.7} />
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <BoldText title="Assignee" fontSize={2} />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 5,
              }}>
              <Image
                source={AppImages.pfp}
                style={{
                  height: responsiveHeight(6),
                  width: responsiveHeight(6),
                }}
              />

              <View>
                <BoldText title="Alice" fontSize={2} />
                <BoldText
                  title="Sr Front End Developer"
                  fontSize={2}
                  txtColour={APPCOLORS.ICON_TEXT_COLOUR}
                />
              </View>
            </View>
          </View>


          <View style={{marginTop:20}}>
            <BoldText title='Location' fontSize={2}/>
            <Image source={AppImages.map} style={{width:responsiveWidth(80), height:responsiveHeight(20), borderRadius:10, marginTop:10}}/>
          </View>
        </WhiteContainers>

              <View style={{marginTop:20}}>
        <AppButton
        onPress={()=> navigation.navigate("ClockIn")}
        title='Accept'
        />
        </View>
      </View>
    </ScrollView>
  );
};

export default TaskDetail;
