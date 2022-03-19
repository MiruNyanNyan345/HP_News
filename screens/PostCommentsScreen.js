import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomPostItem from '../components/CustomPostItem';
import {NavigationActions as navigation} from 'react-navigation';
import CustomCommentItem from '../components/CustomCommentItem';

const PostCommentsScreen = ({route, navigation}) => {
  const post_id = route.params.post_id;
  const [replies, setReplies] = useState(null);
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    fetch('http://127.0.0.1:8000/forum/post/get_replies/?post_id=' + post_id)
      .then(r => {
        return r.json();
      })
      .then(data => {
        setReplies(data);
      })
      .catch(e => console.log('Error:', e));
  };

  // Used to change the header title
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
        buttonIconName={'chatbox-outline'}
        buttonIconSize={50}
        buttonIconColor={'#ff6b6b'}
        onPress={() => {
          console.log('Added Reply');
        }}
      />
      <FlatList
        data={replies}
        keyExtractor={item => item.id}
        renderItem={({index, item}) => (
          <CustomCommentItem
            itemType={'reply'}
            item={item}
            replyItemStyle={{
              flex: 1,
              borderColor: '#ff6b6b',
              borderWidth: 1.5,
              borderRadius: 10,
              marginVertical: 10,
              marginHorizontal: 5,
              padding: 10,
            }}
            replyHeaderContainer={{alignContent: 'center'}}
            replyHeaderTextContainer={{flexDirection: 'row', marginLeft: 5}}
            replyBody={{fontWeight: '500', fontSize: 20}}
            replyInfoText={{fontSize: 12, alignSelf: 'center'}}
            replyInfoBullet={{
              fontSize: 15,
              alignSelf: 'center',
              marginHorizontal: 1,
            }}
            replyActionContainer={{
              flexDirection: 'row',
              paddingTop: 5,
              borderTopWidth: 0.5,
            }}
            replyVoteContainer={{
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'flex-end',
              flex: 1,
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

export default PostCommentsScreen;
