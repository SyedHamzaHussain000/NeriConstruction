/* eslint-disable react-native/no-inline-styles */
import { View} from 'react-native';
import React from 'react';
import { APPCOLORS } from '../../utils/APPCOLORS';

type props = {
    children: React.ReactNode,
    color?:any,
    alignSelf?: any
}
const CircleContainer = ({children,color,alignSelf}: props) => {
  return (
            <View style={{padding:10, backgroundColor:color ? color : APPCOLORS.LIGHT_GRAY, borderRadius:200, alignSelf:alignSelf ? alignSelf : null }}>
                {
                    children
                }
            </View>
  );
};

export default CircleContainer;
