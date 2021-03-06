import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getDateDiff} from '../utils/util';
import {CustomPostAction} from './CustomPostAction';

const CustomPostItem = props => {
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
            <Text style={props.postInfoText}>by </Text>
            <Text style={props.postUserNameText}>
              {props.item.author.username}
            </Text>
            <Text style={props.postInfoText}>
              {' '}
              posted {getDateDiff(props.item.datetime)}{' '}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {CustomPostAction({
        onRefresh: props.onRefresh,
        isPostScreen: props.isPostScreen,
        postItem: props.item,
        navigation: props.navigation,
      })}
    </View>
  );
};

export default CustomPostItem;
