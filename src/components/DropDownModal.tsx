import React, { useRef } from 'react';
import { Animated, StyleSheet, View, TextInput, Button, ScrollView } from 'react-native';
import Modal from 'react-native-modal'

type DropdownProps = {
  children: React.ReactNode; // Content inside the dropdown
  height?: number; // Height of the dropdown
  duration?: number; // Animation duration
  isModalVisible?: boolean; //
};

const DropDownModal = ({ children, height = 300, duration = 500 ,isModalVisible}: DropdownProps) => {
  return (
      <Modal style={{margin:0,   }}  isVisible={isModalVisible}>
        <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'flex-end',}} showsVerticalScrollIndicator={false}>
        {
          children
        }
        </ScrollView>
      </Modal>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
  },
});

export default DropDownModal;




