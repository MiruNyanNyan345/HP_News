import React, {useEffect, useState} from 'react';
import {Button, Modal, View, Text} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import CustomButton from './CustomButton';

const CustomVideoModal = props => {
  return (
    <Modal
      visible={props.videoModalVisible}
      animationType={props.modalAnimationType}
      transparent={props.modalTransparent}>
      <View style={props.containerStyle}>
        <YoutubePlayer
          height={props.playerHeight}
          width={props.playerWidth}
          videoId={props.videoId}
        />
        <CustomButton
          title={props.closedButtonTitle}
          onPress={() => props.showVideoModal(false)}
          buttonContainerStyle={props.closeButtonContainerStyle}
          buttonStyle={props.closeButtonStyle}
          buttonTextStyle={props.closeButtonTextStyle}
        />
      </View>
    </Modal>
  );
};

export default CustomVideoModal;
