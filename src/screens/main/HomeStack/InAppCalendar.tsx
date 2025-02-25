import React from 'react';
import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { AppImages } from '../../../assets/AppImages';
import HomeHeader from '../../../components/AppHeaders/HomeHeader';
import Banner from '../../../components/HomeComp/Banner';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { BoldText } from '../../../components/DailyUse/AppText/AppText';
import WhiteContainers from '../../../components/WhiteContainers';

const data = [
    {id: 1, text: 'Day', textColor: 'black', backgroundColor: APPCOLORS.Clock_Bg},
    {id: 2, text: 'Week', textColor: 'black', backgroundColor: APPCOLORS.Clock_Bg},
    {id: 3, text: 'Month', textColor: APPCOLORS.WHITE, backgroundColor: APPCOLORS.THEMEBLUETEXT},
    {id: 4, text: 'Year', textColor: 'black', backgroundColor: APPCOLORS.Clock_Bg},
]

const agendaData = [
    {id: 1, text: 'Wiring Dashboard Analytics', time: '13:00 - 14:00', subTitle: 'Design', leftLineColor: 'green', rightSideLogo: AppImages.threecircle},
    {id: 2, text: 'Wiring Dashboard Analytics', time: '13:00 - 14:00', subTitle: 'Design', leftLineColor: APPCOLORS.THEMEBLUETEXT, rightSideLogo: AppImages.threecircle},
    {id: 3, text: 'Wiring Dashboard Analytics', time: '13:00 - 14:00', subTitle: 'Design', leftLineColor: 'orange', rightSideLogo: AppImages.threecircle},
]

const InAppCalendar = ({navigation}:any) => {
  return (
    <View style={{flex: 1,}}>
        <HomeHeader Name='Tonald Trump' JobTitle='Junior Full Stack Developer'  pfp={AppImages.pfp} paddingHorizontal={10}/>
            <ScrollView style={{flex:1, }}>
                        <View style={{padding:10, gap:20}}>
          <Banner Heading={"My Work Summary"} SubHeading={"Today task & presence activity"} img={AppImages.camera} width={95} />

            <View>
                <FlatList
                data={data}
                horizontal
                renderItem={({item, index}) => {
                    return (
                        <View key={index} style={{width: responsiveWidth(21), borderRadius: 40, justifyContent: 'center', alignItems: 'center', margin: 4, height: responsiveHeight(4.5), backgroundColor: item.backgroundColor}}>
                            <BoldText title={item.text} txtColour={item.textColor} fontSize={1.6} />
                        </View>
                    );
                }}
                />
            </View>

            <View>
                <Image source={AppImages.calendar} />
            </View>

            <WhiteContainers borderRadius={5}>

            <BoldText title='Today Agenda' txtColour={APPCOLORS.BLACK} fntWeight='500' fontSize={1.8} />

            <View>
                <FlatList
                data={agendaData}
                renderItem={({item, index}) => {
                    return (
                        <View key={index} style={{width: responsiveWidth(88), justifyContent: 'center', borderLeftWidth: 8, borderLeftColor: item.leftLineColor, borderRadius: 10, paddingTop: 5, marginTop: 10, paddingBottom: 5, margin: 4, height: responsiveHeight(12), backgroundColor: '#EAEFCA'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5, paddingHorizontal: 10 }}>
                            <BoldText title={item.text} txtColour={APPCOLORS.BLACK} fontSize={1.6} />
                            <Image source={item.rightSideLogo} style={{width: responsiveWidth(15), height: responsiveHeight(3)}} />

                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(10), marginTop: 14 }}>
                            <BoldText title={item.time} txtColour={APPCOLORS.BLACK} fontSize={1.4} />
                            <BoldText title={item.subTitle} txtColour={APPCOLORS.BLACK} fontSize={1.4} />
                            </View>
                        </View>
                    );
                }}
                />
            </View>

            </WhiteContainers>

                        </View>
            </ScrollView>
        
    </View>
  )
}

export default InAppCalendar;