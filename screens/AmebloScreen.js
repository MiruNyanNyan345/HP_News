import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomAmebloMenu from '../components/CustomAmebloMenu';
import CustomAmebloFlatList from '../components/CustomAmebloFlatList';
import {useNavigation} from '@react-navigation/native';
import {AmebloMemberInfo} from '../Constants';

const AmebloScreen = () => {
  const navigation = useNavigation();
  const baseUrl = 'https://ameblo.jp/_api/blogEntries;';
  const [limit, setLimit] = useState(10);
  const [apiKey, setApiKey] = useState('');
  const [blogItems, setblogItems] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);

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
        <View style={styles.amebloMenuContainer}>
          <CustomAmebloMenu
            items={AmebloMemberInfo}
            loadBlogItems={loadBlogItems}
          />
        </View>
        <View style={styles.amebloFlatListContainer}>
          <CustomAmebloFlatList
            items={blogItems}
            onEndLoadMore={loadMore}
            onLoadNewsContent={loadAmebloContent}
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
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  amebloMenuContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  amebloFlatListContainer: {
    flexDirection: 'row',
  },
});

export default AmebloScreen;
