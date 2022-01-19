import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomDropDownPicker from '../components/CustomDropDownPicker';
import CustomAmebloFlatList from '../components/CustomAmebloFlatList';
import {useNavigation} from '@react-navigation/native';

const AmebloScreen = () => {
  const navigation = useNavigation();
  const baseUrl = 'https://ameblo.jp/_api/blogEntries;';
  const [limit, setLimit] = useState(10);
  const [apiKey, setApiKey] = useState('');
  const [blogItems, setblogItems] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);

  const members = [
    {
      label: '道重さゆみ',
      value: 'amebaId=sayumimichishige-blog;blogId=10035291629',
    },
    {
      label: 'れいな',
      value: 'amebaId=tanakareina-blog;blogId=10012650381',
    },
    {
      label: "モーニング娘。'22 Q期",
      value: 'amebaId=morningmusume-9ki;blogId=10034661405',
    },
    {
      label: "モーニング娘。'22 天気組",
      value: 'amebaId=morningmusume-10ki;blogId=10034661412',
    },
    {
      label: '工藤遥',
      value: 'amebaId=kudo--haruka;blogId=10059477425',
    },
    {
      label: "モーニング娘。'22 12期",
      value: 'amebaId=mm-12ki;blogId=10049636311',
    },
    {
      label: 'モーニング娘。’22 13期・14期',
      value: 'amebaId=morningm-13ki;blogId=10057252278',
    },
    {
      label: 'モーニング娘。’22 15期',
      value: 'amebaId=morningmusume15ki;blogId=10061739702',
    },
  ];

  const loadBlogItems = key => {
    setApiKey(key.value);
    let url = baseUrl + key.value + `;limit=${5}`;
    fetch(url)
      .then(async res => {
        const data = await res.json();
        setblogItems(data.entities.entryMap);
        setLimit(10);
      })
      .catch(error => console.log(error));
  };

  const loadMore = () => {
    if (loadingMore) {
      return;
    }
    setLoadingMore(true);
    let url = baseUrl + apiKey + `;limit=${limit}`;
    fetch(url)
      .then(async res => {
        const data = await res.json();
        setblogItems(data.entities.entryMap);
        setLoadingMore(false);
        setLimit(5 + limit);
      })
      .catch(error => {
        console.log(error);
        setLoadingMore(false);
      });
  };

  const loadAmebloContent = item => {
    navigation.navigate('Website', {url: item.url});
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <CustomDropDownPicker
          height={40}
          width={300}
          items={members}
          labelColor={'#5f27cd'}
          labelSize={15}
          labelWeight={'bold'}
          backgroundColor={'white'}
          loadBlogItems={loadBlogItems}
          placeholder={'Pick a blog'}
        />
        <CustomAmebloFlatList
          items={blogItems}
          onEndLoadMore={loadMore}
          onLoadNewsContent={loadAmebloContent}
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

export default AmebloScreen;
