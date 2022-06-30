import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const CustomVideoModal = props => {
  return (
    <Modal
      visible={props.videoModalVisible}
      animationType={props.modalAnimationType}
      transparent={props.modalTransparent}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1}}
        onPress={() => {
          props.showVideoModal(false);
        }}>
        <View style={props.containerStyle}>
          <YoutubePlayer
            height={props.playerHeight}
            width={props.playerWidth}
            videoId={props.videoId}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomVideoModal;
