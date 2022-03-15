import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomPostItem from '../components/CustomPostItem';
import {NavigationActions as navigation} from 'react-navigation';

const PostCommentsScreen = ({route}) => {
  const params = route.params;

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
        buttonIconName={'add-circle-outline'}
        buttonIconSize={50}
        buttonIconColor={'#ff6b6b'}
        onPress={() => {
          console.log('Added Post');
        }}
      />
      {/*<FlatList*/}
      {/*  data={props.data}*/}
      {/*  keyExtractor={item => item.id}*/}
      {/*  renderItem={({index, item}) => (*/}
      {/*    <CustomPostItem*/}
      {/*      item={item}*/}
      {/*      postItemStyle={{*/}
      {/*        flex: 1,*/}
      {/*        borderColor: '#ff6b6b',*/}
      {/*        borderWidth: 1.5,*/}
      {/*        borderRadius: 10,*/}
      {/*        marginVertical: 10,*/}
      {/*        marginHorizontal: 5,*/}
      {/*        padding: 10,*/}
      {/*      }}*/}
      {/*      postHeaderContainer={{alignContent: 'center'}}*/}
      {/*      postHeaderTextContainer={{flexDirection: 'row', marginLeft: 5}}*/}
      {/*      postTitle={{fontWeight: '500', fontSize: 20}}*/}
      {/*      postInfoText={{fontSize: 12, alignSelf: 'center'}}*/}
      {/*      postInfoBullet={{*/}
      {/*        fontSize: 15,*/}
      {/*        alignSelf: 'center',*/}
      {/*        marginHorizontal: 1,*/}
      {/*      }}*/}
      {/*      postContentPreview={{fontWeight: '200', fontSize: 12, margin: 5}}*/}
      {/*      postActionContainer={{*/}
      {/*        flexDirection: 'row',*/}
      {/*        paddingTop: 5,*/}
      {/*        borderTopWidth: 0.5,*/}
      {/*      }}*/}
      {/*      postBookmarkButton={{flexDirection: 'row'}}*/}
      {/*      postCommentButton={{flexDirection: 'row', marginHorizontal: 20}}*/}
      {/*      postVoteContainer={{*/}
      {/*        flexDirection: 'row',*/}
      {/*        marginHorizontal: 20,*/}
      {/*        justifyContent: 'flex-end',*/}
      {/*        flex: 1,*/}
      {/*      }}*/}
      {/*      onPress={() => {*/}
      {/*        navigation.navigate('Title');*/}
      {/*      }}*/}
      {/*    />*/}
      {/*)} />*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});

export default PostCommentsScreen;
