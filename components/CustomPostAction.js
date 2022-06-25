import {Alert, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import customAlertUserLogin from './CustomAlertUserLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HP_News_API_ADDRESS} from '../Constants';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../redux/slices/authSlice';

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

export const CustomPostAction = (props, navigation) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [upVoteCnt, setUpVoteCnt] = useState(0);
  const [downVoteCnt, setDownVoteCnt] = useState(0);
  useEffect(() => {
    let upCnt = 0;
    let downCnt = 0;
    props.post_votes.map(item => {
      if (item.vote) {
        upCnt += 1;
      } else {
        downCnt += 1;
      }
      setUpVoteCnt(upCnt);
      setDownVoteCnt(downCnt);
    });
  }, [props.post_votes]);

  const vote = async (postID, voteType) => {
    if (!isLoggedIn) {
      customAlertUserLogin({navigation: navigation});
    } else {
      const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
      fetch('http:// ' + HP_News_API_ADDRESS + ' /forum/post/vote/', {
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
            const prob = await r.json();
            Alert.alert('Warning', prob.vote_error[0]);
          }
        })
        .catch(e => console.log(e));
    }
  };

  const savePost = postID => {
    if (!isLoggedIn) {
      customAlertUserLogin({navigation: navigation});
    } else {
      console.log('save ' + postID + ' post');
    }
  };

  return (
    <View style={styles.postActionContainer}>
      <TouchableOpacity
        style={styles.postBookmarkButton}
        onPress={() => {
          savePost(props.itemID);
        }}>
        <Ionicons name={'bookmarks-outline'} size={20} color={'#54a0ff'} />
        <Text
          style={{
            alignSelf: 'center',
            marginLeft: 5,
            fontWeight: '500',
            color: '#54a0ff',
          }}>
          Save
        </Text>
      </TouchableOpacity>
      {props.isPostScreen ? (
        <TouchableOpacity
          style={styles.postCommentButton}
          onPress={() => {
            navigation.navigate('Comments', {
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
            vote(props.itemID, true);
          }}>
          <Ionicons name={'thumbs-up-outline'} size={20} color={'#f368e0'} />
          <View style={{justifyContent: 'center', marginHorizontal: 5}}>
            <Text style={{color: '#f368e0', fontSize: 15}}>{upVoteCnt}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            vote(props.itemID, false);
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