import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomPostItem from '../components/CustomPostItem';
import {NavigationActions as navigation} from 'react-navigation';
import CustomCommentItem from '../components/CustomCommentItem';
import {HP_News_API_ADDRESS} from '../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostCommentsScreen = ({route, navigation}) => {
  const post_id = route.params.post_id;

  const [replies, setReplies] = useState([]);

  const fetchComments = () => {
    fetch(
      'http://' +
        HP_News_API_ADDRESS +
        '/forum/post/get_replies/?post_id=' +
        post_id,
    )
      .then(r => {
        return r.json();
      })
      .then(data => {
        setReplies(data);
      })
      .catch(e => console.log('Error:', e));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return replies.length < 1 ? (
    <SafeAreaView style={styles.safeView}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Ionicons name={'chatbox-outline'} size={70} color={'#ff6b6b'} />
        <Text>No comment yet.</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            paddingTop: 15,
            paddingLeft: 10,
            backgroundColor: '#ffffff',
            margin: 10,
            borderRadius: 10,
            height: 50,
            alignItems: 'flex-start',
            flex: 1,
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1,
            },
          }}>
          <TextInput
            style={{fontSize: 16, fontWeight: '300', color: '#8395a7'}}
            placeholder={'Leave comment here.'}
            placeholderTextColor={'#8395a7'}
          />
        </View>
        <CustomButton
          buttonContainerStyle={{
            marginRight: 5,
            height: 50,
            borderRadius: 15,
            borderColor: 'black',
            overflow: 'hidden',
          }}
          buttonStyle={{
            flex: 1,
            backgroundColor: '#2e86de',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
          buttonTextStyle={{
            color: '#ffffff',
            fontWeight: '600',
          }}
          title={'Send'}
          onPress={() => {
            console.log('send');
          }}
        />
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.safeView}>
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
            replyHeaderTextContainer={{
              flexDirection: 'row',
              marginLeft: 5,
            }}
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            paddingTop: 15,
            paddingLeft: 10,
            backgroundColor: '#ffffff',
            margin: 10,
            borderRadius: 10,
            height: 50,
            alignItems: 'flex-start',
            flex: 1,
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1,
            },
          }}>
          <TextInput
            style={{fontSize: 16, fontWeight: '300', color: '#8395a7'}}
            placeholder={'Leave comment here.'}
            placeholderTextColor={'#8395a7'}
          />
        </View>
        <CustomButton
          buttonContainerStyle={{
            marginRight: 5,
            height: 50,
            borderRadius: 15,
            borderColor: 'black',
            overflow: 'hidden',
          }}
          buttonStyle={{
            flex: 1,
            backgroundColor: '#2e86de',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
          buttonTextStyle={{
            color: '#ffffff',
            fontWeight: '600',
          }}
          title={'Send'}
          onPress={() => {
            console.log('send');
          }}
        />
      </View>
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
