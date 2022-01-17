import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CustomYoutubeVideoInfoItem = props => {
  let title, channelTitle;

  if (props.videoType === 'mv') {
    let regExp = /\『(.+?)\』/g;
    if (props.channelTitle) {
      channelTitle = props.channelTitle;
    }
    if (props.videoTitle) {
      title = regExp.exec(props.videoTitle)[1];
    }
  } else {
    title = props.videoTitle;
  }

  return (
    <TouchableOpacity
      onPress={() => props.disableOpacity()}
      onLongPress={() => {
        // props.enableModalVideoPlayer();
        props.enableModalVideoPlayer();
      }}>
      <ImageBackground
        style={props.videoThumbnailStyle}
        source={{uri: props.videoThumbnail}}
      />
      <View style={props.videoTitleContainerStyle}>
        <Text style={props.channelTitleStyle}>{channelTitle}</Text>
        <Text style={props.videoTitleStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CustomYoutubeVideoInfoItem;
