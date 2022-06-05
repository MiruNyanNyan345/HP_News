import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

const TwitterScreen = () => {
  const navigation = useNavigation();

  const twitterAccounts = [
    {
      label: "モーニング娘。'22",
      url: 'https://twitter.com/MorningMusumeMg',
      username: 'MorningMusumeMg',
      icon: 'https://pbs.twimg.com/profile_images/1512747206377603073/U4CevP87_400x400.jpg',
      color: '#ff9ff3',
    },
    {
      label: '尾形春水',
      url: 'https://twitter.com/harunaogatajp',
      username: 'harunaogatajp',
      icon: 'https://pbs.twimg.com/profile_images/1412269919736000513/kNieTNC9_400x400.jpg',
      color: '#48dbfb',
    },
    {
      label: '飯窪春菜',
      url: 'https://twitter.com/haruna__iikubo',
      username: 'haruna__iikubo',
      icon: 'https://pbs.twimg.com/profile_images/1502116032659755009/qyNkvjV1_400x400.jpg',
      color: '#feca57',
    },
    {
      label: '工藤遥',
      url: 'https://twitter.com/Haruka_Kudo1027',
      username: 'Haruka_Kudo1027',
      icon: 'https://pbs.twimg.com/profile_images/1502110278070435849/RjSEL0-p_400x400.jpg',
      color: '#ff9f43',
    },
    {
      label: '道重さゆみ',
      url: 'https://twitter.com/tubuyakisayumin',
      username: 'tubuyakisayumin',
      icon: 'https://pbs.twimg.com/profile_images/1414760386239234050/h9lD-fk-_400x400.jpg',
      color: '#f368e0',
    },
    {
      label: '田中れいな',
      url: 'https://twitter.com/ganbareina11',
      username: 'tubuyakisayumin',
      icon: 'https://pbs.twimg.com/profile_images/1346836739621441536/0eP3NpgA_400x400.jpg',
      color: '#0abde3',
    },
  ];

  const loadTwitterTimeline = item => {
    navigation.navigate('WebsiteScreen', {url: item.url});
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <FlatList
          style={{width: '100%', height: '100%'}}
          data={twitterAccounts}
          // onEndReached={props.onEndLoadMore}
          onEndReachedThreshold={0}
          keyExtractor={item => item.label}
          renderItem={({item}) => (
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
              buttonBG_url={{uri: item.icon}}
              buttonBG_style={{width: '100%', height: '100%'}}
              buttonBG_img_style={{
                opacity: 0.5,
                height: 230, // the image height
                top: 1,
              }}
              buttonTextContainer={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonTextStyle={{
                // color: '#ee5253',
                color: 'black',
                fontWeight: '800',
                fontSize: 25,
              }}
              title={item.label}
              onPress={() => {
                loadTwitterTimeline({
                  url:
                    '<a class="twitter-timeline" href="' +
                    item.url +
                    '?ref_src=twsrc%5Etfw">' +
                    'Tweets by ' +
                    item.username +
                    '</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
                });
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
});

export default TwitterScreen;
