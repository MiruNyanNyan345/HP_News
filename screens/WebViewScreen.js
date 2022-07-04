import React from 'react';
import WebView from 'react-native-webview';
import {StyleSheet, SafeAreaView} from 'react-native';

const WebViewScreen = props => {

  return (
    <SafeAreaView style={styles.safeView}>
      <WebView
        source={props.route.params.url}
        javaScriptEnabled={props.route.params.javaScriptEnabled}
        domStorageEnabled={true}
        originWhitelist={['*']}
        allowsLinkPreview={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});

export default WebViewScreen;
