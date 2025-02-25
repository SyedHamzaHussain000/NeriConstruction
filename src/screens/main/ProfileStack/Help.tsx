import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import WhiteContainers from '../../../components/WhiteContainers';
import { BoldText } from '../../../components/DailyUse/AppText/AppText';

const Help = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <NormalHeader onPress={() => navigation.goBack()} title="Help" />

    <ScrollView style={{flexGrow: 1}}>
        <WhiteContainers mrgnTop={2}>
        <BoldText
        lineHeight={4}
        title='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book' txtColour={APPCOLORS.DARK_GRAY} fontSize={2} />
        </WhiteContainers>
    </ScrollView>
    </View>
  )
}

export default Help