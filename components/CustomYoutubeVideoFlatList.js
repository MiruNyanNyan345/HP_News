import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import CustomYoutubeVideoInfoItem from './CustomYoutubeVideoInfoItem';
import {HP_News_API_ADDRESS, YOUTUBE_API_KEY} from '../Constants';

const CustomYoutubeVideoFlatList = props => {
  const [thumbnailPressed, setThumbnailPressed] = useState([]);
  const [playlistItems, setPlayListItems] = useState({});

  useEffect(() => {
    fetch(
      'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&playlistId=' +
        props.playlistId +
        '&key=' +
        YOUTUBE_API_KEY +
        '&maxResults=20',
      {
        method: 'GET',
      },
    )
      .then(r => {
        return r.json();
      })
      .then(data => {
        setPlayListItems(data.items);
      })
      .catch(error => {
        Alert.alert(error);
      });
  }, [props.playlistId]);

  const clickThumbnail = index => {
    let item = [...thumbnailPressed];
    item[index] = item[index] === false;
    setThumbnailPressed(item);
  };

  const showModalVideoPlayer = videoId => {
    props.setVideoIdForVideoModal(videoId);
    props.videoModalVisable(true);
  };

  const getTitleText = t => {
    if (t.match('「(.*?)」')) {
      return t.match('「(.*?)」')[1];
    } else if (t.match('『(.*?)』')) {
      return t.match('『(.*?)』')[1];
    } else {
      return t;
    }
  };

  return (
    <FlatList
      data={playlistItems}
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
            videoThumbnail={item.snippet.thumbnails.high.url}
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
              fontSize: 10,
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
              thumbnailPressed[index] === false
                ? null
                : item.snippet.channelTitle +
                  '\n' +
                  getTitleText(item.snippet.title)
            }
            videoTitleStyle={{
              color: 'rgb(255,20,147)',
              fontWeight: 'bold',
              fontSize: 15,
              textAlign: 'center',
            }}
          />
        </View>
      )}
    />
  );
};

export default CustomYoutubeVideoFlatList;
