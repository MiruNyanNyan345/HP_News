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
  return (
    <TouchableOpacity
      onPress={() => props.disableOpacity()}
      onLongPress={() => {
        props.enableModalVideoPlayer();
      }}>
      <ImageBackground
        style={props.videoThumbnailStyle}
        source={{uri: props.videoThumbnail}}
      />
      <View style={props.videoTitleContainerStyle}>
        <Text style={props.videoTitleStyle}>{props.videoTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CustomYoutubeVideoInfoItem;
