import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './CustomButton';

const CustomPostItem = props => {
  return (
    <TouchableOpacity style={props.postItemStyle} onPress={props.onPress}>
      <View style={props.postHeaderContainer}>
        <View style={props.postHeaderTextContainer}>
          <Text style={props.postTitle}>{props.item.title}</Text>
        </View>
        <View style={props.postHeaderTextContainer}>
          <Text style={props.postInfoText}>{props.item.postUser}</Text>
          <Text style={props.postInfoBullet}>&#8226;</Text>
          <Text style={props.postInfoText}>{props.item.postTimeInterval}</Text>
        </View>
      </View>
      <Text style={props.postContentPreview}>{props.item.content}</Text>
      <View style={props.postActionContainer}>
        <View style={props.postBookmarkContainer}>
          <CustomButton
            isIconBG={true}
            buttonIconName={'bookmarks-outline'}
            buttonIconSize={20}
            buttonIconColor={'#54a0ff'}
          />
          <Text
            style={{
              alignSelf: 'center',
              marginLeft: 5,
              fontWeight: '500',
              color: '#54a0ff',
            }}>
            Save
          </Text>
        </View>
        <View style={props.postCommentContainer}>
          <CustomButton
            isIconBG={true}
            buttonIconName={'chatbubble-outline'}
            buttonIconSize={20}
            buttonIconColor={'#10ac84'}
          />
          <View style={{justifyContent: 'center', marginHorizontal: 5}}>
            <Text style={{color: '#10ac84', fontSize: 15}}>Comments</Text>
          </View>
        </View>
        <View
          style={props.postVoteContainer}>
          <View style={{flexDirection: 'row'}}>
            <CustomButton
              isIconBG={true}
              buttonIconName={'thumbs-up-outline'}
              buttonIconSize={20}
              buttonIconColor={'#ee5253'}
            />
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Text style={{color: '#ee5253', fontSize: 15}}>10</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', marginHorizontal: 5}}>
              <Text style={{color: '#8395a7', fontSize: 15}}>20</Text>
            </View>
            <CustomButton
              isIconBG={true}
              buttonIconName={'thumbs-down-outline'}
              buttonIconSize={20}
              buttonIconColor={'#8395a7'}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomPostItem;
