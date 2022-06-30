import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {YoutubeChannels} from '../Constants';
import CustomMenu from '../components/CustomMenu';
import CustomYoutubeVideoFlatList from '../components/CustomYoutubeVideoFlatList';
import CustomVideoModal from '../components/CustomVideoModal';

const ChannelScreen = props => {
  const [playlistId, setPlaylistId] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [videoId, setVideoId] = useState('');

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.channelMenuContainer}>
          <CustomMenu
            items={YoutubeChannels}
            loadItems={setPlaylistId}
            isPlaylist={true}
          />
        </View>
        <CustomYoutubeVideoFlatList
          playlistId={playlistId}
          videoModalVisable={() => setModalVisible(true)}
          setVideoIdForVideoModal={id => setVideoId(id)}
        />
      </View>
      <CustomVideoModal
        videoModalVisible={modalVisible}
        videoId={videoId}
        showVideoModal={setModalVisible}
        containerStyle={styles.videoModalContainer}
        playerHeight={200}
        playerWidth={350}
        modalAnimationType="slide"
        modalTransparent={true}
        closedButtonTitle={'Close'}
        closeButtonContainerStyle={styles.modalCloseButtonContainer}
        closeButtonStyle={styles.modalCloseButton}
        closeButtonTextStyle={styles.modalCloseButtonText}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  channelMenuContainer: {
    margin: 10,
  },
  videoModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCloseButtonContainer: {
    backgroundColor: 'rgb(128,20,255)',
    borderRadius: 10,
    height: 40,
    width: 100,
    overflow: 'hidden',
    margin: 5,
  },
  modalCloseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ChannelScreen;
