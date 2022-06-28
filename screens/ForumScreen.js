import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomPostItem from '../components/CustomPostItem';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../redux/slices/authSlice';
import customAlertUserLogin from '../components/CustomAlertUserLogin';
import {HP_News_API_ADDRESS} from '../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForumScreen = props => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Posts');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => {
              headerTitle === 'Posts'
                ? setHeaderTitle('Saved Posts')
                : setHeaderTitle('Posts');
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 20,
                  color: '#fff',
                }}>
                {headerTitle}
              </Text>
              <Ionicons
                style={{paddingLeft: 5}}
                name={'chevron-down-outline'}
                size={20}
                color={'#fff'}
              />
            </View>
          </TouchableOpacity>
        );
      },
    });
    if (headerTitle === 'Posts') {
      fetchPosts();
    } else {
      fetchSavedPost();
    }
  }, [headerTitle, navigation]);

  const fetchPosts = () => {
    fetch('http://' + HP_News_API_ADDRESS + '/forum/post/get_posts/')
      .then(r => {
        return r.json();
      })
      .then(data => {
        setPosts(data);
        setIsFetching(false);
      })
      .catch(e => console.log(e));
  };

  const fetchSavedPost = async () => {
    const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
    fetch('http://' + HP_News_API_ADDRESS + '/forum/post/get_saved_posts/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'JWT ' + access,
        'Content-Type': 'application/json',
      },
    })
      .then(r => {
        return r.json();
      })
      .then(data => {
        setPosts(data);
        setIsFetching(false);
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  const onRefresh = () => {
    setIsFetching(true);
    headerTitle === 'Posts' ? fetchPosts() : fetchSavedPost();
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
            isPostScreen={true}
            itemType={'post'}
            navigation={props.navigation}
            item={item}
            postItemStyle={styles.postItem}
            postHeaderContainer={styles.postHeaderContainer}
            postHeaderTextContainer={styles.postHeaderTextContainer}
            postTitle={styles.postTitle}
            postInfoText={styles.postInfoText}
            postUserNameText={styles.postUserNameText}
            postBookmarkButton={styles.postBookmarkButton}
            postCommentButton={styles.postCommentButton}
            fetchSavedPost={fetchSavedPost}
            onPress={() => {
              navigation.navigate('Comments', {
                postItem: item,
              });
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
    backgroundColor: '#ffffff',
  },
  postItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 10,
  },
  postHeaderContainer: {alignContent: 'center', marginBottom: 10},
  postHeaderTextContainer: {flexDirection: 'row', marginLeft: 5},
  postTitle: {fontWeight: '400', fontSize: 18},
  postInfoText: {
    fontWeight: '200',
    fontSize: 13,
  },
  postUserNameText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ff6b6b',
  },
});

export default ForumScreen;
