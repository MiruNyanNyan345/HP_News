import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

const CustomTwitterFlatList = props => {
  return (
    <FlatList
      data={props.items}
      onEndReached={props.onEndLoadMore}
      onEndReachedThreshold={0}
      keyExtractor={item => item.label}
      renderItem={({item}) => (
        <ListItem
          bottomDivider
          style={[props.listItem_style, {}]}
          containerStyle={{backgroundColor: item.color}}
          onPress={() =>
            props.onloadTimeline({
              url:
                '<a class="twitter-timeline" href="' +
                item.url +
                '?ref_src=twsrc%5Etfw">' +
                'Tweets by ' +
                item.uername +
                '</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
            })
          }>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{marginEnd: 10}}>
              <Avatar
                size="large"
                rounded
                source={{
                  uri: item.icon,
                }}
              />
            </View>
            <ListItem.Content>
              <ListItem.Title style={[props.labelStyle]}>
                {item.label}
              </ListItem.Title>
            </ListItem.Content>
          </View>
        </ListItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default CustomTwitterFlatList;
