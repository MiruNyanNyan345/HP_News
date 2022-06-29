import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  } else if (props.isIconBG == true) {
    return (
      <View style={props.buttonContainerStyle}>
        <TouchableOpacity
          disabled={props.disabled}
          style={props.buttonStyle}
          onPress={() => {
            props.onPress();
          }}>
          <View style={props.buttonTextContainer}>
            <Ionicons
              name={props.buttonIconName}
              size={props.buttonIconSize}
              color={props.buttonIconColor}
            />
          </View>
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
