import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';

const CustomButton = props => {
  if (props.isImageBG == true) {
    return (
      <View style={props.buttonContainerStyle}>
        <TouchableOpacity
          style={props.buttonStyle}
          onPress={() => {
            props.onPress();
          }}>
          <ImageBackground
            source={props.buttonBG_url}
            style={props.buttonBG_style}
            imageStyle={props.buttonBG_img_style}>
            <View style={props.buttonTextContainer}>
              <Text style={props.buttonTextStyle}>{props.title}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={props.buttonContainerStyle}>
        <TouchableOpacity
          style={props.buttonStyle}
          onPress={() => {
            props.onPress();
          }}>
          <View style={props.buttonTextContainer}>
            <Text style={props.buttonTextStyle}>{props.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default CustomButton;
