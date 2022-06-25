import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomPostItem from '../components/CustomPostItem';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../redux/slices/authSlice';
import customAlertUserLogin from '../components/CustomAlertUserLogin';
import {HP_News_API_ADDRESS} from '../Constants';

const ForumScreen = props => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

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
