/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import WhiteContainers from '../WhiteContainers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BoldText, NormalText } from './AppText/AppText';
import { APPCOLORS } from '../../utils/APPCOLORS';
import { SmallAppButton } from './AppButton';
import { responsiveHeight } from '../../utils/Responsive';

type clockInProp = {
  headingDate?: any,
  inprogressTxt?: any,
  timeIn?: any,
  timeOut?: any,
}

const ClockInCards = ({headingDate, inprogressTxt, timeIn, timeOut}: clockInProp) => {
  return (
    <WhiteContainers mrgnTop={2}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: responsiveHeight(2) }}>
        <View style={{ flexDirection: 'row', gap: responsiveHeight(2), alignItems: 'center' }}>
          <AntDesign name="calendar" size={20} color={APPCOLORS.ICON_TEXT_COLOUR} />
          <BoldText title={headingDate} fontSize={2} fntWeight="700" />
        </View>
       {inprogressTxt && <SmallAppButton fntSize={1.7} txtColor={APPCOLORS.BLACK} height={4} width={30} icon={'clockcircle'} title={inprogressTxt} btnColor={APPCOLORS.BACKGROUND_COLOR} />}
      </View>
      <View style={{ flexDirection: 'row', marginTop: responsiveHeight(3), justifyContent: 'space-between', backgroundColor: APPCOLORS.LIGHTWHITE, borderColor: APPCOLORS.GRAY_BORDER, borderWidth: 2, padding: responsiveHeight(2), borderRadius: responsiveHeight(1) }}>
        <View>
          <NormalText txtColour={APPCOLORS.DARK_GRAY} fontSize={2} title="Total Hours" />
          <BoldText txtColour={APPCOLORS.ClockInBold} fntWeight="600" fontSize={2.2} title="09:00:00 hrs" />
        </View>
        <View>
          <NormalText txtColour={APPCOLORS.DARK_GRAY} fontSize={2} title="Clock in & Out" />
          <BoldText txtColour={APPCOLORS.ClockInBold} fntWeight="600" fontSize={2.2} title={`${timeIn || '00:00 AM'} — ${timeOut || '00:00 AM'}`} />
        </View>
      </View>
    </WhiteContainers>
  );
};

export default ClockInCards;
