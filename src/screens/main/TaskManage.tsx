import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive';
import {APPCOLORS} from '../../utils/APPCOLORS';
import {BoldText, NormalText} from '../../components/DailyUse/AppText/AppText';
import {AppImages} from '../../assets/AppImages';
import WhiteContainers from '../../components/WhiteContainers';
import BannerBoxes from '../../components/TaskManageComp/BannerBoxes';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import TaskCard from '../../components/HomeComp/TaskCard';

const tasks = [
  {
    id: '1',
    title: 'Complete UI Design',
    status: 'In Progress',
    priority: 'High',
    dueDate: '27 April',
    comments: '2',
  },
  {
    id: '2',
    title: 'Fix Backend API',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '28 April',
    comments: '5',
  },
  {
    id: '3',
    title: 'Write Unit Tests',
    status: 'Completed',
    priority: 'Low',
    dueDate: '30 April',
    comments: '1',
  },
  {
    id: '4',
    title: 'Deploy to Staging',
    status: 'In Progress',
    priority: 'Critical',
    dueDate: '1 May',
    comments: '3',
  },
];


const TaskManage = () => {
  return (
    <View style={styles.container}>
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
              title="My Jobs "
              fontSize={3}
              txtColour={APPCOLORS.WHITE}
            />
            <BoldText
              title="Let’s tackle your to do list"
              fontSize={2}
              txtColour={'#D9D6FE'}
            />
          </View>
          <Image
            source={AppImages.board}
            style={{
              height: responsiveHeight(15),
              width: responsiveWidth(15),
              resizeMode: 'contain',
            }}
          />
        </View>
        <WhiteContainers>
          <View style={{width: responsiveWidth(85)}}>
            <BoldText title="Summary of Your Work" fontSize={2} />
            <NormalText title="Your current task progress" fontSize={2} />

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-between',
                width: responsiveWidth(80),
                marginTop: 10,
              }}>
              <BannerBoxes
                cardType="To Do"
                number={5}
                bgColor={APPCOLORS.ICON_TEXT_COLOUR}
                icon={
                  <Entypo
                    name={'code'}
                    size={responsiveFontSize(1.2)}
                    color={APPCOLORS.WHITE}
                  />
                }
              />
              <BannerBoxes
                cardType="In Progress"
                number={2}
                bgColor={APPCOLORS.DARK_ORANGE}
                icon={
                  <Ionicons
                    name={'time-outline'}
                    size={responsiveFontSize(1.2)}
                    color={APPCOLORS.WHITE}
                  />
                }
              />
              <BannerBoxes
                cardType="Done"
                number={1}
                bgColor={APPCOLORS.DARK_GRAY}
                icon={
                  <Entypo
                    name={'check'}
                    size={responsiveFontSize(1.2)}
                    color={APPCOLORS.WHITE}
                  />
                }
              />
            </View>
          </View>
        </WhiteContainers>
      </View>

      {/* FlatList Section */}
      <View style={styles.listContainer}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{gap: 20, paddingBottom: 20}}
          renderItem={({item}) => {
            return <TaskCard title={item.title} status={item.status} priority={item.priority} dueDate={item.dueDate} comments={item.comments} />;
          }}
        />
      </View>
    </View>
  );
};

export default TaskManage;

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
