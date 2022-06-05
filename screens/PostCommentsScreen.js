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
              backgroundColor: '#f5f2f5',
              flex: 1,
              borderRadius: 10,
              marginVertical: 10,
              marginHorizontal: 15,
              padding: 10,
            }}
            replyHeaderContainer={{alignContent: 'center'}}
            replyHeaderTextContainer={{flexDirection: 'row', marginLeft: 5}}
            replyBody={{fontWeight: '500', fontSize: 25}}
            replyInfoContainer={{flexDirection: 'column', marginLeft: 5}}
            replierNameText={{
              fontSize: 14,
              fontWeight: 'bold',
              alignSelf: 'flex-start',
            }}
            replyDateTimeText={{
              fontSize: 12,
              alignSelf: 'flex-start',
              fontWeight: '200',
            }}
            replyActionContainer={{
              marginLeft: 5,
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 5,
              borderTopWidth: 1,
              borderColor: '#ffffff',
            }}
            replyVoteContainer={{
              flexDirection: 'row',
              flexWrap: 'wrap',
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
    backgroundColor: '#ffffff',
  },
});

export default PostCommentsScreen;
