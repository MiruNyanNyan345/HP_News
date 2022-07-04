import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, RefreshControl} from 'react-native';
import rssParser from 'react-native-rss-parser';
import CustomNewsFlatList from '../components/CustomNewsFlatList';
import {useNavigation} from '@react-navigation/native';

const NewsScreen = props => {
  const navigation = useNavigation();
  const [loadingMore, setLoadingMore] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  let [refreshing, setRefreshing] = useState(false);
  let [pages, updatePages] = useState(1);

  const initialNewsItems = () => {
    updatePages(1);
    setNewsItems([]);
  };

  useEffect(() => {
    initialFetchPosts();
  }, []);

  const initialFetchPosts = () => {
    initialNewsItems();
    updatePages(1);
    fetch('https://hellopro.antenam.info/categories/all/page:' + pages + '.rss')
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(res => {
        let items = res.items;
        setNewsItems(items);
      });
  };

  const loadMore = () => {
    if (loadingMore) {
      return;
    }
    updatePages(++pages);
    setLoadingMore(true);
    fetch('http://hellopro.antenam.info/categories/all/page:' + pages + '.rss')
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(res => {
        setLoadingMore(false);
        setNewsItems([...newsItems, ...res.items]);
      });
  };

  const loadNewsContent = item => {
    navigation.navigate('NewsWebView', {
      url: {url: item.url},
      javaScriptEnabled: false,
    });
  };

  const doRefresh = () => {
    setRefreshing(true);
    initialFetchPosts();
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {/*<View style={styles.container}>*/}
      {/*<CustomButton*/}
      {/*  title="Load"*/}
      {/*  buttonColor="#f0d7d8"*/}
      {/*  buttonTextColor="#e5006c"*/}
      {/*onGetContent={getButtonHandler}*/}
      {/*/>*/}
      {/*</View>*/}
      <CustomNewsFlatList
        items={newsItems}
        onEndLoadMore={loadMore}
        onTopLoad={initialFetchPosts}
        onLoadNewsContent={loadNewsContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
});

export default NewsScreen;
