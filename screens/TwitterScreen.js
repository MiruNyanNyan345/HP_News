import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import {twitterAccounts} from '../Constants';

const TwitterScreen = () => {
  const navigation = useNavigation();

  const loadTwitterTimeline = item => {
    navigation.navigate('TwitterWebView', {
      url: {html: item.url},
      javaScriptEnabled: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <FlatList
          style={{width: '100%', height: '100%'}}
          data={twitterAccounts}
          // onEndReached={props.onEndLoadMore}
          onEndReachedThreshold={0}
          keyExtractor={item => item.label}
          renderItem={({item}) => (
            <CustomButton
              isImageBG={true}
              buttonContainerStyle={{
                flex: 1,
              }}
              buttonStyle={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#fff',
                overflow: true,
                height: 150,
                margin: 5,
              }}
              buttonBG_url={{uri: item.icon}}
              buttonBG_style={{width: '100%', height: '100%'}}
              buttonBG_img_style={{
                opacity: 0.5,
                height: 230, // the image height
                top: 1,
              }}
              buttonTextContainer={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonTextStyle={{
                // color: '#ee5253',
                color: 'black',
                fontWeight: '800',
                fontSize: 25,
              }}
              title={item.label}
              onPress={() => {
                loadTwitterTimeline({
                  url:
                    '<a class="twitter-timeline" href="' +
                    item.url +
                    '?ref_src=twsrc%5Etfw">' +
                    'Tweets by ' +
                    item.username +
                    '</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
                });
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
});

export default TwitterScreen;
