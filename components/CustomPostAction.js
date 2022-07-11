import {Alert, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import alertUserLogin from '../services/alertUserLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HP_News_API_ADDRESS} from '../Constants';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../redux/slices/authSlice';
import {tokenExpired, verifyToken} from '../services/auth';

const styles = StyleSheet.create({
  postActionContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    borderTopWidth: 1,
    borderColor: '#c8d6e5',
  },
  postBookmarkButton: {flexDirection: 'row'},
  postCommentButton: {flexDirection: 'row', marginHorizontal: 20},
  postVoteContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export const CustomPostAction = props => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const [upVoteCnt, setUpVoteCnt] = useState(0);
  const [downVoteCnt, setDownVoteCnt] = useState(0);

  const [isPostSaved, setPostSaved] = useState(false);

  useEffect(() => {
    setVoteCnt(props.postItem.post_votes);
    setPostSaved(props.postItem.isSaved);
  }, []);

  const setVoteCnt = post_votes => {
    let upCnt = 0;
    let downCnt = 0;
    post_votes.map(item => {
      if (item.vote) {
        upCnt += 1;
      } else {
        downCnt += 1;
      }
      setUpVoteCnt(upCnt);
      setDownVoteCnt(downCnt);
    });
  };

  const vote = async (postID, voteType) => {
    if (!isLoggedIn) {
      alertUserLogin({navigation: props.navigation});
    } else {
      const tokenIsValid = await verifyToken();
      if (tokenIsValid) {
        const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
        fetch('http://' + HP_News_API_ADDRESS + '/forum/post/vote/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: 'JWT ' + access,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({post: postID, vote: voteType}),
        })
          .then(async r => {
            if (r.ok) {
              if (voteType) {
                setUpVoteCnt(upVoteCnt + 1);
              } else {
                setDownVoteCnt(downVoteCnt + 1);
              }
              Alert.alert('Vote Successfully', '');
            } else {
              const msg = await r.json();
              if (r.status === 400) {
                Object.keys(msg).forEach(key => {
                  Alert.alert(msg[key].toString());
                });
              } else {
                Alert.alert(JSON.stringify(msg));
              }
            }
          })
          .catch(e => console.log(e));
      } else {
        tokenExpired({dispatch: dispatch, navigation: props.navigation});
      }
    }
  };

  const savePost = async () => {
    if (!isLoggedIn) {
      alertUserLogin({navigation: props.navigation});
    } else {
      const tokenIsValid = await verifyToken();
      if (tokenIsValid) {
        const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
        fetch('http://' + HP_News_API_ADDRESS + '/forum/post/save_post/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: 'JWT ' + access,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({post: props.postItem.id}),
        })
          .then(async r => {
            return r.json();
          })
          .then(msg => {
            Alert.alert(msg, '', [
              {
                text: 'OK',
                // onPress: props.onRefresh,
                onPress: props.isPostScreen
                  ? props.onRefresh
                  : () => {
                      isPostSaved ? setPostSaved(false) : setPostSaved(true);
                    },
              },
            ]);
          })
          .catch(error => {
            console.log('Error: ' + error.message);
            Alert.alert('Error', error);
          });
      } else {
        tokenExpired({dispatch: dispatch, navigation: props.navigation});
      }
    }
  };

  return (
    <View style={styles.postActionContainer}>
      <TouchableOpacity
        style={styles.postBookmarkButton}
        onPress={() => {
          savePost();
        }}>
        {/*{props.postItem.isSaved ? (*/}

        {props.isPostScreen ? (
          props.postItem.isSaved ? (
            <Ionicons name={'bookmarks'} size={20} color={'#54a0ff'} />
          ) : (
            <Ionicons name={'bookmarks-outline'} size={20} color={'#54a0ff'} />
          )
        ) : isPostSaved ? (
          <Ionicons name={'bookmarks'} size={20} color={'#54a0ff'} />
        ) : (
          <Ionicons name={'bookmarks-outline'} size={20} color={'#54a0ff'} />
        )}

        <Text
          style={{
            alignSelf: 'center',
            marginLeft: 5,
            fontWeight: '500',
            color: '#54a0ff',
          }}>
          {props.isPostScreen
            ? props.postItem.isSaved
              ? 'Unsave'
              : 'Save'
            : isPostSaved
            ? 'Unsave'
            : 'Save'}
        </Text>
      </TouchableOpacity>
      {props.isPostScreen ? (
        <TouchableOpacity
          style={styles.postCommentButton}
          onPress={() => {
            props.navigation.navigate('Comments', {
              postItem: props.postItem,
            });
          }}>
          <Ionicons name={'chatbubble-outline'} size={20} color={'#10ac84'} />
          <View style={{justifyContent: 'center', marginHorizontal: 5}}>
            <Text style={{color: '#10ac84', fontSize: 15}}>Comments</Text>
          </View>
        </TouchableOpacity>
      ) : null}

      <View style={styles.postVoteContainer}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            vote(props.postItem.id, true);
          }}>
          <Ionicons name={'thumbs-up-outline'} size={20} color={'#f368e0'} />
          <View style={{justifyContent: 'center', marginHorizontal: 5}}>
            <Text style={{color: '#f368e0', fontSize: 15}}>{upVoteCnt}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            vote(props.postItem.id, false);
          }}>
          <View style={{justifyContent: 'center', marginHorizontal: 5}}>
            <Text style={{color: '#0abde3', fontSize: 15}}>{downVoteCnt}</Text>
          </View>
          <Ionicons name={'thumbs-down-outline'} size={20} color={'#0abde3'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
