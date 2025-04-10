import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BoldText } from "../DailyUse/AppText/AppText";
import { APPCOLORS } from "../../utils/APPCOLORS";
import { responsiveHeight } from "../../utils/Responsive";

const NormalInput = ({labelTitle, icon, placeholder,defaultValue, editable, value, onChangeText }: any) => {
  return (
    <View>
        <BoldText title={labelTitle} txtColour={APPCOLORS.DARK_GRAY} fontSize={2} mrgnTop={0}/>
    <View style={styles.inputContainer}>
      <Icon name={icon} size={22} color={APPCOLORS.ClockInBg} style={styles.icon} />
      <TextInput 
        style={styles.input} 
        placeholder={placeholder} 
        placeholderTextColor="#888"
        value={value}
        defaultValue={defaultValue}
        editable={editable}
        onChangeText={onChangeText}
        />
    </View>
        </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: APPCOLORS.DARK_GRAY,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginVertical: 5,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: responsiveHeight(6),
    fontSize: 15
  },
});

export default NormalInput;
