import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomPostItem from '../components/CustomPostItem';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../redux/slices/authSlice';
import customAlertUserLogin from '../components/customAlertUserLogin';

// const data = [
//   {
//     id: 0,
//     title: 'Testing',
//     content:
//       'The website needs to be in English (accessible for everyone), German (main market) & Dutch (2de biggest market/fanbase). With Wordpress I face some difficulties. E.g. people need to upload in English and cannot do this in German or Dutch with the current theme on Wordpress.',
//     postUser: 'Tommy',
//     postTimeInterval: '5m ago',
//     commentCounts: '19',
//   },
//   {
//     id: 1,
//     title: 'Testing2',
//     content:
//       'The website needs to be in English (accessible for everyone), German (main market) & Dutch (2de biggest market/fanbase). With Wordpress I face some difficulties. E.g. people need to upload in English and cannot do this in German or Dutch with the current theme on Wordpress.',
//     postUser: 'Judy',
//     postTimeInterval: '1h ago',
//     commentCounts: '250',
//   },
//   {
//     id: 2,
//     title: 'Testing3',
//     content:
//       'The website needs to be in English (accessible for everyone), German (main market) & Dutch (2de biggest market/fanbase). With Wordpress I face some difficulties. E.g. people need to upload in English and cannot do this in German or Dutch with the current theme on Wordpress.',
//     postUser: 'Judy',
//     postTimeInterval: '2d ago',
//     commentCounts: '0',
//   },
// ];

const ForumScreen = props => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('http://127.0.0.1:8000/forum/post/get_posts/')
      .then(r => {
        return r.json();
      })
      .then(data => {
        setPosts(data);
        setIsFetching(false);
      })
      .catch(e => console.log(e));
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchPosts();
  };
  const makePost = () => {
    if (isLoggedIn) {
      props.navigation.navigate('MakePost');
    } else {
      customAlertUserLogin({navigation: navigation});
    }
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <CustomButton
        isIconBG={true}
        buttonContainerStyle={{
          flex: 1,
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 999,
        }}
        buttonIconName={'add-circle-outline'}
        buttonIconSize={50}
        buttonIconColor={'#ff6b6b'}
        onPress={() => {
          makePost();
        }}
      />

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        onRefresh={() => {
          onRefresh();
        }}
        refreshing={isFetching}
        renderItem={({index, item}) => (
          <CustomPostItem
            navigation={props.navigation}
            item={item}
            postItemStyle={{
              flex: 1,
              borderColor: '#ff6b6b',
              borderWidth: 1.5,
              borderRadius: 10,
              marginVertical: 10,
              marginHorizontal: 5,
              padding: 10,
            }}
            postHeaderContainer={{alignContent: 'center'}}
            postHeaderTextContainer={{flexDirection: 'row', marginLeft: 5}}
            postTitle={{fontWeight: '500', fontSize: 20}}
            postInfoText={{fontSize: 12, alignSelf: 'center'}}
            postInfoBullet={{
              fontSize: 15,
              alignSelf: 'center',
              marginHorizontal: 1,
            }}
            postContentPreview={{fontWeight: '200', fontSize: 12, margin: 5}}
            postActionContainer={{
              flexDirection: 'row',
              paddingTop: 5,
              borderTopWidth: 0.5,
            }}
            postBookmarkButton={{flexDirection: 'row'}}
            postCommentButton={{flexDirection: 'row', marginHorizontal: 20}}
            postVoteContainer={{
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'flex-end',
              flex: 1,
            }}
            onPress={() => {
              navigation.navigate('PostCommentsScreen');
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});

export default ForumScreen;
