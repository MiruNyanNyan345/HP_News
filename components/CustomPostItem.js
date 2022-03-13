import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../redux/slices/authSlice';

const CustomPostItem = props => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const getDateDiff = () => {
    const postTime = new Date(props.item.datetime).getTime();
    const currTime = new Date().getTime();
    const diff = new Date(currTime - postTime);
    const diff_days = Math.floor(diff / 1000 / 60 / (60 * 24));
    switch (true) {
      case diff_days > 0:
        return diff_days + ' Day(s) ago';
      case diff.getHours() > 0:
        return diff.getHours() + ' Hour(s) ago';
      case diff.getMinutes() > 0:
        return diff.getHours() + ' Minute(s) ago';
      default:
        return diff.getSeconds() + ' Seconds ago';
    }
  };
  const getVoteCount = voteType => {
    if (voteType) {
      let upVoteCnt = 0;
      props.item.post_votes.map(item => {
        if (item.vote) {
          upVoteCnt += 1;
        }
      });
      return upVoteCnt;
    } else {
      let downVoteCnt = 0;
      props.item.post_votes.map(item => {
        if (!item.vote) {
          downVoteCnt += 1;
        }
      });
      return downVoteCnt;
    }
  };

  const vote = voteType => {
    if (!isLoggedIn) {
      Alert.alert(
        'Please Login First',
        '',
        [
          {
            text: 'Ok',
            onPress: () => {
              props.navigation.navigate('Home');
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    }
  };
  return (
    <View style={props.postItemStyle}>
      <TouchableOpacity
        onPress={() => {
          console.log('On Press');
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
        <TouchableOpacity style={props.postCommentButton}>
          <Ionicons name={'chatbubble-outline'} size={20} color={'#10ac84'} />
          <View style={{justifyContent: 'center', marginHorizontal: 5}}>
            <Text style={{color: '#10ac84', fontSize: 15}}>Comments</Text>
          </View>
        </TouchableOpacity>
        <View style={props.postVoteContainer}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              vote(true);
            }}>
            <Ionicons name={'thumbs-up-outline'} size={20} color={'#ee5253'} />
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Text style={{color: '#ee5253', fontSize: 15}}>
                {getVoteCount(true)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              vote(false);
            }}>
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Text style={{color: '#8395a7', fontSize: 15}}>
                {getVoteCount(false)}
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
