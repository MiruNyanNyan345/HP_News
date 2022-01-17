import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import CustomYoutubeVideoInfoItem from './CustomYoutubeVideoInfoItem';

const CustomYoutubeVideoFlatList = props => {
  const [thumbnailPressed, setThumbnailPressed] = useState([]);

  const clickThumbnail = index => {
    let item = [...thumbnailPressed];
    item[index] = item[index] === false;
    setThumbnailPressed(item);
  };

  const showModalVideoPlayer = videoId => {
    props.setVideoIdForVideoModal(videoId);
    props.videoModalVisable(true);
  };

  return (
    <FlatList
      data={props.items}
      keyExtractor={item => item.id}
      renderItem={({index, item}) => (
        <View
          style={{
            flex: 1,
            borderRadius: 25,
            overflow: 'hidden',
            margin: 15,
          }}>
          <CustomYoutubeVideoInfoItem
            disableOpacity={() => clickThumbnail(index)}
            enableModalVideoPlayer={() =>
              showModalVideoPlayer(item.snippet.resourceId.videoId)
            }
            videoType={props.videoType}
            videoThumbnail={item.snippet.thumbnails.standard.url}
            videoThumbnailStyle={{
              height: 150,
              width: '100%',
              opacity: thumbnailPressed[index] === false ? 1 : 0.25,
            }}
            channelTitle={
              thumbnailPressed[index] === false
                ? null
                : item.snippet.channelTitle
            }
            channelTitleStyle={{
              color: 'rgb(128,20,255)',
              fontWeight: 'bold',
              fontSize: 18,
            }}
            videoTitleContainerStyle={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            videoTitle={
              thumbnailPressed[index] === false ? null : item.snippet.title
            }
            videoTitleStyle={{
              color: 'rgb(255,20,147)',
              fontWeight: 'bold',
              fontSize: 22,
            }}
          />
        </View>
      )}
    />
  );
};

export default CustomYoutubeVideoFlatList;
