import React from 'react';
import {StyleSheet, FlatList, Linking, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import WebViewScreen from '../screens/WebViewScreen';

const CustomNewsFlatList = props => {
  const getDateDiff = datetime => {
    const postTime = new Date(datetime).getTime();
    const currTime = new Date().getTime();
    const diff = new Date(currTime - postTime);
    const diff_days = Math.floor(diff / 1000 / 60 / (60 * 24));
    switch (true) {
      case diff_days > 0:
        return diff_days + ' Day(s) ago';
      case diff.getUTCHours() > 0:
        return diff.getHours() + ' Hour(s) ago';
      case diff.getUTCMinutes() > 0:
        return diff.getUTCMinutes() + ' Minute(s) ago';
      default:
        return diff.getUTCSeconds() + ' Seconds ago';
    }
  };
  return (
    <View>
      <FlatList
        data={props.items}
        refreshControl={props.refreshControl}
        onEndReached={props.onEndLoadMore}
        onEndReachedThreshold={0}
        keyExtractor={item => item.id.split('view')[1]}
        renderItem={({item}) => (
          <ListItem
            bottomDivider
            onPress={() =>
              props.onLoadNewsContent({
                url:
                  item.id.split('view')[0] + 'click' + item.id.split('view')[1],
              })
            }
            key={item.id.split('view')[1]}>
            <ListItem.Content>
              <ListItem.Title style={[{color: 'black', paddingBottom: 10}]}>
                {item.title}
              </ListItem.Title>
              <ListItem.Subtitle>
                {getDateDiff(item.published)}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </View>
  );
};

export default CustomNewsFlatList;
