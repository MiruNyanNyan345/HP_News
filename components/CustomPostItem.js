import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAlertUserLogin from './CustomAlertUserLogin';
import {useNavigation} from '@react-navigation/native';
import {HP_News_API_ADDRESS} from '../Constants';

const CustomPostItem = props => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [upVoteCnt, setUpVoteCnt] = useState(0);
  const [downVoteCnt, setDownVoteCnt] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    let upCnt = 0;
    let downCnt = 0;
    props.item.post_votes.map(item => {
      if (item.vote) {
        upCnt += 1;
      } else {
        downCnt += 1;
      }
      setUpVoteCnt(upCnt);
      setDownVoteCnt(downCnt);
    });
  }, [props.item.post_votes]);

  const getDateDiff = () => {
    const postTime = new Date(props.item.datetime).getTime();
    const currTime = new Date().getTime();
    const diff = new Date(currTime - postTime);
    const diff_days = Math.floor(diff / 1000 / 60 / (60 * 24));
    switch (true) {
      case diff_days > 0:
        return diff_days + ' Day(s) ago';
      case diff.getUTCHours() > 0:
        return diff.getHours() + ' Hour(s) ago';
      case diff.getUTCMinutes() > 0:
        return diff.getUTCMinutes() + ' Minute(s) ago';
      default:
        return diff.getUTCSeconds() + ' Seconds ago';
    }
  };

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

  return (
    <View style={props.postItemStyle}>
      <TouchableOpacity
        onPress={() => {
          props.onPress();
        }}>
        <View style={props.postHeaderContainer}>
          <View style={props.postHeaderTextContainer}>
            <Text style={props.postTitle}>{props.item.title}</Text>
          </View>
          <View style={props.postHeaderTextContainer}>
            <Text style={props.postInfoText}>{props.item.author.username}</Text>
            <Text style={props.postInfoBullet}>&#8226;</Text>
            <Text style={props.postInfoText}>{getDateDiff()}</Text>
          </View>
        </View>
        <Text style={props.postContentPreview}>{props.item.body}</Text>
      </TouchableOpacity>
      <View style={props.postActionContainer}>
        <TouchableOpacity
          style={props.postBookmarkButton}
          onPress={() => {
            console.log('save');
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
        <TouchableOpacity
          style={props.postCommentButton}
          onPress={() => {
            navigation.navigate('Comments', {post_id: props.item.id});
          }}>
          <Ionicons name={'chatbubble-outline'} size={20} color={'#10ac84'} />
          <View style={{justifyContent: 'center', marginHorizontal: 5}}>
            <Text style={{color: '#10ac84', fontSize: 15}}>Comments</Text>
          </View>
        </TouchableOpacity>
        <View style={props.postVoteContainer}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              vote(props.item.id, true);
            }}>
            <Ionicons name={'thumbs-up-outline'} size={20} color={'#ee5253'} />
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Text style={{color: '#ee5253', fontSize: 15}}>{upVoteCnt}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              vote(props.item.id, false);
            }}>
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Text style={{color: '#8395a7', fontSize: 15}}>
                {downVoteCnt}
              </Text>
            </View>
            <Ionicons
              name={'thumbs-down-outline'}
              size={20}
              color={'#8395a7'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomPostItem;
