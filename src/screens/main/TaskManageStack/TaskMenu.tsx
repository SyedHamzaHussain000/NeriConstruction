import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, PermissionsAndroid, Platform } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../../utils/Responsive";
import { APPCOLORS } from "../../../utils/APPCOLORS";
import { BoldText, NormalText } from "../../../components/DailyUse/AppText/AppText";
import { AppImages } from "../../../assets/AppImages";
import WhiteContainers from "../../../components/WhiteContainers";
import BannerBoxes from "../../../components/TaskManageComp/BannerBoxes";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import TaskCard from "../../../components/HomeComp/TaskCard";
import NormalHeader from "../../../components/AppHeaders/NormalHeader";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasksByEmployeeAction, getSingleTaskAction } from "../../../redux/actions/MainActions";
import Geolocation from '@react-native-community/geolocation';

const TaskMenu = ({navigation}: any) => {
  const [selectedTab, setSelectedTab] = useState("All");
  const dispatch = useDispatch()
  const authData = useSelector((state: any) => state.auth?.authData);
  const taskData = useSelector((state: any) => state.getAllTasksByEmployee);
  const [tasks, setTasks] = useState({inprogress: [], finish: [], pending: []})

  useEffect(() => {
    dispatch(getAllTasksByEmployeeAction(authData?.data?._id))
  }, [authData?.data?._id])

  useEffect(() => {
    const inprogData = taskData?.allTaskData?.filter((item: any) => item.status === 'In Progress')
    const finishData = taskData?.allTaskData?.filter((item: any) => item.status === 'Finish')
    const pendingData = taskData?.allTaskData?.filter((item: any) => item.status === 'Pending')
    setTasks({inprogress: inprogData, finish: finishData, pending: pendingData})
  }, [taskData])

  const allTasks = {
    All: taskData?.allTaskData,
    Pending: tasks.pending,
    InProgress: tasks.inprogress,
    Finish: tasks.finish,
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission){
      console.log('no per')
    }else {
      Geolocation.getCurrentPosition(
        position => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
        },
        error => {
          console.log('Location error:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  console.log(allTasks)
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={[styles.ContainerHeader,selectedTab !== 'All' && {backgroundColor: 'lightwhite', padding: 0}]}>
      {selectedTab === 'All' && <View style={styles.headerContent}>
          <View>
            <BoldText title="My Jobs " fontSize={3} txtColour={APPCOLORS.WHITE} />
            <BoldText title="Let’s tackle your to do list" fontSize={2} txtColour={"#D9D6FE"} />
          </View>
          <Image source={AppImages.board} style={styles.headerImage} />
        </View>}

        <View style={{width: responsiveWidth(100)}}>
        {selectedTab === 'Pending' && <NormalHeader onPress={() => navigation.navigate('ClockIn')} title="Pendings Task" />}
        {selectedTab === 'InProgress' && <NormalHeader onPress={() => navigation.navigate('ClockIn')} title="In Progress Task" />}
       {selectedTab === 'Finish' && <NormalHeader onPress={() => navigation.navigate('ClockIn')} title="Finish Task" />}
        </View>
        {/* Summary Section */}
        <WhiteContainers mrgnTop={selectedTab === 'All' ? 0 : 5.5}>
          <View style={{ width: responsiveWidth(85) }}>
            <BoldText title="Summary of Your Work" fontSize={2} />
            <NormalText title="Your current task progress" fontSize={2} />
            <View style={styles.bannerContainer}>
              <BannerBoxes
                cardType="All"
                number={allTasks?.All?.length}
                bgColor={APPCOLORS.ICON_TEXT_COLOUR}
                icon={<Entypo name={"list"} size={responsiveFontSize(1.2)} color={APPCOLORS.WHITE} />}
              />
              <BannerBoxes
                cardType="In Progress"
                number={tasks?.inprogress?.length}
                bgColor={APPCOLORS.DARK_ORANGE}
                icon={<Ionicons name={"time-outline"} size={responsiveFontSize(1.2)} color={APPCOLORS.WHITE} />}
              />
              <BannerBoxes
                cardType="Finish"
                number={tasks?.finish?.length}
                bgColor={APPCOLORS.DARK_GRAY}
                icon={<Entypo name={"check"} size={responsiveFontSize(1.2)} color={APPCOLORS.WHITE} />}
              />
            </View>
          </View>
        </WhiteContainers>
      </View>

      {/* Custom Tabs */}
      <View style={styles.tabContainer}>
        {["All",  "InProgress", "Finish"].map((tab) => (
          <TouchableOpacity
          key={tab}
          style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
          onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab === "All" ? "All" : tab === "InProgress" ? "In Progress" : tab === "Pending" ? "Pending" : "Finish"}{" "}
              <Text style={[styles.numberText, selectedTab !== tab && {color: '#b3b3b3'}]}>{allTasks[tab]?.length}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task List Based on Selected Tab */}
      <View style={styles.listContainer}>
       {taskData?.taskLoadingState ? <ActivityIndicator color='blue' size={50} /> : !!allTasks[selectedTab]?.length ? <FlatList
          data={allTasks[selectedTab]}
          // keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TaskCard title={item.task || item.taskTitle} onPress={() => {
              const taskId = item._id;
              navigation.navigate('TaskMenuDetails', {taskId: taskId})
            }} status={item.status} priority={item.priority} dueDate={item.date} comments={item.comments?.length || 0} />
          )}
        /> : <View><Text style={{textAlign: 'center'}}>No Data Found</Text></View>}
      </View>
    </View>
  );
};

export default TaskMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APPCOLORS.LIGHT_GRAY,
  },
  ContainerHeader: {
    height: responsiveHeight(27),
    backgroundColor: APPCOLORS.ICON_TEXT_COLOUR,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: responsiveWidth(90),
  },
  headerImage: {
    height: responsiveHeight(15),
    width: responsiveWidth(15),
    resizeMode: "contain",
  },
  bannerContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: responsiveWidth(80),
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginTop: responsiveHeight(12),
    borderRadius: 10,
    marginHorizontal: responsiveWidth(5),
  },
  tabButton: {
    height: responsiveHeight(4.5),
    width: responsiveWidth(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: responsiveFontSize(1.8),
    color: APPCOLORS.GRAY_TEXT,
  },
  activeTab: {
    backgroundColor: APPCOLORS.ICON_TEXT_COLOUR,
    borderRadius: 20,
    height: responsiveHeight(4.5),
    width: responsiveWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabText: {
    fontWeight: "bold",
    color: APPCOLORS.WHITE,
  },
  numberText: {
    color: APPCOLORS.DARK_ORANGE,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    width: responsiveWidth(90),
    alignSelf: "center",
    marginTop: responsiveHeight(3),
  },
});
