import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { responsiveHeight, responsiveWidth } from '../../utils/Responsive';
import { APPCOLORS } from '../../utils/APPCOLORS';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppImages } from '../../assets/AppImages';

const CommentSection = () => {
  const [comments, setComments] = useState([
    { id: '1', username: 'John Doe', designation: 'Software Engineer', text: 'Great post!', time: '28 Sept 2024 5:53 AM', avatar: 'https://i.pravatar.cc/50?img=1' },
    { id: '2', username: 'Jane Smith', designation: 'Product Manager', text: 'Nice article!', time: '29 Sept 2024 5:53 AM', avatar: 'https://i.pravatar.cc/50?img=2' },
  ]);
  const [newComment, setNewComment] = useState('');
  const flatListRef = useRef(null);

  // Function to add a new comment
  const addComment = () => {
    if (newComment.trim().length === 0) return;

    const newCommentObj = {
      id: Date.now().toString(),
      username: 'User ' + (comments.length + 1),
      designation: 'New Commenter', // You can set dynamic designations here
      text: newComment,
      time: new Date().toLocaleTimeString(),
      avatar: `https://i.pravatar.cc/50?img=${Math.floor(Math.random() * 50) + 1}`, // Random avatar
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');

    // Auto-scroll to the last comment
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.container}>
      {/* Comment List */}
      <FlatList
        ref={flatListRef}
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.commentContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.commentContent}>
              <View style={styles.userInfo}>
                <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.time}>{item.time}</Text>

              </View>
                <Text style={styles.designation}>{item.designation}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
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
          onChangeText={setNewComment}
          multiline={true} // Allows multiple lines
          numberOfLines={3} // Defines visible lines
        />
        <View style={styles.btnContainer}>
        <TouchableOpacity onPress={addComment} style={styles.sendButton}>
          <FontAwesome name="send" size={17} color="#fff" />
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
