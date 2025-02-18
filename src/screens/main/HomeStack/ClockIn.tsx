import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../utils/Responsive'
import { APPCOLORS } from '../../../utils/APPCOLORS'
import { BoldText, NormalText } from '../../../components/DailyUse/AppText/AppText'
import { AppImages } from '../../../assets/AppImages'
import WhiteContainers from '../../../components/WhiteContainers'
import BannerBoxes from '../../../components/TaskManageComp/BannerBoxes'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AppButton from '../../../components/DailyUse/AppButton'
const ClockIn = ({navigation}:{navigation: any}) => {
  return (
    <View style={{flex:1}}>
           <View style={styles.ContainerHeader}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: responsiveWidth(90),
          }}>
          <View>
            <BoldText
              title="Let’s Clock-In!"
              fontSize={3}
              txtColour={APPCOLORS.WHITE}
            />
            <BoldText
              title="Don’t miss your clock in schedule"
              fontSize={2}
              txtColour={'#D9D6FE'}
            />
          </View>
          <Image
            source={AppImages.clock}
            style={{
              height: responsiveHeight(15),
              width: responsiveWidth(15),
              resizeMode: 'contain',
            }}
          />
        </View>
        <WhiteContainers>
                <View style={{width:responsiveWidth(90)}}>
                    <BoldText title='Total Working Hour' fontSize={2}/>
                    <NormalText title='Paid Period 1 Sept 2024 - 30 Sept 2024' fontSize={1.5}/>
                </View>


                <View style={{width:responsiveWidth(90), flexDirection:'row'}}>
                    
                </View>

                <AppButton title='Clock In Now' />


        </WhiteContainers>
      </View>
    </View>
  )
}

export default ClockIn



const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the root view takes full screen height
    backgroundColor: APPCOLORS.LIGHT_GRAY,
  },
  ContainerHeader: {
    height: responsiveHeight(27),
    backgroundColor: APPCOLORS.ICON_TEXT_COLOUR,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  listContainer: {
    flex: 1, // Makes this section scrollable
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: responsiveHeight(12),
  },
});
