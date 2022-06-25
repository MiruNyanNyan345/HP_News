import React from 'react';
import {StyleSheet, FlatList, Linking, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import WebViewScreen from '../screens/WebViewScreen';
import {getDateDiff} from '../utils/util';

const CustomNewsFlatList = props => {

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
