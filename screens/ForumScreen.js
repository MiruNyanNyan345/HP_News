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
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../redux/slices/authSlice';
import alertUserLogin from '../services/alertUserLogin';
import {HP_News_API_ADDRESS} from '../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {tokenExpired, verifyToken} from '../services/auth';

const ForumScreen = props => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Posts');

  useEffect(() => {
    onRefresh();
    navigation.addListener('focus', () => {
      onRefresh();
    });
    navigation.setOptions({
      headerTitle: () => {
        return (
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => {
              headerTitle === 'Posts'
                ? isLoggedIn
                  ? setHeaderTitle('Saved Posts')
                  : setHeaderTitle('Posts')
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
  }, [headerTitle, isLoggedIn, navigation]);

  const fetchPosts = async () => {
    let headers;
    if (isLoggedIn) {
      const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
      headers = {
        Accept: 'application/json',
        Authorization: 'JWT ' + access,
        'Content-Type': 'application/json',
      };
    } else {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    fetch('http://' + HP_News_API_ADDRESS + '/forum/post/get_posts/', {
      method: 'GET',
      headers: headers,
    })
      .then(r => {
        return r.json();
      })
      .then(data => {
        setPosts(data);
        setSavedPosts(
          data.filter(i => {
            return i.isSaved === true;
          }),
        );
        setIsFetching(false);
      })
      .catch(e => console.log(e.message));
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchPosts();
  };

  const makePost = async () => {
    if (isLoggedIn) {
      const tokenIsValid = await verifyToken();
      if (tokenIsValid) {
        props.navigation.navigate('MakePost');
      } else {
        tokenExpired({dispatch: dispatch, navigation: navigation});
      }
    } else {
      alertUserLogin({navigation: navigation});
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
        data={headerTitle === 'Posts' ? posts : savedPosts}
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
            onRefresh={() => {
              onRefresh();
            }}
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
