import React from 'react';
import WebView from 'react-native-webview';
import {View, StyleSheet} from 'react-native';

const WebViewScreen = props => {
  const url = props.route.params.url;
  return (
    // <SafeAreaView style={styles.safeView}>
    <WebView
      source={{url: url}}
      javaScriptEnabled={false}
      domStorageEnabled={true}
      originWhitelist={['*']}
      allowsLinkPreview={true}
    />
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});

export default WebViewScreen;
