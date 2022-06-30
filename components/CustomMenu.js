import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';

const CustomMenu = props => {
  return (
    <FlatList
      data={props.items}
      keyExtractor={item => item.label}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({item}) => (
        <View
          style={{
            marginVertical: 5,
            shadowColor: '#000000',
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1,
            },
          }}>
          <TouchableOpacity
            style={{
              marginHorizontal: 5,
              alignItems: 'center',
              borderRadius: 15,
              overflow: 'hidden',
              backgroundColor: '#fab1a0',
            }}
            onPress={() => {
              props.isPlaylist
                // ? props.loadItems(item.playlistData.items)
                ? props.loadItems(item.playlistId)
                : props.loadItems(item);
            }}>
            <Avatar size={120} source={item.profile_image} />
            <View style={{marginVertical: 3}}>
              <Text style={{fontWeight: '800', fontSize: 10, color: '#fff'}}>
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create();

export default CustomMenu;
