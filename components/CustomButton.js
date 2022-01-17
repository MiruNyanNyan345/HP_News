import React, {useEffect} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

const CustomButton = props => {
  return (
    <View style={props.buttonContainerStyle}>
      <TouchableOpacity
        style={props.buttonStyle}
        onPress={() => {
          props.onPress();
        }}>
        <Text style={props.buttonTextStyle}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
