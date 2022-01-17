import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomDropDownPicker from '../components/CustomDropDownPicker';
import CustomYoutubeVideoFlatList from '../components/CustomYoutubeVideoFlatList';
import YoutubePlayer from 'react-native-youtube-iframe';
import CustomVideoModal from '../components/CustomVideoModal';

const YoutubeScreen = props => {
  const CHANNELS = [
    {
      label: 'モーニング娘。 Music Video',
      value: 'PLAAEA82D2950BC77D',
    },
  ];
  const PLAYLIST_ID = 'PLAAEA82D2950BC77D';
  const API_KEY = 'AIzaSyAJ7xP9SfUisfv60auxOtwxoMBW524giGo';
  const MAX_RESULTS = 10;

  const [videoItems, setVideoItems] = useState({});
  const [videoModalVisible, showVideoModal] = useState(false);
  const [videoId, setVideoId] = useState('');

  // const initialFetchVideos = () => {
  //   fetch(
  //     'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&' +
  //       'playlistId=' +
  //       PLAYLIST_ID +
  //       '&' +
  //       'key=' +
  //       API_KEY +
  //       '&' +
  //       'maxResults=' +
  //       MAX_RESULTS,
  //   )
  //     .then(async (response) => {
  //       const jsonData = await response.json();
  //       setVideoItems(jsonData);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const initialFetchVideos = () => {
    const json = require('../test.json');
    setVideoItems(json);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.dropdownContainer}>
        <CustomDropDownPicker
          height={50}
          width={300}
          items={CHANNELS}
          labelColor={'#000000'}
          labelSize={15}
          labelWeight={'bold'}
          backgroundColor={'white'}
          loadBlogItems={initialFetchVideos}
          placeholder={'Pick Videos List'}
        />
      </View>

      <View style={styles.container}>
        <CustomYoutubeVideoFlatList
          items={videoItems.items}
          videoType="mv"
          videoModalVisable={() => showVideoModal()}
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
  dropdownContainer: {
    alignItems: 'center',
    padding: 5,
    zIndex: 100,
  },
  container: {
    flex: 1,
  },
});

export default YoutubeScreen;
