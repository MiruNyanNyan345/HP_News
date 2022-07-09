import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomCommentItem from '../components/CustomCommentItem';
import {HP_News_API_ADDRESS} from '../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDateDiff} from '../utils/util';
import {CustomPostAction} from '../components/CustomPostAction';
import alertUserLogin from '../services/alertUserLogin';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {tokenExpired, verifyToken} from '../services/auth';

const CommentsScreen = ({route, navigation}) => {
  const post_id = route.params.postItem.id;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [replies, setReplies] = useState([]);
  const [replyBody, setReplyBody] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('focus', () => {
      onRefresh();
    });
  }, [navigation]);

  const fetchComments = () => {
    fetch(
      'http://' +
        HP_News_API_ADDRESS +
        '/forum/post/get_replies/?post_id=' +
        post_id,
    )
      .then(r => {
        return r.json();
      })
      .then(data => {
        setReplies(data);
        setIsFetching(false);
      })
      .catch(e => {
        console.log('Error:', e.message);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: route.params.postItem.title,
    });
    fetchComments();
  }, []);

  const replyPost = async () => {
    if (replyBody.length < 1) {
      Alert.alert('Please leave your comment.');
    } else {
      if (isLoggedIn) {
        const tokenIsValid = await verifyToken();
        if (tokenIsValid) {
          const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
          fetch('http://' + HP_News_API_ADDRESS + '/forum/post/reply/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: 'JWT ' + access,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              post: route.params.postItem.id,
              body: replyBody,
            }),
          })
            .then(async r => {
              const resText = await r.json();
              Alert.alert(resText, '', [
                {
                  text: 'OK',
                  onPress: () => {
                    fetchComments();
                  },
                },
              ]);
            })
            .catch(error => {
              const err_msg = error.message;
              console.log('Error: ' + err_msg);
              Alert.alert(err_msg);
            });
        } else {
          tokenExpired({dispatch: dispatch, navigation: navigation});
        }
      } else {
        alertUserLogin({navigation: navigation});
      }
    }
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchComments();
  };

  const postItem = (
    <View style={styles.postContainer}>
      <View style={styles.postHeaderContainer}>
        <View style={styles.postTitleContainer}>
          <Text style={styles.postTitle}>{route.params.postItem.title}</Text>
        </View>
        <View style={styles.postInfoContainer}>
          <Text style={styles.postInfoText}>by </Text>
          <Text style={styles.postUserNameText}>
            {route.params.postItem.author.username}
          </Text>
          <Text style={styles.postInfoText}>
            {' '}
            posted {getDateDiff(route.params.postItem.datetime)}{' '}
          </Text>
        </View>
      </View>
      <View style={styles.postBodyContainer}>
        <Text style={styles.postBody}>{route.params.postItem.body}</Text>
      </View>
      <View style={styles.postActionContainer}>
        {CustomPostAction(
          {
            post_votes: route.params.postItem.post_votes,
            isPostScreen: false,
            postItem: route.params.postItem,
            itemID: route.params.postItem.id,
            navigation: navigation,
          },
          navigation,
        )}
      </View>
    </View>
  );

  // return replies.length < 1 ? (
  //   <SafeAreaView style={styles.safeView}>
  //     {postItem}
  //     <View style={styles.emptyCommentView}>
  //       <Ionicons name={'chatbox-outline'} size={70} color={'#ff6b6b'} />
  //       <Text>No comment yet.</Text>
  //     </View>
  //     <View style={styles.inputContainer}>
  //       <View style={styles.inputFieldContainer}>
  //         <TextInput
  //           style={styles.inputField}
  //           placeholder={'Leave comment here.'}
  //           placeholderTextColor={'#8395a7'}
  //         />
  //       </View>
  //       <CustomButton
  //         buttonContainerStyle={styles.buttonContainer}
  //         buttonStyle={styles.button}
  //         buttonTextStyle={styles.buttonText}
  //         title={'Send'}
  //         onPress={() => {
  //           console.log('send');
  //         }}
  //       />
  //     </View>
  //   </SafeAreaView>
  // ) : (

  return (
    <SafeAreaView style={styles.safeView}>
      {postItem}
      <FlatList
        data={replies}
        keyExtractor={item => item.id}
        onRefresh={() => {
          onRefresh();
        }}
        refreshing={isFetching}
        renderItem={({index, item}) => (
          <CustomCommentItem
            itemType={'reply'}
            item={item}
            onRefresh={onRefresh}
            commentContainer={styles.commentContainer}
            commentBodyContainer={styles.commentBodyContainer}
            commentBody={styles.commentBody}
            commentInfoContainer={styles.commentInfoContainer}
            commentUserNameText={styles.commentUserNameText}
            commentText={styles.commentText}
            commentActionContainer={styles.commentActionContainer}
          />
        )}
      />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
        <View style={styles.inputContainer}>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={'Leave comment here.'}
              placeholderTextColor={'#8395a7'}
              onChangeText={body => {
                setReplyBody(body);
              }}
            />
          </View>
          <CustomButton
            buttonContainerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            buttonTextStyle={styles.buttonText}
            title={'Send'}
            onPress={() => {
              replyPost();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  // );
};
const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  emptyCommentView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputFieldContainer: {
    backgroundColor: '#ffffff',
    margin: 10,
    paddingLeft: 5,
    borderRadius: 10,
    height: 50,
    flex: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#8395a7',
  },
  buttonContainer: {
    marginRight: 5,
    height: 50,
    borderRadius: 15,
    borderColor: 'black',
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    backgroundColor: '#2e86de',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  commentContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  commentBodyContainer: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  commentBody: {fontWeight: '400', fontSize: 18},
  commentInfoContainer: {
    flexDirection: 'row',
  },
  commentUserNameText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  commentText: {
    fontSize: 13,
    fontWeight: '200',
  },
  commentActionContainer: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 1,
    borderColor: '#ffffff',
  },
  postContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  postHeaderContainer: {
    alignContent: 'center',
    flexDirection: 'column',
  },
  postTitleContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#ffd32a',
    paddingLeft: 10,
  },
  postTitle: {fontWeight: '600', fontSize: 25, color: '#ffffff'},
  postBodyContainer: {paddingHorizontal: 10, marginBottom: 10},
  postBody: {fontWeight: '300', fontSize: 17},
  postInfoContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  postInfoText: {
    fontWeight: '200',
    fontSize: 13,
  },
  postUserNameText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  postActionContainer: {
    padding: 10,
  },
});

export default CommentsScreen;
