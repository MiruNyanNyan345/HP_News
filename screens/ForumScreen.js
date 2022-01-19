import React, {useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ListItem, Avatar} from 'react-native-elements';

const data = [
  {
    id: 0,
    title: 'Testing',
    content:
      'The website needs to be in English (accessible for everyone), German (main market) & Dutch (2de biggest market/fanbase). With Wordpress I face some difficulties. E.g. people need to upload in English and cannot do this in German or Dutch with the current theme on Wordpress.',
    postUser: 'Tommy',
    postTimeInterval: '5m ago',
    commentCounts: '19',
  },
  {
    id: 1,
    title: 'Testing2',
    content:
      'The website needs to be in English (accessible for everyone), German (main market) & Dutch (2de biggest market/fanbase). With Wordpress I face some difficulties. E.g. people need to upload in English and cannot do this in German or Dutch with the current theme on Wordpress.',
    postUser: 'Judy',
    postTimeInterval: '1h ago',
    commentCounts: '250',
  },
  {
    id: 2,
    title: 'Testing3',
    content:
      'The website needs to be in English (accessible for everyone), German (main market) & Dutch (2de biggest market/fanbase). With Wordpress I face some difficulties. E.g. people need to upload in English and cannot do this in German or Dutch with the current theme on Wordpress.',
    postUser: 'Judy',
    postTimeInterval: '2d ago',
    commentCounts: '0',
  },
];

const ForumScreen = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <CustomButton
        isIconBG={true}
        buttonContainerStyle={{
          flex: 1,
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
        buttonIconName={'add-circle-outline'}
        buttonIconSize={50}
        buttonIconColor={'#ff6b6b'}
        onPress={() => {
          console.log('Post');
        }}
      />

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({index, item}) => (
          <View
            style={{
              flex: 1,
              borderColor: '#ff6b6b',
              borderWidth: 1.5,
              borderRadius: 10,
              marginVertical: 10,
              marginHorizontal: 5,
              padding: 10,
            }}>
            <View style={{alignContent: 'center'}}>
              <View style={{flexDirection: 'row', marginLeft: 5}}>
                <Text style={{fontWeight: '500', fontSize: 20}}>
                  {item.title}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginLeft: 5}}>
                <Text style={{fontSize: 12, alignSelf: 'center'}}>
                  {item.postUser}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    alignSelf: 'center',
                    marginHorizontal: 1,
                  }}>
                  &#8226;
                </Text>
                <Text style={{fontSize: 12, alignSelf: 'center'}}>
                  {item.postTimeInterval}
                </Text>
              </View>
            </View>
            <Text style={{fontWeight: '200', fontSize: 12, margin: 5}}>
              {item.content}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                paddingTop: 5,
                borderTopWidth: 0.5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name={'bookmarks-outline'}
                  color={'#54a0ff'}
                  size={20}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    marginLeft: 5,
                    fontWeight: '500',
                    color: '#54a0ff',
                  }}>
                  Save
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                <Ionicons
                  name={'chatbubble-outline'}
                  color={'#10ac84'}
                  size={20}
                />
                <View style={{justifyContent: 'center', marginHorizontal: 5}}>
                  <Text style={{color: '#10ac84', fontSize: 15}}>Comments</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  justifyContent: 'flex-end',
                  flex: 1,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name={'thumbs-up-outline'}
                    color={'#ee5253'}
                    size={20}
                  />
                  <View style={{justifyContent: 'center', marginHorizontal: 5}}>
                    <Text style={{color: '#ee5253', fontSize: 15}}>10</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{justifyContent: 'center', marginHorizontal: 5}}>
                    <Text style={{color: '#8395a7', fontSize: 15}}>20</Text>
                  </View>
                  <Ionicons
                    name={'thumbs-down-outline'}
                    color={'#8395a7'}
                    size={20}
                  />
                </View>
              </View>
            </View>
          </View>
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
