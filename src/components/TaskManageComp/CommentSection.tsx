import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth } from '../../utils/Responsive';
import { APPCOLORS } from '../../utils/APPCOLORS';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppImages } from '../../assets/AppImages';
import { baseUrl, endPoints, errHandler } from '../../utils/Api_endPoints';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasksByEmployeeAction, getSingleTaskAction } from '../../redux/actions/MainActions';

function formatCustomDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'short' }); // "Sept"
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
}

const CommentSection = ({commentsData, taskData}) => {
  const [newComment, setNewComment] = useState('');
  const authState = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  // Function to add a new comment
  const addComment = async (employeeId, taskId) => {
    if(newComment){
      try {
       setIsLoading(true)
                  const res = await axios.post(`${baseUrl}${endPoints.addComments}`, {
                                 'taskId': taskId,
                                 'employeeId': employeeId,
                                 'text': newComment
                             });
 
                             if(res.data?.success){
                               setIsLoading(false)
                               dispatch(getSingleTaskAction(taskId))
                               dispatch(getAllTasksByEmployeeAction(employeeId))
                               setNewComment('')
                             }

             } catch (error) {
                 errHandler(error);
                 setIsLoading(false);
             }
    }else{
      Alert.alert('Comment is required');
    }
  };

  return (
    <View style={styles.container}>
      {/* Comment List */}
      <FlatList
        data={commentsData}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Image source={{ uri: `${baseUrl}/${item?.employeeId?.profileImage}` }} style={styles.avatar} />
            <View style={styles.commentContent}>
              <View style={styles.userInfo}>
                <Text style={styles.username}>{item?.employeeId?.firstName} {item?.employeeId?.lastName}</Text>
              <Text style={styles.time}>{formatCustomDate(new Date(item?.createdAt))}</Text>

              </View>
                <Text style={styles.designation}>{item?.employeeId?.designation}</Text>
              <Text style={styles.commentText}>{item?.text}</Text>
            </View>
          </View>
        )}
      />

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <Image source={AppImages.pfp} style={{width: 40, height: 40}} />
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
          multiline={true} // Allows multiple lines
          numberOfLines={3} // Defines visible lines
          textAlignVertical='top'
        />
        <View style={styles.btnContainer}>
        <TouchableOpacity disabled={isLoading} onPress={() => addComment(authState?.authData?.data?._id, taskData?._id)} style={styles.sendButton}>
         {isLoading ? <Text style={{color: '#fff'}}>Wait</Text> : <FontAwesome name="send" size={17} color="#fff" />}
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: '#fff',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    marginVertical: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  designation: {
    fontSize: 16,
    color: APPCOLORS.ClockInBg,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
    marginTop: responsiveHeight(1),
  },
  time: {
    fontSize: 12,
    color: '#777',
    alignSelf: 'flex-end',
    marginTop: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  input: {
    // flex: 1,
    padding: 10,
    paddingRight: responsiveWidth(27),  
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    width: responsiveWidth(72),
    height: responsiveHeight(10),
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  btnContainer:{
    position: 'absolute',
    right: 8,
    width: responsiveWidth(30),
    alignItems: 'flex-end',
  },
  sendButton: {
    backgroundColor: APPCOLORS.DARK_GRAY,
    borderRadius: 10,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentSection;
