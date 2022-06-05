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

const CustomAmebloMenu = props => {
  return (
    <FlatList
      data={props.items}
      keyExtractor={item => item.label}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({item}) => (
        <View>
          <TouchableOpacity
            style={{
              marginHorizontal: 5,
              alignItems: 'center',
              borderRadius: 15,
              overflow: 'hidden',
              backgroundColor: '#ffffe4',
            }}
            onPress={() => {
              props.loadBlogItems(item);
            }}>
            <Avatar
              size={120}
              source={{
                uri: item.profile_images,
              }}
            />
            <Text style={{fontWeight: '200'}}>{item.label}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create();

export default CustomAmebloMenu;
