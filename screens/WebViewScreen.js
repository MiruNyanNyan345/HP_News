import React from 'react';
import WebView from 'react-native-webview';
import {View, StyleSheet} from 'react-native';

const WebViewScreen = props => {
  const url = props.route.params.url;
  return (
    <WebView
      source={{url: url}}
      javaScriptEnabled={false}
      domStorageEnabled={true}
      originWhitelist={['*']}
      allowsLinkPreview={true}
    />
  );
};

const styles = StyleSheet.create({});

export default WebViewScreen;
