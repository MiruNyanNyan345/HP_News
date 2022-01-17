import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CustomTwitterFlatList from '../components/CustomTwitterFlatList';
import {useNavigation} from '@react-navigation/native';

const TwitterScreen = () => {
  const navigation = useNavigation();

  const twitterAccounts = [
    {
      label: "モーニング娘。'21マネージャー",
      url: 'https://twitter.com/MorningMusumeMg',
      username: 'MorningMusumeMg',
      icon:
        'https://pbs.twimg.com/profile_images/1344661335720660995/UFBe04lW_400x400.jpg',
      color: '#f0d7d8',
    },
    {
      label: '飯窪春菜/IIKUBO HARUNA',
      url: 'https://twitter.com/haruna__iikubo',
      username: 'haruna__iikubo',
      icon:
        'https://pbs.twimg.com/profile_images/1074474767963439107/mxEGJ4FG_400x400.jpg',
      color: '#FFF33F',
    },
    {
      label: '尾形春水/はーちん',
      url: 'https://twitter.com/harunaogatajp',
      username: 'harunaogatajp',
      icon:
        'https://pbs.twimg.com/profile_images/1412269919736000513/kNieTNC9_400x400.jpg',
      color: '#56bed9',
    },
    {
      label: '工藤 遥',
      url: 'https://twitter.com/Haruka_Kudo1027',
      username: 'Haruka_Kudo1027',
      icon:
        'https://pbs.twimg.com/profile_images/1295374001817055235/G_cOtVth_400x400.jpg',
      color: '#ffa500',
    },
    {
      label: '道重さゆみ',
      url: 'https://twitter.com/tubuyakisayumin',
      username: 'tubuyakisayumin',
      icon:
        'https://pbs.twimg.com/profile_images/1414760386239234050/h9lD-fk-_400x400.jpg',
      color: '#ffb6c1',
    },
    {
      label: '田中れいな 公式',
      url: 'https://twitter.com/ganbareina11',
      username: 'tubuyakisayumin',
      icon:
        'https://pbs.twimg.com/profile_images/1346836739621441536/0eP3NpgA_400x400.jpg',
      color: '#80C5DE',
    },
  ];

  const loadTwitterTimeline = (item) => {
    navigation.navigate('Website', {url: item.url});
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <CustomTwitterFlatList
          items={twitterAccounts}
          listItem_style={{margin: 10, borderRadius: 20, overflow: 'hidden'}}
          onloadTimeline={loadTwitterTimeline}
          labelStyle={{color: 'black', fontWeight: '800'}}
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
