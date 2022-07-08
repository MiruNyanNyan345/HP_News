import React, {useEffect, useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
          isIconBG={true}
          buttonIconName={'close-outline'}
          buttonIconSize={35}
          buttonIconColor={'#fff'}
          onPress={() => {
            props.showVideoModal(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default CustomVideoModal;
