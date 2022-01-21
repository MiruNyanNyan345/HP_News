import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomPostItem = props => {
  return (
    <View style={props.postItemStyle}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={props.postHeaderContainer}>
          <View style={props.postHeaderTextContainer}>
            <Text style={props.postTitle}>{props.item.title}</Text>
          </View>
          <View style={props.postHeaderTextContainer}>
            <Text style={props.postInfoText}>{props.item.postUser}</Text>
            <Text style={props.postInfoBullet}>&#8226;</Text>
            <Text style={props.postInfoText}>
              {props.item.postTimeInterval}
            </Text>
          </View>
        </View>
        <Text style={props.postContentPreview}>{props.item.content}</Text>
      </TouchableOpacity>
      <View style={props.postActionContainer}>
        <TouchableOpacity style={props.postBookmarkButton}>
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
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Ionicons name={'thumbs-up-outline'} size={20} color={'#ee5253'} />
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Text style={{color: '#ee5253', fontSize: 15}}>10</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Text style={{color: '#8395a7', fontSize: 15}}>20</Text>
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
