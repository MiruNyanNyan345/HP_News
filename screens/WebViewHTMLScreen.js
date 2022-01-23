import React from 'react';
import WebView from 'react-native-webview';
import {View, StyleSheet} from 'react-native';

const WebVieHTMLScreen = props => {
  const url = props.route.params.url;
  return (
    <WebView
      source={{html: url}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      originWhitelist={['*']}
      allowsLinkPreview={true}
    />
  );
};

const styles = StyleSheet.create({});

export default WebVieHTMLScreen;
