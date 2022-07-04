import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HP_News_API_ADDRESS} from '../Constants';

const MakePostScreen = props => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const post = async () => {
    const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
    fetch('http://' + HP_News_API_ADDRESS + '/forum/post/make/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'JWT ' + access,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: postTitle, body: postContent}),
    })
      .then(async r => {
        const rObj = await r.json();
        Object.keys(rObj).forEach(k => {
          Alert.alert(k.toUpperCase(), rObj[k]);
        });
        if (r.status == 201) {
          props.navigation.navigate('Posts');
        }
      })
      .catch(error => {
        const err_msg = error.message;
        console.log('Error: ' + err_msg);
      });
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <TextInput
        style={styles.titleInput}
        placeholder={'Title'}
        placeholderTextColor={'#222f3e'}
        onChangeText={title => {
          setPostTitle(title);
        }}
      />
      <TextInput
        style={styles.contentInput}
        placeholder={'Write here...'}
        multiline={true}
        placeholderTextColor={'#222f3e'}
        onChangeText={content => {
          setPostContent(content);
        }}
      />
      <View style={styles.btnContainer}>
        <CustomButton
          title={'Cancel'}
          buttonTextStyle={styles.cancelBtnText}
          buttonTextContainer={styles.customBtnTextContainer}
          buttonContainerStyle={styles.customBtnContainer}
          buttonStyle={styles.cancelBtn}
          onPress={() => {
            props.navigation.navigate('Posts');
          }}
        />
        <CustomButton
          title={'Post'}
          buttonTextStyle={styles.postBtnText}
          buttonTextContainer={styles.customBtnTextContainer}
          buttonContainerStyle={styles.customBtnContainer}
          buttonStyle={styles.postBtn}
          onPress={() => {
            post();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#c8d6e5',
  },
  titleInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  contentInput: {
    flex: 1,
    marginHorizontal: 12,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  btnContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: 10,
  },
  postBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  cancelBtnText: {
    color: '#8395a7',
    fontSize: 18,
    fontWeight: '700',
  },
  cancelBtn: {},
  postBtn: {
    backgroundColor: '#1dd1a1',
  },
  customBtnTextContainer: {
    margin: 5,
    alignItems: 'center',
  },
  customBtnContainer: {
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
    width: 100,
  },
});

export default MakePostScreen;
