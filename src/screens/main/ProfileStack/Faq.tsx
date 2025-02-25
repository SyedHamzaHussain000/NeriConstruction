import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import { FlatList } from 'react-native-gesture-handler';
import DownIcon from 'react-native-vector-icons/Entypo'
import { APPCOLORS } from '../../../utils/APPCOLORS';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';

const Faq = ({navigation}: any) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqs = [
      { id: "1", question: "Question 01", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
      { id: "2", question: "Question 02", answer: "FlatList efficiently renders large lists by recycling components." },
      { id: "4", question: "Question 04", answer: "React is for web, React Native is for mobile with native components." },
      { id: "5", question: "Question 05", answer: "React is for web, React Native is for mobile with native components." },
      { id: "6", question: "Question 06", answer: "React is for web, React Native is for mobile with native components." },
      { id: "7", question: "Question 07", answer: "React is for web, React Native is for mobile with native components." },
      { id: "8", question: "Question 08", answer: "React is for web, React Native is for mobile with native components." },
      { id: "9", question: "Question 09", answer: "React is for web, React Native is for mobile with native components." },
      { id: "10", question: "Question 10", answer: "React is for web, React Native is for mobile with native components." },
    ];
  
    const toggleExpand = (index: any) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    };
    const renderItem = ({ item, index }: any) => (
        <TouchableOpacity style={styles.item} onPress={() => toggleExpand(index)}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.question}>{item.question}</Text>
              <View style={{flex: 1,justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <DownIcon name={expandedIndex === index ? 'chevron-small-up' : 'chevron-down'} size={20} color={APPCOLORS.ClockInBg} />
              </View>
            </View>
          {expandedIndex === index && <Text style={styles.answer}>{item.answer}</Text>}
        </TouchableOpacity>
      );
  return (
    <View style={{flex: 1}}>
      <NormalHeader onPress={() => navigation.goBack()} title="FAQ" />

      <View style={styles.container}>
      <FlatList
        data={faqs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: responsiveWidth(4),
      backgroundColor: "#f9f9f9",
    },
    item: {
      backgroundColor: "#fff",
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
      elevation: 2,
    },
    question: {
      fontSize: 16,
      fontWeight: "bold",
    },
    answer: {
      marginTop: responsiveHeight(2),
      fontSize: 14,
      color: "#555",
    },
  });

export default Faq;