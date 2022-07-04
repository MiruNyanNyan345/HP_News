import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alertUserLogin from '../services/alertUserLogin';
import {useNavigation} from '@react-navigation/native';
import {HP_News_API_ADDRESS} from '../Constants';
import {getDateDiff} from '../utils/util';
import {tokenExpired, verifyToken} from '../services/auth';

const CustomCommentItem = props => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [upVoteCnt, setUpVoteCnt] = useState(0);
  const [downVoteCnt, setDownVoteCnt] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();


  useEffect(() => {
    let upCnt = 0;
    let downCnt = 0;
    props.item.reply_votes.map(item => {
      if (item.vote) {
        upCnt += 1;
      } else {
        downCnt += 1;
      }
      setUpVoteCnt(upCnt);
      setDownVoteCnt(downCnt);
    });
  }, [props.item.reply_votes]);

  const vote = async (replyID, voteType) => {
    if (!isLoggedIn) {
      alertUserLogin({navigation: navigation});
    } else {
      const tokenIsValid = await verifyToken();
      if (tokenIsValid) {
        const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
        fetch('http://' + HP_News_API_ADDRESS + '/forum/post/vote_reply/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: 'JWT ' + access,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({reply: replyID, vote: voteType}),
        })
          .then(async r => {
            if (r.ok) {
              // if (voteType) {
              //   setUpVoteCnt(upVoteCnt + 1);
              // } else {
              //   setDownVoteCnt(downVoteCnt + 1);
              // }
              Alert.alert('Vote Successfully', '');
              props.onRefresh();
            } else {
              const msg = await r.json();
              Object.keys(msg).forEach(key => {
                Alert.alert(msg[key].toString());
              });
            }
          })
          .catch(e => console.log(e));
      } else {
        tokenExpired({dispatch: dispatch, navigation: props.navigation});
      }
    }
  };

  return (
    <View style={props.commentContainer}>
      <View style={props.commentBodyContainer}>
        <Text style={props.commentBody}>{props.item.body}</Text>
        <View style={props.commentInfoContainer}>
          <Text style={props.commentText}> by </Text>
          <Text style={props.commentUserNameText}>
            {props.item.author.username}
          </Text>
          <Text style={props.commentText}> posted </Text>
          <Text style={props.commentText}>
            {getDateDiff(props.item.datetime)}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flex: 1,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {
            vote(props.item.id, true);
          }}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Ionicons name={'caret-up-outline'} size={20} color={'#f368e0'} />
            </View>
            <View style={{marginHorizontal: 5}}>
              <Text style={{color: '#f368e0', fontSize: 15}}>{upVoteCnt}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {
            vote(props.item.id, false);
          }}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name={'caret-down-outline'} size={20} color={'#0abde3'} />
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Text style={{color: '#0abde3', fontSize: 15}}>
                {downVoteCnt}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomCommentItem;
