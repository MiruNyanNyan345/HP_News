import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomDropDownPicker from '../components/CustomDropDownPicker';
import CustomYoutubeVideoFlatList from '../components/CustomYoutubeVideoFlatList';
import CustomVideoModal from '../components/CustomVideoModal';
import json from '../res/mm_playlists.json';
import ChannelScreen from './ChannelScreen';

const VideosScreen = props => {
  // const [videoItems, setVideoItems] = useState(require());
  const videoItems = props.route.params.data
  const [videoModalVisible, showVideoModal] = useState(false);
  const [videoId, setVideoId] = useState('');

  // const initialFetchVideos = () => {
  //   const json = require('../mm_playlists.json');
  //   setVideoItems(json);
  // };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <CustomYoutubeVideoFlatList
          items={videoItems.items}
          videoType="mv"
          videoModalVisable={() => showVideoModal(true)}
          setVideoIdForVideoModal={id => setVideoId(id)}
        />
      </View>
      <CustomVideoModal
        videoModalVisible={videoModalVisible}
        videoId={videoId}
        showVideoModal={showVideoModal}
        containerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        playerHeight={200}
        playerWidth={350}
        modalAnimationType="slide"
        modalTransparent={true}
        closedButtonTitle={'Close'}
        closeButtonContainerStyle={{
          backgroundColor: 'rgb(128,20,255)',
          borderRadius: 10,
          height: 40,
          width: 100,
          overflow: 'hidden',
          margin: 5,
        }}
        closeButtonStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        closeButtonTextStyle={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
export default VideosScreen;
