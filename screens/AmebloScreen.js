import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomAmebloMenu from '../components/CustomAmebloMenu';
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
      profile_images:
        'https://stat.profile.ameba.jp/profile_images/20210802/15/6f/VG/j/o01500150p_1627884050350_8rj72.jpg',
    },
    {
      label: 'れいな',
      value: 'amebaId=tanakareina-blog;blogId=10012650381',
      profile_images:
        'https://stat.profile.ameba.jp/profile_images/20150610/19/ae/9z/p/o040004001433933919209.png',
    },
    {
      label: '工藤遥',
      value: 'amebaId=kudo--haruka;blogId=10059477425',
      profile_images:
        'https://stat.profile.ameba.jp/profile_images/20191028/10/a9/ZY/p/o01500150p_1572227974131_w2agf.png',
    },
    {
      label: '佐藤優樹',
      value: 'amebaId=masaki-sato-official;blogId=10064741231',
      profile_images:
        'https://stat.profile.ameba.jp/profile_images/20220420/12/cd/3D/j/o01500150p_1650425396394_jhhbu.jpg',
    },
    {
      label: 'MM Q期',
      value: 'amebaId=morningmusume-9ki;blogId=10034661405',
      profile_images:
        'https://stat.profile.ameba.jp/profile_images/20220413/18/e5/vR/j/o01500150p_1649842097536_7m0np.jpg',
    },
    {
      label: 'MM 天気組',
      value: 'amebaId=morningmusume-10ki;blogId=10034661412',
      profile_images:
        'https://stat.profile.ameba.jp/profile_images/20220413/18/cf/pB/j/o01500150p_1649842245589_bzntm.jpg?cat=120',
    },
    {
      label: 'MM 12期',
      value: 'amebaId=mm-12ki;blogId=10049636311',
      profile_images:
        'https://stat.profile.ameba.jp/profile_images/20220413/18/4d/IJ/j/o01500150p_1649841669276_frwzf.jpg?cat=120',
    },
    {
      label: 'MM 13期・14期',
      value: 'amebaId=morningm-13ki;blogId=10057252278',
      profile_images:
        'https://stat.profile.ameba.jp/profile_images/20220413/18/4e/du/j/o01500150p_1649841980430_zkcur.jpg?cat=120',
    },
    {
      label: 'MM 15期',
      value: 'amebaId=morningmusume15ki;blogId=10061739702',
      profile_images:
        'https://stat.profile.ameba.jp/profile_images/20220413/18/30/ZQ/j/o01500150p_1649842374651_xgiyb.jpg',
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
        <View style={styles.amebloMenuContainer}>
          <CustomAmebloMenu items={members} loadBlogItems={loadBlogItems} />
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
