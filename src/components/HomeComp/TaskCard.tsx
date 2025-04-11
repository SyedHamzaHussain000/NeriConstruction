import {View, Text, TouchableOpacity} from 'react-native';
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

const TaskCard = ({ title, status, priority, dueDate, comments, onPress }: any) => {
  return (
    <TouchableOpacity
    onPress={onPress}
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

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <SmallButtonsOrBg
          icon={
            <Ionicons
              name={'time'}
              size={responsiveFontSize(2)}
              color={status === 'New' ? 'green' : APPCOLORS.DARK_GRAY}
            />
          }
          btnColor={'#D0D5DD'}
          width={25}
          height={4}
          title={status}
          txtColorr={status === 'New' ? 'green' : APPCOLORS.BLACK}
        />
        <SmallButtonsOrBg
          icon={
            <Ionicons
              name={'flag'}
              size={responsiveFontSize(2)}
              color={APPCOLORS.WHITE}
            />
          }
          btnColor={priority === 'High' ? '#F95555' : '#FFA500'}
          width={25}
          height={4}
          title={priority}
          txtColorr={APPCOLORS.WHITE}
        />
      </View>

      <View
        style={{
          width: responsiveWidth(80),
          height: responsiveHeight(1),
          backgroundColor: APPCOLORS.ICON_TEXT_COLOUR,
          borderRadius: 200,
          alignSelf: 'center',
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Image
            source={AppImages.Frame}
            style={{
              height: responsiveHeight(4),
              width: responsiveHeight(8),
              resizeMode: 'contain',
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
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
            title={dueDate}
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
            title={comments}
            txtColorr={APPCOLORS.BLACK}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
