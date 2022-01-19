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

const ChannelScreen = props => {
  const CHANNELS = [
    {
      label: 'Morning Musume 22',
      imageURL: require('../res/playlistIMG/morningmusume.jpeg'),
      playlistData: require('../res/mm_playlists.json'),
    },
    {
      label: 'ANGERME',
      imageURL: require('../res/playlistIMG/ANGERME.jpeg'),
      playlistData: require('../res/angerme_playlists.json'),
    },
    {
      label: 'Juice=Juice',
      imageURL: require('../res/playlistIMG/JuiceJuice.jpeg'),
      playlistData: require('../res/juicejuice_playlists.json'),
    },
    {
      label: 'Tsubaki Factory',
      imageURL: require('../res/playlistIMG/TsubakiFactory.jpeg'),
      playlistData: require('../res/tsubakifactory_playlists.json'),
    },
    {
      label: 'BEYOOOOONDS',
      imageURL: require('../res/playlistIMG/BEYOOOOONDS.jpeg'),
      playlistData: require('../res/BEYOOOOONDS_playlists.json'),
    },
  ];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.channelListContainer}>
        <FlatList
          style={{width: '100%', height: '100%'}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={CHANNELS}
          keyExtractor={item => item.label}
          horizontal={false}
          renderItem={({item, index}) => (
            <CustomButton
              isImageBG={true}
              buttonContainerStyle={{
                flex: 1,
              }}
              buttonStyle={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#fff',
                overflow: true,
                height: 150,
                margin: 5,
              }}
              buttonBG_url={item.imageURL}
              buttonBG_style={{width: '100%', height: '100%'}}
              buttonBG_img_style={{opacity: 0.35}}
              buttonTextContainer={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonTextStyle={{
                color: '#ee5253',
                fontWeight: '800',
                fontSize: 18,
              }}
              title={item.label}
              onPress={() => {
                // console.log('Test');
                navigation.navigate('Videos', {
                  data: item.playlistData,
                });
              }}
            />
          )}
          numColumns={2}
        />
      </View>
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
  channelListContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
});

export default ChannelScreen;
