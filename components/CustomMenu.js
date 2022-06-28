import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BackgroundImage} from 'react-native-elements/dist/config';
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
              backgroundColor: '#ffffe4',
            }}
            onPress={() => {
              props.loadItems(item);
            }}>
            <Avatar size={120} source={item.profile_image} />
            <Text style={{fontWeight: '200'}}>{item.label}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create();

export default CustomMenu;
