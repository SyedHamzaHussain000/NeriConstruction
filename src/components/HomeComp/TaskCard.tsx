import {View, Text} from 'react-native';
import React from 'react';
import CircleContainer from '../DailyUse/CircleContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {APPCOLORS} from '../../utils/APPCOLORS';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import {BoldText, NormalText} from '../DailyUse/AppText/AppText';
import {Image} from 'react-native';
import {AppImages} from '../../assets/AppImages';
import AppButton from '../DailyUse/AppButton';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SmallButtonsOrBg from '../DailyUse/SmallButtonsOrBg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type props = {
  title: string;
};

const TaskCard = ({title}: props) => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: APPCOLORS.MORE_LIGHT_GRAY,
        borderWidth: 0.2,
        borderRadius: 10,
        gap: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 5,
          }}>
          <CircleContainer
            color={APPCOLORS.ICON_TEXT_COLOUR}
            alignSelf={'flex-start'}>
            <SimpleLineIcons
              name={'energy'}
              color={APPCOLORS.WHITE}
              size={responsiveFontSize(1.3)}
            />
          </CircleContainer>

          <BoldText title={title} fontSize={2} />
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <SmallButtonsOrBg
         icon={
            <Ionicons
              name={'time'}
              size={responsiveFontSize(2)}
              color={APPCOLORS.DARK_GRAY}
            />
          }
          btnColor={'#D0D5DD'}
          width={25}
          height={4}
          title="In Progress"
          txtColorr={APPCOLORS.BLACK}
        />
        <SmallButtonsOrBg
         icon={
            <Ionicons
              name={'flag'}
              size={responsiveFontSize(2)}
              color={APPCOLORS.WHITE}
            />
          }
          btnColor={'#F95555'}
          width={25}
          height={4}
          title="High"
          txtColorr={APPCOLORS.WHITE}
        />
      </View>

      <View style={{width:responsiveWidth(80), height:responsiveHeight(1), backgroundColor:APPCOLORS.ICON_TEXT_COLOUR, borderRadius:200, alignSelf:'center'}}/>

      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Image
            source={AppImages.Frame}
            style={{
              height: responsiveHeight(4),
              width: responsiveHeight(8),
              resizeMode: 'contain',
            }}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <SmallButtonsOrBg
            icon={
              <FontAwesome5
                name={'calendar-alt'}
                size={responsiveFontSize(2)}
                color={APPCOLORS.DARK_GRAY}
              />
            }
            btnColor={APPCOLORS.WHITE}
            width={25}
            height={4}
            title="27 April"
            txtColorr={APPCOLORS.BLACK}
          />
          <SmallButtonsOrBg
            icon={
              <Ionicons
                name={'chatbox-ellipses'}
                size={responsiveFontSize(2)}
                color={APPCOLORS.DARK_GRAY}
              />
            }
            btnColor={APPCOLORS.WHITE}
            width={25}
            height={4}
            title="2"
            txtColorr={APPCOLORS.BLACK}
          />
        </View>
      </View>
    </View>
  );
};

export default TaskCard;
