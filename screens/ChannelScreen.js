import React, {useState} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {YoutubeChannels} from '../Constants';
import {Avatar} from 'react-native-elements';
import CustomMenu from '../components/CustomMenu';

const ChannelScreen = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.channelMenuContainer}>
          <CustomMenu
            items={YoutubeChannels}
            loadItems={() => console.log('test')}
            // loadBlogItems={loadBlogItems}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  channelMenuContainer: {
    margin: 10,
  },
});

export default ChannelScreen;
