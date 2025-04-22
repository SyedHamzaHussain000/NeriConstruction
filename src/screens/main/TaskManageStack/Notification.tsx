import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { APPCOLORS } from '../../../utils/APPCOLORS';
import NormalHeader from '../../../components/AppHeaders/NormalHeader';
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive';
import { AppImages } from '../../../assets/AppImages';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl, endPoints } from '../../../utils/Api_endPoints';

const DATA = [
    {
      id: "1",
      image: AppImages.file, // Replace with your image URL
      title: "New Task Assigned to You!",
      subtitle: "You have new task for this sprint from Alicia, you can check your task “Create Onboarding Screen” by tap here?",
      time: "09.10",
    },
    {
      id: "2",
      image: AppImages.file,
      title: "New Task Assigned to You!",
      subtitle: "You have new task for this sprint from Alicia, you can check your task “Create Onboarding Screen” by tap here",
      time: "09.10",
    },
    {
        id: "3",
        image: AppImages.file,
        title: "New Task Assigned to You!",
        subtitle: "You have new task for this sprint from Alicia, you can check your task “Create Onboarding Screen” by tap here",
        time: "09.10",
      },
  ];

  const ChatListItem = ({ item }: any) => (
    <View style={styles.item}>
      <Image source={AppImages.file} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={styles.title}>{item.message}</Text>
        {/* <Text style={styles.time}>{item.time}</Text> */}
        </View>
        {/* <Text style={styles.subtitle}>{item.subtitle}</Text> */}
      </View>
    </View>
  );

const Notification = ({navigation}: any) => {
      const { t } = useTranslation();
      const authData = useSelector((state: any) => state.auth?.authData);
      const [isLoading, setIsLoading] = useState(false);
      const [allNotifications, setAllNotifications] = useState([]);

      const getAllNotifications = async (id: any) => {
        setIsLoading(true);
        try {
          const res = await axios.get(`${baseUrl}${endPoints.notifications}?employeeId=${id}`);
          setAllNotifications(res.data?.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        getAllNotifications(authData?.data?._id)
      }, [authData]);

  return (
    <View style={{flex: 1, backgroundColor: APPCOLORS.WHITE}}>
      <NormalHeader onPress={() => navigation.goBack()} title={t("Notifcations")} />

    <View>
      {isLoading ? <ActivityIndicator size={50} color='blue' /> : !!allNotifications?.length ?  <FlatList
      data={allNotifications}
      renderItem={({ item }) => <ChatListItem item={item} />}
      /> : <View><Text style={{textAlign: 'center'}}>{t("No Data Found")}</Text></View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    item: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderBottomColor: "#ccc",
      borderTopColor: "#ccc",
    },
    image: {
      width: 50,
      height: 60,
    //   borderRadius: 25,
    },
    textContainer: {
      flex: 1,
      marginLeft: responsiveWidth(4),
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 14,
      marginTop: 4,
      color: "gray",
    },
    time: {
      fontSize: 12,
      color: "gray",
    },
  });

export default Notification