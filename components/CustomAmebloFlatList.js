import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

const CustomAmebloFlatList = props => {
  const getDateTime = datetime => {
    const datetimeObj = new Date(datetime);
    const dateString =
      datetimeObj.getUTCFullYear() +
      '/' +
      ('0' + (datetimeObj.getUTCMonth() + 1)).slice(-2) +
      '/' +
      ('0' + datetimeObj.getUTCDate()).slice(-2) +
      ' ' +
      ('0' + datetimeObj.getUTCHours()).slice(-2) +
      ':' +
      ('0' + datetimeObj.getUTCMinutes()).slice(-2) +
      ':' +
      ('0' + datetimeObj.getUTCSeconds()).slice(-2);

    return dateString;
  };
  return (
    <FlatList
      data={Object.keys(props.items)}
      onEndReached={props.onEndLoadMore}
      onEndReachedThreshold={0}
      keyExtractor={item => props.items[item].entry_id.toString()}
      renderItem={({item}) => (
        <ListItem
          bottomDivider
          onPress={() =>
            props.onLoadNewsContent({
              url:
                'https://ameblo.jp/' +
                props.items[item].image_url.split('/')[4] +
                '/entry-' +
                item +
                '.html',
            })
          }>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginEnd: 10}}>
              <Avatar
                size="large"
                source={{
                  uri: 'https://stat.ameba.jp/' + props.items[item].image_url,
                }}
              />
            </View>
            <ListItem.Content>
              <ListItem.Title style={[{color: 'black', paddingBottom: 20}]}>
                {props.items[item].entry_title}
              </ListItem.Title>
              <ListItem.Subtitle>
                {getDateTime(props.items[item].entry_created_datetime)}
              </ListItem.Subtitle>
            </ListItem.Content>
          </View>
        </ListItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default CustomAmebloFlatList;
