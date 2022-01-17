import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import {StyleSheet} from 'react-native';

const CustomDropDownPicker = props => {
  return (
    <DropDownPicker
      placeholder={props.placeholder}
      items={props.items}
      containerStyle={{height: props.height, width: props.width}}
      style={{backgroundColor: props.backgroundColor}}
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      dropDownStyle={{backgroundColor: props.backgroundColor}}
      onChangeItem={val => {
        props.loadBlogItems(val);
      }}
      labelStyle={{
        color: props.labelColor,
        fontSize: props.labelSize,
        fontWeight: props.labelWeight,
      }}
    />
  );
};

const styles = StyleSheet.create();

export default CustomDropDownPicker;
