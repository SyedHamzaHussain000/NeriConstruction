import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TextInput
} from 'react-native';
import { APPCOLORS } from '../../utils/APPCOLORS';
import { responsiveHeight } from '../../utils/Responsive';
import { BoldText } from '../DailyUse/AppText/AppText';
import Icon from "react-native-vector-icons/Ionicons";
import Down from "react-native-vector-icons/Feather";

const DropDownInput = ({items, inputLable, iconName, defaultVal}: any) => {
  const [selectedValue, setSelectedValue] = useState(defaultVal);
  const [isModalVisible, setModalVisible] = useState(false);

  const selectItem = (item: any) => {
    setSelectedValue(item.label);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Button */}
       <View>
              <BoldText title={inputLable} txtColour={APPCOLORS.DARK_GRAY} fontSize={2} mrgnTop={0}/>
          <TouchableOpacity style={styles.inputContainer}
        onPress={() => setModalVisible(true)}
        >
            <Icon name={iconName} size={22} color={APPCOLORS.ClockInBg} style={styles.icon} />
            <TextInput 
              style={styles.input} 
            //   placeholder={'s'} 
              placeholderTextColor="#888"
              defaultValue={selectedValue}
              editable={false}
              selectTextOnFocus={false}
              />
            <Down name='chevron-down' size={30} color={APPCOLORS.ClockInBg} />
          </TouchableOpacity>
              </View>

      {/* Modal for Dropdown List */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => selectItem(item)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  dropdownButton: {
    width: 200,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    width: 250,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
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

export default DropDownInput;
